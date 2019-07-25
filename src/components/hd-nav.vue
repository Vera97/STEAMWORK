<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
      <div class="nav-type">教师端</div>
      <el-menu-item index="1"><router-link class="router" :to="{path: '/home'}">教学资源</router-link></el-menu-item>
      <el-menu-item index="2">在线备课</el-menu-item>
      <el-submenu index="3">
        <template slot="title">我的班级</template>
        <el-menu-item index="3-1"><router-link class="router" :to="{path: '/studentslist'}">班级一</router-link></el-menu-item>
        <el-menu-item index="3-2"><router-link class="router" :to="{path: '/studentslist'}">班级二</router-link></el-menu-item>
        <el-menu-item index="3-3"><router-link class="router" :to="{path: '/studentslist'}">班级三</router-link></el-menu-item>
      </el-submenu>
      <el-menu-item index="4">开始上课</el-menu-item>
      <div class="login">
        <el-button type="primary" round size="mini" @click="logout" v-if="userName !== ''">注销</el-button>
        <el-button round size="mini" @click="login" v-else>注册</el-button>
      </div>
      <div class="login">
        <el-avatar :src="require('../assets/avatar.png')" v-if="userName !== ''"></el-avatar>
        <el-popover placement="left" trigger="click" v-else>
          <el-button slot="reference" type="primary" round size="mini">登陆</el-button>
          <el-form class="login-form-wrapper">
            <el-form-item label="用户名：">
              <el-input placeholder="请输入用户名" v-model="form_username"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input placeholder="请输入密码" type="password" v-model="form_password"></el-input>
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
    import store from '../store'
    import md5 from 'md5'
    import {api, fakeData} from '../api'
    import utils from '../utils'

    export default {
        name: "Nav",
        computed: {
            userName () {
                return store.getters.get_username
            },
            avatar () {
                return store.getters.get_avatar_url
            }
        },
        data() {
            return {
                activeIndex: '1',
                form_username: '',    /* these two is for the form input. */
                form_password: ''
            };
        },
        methods: {
            handleSelect() {},
            login() {
                let userName = this.form_username;
                let password = this.form_password;
                utils.request({
                    invoke: api.requestLogin,
                    params: {
                        userName: userName,
                        password: password
                    },
                    result: fakeData.LOGIN_RESPONSE
                })
                    .then(res => {
                        if(res.data.code === 1) {
                            alert('服务端返回登录用户数据（头像）：' + res.data.userdata);
                            store.commit('LOG_IN', {...res.data.userdata, userName: userName});
                            store.dispatch('home/get_fav_courses').then();
                        } else {
                            alert('用户名或密码错误')
                        }
                    });
            },
            logout() {
                store.commit('LOG_OUT')
            }
        },
        created() {
            store.commit('PROBE');
            if(this.userName !== '') store.dispatch('home/get_fav_courses').then()
        }
    }
</script>

<style scoped lang="scss">
  .router {
    text-decoration: none;
  }

  .el-menu {
    height: 4em;

    .nav-type{
      float:left;
      margin:20px;
      padding-right:100px;
    }

    .el-menu-item, .el-submenu {
      position: relative;
      bottom: 0;
    }
  }


  .login{
    float:right;
    color:#ffffff;
    margin: 0 15px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .login-form-wrapper {
    padding: 1em;
  }

  .login-button {
    width: 100%;
  }
</style>
