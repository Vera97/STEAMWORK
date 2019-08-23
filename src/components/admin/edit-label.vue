<template>
  <div class="overlay">
    <h2 class="title">{{type}}</h2>
    <div class="content">
      <el-form v-model="list">
        <el-form-item label="labelName" prop="list.labelName">
          <el-input type="text" v-model="list.labelName" auto-complete="off"></el-input>
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
        name: "edit-label",
        props: ['list','type'],
        methods: {
            cancel(){
                this.$emit('changeOverlay');
            },
            save(list){
                if(this.type==='edit'){//缺少修改标签api
                    utils.request({
                        invoke: api.requestAddLabel,
                        params: {
                            labelName:list.labelName
                        },
                        result: fakeData.ADD_LABEL
                    }).then(res=>{
                        if(res.data.code===1){
                            this.$emit('modify',list);
                        }
                    });
                }
                else if(this.type==='add'){
                    utils.request({
                        invoke: api.requestAddLabel,
                        params: {
                            labelName:list.labelName
                        },
                        result: fakeData.ADD_LABEL
                    }).then(res=>{
                        if(res.data.code===1){
                            this.$set(list,'labelId',res.data.labelId);
                            this.$emit('modify',list);
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>