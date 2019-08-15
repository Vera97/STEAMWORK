<template>
  <div class="wrapper">
    <div class="type">【{{ type }}】</div>
    <p>{{ stem }}</p>
    <div class="option" v-for="(item, index) in options" :key="index">
      <el-radio :label="index" v-model="checked">{{ item }}</el-radio>
    </div>
    <el-button type="primary" class="button" @click="submit">确认完成</el-button>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'
    export default {
        name: "answer",
        props: {
            complete: {
                type: Function,
                default: null
            },
            currentExercise:Object
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
                checked: null
            }
        },
        methods: {
            submit() {
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
                            alert('谢谢作答');
                            this.complete();
                        }
                    });
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
