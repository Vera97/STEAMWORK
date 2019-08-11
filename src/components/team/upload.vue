<template>
  <div class="content">
    <el-card class="box-card">
      <p>{{group}}</p>
      <el-button type="primary" @click="open1" class="button1">
        提交
      </el-button>
    </el-card>
  </div>
</template>

<script>
    import store from '../../store'
    
    export default {
        name: "upload",
        methods: {
            open1() {
                alert('假装提交成功')
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        },
        computed:{
            group(){
                return store.state.team.group;
            }
        },
        data(){
            return {
                studentID:'学生ID',
                member:'XX,XXX,XXX,XXX',
                fileList:[]
            };
        },
    }
</script>

<style scoped>
  .title {
    text-align: center;
    margin-bottom: 100px;
  }

  .tip {
    text-align: center;
    margin-bottom: 200px;
  }

  .button1 {
    margin-left: 15%;
    width: 15%;
    margin-bottom: 5px;
  }

  .button2 {
    width: 55%;
    margin-bottom: 5px;
  }
</style>
