<template>
  <div class="wrapper">
    <el-tabs v-model="active">
      <el-tab-pane label="教师登陆" name="teacher"></el-tab-pane>
      <el-tab-pane label="学生登陆" name="student"></el-tab-pane>
    </el-tabs>
    <el-form :model="form">
      <el-form-item label="用户名">
        <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'
    import store from '../../store'

    export default {
        name: "index",
        data () {
            return {
                form: {
                    userName: '',
                    password: ''
                },
                active: 'teacher'
            }
        },
        methods: {
            login() {
                if(this.active === 'teacher') {
                    utils.request({
                        invoke: api.loginTeacher,
                        params: {
                            userName: this.form.userName,
                            passWord: this.form.password
                        },
                        result: fakeData.LOGIN_RESPONSE
                    })
                        .then((function (res) {
                            if (res.data.code === 1) {
                                store.commit('LOG_IN_TEACHER', {
                                    ...res.data.userData,
                                    teacherId: res.data.teacherId,
                                    userName: this.form.userName
                                });
                                store.dispatch('home/get_fav_courses').then();

                                this.$router.push({path: '/home'})
                            } else {
                                this.$message.error('用户名或密码错误')
                            }
                        }).bind(this));
                } else {
                    utils.request({
                        invoke: api.loginStudent,
                        params: {
                            userName: this.userName,
                            passWord: this.password
                        },
                        result: fakeData.LOGIN_STU_RESPONSE
                    })
                        .then((function (res) {
                            if(res.data.code === 1) {
                                store.commit('LOG_IN_STUDENT', {
                                    ...res.data.userData,
                                    stuId: res.data.stuId,
                                    userName: this.form.userName
                                });

                                this.$router.push({path: 'stuClass'})
                            } else {
                                this.$message.error('用户名或密码错误')
                            }
                        }).bind(this))
                }
            }
        }
    }
</script>

<style scoped>
  .wrapper {
    position: relative;
    margin: 1em auto;
    width: 30%;
  }
</style>
