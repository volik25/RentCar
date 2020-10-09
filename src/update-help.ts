let pack = require('../package.json');

let appVersion = pack.version;
let appVersionArray = appVersion.split('.');
let majorAppVersion = `${appVersionArray[0]*1+1}.0.0`;
let minorAppVersion = `${appVersionArray[0]}.${appVersionArray[1]*1+1}.0`;
let patchedVersion = `${appVersionArray[0]}.${appVersionArray[1]}.${appVersionArray[2]*1+1}`;

const messageText = `
Версии приложений спецификации semver.

Текущая версия: ${appVersion}

    ${appVersionArray[0]} - мажорная версия. Если в обновлении какой-либо новый функционал заменил старый, сломав или удалив его,
        либо что-то было вырезано, необходимо повысить мажорную версию.
        Новая версия: ${majorAppVersion}
    ${appVersionArray[1]} - минорная версия. Если в обновлении добавлен новый функционал с полным сохранением старого.
        Новая версия: ${minorAppVersion}
    ${appVersionArray[2]} - патч-версия. Повышается в случае незначительных правок, например багФиксов.
        Новая версия: ${patchedVersion}
`

console.log(messageText);
