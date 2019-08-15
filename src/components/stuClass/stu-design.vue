<template>
  <div>
    <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="textarea">
    </el-input>
    <el-button type="primary" class="button" @click="refresh">确认完成</el-button>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'
    export default {
        name: "stu-design",
        data() {
            return{
                textarea:'',
            }
        },
        props: {
            complete: {
                type: Function,
                default: null
            },
            currentExercise:Object//可从中获取当前活动的id
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
                        if (res.data.code === 1) {
                            alert("上传设计方案成功！");
                            this.complete();
                        }
                    });
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
