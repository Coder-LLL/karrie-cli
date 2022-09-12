# karrie-cli

第一步安装karrie-cli库
```
npm install karrie-cli
```

第二步创建项目:(lzhvue create <项目名>)
```
lzhvue create lzh
```

第三步进入项目的根路径, 保证命令行在当前的项目根路径下执行

第四步添加页面
```
lzhvue addpage detail
```

第四步添加组件
```
lzhvue addcpn tabbar
```

命令大全:
-V --version: 查看当前库的版本号

lzhvue create <项目名>: 创建项目, 下载依赖, 并自动运行并且打开浏览器

lzhvue addpage <页面名>: 默认在src/views文件夹下创建页面,自动添加路由, 所以保证当前所执行脚本的时候, 命令行进入的是当前项目的根路径

lzhvue addcpn <组件名>: 默认在src/components文件夹下创建组件, 所以保证当前所执行脚本的时候, 命令行进入的是当前项目的根路径