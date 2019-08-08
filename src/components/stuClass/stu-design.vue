<template>
  <div>
    <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="textarea">
    </el-input>
    <el-button class="button" @click="refresh" type="primary">点击上传后确认完成</el-button>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'

    export default {
        name: "stu-design",
        data() {
            return{
                textarea:''
            }
        },
        methods: {
            refresh() {
                utils.request({
                    invoke: api.requestUploadCourseExerciseDesign,
                    params: {
                        stuId: this.stuId,
                        designContent: this.textarea
                    },
                    result: fakeData.EXERCISE_DESIGN
                })
                    .then(res => {
                        if(res.data.code === 1){
                            alert("上传设计方案成功！");
                        }
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
  .outer-most {
    text-align: left;

    div {
      margin-bottom: 10px;
    }
  }
  .button{
    float:left;
    margin-top:10px;
  }
</style>
