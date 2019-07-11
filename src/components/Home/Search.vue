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
      <el-select v-model="selected.kind" placeholder="<请选择类别>">
        <el-option :label="'<请选择类别>'" :value="''"></el-option>
        <el-option v-for="item in conditions.kind" :key="item.type" :label="item.type" :value="item.type"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item class="filter">
      <el-select v-model="selected.class" placeholder="<请选择课程>">
        <el-option :label="'<请选择课程>'" :value="''"></el-option>
        <el-option v-for="item in conditions.class" :key="item.type" :label="item.type" :value="item.type"></el-option>
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
      <el-select v-model="selected.other" placeholder="<请选择其它条件>">
        <el-option :label="'<请选择其它条件>'" :value="''"></el-option>
        <el-option v-for="item in conditions.other" :key="item.type" :label="item.type" :value="item.type"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" class="filter-button" @click="filter">筛选</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import api from '@/api'
    import store from '@/views/Home/store'

    export default {
        name: "Search",
        data () {
            return {
                keyword: '',
                conditions: {
                    kind: [
                        {type: '类别1'},
                        {type: '类别2'},
                        {type: '类别3'}
                    ],
                    class: [
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
                    ],
                    other: [
                        {type: '其它1'},
                        {type: '其它2'},
                        {type: '其它3'}
                    ]
                },
                selected: {
                    kind: '',
                    class: '',
                    teacher: '',
                    time: '',
                    other: ''
                },
            }
        },
        methods: {
            search () {
                api.searchByKeyword({keyword: this.keyword}).then(res => {
                    store.commit('addCourses', res.data)
                });
            },
            filter () {
                api.searchByCondition(this.selected).then(res => {
                    store.commit('addCourses', res.data)
                });
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
