<template>
  <el-card :body-style="{ padding: '0px' }">
    <div style="padding: 14px;">
      <div class="caption">{{title}}</div>
      <div class="bottom">
        <div class="info">{{introduction}}</div>
        <div class="link" @click="jump">查看详情</div>
      </div>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "Course-cell",
        props: ['title', 'introduction', 'id'],
        methods: {
            jump (e) {
                e.preventDefault();

                this.$router.push({
                    name: 'course',
                    params: {
                        courseId: 123
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
  .info{
    color:#CCCCCC;
    font-size: .9em;
    margin: 1em 0;
  }

  .el-card {
    text-align: center;
  }

  .link {
    color: #2aabd2;
    cursor: pointer;
    font-size: .9em;
  }

  .link:hover {
    text-decoration: underline;
  }

  .caption {
    font-size: 1.2em;
  }
</style>
