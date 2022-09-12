const program = require("commander");
const {
  createProjectAction,
  addComponentsAction,
  addPageAndRouteAction,
} = require("./action.js");
const createCommands = () => {
  // 创建项目
  program
    .command("create <project> [others...]")
    .description("clone repository into a folder")
    .action(createProjectAction);
  // 创建新组件
  program
    .command("addcpn <name>")
    .description(
      "add vue components, 例如: lzhvue addcpn Hellow -d src/components"
    )
    .action((name) => {
      console.log(program.dest)
      addComponentsAction(name, program.dest || "src/components");
    });
  // 创建新页面
  program
    .command("addpage <page>")
    .description(
      "add vue page and router config, 例如: lzhvue addpage Home [-d src/pages]"
    )
    .action((page) => {
      addPageAndRouteAction(page, program.dest || "src/views");
    });
};

module.exports = createCommands;
