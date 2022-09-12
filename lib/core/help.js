const program = require("commander");

const helpOptions = () => {
  // 增加自己的options
  program.option('-w --why', 'a why cli');
  program.option('-d --dest <dest>', 'a destination folder, 例如: -d /src/components');
}

module.exports = helpOptions;
