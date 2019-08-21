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
  </el-card>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'

    export default {
        name: "text-display",
        props: {
            exerciseId: Number,
        },
        data () {
            return {
                textContent: ''
            }
        },
        methods: {
            saveActivity() {
                utils.request({
                    invoke: api.requestEditExerciseText,
                    params: {
                        exerciseId: this.exerciseId,
                        content: this.textContent
                    },
                    result: fakeData.EDIT_TEXT
                })
                    .then((function (res) {
                        if (res.data.code === 1) this.$message.success('保存成功');
                        else this.$message.error('保存失败')
                    }).bind(this))
            }
        },
        created() {
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
