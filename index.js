#!/usr/bin/env node

const program = require("commander");
// #!可以理解为一直用指令 让我们直接找到这个环境 然后运行我们向运行的文件 例如这里是找到node
// 然后再package.json中定义一个bin字段 表示用哪个指令来运行
// 最后使用npm link建立连接 不然无法使用
const helpOptions = require("./lib/core/help.js");
const createCommands = require("./lib/core/create.js");
// 帮助和可选信息
helpOptions();
program.version(require('./package.json').version);
// 创建其他指令
createCommands();
console.log(process.argv)

program.parse(process.argv);
