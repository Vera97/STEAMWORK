# web_vueframe

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### $一些说明
##### 我在项目中设置好了基本的框架，npm install 之后运行可以看到我写好的一个测试demo，一些细节在里面说明了，大家可以基于测试页面调试静态页面，这样可以在vue内部测试方便逻辑和界面结合，当然大家也可以根据自己喜好先编辑静态页面再插入vue框架。另外，我建议大家可以fork分支，这样我就不用给每个人添加collaborators，大家直接从fork的分支合并即可，详细的操作大家不清楚的话可以百度学学，我也贴出一个地址供参考：https://blog.csdn.net/u012435142/article/details/89491388 。当然，如果需要协同开发，我们再添加collaborators

### $大家commit以后建议都在这里注明一下，以备检查和跟踪
##### 2019.7.2 # 添加仓库
##### 2019.7.3 # 配置打包后静态文件输出目录，方便以后后台使用
##### 2019.7.7 # 页面去除了原本使用的JQuery和Bootstrap框架，替换为Element UI框架（https://element.eleme.cn/2.0/#/zh-CN/component/installation）
##### 2019.7.8 # 重新组织了项目，新增了课程信息介绍的页面，为其添加了路由，并且定义了内部用到的组件，具体内容可以直接在这些组件上添加，参看Course.vue中的注释。原先上传的文档现在统一放在/communication文件夹下。大家可以从这次提交开始新建自己的分支
##### 2019.7.9 # 补充了课程信息介绍静态页面
##### 2019.7.15 # 修改了主页的几个数据绑定，修改了筛选条件，修改了全局的状态管理器以存放用户名与简介等等
