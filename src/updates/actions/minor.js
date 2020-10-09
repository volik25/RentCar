const package = require('./../../../package.json');
const {minor} = require('../constants');
const fs = require(`fs`);

module.exports = {
    name: `--minor`,
    run() {
        package.version = minor;
        console.log('Минорное обновление');
        fs.writeFile('package.json', JSON.stringify(package), (err) => {
            if (err) {
                return console.error(`Что-то пошло не так. Обновление не удалось`);
            }
            return console.info(`Версия обновлена до ${package.version}\n`);
        });
    }
  };