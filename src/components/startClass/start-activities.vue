<template>
  <div class="main">
    <div v-for="(item,index) in exercise" :key="item.exerciseId" class="button-box">
      <el-button type="primary" plain style="width: 100%;margin-bottom:10px" @click="emitIndex(item)">
        {{'启动活动'+index+':'+item.title}}
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
        props: {
            pptId: Number,
            pptPage: Number
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
            getExercise () {
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
    margin: 2px;
    text-align: center;
  }
</style>
