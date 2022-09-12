// 执行终端命令相关代码
const { rejects } = require("assert");
const { spawn } = require("child_process");
const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    // spawn返回的是对应的子进程
    const childProcess = spawn(...args);
    // 在子进程找那个执行各种操作的时候, 主进程看不到子进程中的信息
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    // 当执行完命令之后resolve
    childProcess.on("close", () => {
      resolve();
    });
  });
};
module.exports = { commandSpawn };
