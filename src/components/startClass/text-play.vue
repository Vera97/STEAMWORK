<template>
    <div>
        <p>{{text}}</p>
        <div><p>nihao</p></div>

    </div>
</template>

<script>
  import store from '../../store'
  import {api, fakeData} from '../../api'
  import utils from '../../utils'
  export default {
    name: "text-show",
    props:['exerciseId'],

    computed:{
      text(){
        return store.state.startClass.exerciseText.content
      }
    },
    created(){
      // let that = this;
      utils.request({
        invoke: api.requestExerciseText,
        params: {
          exerciseId:this.exerciseId
        },
        result: fakeData.EXERCISE_TEXT
      })
        .then(res => {
          console.log(res.data);
          alert(res.data.content);
          store.commit('startClass/TEXT_RESOURCE', res.data);
          // that.text = [];
          // that.text.push(...res.data)
        })
    }
  }
</script>

<style scoped>
    .video{
        margin-top:10px;
        width:100%;
        height:400px;
    }
</style>