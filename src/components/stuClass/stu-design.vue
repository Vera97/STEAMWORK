<template>
  <div>
    <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="textarea">
    </el-input>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'
    import store from '../../store'

    export default {
        name: "stu-design",
        data() {
            return{
                textarea:'',
            }
        },
        props: {
            exerciseBody: Object//可从中获取当前活动的id
        },
        methods: {
            complete() {
                utils.request({
                    invoke: api.requestUploadCourseExerciseDesign,
                    params: {
                        stuId: store.state.stuId,
                        courseSectionId: store.state.courseSectionId,
                        exerciseId: this.exerciseBody.exerciseId,
                        designContent: this.textarea
                    },
                    result: fakeData.EXERCISE_DESIGN
                })
                    .then(function(res) {
                        if (res.data.code === 1) {
                            this.$message.success('上传设计方案成功！');
                        }
                    }.bind(this));
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
    float:right;
    margin-top:10px;
  }
</style>
