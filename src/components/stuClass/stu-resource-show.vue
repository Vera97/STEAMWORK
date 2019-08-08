<template>
  <div>
    <video class="videoPlay" controls>
      <source src="video" type="videoType">
    </video>
  </div>
</template>

<script>
    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'
    export default {
        name: "stu-resource-show",
        props: ['exerciseId','stuId'],
        computed: {
            video() {
                return store.state.stuClass.exerciseMedia.mediaUrl
            }
        },
        data() {
            return {
                videoType: ''
            }
        },
        methods: {
            getType(index) {
                this.videoType = "video/" + index
            }
        },
        created() {
            utils.request({
                invoke: api.requestGetCourseExerciseMedia,
                params: {
                    stuId: this.stuId,
                    exerciseId: this.exerciseId
                },
                result: fakeData.EXERCISE_RESOURCE
            })
                .then(res => {
                    store.commit('stuClass/PLAY_RESOURCE', res.data);
                    this.getType(res.data.fileType);
                });
        }
    }
</script>

<style scoped>
  .videoPlay {
    margin-top: 10px;
    width: 100%;
    height: 400px;
  }
</style>