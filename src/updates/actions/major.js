const package = require('./../../../package.json');
const packageLock = require('../../../package-lock.json');
const {major} = require('../constants');
const fs = require(`fs`);

module.exports = {
    name: `--major`,
    run() {
        package.version = major;
        packageLock.version = major;
        console.log('Мажорное обновление');
        fs.writeFile('package.json', JSON.stringify(package, null, 2), (err) => {
            if (err) {
                return console.error(`Что-то пошло не так. Обновление не удалось`);
            }
            fs.writeFile('package-lock.json', JSON.stringify(packageLock, null, 2), (err) => {
                if (err) {
                    return console.error(`Что-то пошло не так. Обновление не удалось`);
                }
                return console.info(`Версия обновлена до ${package.version}\n`);
            })
        });
    }
  };