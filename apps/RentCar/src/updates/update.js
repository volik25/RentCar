const {Cli} = require(`./actions/index`);

const userArguments = process.argv.slice(2);
const [userCommand] = userArguments;
if (Cli[userCommand]) {
    Cli[userCommand].run();
}
else{
    Cli['--help'].run();
}