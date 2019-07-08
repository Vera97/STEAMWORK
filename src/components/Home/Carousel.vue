<template>
  <el-carousel :interval="4000" type="card">
    <el-carousel-item v-for="item in 6" :key="item">
      <h3 class="medium">{{item}}</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
    import '../../assets/script/jquery-3.3.1.min'
    import '../../assets/script/Cooldog'

    export default {
        name: "Carousel",
        data () {
            return {
                courses: [
                    {
                        title: '课程1'
                    },
                    {
                        title: '课程2'
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-carousel {
    width: 80%;
    margin: 0 auto;
  }
</style>
