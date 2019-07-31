<template>
  <div>
    <el-menu router
             :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             ref="menu">
      <div class="nav-type">教师端</div>
      <el-menu-item index="1" :route="{path: '/home'}">教学资源</el-menu-item>
      <el-menu-item index="2" :route="{path: '/ppt'}">在线备课</el-menu-item>
      <el-menu-item index="3" :route="{path: '/studentsList'}">我的班级</el-menu-item>
      <el-menu-item index="4" :route="{path: '/startClass'}">开始上课</el-menu-item>
      <div class="login">
        <el-button type="primary" round size="mini" @click="logout" v-if="userName !== ''">注销</el-button>
        <el-button round size="mini" @click="login" v-else>注册</el-button>
      </div>
      <div class="login">
        <el-popover
                :title="userName"
                :content="introduction"
                trigger="hover"
                v-if="userName !== ''">
          <el-avatar :src="require('../assets/avatar.png')"
                     slot='reference'></el-avatar>
        </el-popover>
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
            },
            introduction () {
                return store.getters.get_introduce
            }
        },
        props: {
            ['active-index']: String
        },
        data() {
            return {
                form_username: '',    /* these two is for the form input. */
                form_password: ''
            };
        },
        methods: {
            login() {
                let userName = this.form_username;
                let password = this.form_password;
                utils.request({
                    invoke: api.loginTeacher,
                    params: {
                        userName: userName,
                        passWord: password
                    },
                    result: fakeData.LOGIN_RESPONSE
                })
                    .then(res => {
                        if(res.data.code === 1) {
                            alert('服务端返回登录用户数据（头像）：' + res.data.userData);
                            store.commit('LOG_IN', {...res.data.userData, teacherId: res.data.teacherId, userName: userName});
                            store.dispatch('home/get_fav_courses').then();

                            this.$router.go(0)
                        } else {
                            alert('用户名或密码错误')
                        }
                    });
            },
            logout() {
                store.commit('LOG_OUT');
                this.$router.go(0)
            }
        },
        created() {
            store.commit('PROBE');
            if(this.userName !== '') store.dispatch('home/get_fav_courses').then();
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
