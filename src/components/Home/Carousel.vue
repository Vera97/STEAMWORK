<template>
  <div class="Cooldog_container">
    <div class="row category-box-row1">
      <div class="Cooldog_content">
        <ul>
          <li v-for="item in courses" class="p1" v-bind:key="item.title">
            <div class="col-md-4">
              <a href="videos-grid.htm" class="category-box-item1">
                <i class="fa fa-cogs fa-5x"></i>
                <h2>{{ item.title }}</h2>
              </a>
            </div>
          </li>
<!--          <li class="p1">-->
<!--            <div class="col-md-4">-->
<!--              <a href="videos-grid.htm" class="category-box-item1">-->
<!--                <i class="fa fa-cogs fa-5x"></i>-->
<!--                <h2>科目七</h2>-->
<!--              </a>-->
<!--            </div>-->
<!--          </li>-->
<!--          <li class="p2">-->
<!--            <div class="col-md-4">-->
<!--              <a href="videos-grid.htm" class="category-box-item1">-->
<!--                <i class="fa fa-cogs fa-5x"></i>-->
<!--                <h2>科目六</h2>-->
<!--              </a>-->
<!--            </div>-->
<!--          </li>-->
<!--          <li class="p3">-->
<!--            <div class="col-md-4">-->
<!--              <a href="videos-grid.htm" class="category-box-item1">-->
<!--                <i class="fa fa-cogs fa-5x"></i>-->
<!--                <h2>科目五</h2>-->
<!--              </a>-->
<!--            </div>-->
<!--          </li>-->
<!--          <li class="p4">-->
<!--            <div class="col-md-4">-->
<!--              <a href="videos-grid.htm" class="category-box-item1">-->
<!--                <i class="fa fa-cogs fa-5x"></i>-->
<!--                <h2>科目四</h2>-->
<!--              </a>-->
<!--            </div>-->
<!--          </li>-->
<!--          <li class="p5">-->
<!--            <div class="col-md-4">-->
<!--              <a href="videos-grid.htm" class="category-box-item1">-->
<!--                <i class="fa fa-cogs fa-5x"></i>-->
<!--                <h2>科目三</h2>-->
<!--              </a>-->
<!--            </div>-->
<!--          </li>-->
<!--          <li class="p5">-->
<!--            <div class="col-md-4">-->
<!--              <a href="videos-grid.htm" class="category-box-item1">-->
<!--                <i class="fa fa-cogs fa-5x"></i>-->
<!--                <h2>科目二</h2>-->
<!--              </a>-->
<!--            </div>-->
<!--          </li>-->
<!--          <li class="p5">-->
<!--            <div class="col-md-4">-->
<!--              <a href="videos-grid.htm" class="category-box-item1">-->
<!--                <i class="fa fa-cogs fa-5x"></i>-->
<!--                <h2>科目一</h2>-->
<!--              </a>-->
<!--            </div>-->
<!--          </li>-->
        </ul>
      </div>
    </div>
    <a href="javascript:;" class="btn_left">
      <i class="iconfont icon-zuoyoujiantou"></i>
    </a>
    <a href="javascript:;" class="btn_right">
      <i class="iconfont icon-zuoyoujiantou-copy-copy"></i>
    </a>
  </div>
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

<style scoped>
  @import '../../assets/css/Cooldog.css';
  @import '../../assets/css/iconfont.css';
</style>
