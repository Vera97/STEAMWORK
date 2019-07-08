<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>可以在这里插入完全的静态html，然后即可在vue内部调试静态网页</h2>
        <h3>目前使用的是vue-cli的1开发模式，采用babel进行js语法变换，因此可以放心些自己熟悉的语法而不用担心浏览器兼容</h3>
        <h3>项目结构如下：</h3>
        <p>
            <span>
                web_vueframe<br>
                |<br>
                |___public 存放公共静态资源，例如主页，标题图标（主页index.html在打包或者运行时会被vue改造加入script标签作为入口，具体可以build一下后看看）<br>
                |<br>
                |___ src 项目源码等资源<br>
                |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___api 与后端的数据请求接口，建议统一在这里，以备管理<br>
                |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
                |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___assets 资源仓库，但完全可以自定义资源存放在src内部任何位置<br>
                |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
                |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___components 组件<br>
                |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
                |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___store vuex目录，可以用一个store.js代替，但建议放在src根目录<br>
                |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
                |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___App.vue 根组件，这个组件是在main.js中注册的<br>
                |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
                |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___main.js 程序入口，也是打包以后插入到html的script标签的js<br>
                |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
                |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___routes.js 路由文件<br>
                |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
                |___.gitignore git配置文件，用于commit代码时过滤不必要文件，大家可以根据自己的习惯更改，建议按照统一风格<br>
                |<br>
                |___babel.config.js babel配置文件，建议大家不要更改这个文件<br>
                |<br>
                |___packages.json 项目配置文件<br>
                |<br>
                |___packages-lock.json packages.json的包配置锁定文件，用于包版本控制，有npm自动管理<br>
                |<br>
                |___README.md<br>
            </span>
        </p>
        <h2>以下是一个路由组件，这里用来演示路由和状态管理，可以查看组件：</h2>
        <!--以上可作为模板以备测试使用，可把静态HTML写在上方，
        然后对应写css在下面<style>标签内，运行服务即可在vue中测试静态页面-->
        <!--以下是嵌套路由食用的渲染出口-->
        <router-view></router-view>

        <!--以下是vuex使用示例-->

    </div>
</template>

<script>
    export default {
        name: 'TestPages',
        props: {
            msg: String
        }
    }
</script>

<!-- 添加"scoped"以保证组件内部的css不影响外部全局css-->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
