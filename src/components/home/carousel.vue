<template>
  <el-carousel :interval="4000" type="card">
    <el-carousel-item v-for="item in courses" :key="item.courseId">
      <h3>{{item.title}}</h3>
      <p>{{item.introduce}}</p>
      <div class="link"><router-link :to="{name: 'course', params: {courseId: item.courseId}}">查看详情</router-link></div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
    import store from '../../store'

    export default {
        name: "carousel",
        computed: {
            courses () {
                return store.state.home.courses
            }
        },
        data () {
            return {}
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

    /*.link {*/
    /*  color: #000;*/
    /*  cursor: pointer;*/
    /*  font-size: .9em;*/

    /*  &:hover {*/
    /*    text-decoration: underline;*/
    /*  }*/
    /*}*/
  }
</style>
