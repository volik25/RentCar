let package = require('../../package.json');
let version = package.version;
let versionArray = version.split('.');
let majorVersion = `${versionArray[0]*1+1}.0.0`;
let minorVersion = `${versionArray[0]}.${versionArray[1]*1+1}.0`;
let patchVersion = `${versionArray[0]}.${versionArray[1]}.${versionArray[2]*1+1}`;

let messageText = `
    Обновление версии приложения.

    Текущая версия: ${version}

        ${versionArray[0]} - мажорная версия. Если в обновлении какой-либо новый функционал заменил старый, сломав или удалив его,
            либо что-то было вырезано, необходимо повысить мажорную версию.
            Новая версия: ${majorVersion} (npm run update -- --major)
        ${versionArray[1]} - минорная версия. Если в обновлении добавлен новый функционал с полным сохранением старого.
            Новая версия: ${minorVersion} (npm run update -- --minor)
        ${versionArray[2]} - патч-версия. Повышается в случае незначительных правок, например багФиксов.
            Новая версия: ${patchVersion} (npm run update -- --patch)

        Повтор данного сообщения: (npm run update -- --help)
    `

module.exports = {
    version: version,
    major: majorVersion,
    minor: minorVersion,
    patch: patchVersion,
    message: messageText
}