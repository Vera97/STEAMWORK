<template>
  <div>
    <p>{{exerciseBody.content}}</p>
  </div>
</template>

<script>
    import store from '../../store'

    export default {
        name: "stu-text-show",
        props: {
            exerciseBody: Object
        },
        computed: {
            text() {
                return store.state.stuClass.exerciseText.content
            }
        }
    }
</script>

<style scoped>
</style>
