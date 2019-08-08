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
        name: "stu-text-show",
        props:[
            'stuId', 'exerciseId'
        ],
        computed:{
            text(){
                return store.state.stuClass.exerciseText.content
            }
        },
        created(){
            // let that = this;
            utils.request({
                invoke: api.requestGetCourseExerciseText,
                params: {
                    stuId: this.stuId,
                    exerciseId:this.exerciseId
                },
                result: fakeData.EXERCISE_TEXT
            })
                .then(res => {
                    if(fakeData.EXERCISE_TEXT.code === 1){
                        // console.log(res.data);
                        store.commit('stuClass/TEXT_RESOURCE', res.data);
                    }
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