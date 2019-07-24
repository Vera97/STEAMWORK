<template>
  <div class="search-wrapper">
    <el-form :inline="true">
      <el-form-item class="search">
        <el-input placeholder="输入关键字" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
      <el-form-item class="filter">
      <el-select v-model="selected.type" placeholder="<请选择类别>">
        <el-option :label="'<请选择类别>'" :value="''"></el-option>
        <el-option v-for="item in conditions.type" :key="item.type" :label="item.type" :value="item.type"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item class="filter">
      <el-select v-model="selected.coursename" placeholder="<请选择课程名称>">
        <el-option :label="'<请选择课程名称>'" :value="''"></el-option>
        <el-option v-for="item in conditions.coursename" :key="item.type" :label="item.type" :value="item.type"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item class="filter">
      <el-select v-model="selected.teacher" placeholder="<请选择老师>">
        <el-option :label="'<请选择老师>'" :value="''"></el-option>
        <el-option v-for="item in conditions.teacher" :key="item.type" :label="item.type" :value="item.type"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item class="filter">
      <el-select v-model="selected.time" placeholder="<请选择时长>">
        <el-option :label="'<请选择时长>'" :value="''"></el-option>
        <el-option v-for="item in conditions.time" :key="item.type" :label="item.type" :value="item.type"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item class="filter">
        <el-checkbox v-model="selected.favorite">已收藏</el-checkbox>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" class="filter-button" @click="filter">筛选</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import {api, fakeData} from '@/api'
    import store from '../../store'
    import utils from '../../utils'

    export default {
        name: "search",
        data () {
            return {
                keyword: '',
                conditions: {
                    type: [
                        {type: '类别1'},
                        {type: '类别2'},
                        {type: '类别3'}
                    ],
                    coursename: [
                        {type: '课程1'},
                        {type: '课程2'},
                        {type: '课程3'}
                    ],
                    teacher: [
                        {type: '何老师'},
                        {type: '敏院长'},
                        {type: '张老师'}
                    ],
                    time: [
                        {type: '1'},
                        {type: '2'},
                        {type: '3'}
                    ]
                },
                selected: {
                    type: '',
                    coursename: '',
                    teacher: '',
                    time: '',
                    favorite: false
                },
            }
        },
        methods: {
            search () {
                utils.request({
                    invoke: api.getCourses,
                    params: {
                        code: 'search',
                        course_name_keyword: this.keyword
                    },
                    result: fakeData.SEARCH_COURSE
                })
                    .then(res => {
                        store.commit('home/ADD_COURSES', res.data);
                        store.commit('home/TOGGLE_FAV', false)
                    })
            },
            filter () {
                utils.request({
                    invoke: api.getCourses,
                    params: {
                        code: 'filter',
                        type: this.selected.type,
                        coursename: this.selected.coursename,
                        teacher: this.selected.teacher,
                        time: this.selected.time,
                        favorite: this.selected.favorite
                    },
                    result: fakeData.FILTER_COURSE
                })
                    .then(res => {
                        store.commit('home/ADD_COURSES', res.data);
                        store.commit('home/TOGGLE_FAV', false)
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
  .search {
    width: 15%;
  }

  .filter {
    width: 13%;
  }
</style>
