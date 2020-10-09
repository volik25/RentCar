const {message} = require('../constants');

module.exports = {
    name: `--help`,
    run() {
        console.log(message);
    }
  };