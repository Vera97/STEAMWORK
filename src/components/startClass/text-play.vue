<template>
  <div>
    <p>{{text}}</p>
  </div>
</template>

<script>
    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'
    export default {
        name: "text-show",
        props: {
            exercise: Object
        },
        computed: {
            text() {
                return store.state.startClass.exerciseText.content
            }
        },
        created(){
            utils.request({
                invoke: api.requestExerciseText,
                params: {
                    exerciseId: this.exercise.exerciseId
                },
                result: fakeData.EXERCISE_TEXT
            })
                .then(res => {
                    store.commit('startClass/TEXT_RESOURCE', res.data);
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
