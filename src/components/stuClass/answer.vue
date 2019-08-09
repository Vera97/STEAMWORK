<template>
  <div class="wrapper">
    <div class="type">【{{ type }}】</div>
    <p>{{ stem }}</p>
    <div class="option" v-for="(item, index) in options" :key="index">
      <el-radio :label="index" v-model="checked">{{ item }}</el-radio>
    </div>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
    export default {
        name: "answer",
        data () {
            return {
                type: '单选题',
                stem: '灰太狼的老婆叫什么名字？',
                options: [
                    '紫太狼',
                    '粉太狼',
                    '红太狼',
                    '绿太狼'
                ],
                checked: null
            }
        },
        methods: {
            submit() {
                alert('谢谢作答')
            }
        }
    }
</script>

<style scoped>
  .wrapper {
    height: 100%;
    position: relative;
  }

  .type {
    margin: 2em 0;
  }

  .option {
    margin: 1em 0;
  }

  .el-button {
    margin: 1em auto;
    width: 5em;
    text-align: center;
    position: relative;
    display: block;
  }

  p {
    font-size: 1.2em;
  }
</style>
