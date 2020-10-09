const package = require('./../../../package.json');
const {major} = require('../constants');
const fs = require(`fs`);

module.exports = {
    name: `--major`,
    run() {
        package.version = major;
        console.log('Мажорное обновление');
        fs.writeFile('package.json', JSON.stringify(package), (err) => {
            if (err) {
                return console.error(`Что-то пошло не так. Обновление не удалось`);
            }
            return console.info(`Версия обновлена до ${package.version}\n`);
        });
    }
  };