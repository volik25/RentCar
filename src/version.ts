const cliSelect = require('cli-select');
const chalk = require('chalk');
let package = require('../package.json');
const fs = require(`fs`);

let version = package.version;
let versionArray = version.split('.');
let majorVersion = `${versionArray[0]*1+1}.0.0`;
let minorVersion = `${versionArray[0]}.${versionArray[1]*1+1}.0`;
let patchVersion = `${versionArray[0]}.${versionArray[1]}.${versionArray[2]*1+1}`;

console.log(`Обновление версии проекта.\nТекущая версия: ${version}\n`);

const [userCommand] = process.argv.slice(2);
if (userCommand) {
    switch (userCommand) {
        case '--major':
            package.version = majorVersion;
            break;
        case '--minor':
            package.version = minorVersion;
            break;
        case '--patch':
            package.version = patchVersion;
            break;
        default:
            console.log('Такой комманды не существует');
            break;
    }
    fs.writeFile('package.json', JSON.stringify(package), (err) => {
        if (err) {
            return console.error(`Что-то пошло не так. Обновление не удалось`);
        }
        return console.info(`Версия обновлена до ${package.version}\n`);
    });
}
else{
    console.log(`Перед релизом проекта необходимо обновить его версию.\nТекущая версия: ${version}\n`);

    cliSelect({
        values: [
            {
                type: 'Major',
                version: majorVersion
            },
            {
                type: 'Minor',
                version: minorVersion
            },
            {
                type: 'Patch',
                version: patchVersion
            }
        ],
        selected: '=',
        unselected: ' ',
        valueRenderer: (value, selected) => {
            if (selected) {
                return value.type + ' ' + chalk.underline(value.version);
            }
            return value.type + ' ' + value.version;
        },
    }).then((res) => {
        let newVersion = res.value.version;
        package.version = newVersion;
        fs.writeFile('package.json', JSON.stringify(package), (err) => {
            if (err) {
                return console.error(`Что-то пошло не так. Обновление не удалось`);
            }
            return console.info(`Релиз-версия: ${package.version}`);
        });
    });
}