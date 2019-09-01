<template>
  <el-card class="card" :body-style="{padding: '.5em'}">
    <div class="close">
      <i class="el-icon-error" @click="removePPT"></i>
      <a :href="src" target="_blank"><i class="el-icon-zoom-in next" title="点击查看原图"></i></a>
    </div>
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
                this.$emit('delete-ppt');
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

  .close {
    position: relative;
    width: 0;
    height: 0;
    left: -.5em;
    top: -.5em;

    i {
      position: absolute;
      cursor: pointer;
    }

    &:nth-child(1) {
      color: #ff0747;
    }

    .next {
      color: #000;
      left: 1em;
      font-weight: bolder;
    }
  }
</style>

