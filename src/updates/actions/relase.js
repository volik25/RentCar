const cliSelect = require('cli-select');
const package = require('./../../../package.json');
const chalk = require('chalk');
const fs = require(`fs`);
const {
    version,
    major,
    minor,
    patch
} = require('./../constants');

module.exports = {
    name: `--relase`,
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
  };