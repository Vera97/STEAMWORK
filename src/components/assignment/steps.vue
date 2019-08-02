<template>
  <div id="periods">
    <!--        <p>3D打印 课时1 #写下你的标题#</p>-->
    <div v-for="item in steps" :key="item.stepId">
      <el-button type="primary" plain class="periods-length" @click="getStep($event, item)">{{ item.title }}
      </el-button>
    </div>
    <div>
      <el-button type="primary" plain class="periods-length">……</el-button>
    </div>
    <div>
      <el-button type="primary" class="periods-length">资源下载</el-button>
    </div>
  </div>
</template>

<script>
    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'

    export default {
        name: 'steps',
        props: {
            steps: Array
        },
        data () {
            return {
            }
        },
        methods: {
            getStep(e, step) {
                store.commit('assignment/ADD_STEP',step);
                utils.request({
                    invoke: api.requestCourseSteps,
                    params: {
                        code: 'step_contents',
                        stepId: step.stepId
                    },
                    result: fakeData.STEP_CONTENT
                })
                        .then(res => {
                            store.commit('assignment/ADD_CONTENT', res.data.html)
                        })
            }
        }
    }
</script>

<style scoped>
  .periods-length {
    width: 90%;
    text-align: center;
    margin: 0.9%;
  }
</style>
