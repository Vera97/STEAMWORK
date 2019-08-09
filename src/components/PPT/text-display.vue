<template>
  <el-card
          class="box-card3 text-center"
  >
    <p><strong>编辑文本</strong></p>
    <el-input type="textarea"
              :rows="6"
              placeholder="请输入您要编辑的内容"
              v-model="textContent">
    </el-input>
    <el-button type="primary" @click="saveActivity">保存</el-button>
    <el-button type="danger" @click="deleteActivity">删除</el-button>
  </el-card>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'

    export default {
        name: "text-display",
        props: {
            exerciseId: Number,
            pptId: Number,
            pptPage: Number
        },
        data () {
            return {
                textContent: ''
            }
        },
        methods: {
            saveActivity() {
                if(this.exerciseId === null) {
                    utils.request({
                        invoke: api.requestNewExerciseText,
                        params: {
                            pptId: this.pptId,
                            pptPage: this.pptPage,
                            type: '文本播放',
                            content: this.textContent,
                        },
                        result: fakeData.NEW_TEXT
                    }).then(res => {
                        if(res.data.code === 1) {
                            this.$message.success('成功保存！')

                        } else {
                            this.$message.error('保存失败！')
                        }
                    });
                } else {
                    utils.request({
                        invoke: api.requestEditExerciseText,
                        params: {
                            exerciseId: this.exerciseId,
                            content: this.textContent
                        },
                        result: fakeData.EDIT_TEXT
                    })
                        .then((function (res) {
                            if(res.data.code === 1) this.$message.success('保存成功');
                            else this.$message.error('保存失败')
                        }).bind(this))
                }
            },
            deleteActivity() {
                this.$emit('delete-activity', {exerciseId: this.exerciseId})
            }
        },
        created() {
            if(this.exerciseId !== undefined) {
                utils.request({
                    invoke: api.requestExerciseText,
                    params: {
                        exerciseId: this.exerciseId
                    },
                    result: fakeData.EXERCISE_TEXT
                })
                    .then((function (res) {
                        this.textContent = res.data.content
                    }).bind(this))
            } else {
                console.log('exercise undefined')
            }
        }
    }
</script>

<style scoped>
  .box-card3 {
    margin-bottom: 5%;
  }

  .el-button {
    margin-top: 1em;
  }
</style>
