<template>
  <div>
    <el-menu router
             :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             ref="menu">
      <div class="nav-type">学生端</div>
      <el-menu-item index="1" :route="{path: '/resource'}">课程资源</el-menu-item>
      <el-menu-item index="2" :route="{path: '/mySuccess'}">我的成就</el-menu-item>
      <el-menu-item index="3" @click="foundTeam">我的小组</el-menu-item>
      <el-menu-item index="4" :route="{path: '/stuClass'}">开始听课</el-menu-item>
      <div class="login">
        <el-button type="primary" round size="mini" @click="logout" v-if="stuId !== ''">注销</el-button>
        <el-button round size="mini" @click="login" v-else>注册</el-button>
      </div>
      <div class="login">
        <el-popover
                :title="userName"
                :content="introduction"
                trigger="hover"
                v-if="stuId !== ''">
          <el-avatar :src="avatar"
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
    import { mapState } from 'vuex'

    export default {
        name: "Nav",
        computed: {
            userName() {
                return store.getters.get_username
            },
            avatar() {
                return store.getters.get_avatar_url
            },
            introduction() {
                return store.getters.get_introduce
            },
            stuId() {
                return store.getters.get_stuId
            },
            ...mapState(['pptId, currentPage'])
        },
        props: {
            ['active-index']: String,
            pptId: Number,
            page: Number
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
                        if (res.data.code === 1) {
                            store.commit('LOG_IN_TEACHER', {
                                ...res.data.userData,
                                teacherId: res.data.teacherId,
                                userName: userName
                            });
                            store.dispatch('home/get_fav_courses').then();

                            this.$router.go(0)
                        } else {
                            alert('用户名或密码错误')
                        }
                    });
            },
            logout() {
                store.commit('LOG_OUT');
                this.$router.replace({path: '/'})
            },
            foundTeam(){
                //向后端请求，成功则跳转，不成功则alert
                utils.request({
                    invoke: api.requestExercise,
                    params: {
                        pptId: this.pptId,
                        page: this.currentPage,
                    },
                    result: fakeData.EXERCISE_LIST
                }).then(res => {
                    for(let i=0;i<res.data.exerciseList.length;i++){
                        if(res.data.exerciseList[i].type === '讨论记录'){
                            utils.request({
                                invoke: api.requestCourseExerciseElse,
                                params: {
                                    stuId: store.state.stuId,
                                    exerciseId: res.data.exerciseList[i].exerciseId,
                                },
                                result: fakeData.SINGLE_NUMBER_CODE
                            }).then(res => {
                                if(res.data.code === 1){
                                    this.$router.push({
                                        name: 'team',
                                        params: {code: 1}
                                    });
                                }
                                else{
                                    alert('小组尚未开启');
                                    this.$router.go(-1);
                                }
                            })
                        }
                    }
                })
            }
        },
        created() {
            store.commit('PROBE');
        }
    }
</script>

<style scoped lang="scss">
  .router {
    text-decoration: none;
  }

  .el-menu {
    height: 4em;

    .nav-type {
      float: left;
      margin: 20px;
      padding-right: 100px;
    }

    .el-menu-item, .el-submenu {
      position: relative;
      bottom: 0;
    }
  }


  .login {
    float: right;
    color: #ffffff;
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
