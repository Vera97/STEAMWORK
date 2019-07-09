<template>
  <el-carousel :interval="4000" type="card">
    <el-carousel-item v-for="item in courses" :key="item.id">
      <h3>{{item.title}}</h3>
      <p>{{item.introduction}}</p>
      <el-link>查看详情</el-link>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
    export default {
        name: "Carousel",
        data () {
            return {
                courses: [
                    {
                        title: '课程1',
                        introduction: '我是一门好课',
                        id: '1'
                    },
                    {
                        title: '课程2',
                        introduction: '我是一门好课',
                        id: '2'
                    },
                    {
                        title: '课程3',
                        introduction: '我是一门好课',
                        id: '3'
                    },
                    {
                        title: '课程4',
                        introduction: '我是一门好课',
                        id: '4'
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

  .el-carousel {
    text-align: center;

    h3 {
      font-size: 2em;
      color: #fff;
      height: 50%;
    }

    p {
      color: #000000;
      font-size: 1em;
      height: 20%;
    }
  }
</style>
