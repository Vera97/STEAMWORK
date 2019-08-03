<template>
    <div>
    <video class="video" controls>
    <source src="video.mediaUrl" type="video.type">
    </video>
    </div>
</template>

<script>
  import store from '../../store'
  import {api, fakeData} from '../../api'
  import utils from '../../utils'
  export default {
    name: "resource-show",
    props:['exerciseId'],
    computed:{
       video(){
         return store.state.startClass.exerciseMedia
       }
    },
    created(){
      utils.request({
        invoke: api.requestExerciseMedia,
        params: {
          exerciseId:this.exerciseId
        },
        result: fakeData.EXERCISE_RESOURCE
      })
          .then(res => {
            store.commit('startClass/PLAY_RESOURCE', res.data);
            console.log(res.data);
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