<template>
  <div class="main">
    <div v-for="(item,index) in exercise" :key="item.exerciseId" class="button-box">
      <el-button type="primary" plain style="width: 100%;margin-bottom:10px" @click="emitIndex(item)">
        {{'启动活动'+index+':'+item.type}}
      </el-button>
    </div>
    <el-button type="primary" plain style="width: 100%">……</el-button>
  </div>
</template>
<script>
    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'

    export default {
        name: "start-activities",
        data () {
            return {
                pptId: null,
                pptPage: null
            }
        },
        computed:
            {
                exercise() {
                    return store.state.startClass.exerciseList;
                }
            },
        methods: {
            emitIndex(index) {
                this.$emit('onEmitIndex', index)
            },
            getExercise (pptId, pptPage) {
                this.pptId = pptId;
                this.pptPage = pptPage;
                utils.request({
                    invoke: api.requestExercise,
                    params: {
                        pptId: this.pptId,
                        page: this.pptPage
                    },
                    result: fakeData.EXERCISE_LIST
                }).then(res => {
                    store.commit('startClass/ADD_EXERCISE', res.data.exerciseList)
                });
            }
        }
    }
</script>

<style scoped>
  .main {
    height: 200px;
    overflow: auto;
  }

  .button-box {
    margin: 2px 0;
    text-align: center;
  }
</style>
