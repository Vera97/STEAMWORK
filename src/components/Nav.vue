<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
      <div class="nav-type">教师端</div>
      <el-menu-item index="1">教学资源</el-menu-item>
      <el-menu-item index="2">在线备课</el-menu-item>
      <el-submenu index="3">
        <template slot="title">我的班级</template>
        <el-menu-item index="3-1">班级一</el-menu-item>
        <el-menu-item index="3-2">班级二</el-menu-item>
        <el-menu-item index="3-3">班级三</el-menu-item>
      </el-submenu>
      <el-menu-item index="4">开始上课</el-menu-item>
      <div class="login"><el-button round size="mini" v-on:click="loginOut">{{register}}</el-button></div>
      <div class="login"><el-button type="primary" round size="mini" v-on:click="loginIn">{{username}}</el-button></div>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "Nav",
    data() {
      return {
        activeIndex: '1',
        username: '登录',
        register: '注册'
      };
    },
    methods: {
      // eslint-disable-next-line no-unused-vars
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      loginIn() {
        this.username = '小明';
        this.register = '注销';
      },
      loginOut() {
        this.username = '登录';
        this.register = '注册';
      }
    }
  }
</script>

<style scoped>
  .nav-type{
    float:left;
    margin:20px;
    padding-right:100px;
  }
  .login{
    float:right;
    color:#ffffff;
    margin:15px;
  }
  .el-menu-demo{
    z-index: 99;
    display: inline-block;
    position: fixed;
    width: 100%;
  }
</style>
