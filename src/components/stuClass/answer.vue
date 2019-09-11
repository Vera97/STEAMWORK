<template>
  <div class="wrapper">
    <div class="type">【{{ type }}】</div>
    <p>{{ stem }}</p>
    <div class="option" v-for="(item, index) in options" :key="index">
      <el-radio :label="alpha[index]" v-model="checked">{{ item }}</el-radio>
    </div>
  </div>
</template>

<script>
    import store from '../../store'
    import utils from '../../utils'
    import {api, fakeData} from '../../api'

    export default {
        name: "answer",
        props: {
            exerciseBody: Object
        },
        data () {
            return {
                type: '单选题',
                stem: '灰太狼的老婆叫什么名字？',
                options: [
                    '紫太狼',
                    '粉太狼',
                    '红太狼',
                    '绿太狼'
                ],
                alpha: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
                checked: null
            }
        },
        methods: {
            complete () {
                console.log(this.checked);
                utils.request({
                    invoke: api.requestUploadCourseExerciseQuestion,
                    params: {
                        stuId: store.state.stuId,
                        courseSectionId: store.state.courseSectionId,
                        exerciseId: this.exerciseBody.exerciseId,
                        answerList: [this.checked]
                    },
                    result: fakeData.SINGLE_NUMBER_CODE
                })
            }
        }
    }
</script>

<style scoped>
  .wrapper {
    height: 100%;
    position: relative;
  }

  .type {
    margin: 2em 0;
  }

  .option {
    margin: 1em 0;
  }
  .button{
    float:right;
    margin-top:10px;
  }

  p {
    font-size: 1.2em;
  }
</style>
