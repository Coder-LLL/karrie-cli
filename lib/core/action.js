const { promisify } = require("util");
const path = require("path");

// download-git-repo这个包是通过回调函数来执行下载之后代码的
// 所以给一个promisify包裹一下变成promise
const download = promisify(require("download-git-repo"));
const open = require("open");

const { commandSpawn } = require("../utils/terminal.js");
const { vueRepo } = require("../config/repo-config");
const { compile, writeToFile, createDirSync } = require("../utils/utils.js");

const createProjectAction = async (project) => {
  console.log("lzhvue helps you create your project~");

  // 1.clone项目，project是下载下来放哪个文件夹
  await download(vueRepo, project, {
    clone: true,
  });

  // 2.执行npm install, cwd：current work directory表示工作目录
  // 在window下要使用npm.cmd, 平时在cmd中直接使用npm的时候，window会帮助执行对应目录的npm.cmd
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  await commandSpawn(command, ["install"], {
    cwd: `./${project}`,
  });

  // 3.运行npm run serve
  commandSpawn(command, ["run", "serve"], {
    cwd: `./${project}`,
  });

  // 4.打开浏览器
  // 由于npm run serve会阻塞，所以要在npm run serve运行完之前就打开，
  // 这就是为什么 npm run serve 那个函数不加await了
  open("http://localhost:8080/");
};

const addComponentsAction = async (name, dest) => {
  // 1. 编译ejs模板
  const result = await compile("components.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });
  // 2.写入文件的操作
  const targetPath = path.resolve(dest, `${name}Cpn.vue`);
  writeToFile(targetPath, result);
};

// 添加组件和路由
const addPageAndRouteAction = async (name, dest) => {
  // 1.编译ejs模板
  const data = {
    name,
    lowerName: name.toLowerCase(),
  };
  const pageResult = await compile("components.ejs", data);
  const routeResult = await compile("router.ejs", data);

  // 3.写入文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}Page.vue`);
    const targetRoutePath = path.resolve(targetDest, "router.js");
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, routeResult);
  }
};
module.exports = {
  createProjectAction,
  addComponentsAction,
  addPageAndRouteAction,
};
