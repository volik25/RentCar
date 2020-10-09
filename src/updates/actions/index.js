const help = require(`./help`);
const major = require(`./major`);
const minor = require(`./minor`);
const patch = require(`./patch`);
const relase = require(`./relase`);

const Cli = {
  [help.name]: help,
  [major.name]: major,
  [minor.name]: minor,
  [patch.name]: patch,
  [relase.name]: relase
};

module.exports = {
  Cli
};