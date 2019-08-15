<template>
  <div class="main-box">
    <p class="title">您好！管理员</p>
    <el-menu
              default-active="1"
              class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="changeCur1">
          <i class="el-icon-menu"></i>
          <span slot="title">导航一</span>
        </el-menu-item>
        <el-menu-item index="2" @click="changeCur2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" @click="changeCur3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4" @click="changeCur4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'
    import store from '../../store'

    export default {
        name: "menu-list",
        methods: {
            changeCur1(){
                store.commit('admin/ADD_INDEX','teacher-list')
            },
            changeCur2(){
                this.cur=2;
                store.commit('admin/ADD_INDEX','tag-list')
            },
            changeCur3(){
                this.cur=3;
                store.commit('admin/ADD_INDEX',3)
            },
            changeCur4(){
                this.cur=4;
                store.commit('admin/ADD_INDEX',4)
            }
        }
    }
</script>

<style scoped>
    .title{
      margin-bottom:5px;
      text-align:center;
      border:1px solid  #DCDFE6;
      padding-top:10px;
      padding-bottom:10px;
      font-size:20px;
      color:#409EFF;
    }
    .el-menu-vertical-demo{
      margin-top:10%;
    }
</style>