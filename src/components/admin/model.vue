<template>
  <div class="overlay">
    <h2 class="title">{{type}}</h2>
    <div class="content">
      <el-form v-model="list">
        <el-form-item label="Name" prop="list.name">
          <el-input type="text" v-model="list.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="list.password">
          <el-input type="text" v-model="list.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Sex" prop="list.sex">
          <el-radio-group v-model="list.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="IntroduceHtml" prop="list.introduceHtml">
          <el-input type="textarea" v-model="list.introduceHtml" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save(list)">保存</el-button>
          <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
    import {api, fakeData} from '../../api'
    import utils from '../../utils'

    export default {
        name: "model",
        props: ['list','type'],
        methods: {
            cancel(){
                this.$emit('changeOverlay');
            },
            save(list){
                if(this.type==='Edit'){
                    utils.request({
                        invoke: api.requestEditTeacher,
                        params: {
                            teacherId: 0,
                            //不需要修改的字段设为0
                            name: list.name,
                            password:list.password,
                            sex: list.sex,
                            introduceHtml: list.introduceHtml
                        },
                        result: fakeData.EDIT_TEACHER
                    }).then(res=>{
                        if(res.data.code===1){
                            this.$emit('modify',list);
                        }
                    });
                }
                else if(this.type==='Add'){
                    utils.request({
                        invoke: api.requestAddTeacher,
                        params: {
                            name: '',
                            password: '',
                            sex: '',
                            introduceHtml: '',
                        },
                        result: fakeData.ADD_TEACHER
                    }).then(res => {
                        if(res.data.code === 1){
                            alert('保存成功');
                            this.$set(list,'id',res.data.teacherId);
                            console.log(list);
                            this.$emit('modify',list);
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>