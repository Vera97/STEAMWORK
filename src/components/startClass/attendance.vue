<template>
  <div class="outer-most">
    <div>已到学生人数：{{ arrivedNumber }}</div>
    <div>未到学生：</div>
    <el-button
            type="plain"
            v-for="item in absentList"
            :key="item.stuId"
            size="medium"
    >
      {{ `${item.stuName}(${item.stuNumber})` }}
    </el-button>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'

    export default {
        name: "attendance",
        props: {
            classroomId: Number
        },
        data() {
            return {
                arrivedNumber: 0,
                absentList: []
            }
        },
        methods: {
            refresh() {
                utils.request({
                    invoke: api.requestAttendance,
                    params: {
                        classroomId: this.classroomId
                    },
                    result: fakeData.REQUEST_ATTENDANCE_RESPONSE
                })
                    .then((function(res) {
                        this.arrivedNumber = res.data.stuReadyList.length;
                        this.absentList = res.data.stuList.filter(item => {
                            for(let i of res.data.stuReadyList) {
                                if(i.stuId === item.stuId) return false
                            }
                            return true
                        })
                    }).bind(this))
            }
        },
        created() {
            this.refresh()
        }
    }
</script>

<style scoped lang="scss">
  .outer-most {
    text-align: left;

    div {
      margin: 1em 0;
    }
  }
</style>
