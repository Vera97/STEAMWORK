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
      <div class="login">
        <el-button type="primary" round size="mini" @click="logout" v-if="login_state">注销</el-button>
        <el-button round size="mini" @click="login" v-else>注册</el-button>
      </div>
      <div class="login">
        <i class="el-icon-user-solid" v-if="login_state"></i>
        <el-popover placement="left" trigger="click" v-else>
          <el-button slot="reference" type="primary" round size="mini" @click="login">登陆</el-button>
          <el-form class="login-form-wrapper">
            <el-form-item label="用户名：">
              <el-input placeholder="请输入用户名" v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input placeholder="请输入密码" type="password" v-model="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="login-button" @click="login">登陆</el-button>
            </el-form-item>
          </el-form>
        </el-popover>

      </div>
    </el-menu>
  </div>
</template>

<script>
  import store from '@/store'
  import md5 from 'md5'
  import api from '@/api'

  export default {
    name: "Nav",
    computed: {
      login_state () {
        return store.getters.get_login_state
      }
    },
    data() {
      return {
        activeIndex: '1',
        username: '',
        password: ''
      };
    },
    methods: {
      // eslint-disable-next-line no-unused-vars
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      login() {
        let username = this.username;
        let password = md5(this.password);
        api.requestLogin({username: username, password: password}).then(res => {
          store.commit('LOG_IN')
        });
      },
      logout() {
        store.commit('LOG_OUT')
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

  .login-form-wrapper {
    padding: 1em;
  }

  .login-button {
    width: 100%;
  }
</style>
