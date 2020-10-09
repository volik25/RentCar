const package = require('./../../../package.json');
const {patch} = require('../constants');
const fs = require(`fs`);

module.exports = {
    name: `--patch`,
    run() {
        package.version = patch;
        console.log('Патч');
        fs.writeFile('package.json', JSON.stringify(package), (err) => {
            if (err) {
                return console.error(`Что-то пошло не так. Обновление не удалось`);
            }
            return console.info(`Версия обновлена до ${package.version}\n`);
        });
    }
  };