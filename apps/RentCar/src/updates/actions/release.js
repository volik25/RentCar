const cliSelect = require('cli-select');
const package = require('../../../package.json');
const packageLock = require('../../../package-lock.json');
const chalk = require('chalk');
const fs = require(`fs`);
const {
    version,
    major,
    minor,
    patch
} = require('../constants');

module.exports = {
    name: `--release`,
    run() {
        console.log(`Перед релизом проекта необходимо обновить его версию.\nТекущая версия: ${version}\n`);
        cliSelect({
            values: [
                {
                    type: 'Major',
                    version: major
                },
                {
                    type: 'Minor',
                    version: minor
                },
                {
                    type: 'Patch',
                    version: patch
                },
                {
                    type: 'Exit',
                    version: '(не менять версию)'
                }
            ],
            selected: '',
            unselected: '',
            valueRenderer: (value, selected) => {
                if (selected) {
                    return `${chalk.green(value.type)} ${chalk.underline(value.version)}`;
                }
                return `${value.type} ${value.version}`;
            },
        }).then((res) => {
            if (res.value.type == 'Exit') {
                process.exit(1);
            }
            else{
                let newVersion = res.value.version;
                package.version = newVersion;
                packageLock.version = newVersion;
                fs.writeFile('package.json', JSON.stringify(package, null, 2), (err) => {
                    if (err) {
                        return console.error(`Что-то пошло не так. Обновление не удалось`);
                    }
                    fs.writeFile('package-lock.json', JSON.stringify(packageLock, null, 2), (err) => {
                        if (err) {
                            return console.error(`Что-то пошло не так. Обновление не удалось`);
                        }
                        return console.info(`Релиз-версия: ${package.version}\n`);
                    })
                });
            }
        });
    }
  };