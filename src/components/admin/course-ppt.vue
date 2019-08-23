<template>
  <el-card class="card" :body-style="{padding: '.5em'}">
    <div class="el-icon-close" @click="removePPT"></div>
    <div class="text-center">
      <img class="image" :src="src" alt="you didn't see me">
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "course-ppt",
        props: {
            src: String
        },
        methods:{
            removePPT(){
                this.$emit('deletePPT');
            }
        }
    }
</script>

<style scoped lang="scss">
  .info {
    color: #CCCCCC;
  }

  .card {
    height: 30%;
    width: 100%;

    .image {
      width: 100%;
      height: 100%;
    }
  }
  .el-icon-close{
    float:right;
  }
</style>

