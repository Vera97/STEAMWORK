<template>
  <div>
  <div v-if="isSelect">
    <el-card class="tip">请选择课程</el-card>
  </div>
  <div v-else>
    <el-tag v-for="(item,index) in selectData" :key="index" class="tag">{{item.labelName}}<i class="el-icon-close" @click="del(index)"></i></el-tag>
    <el-button type="primary" class="addLabel" @click="newAdd">新增标签</el-button>
  </div>
    <div v-if="upLoad">
    <div class="content">
      <el-input
              type="textarea"
              :rows="10"
              placeholder="请输入内容"
              v-model="stepContent">
      </el-input>
    </div>
    <div>
      <pptUpload></pptUpload>
    </div>
    <div>
      <el-button class="button" type="primary" round @click="conserve">保存</el-button><el-button  class="button" type="primary" round>取消</el-button>
    </div>
  </div>
  <el-dialog title="addLabel" :visible.sync="dialogVisible">
    <div v-for="(item,index) in temp" :key="index">
      <el-checkbox :label="item.labelName" v-model="item.isChecked" border></el-checkbox>
    </div>
    <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
  </el-dialog>
  </div>
</template>

<script>
    import {api, fakeData} from '../../api'
    import utils from '../../utils'
    import pptUpload from '../PPT/ppt-upload'
    export default {
        name: "try-2",
        components:{pptUpload},
        props:{
            courseId:Number,
            courseName:String,
            courseSectionId: Number,
            courseSectionName: String,
            stepId:Number,
            stepName:String,
            isSelect:Boolean,
        },
        data(){
            return{
                selectData:[],
                allLabel:[],
                temp:[],
                dialogVisible:false,
                isHave:-1,
                upLoad:false
            }
        },
        methods:{
            getLabel() {
                utils.request({
                    invoke: api.requestAssignedGet,
                    params: {
                        courseId:this.courseId
                    },
                    result: fakeData.GET_LABEL_HAVE
                }).then(res => {
                    if (res.data.code === 1) {
                        this.selectData = res.data.labelList;
                    }
                });
            },
            getStep(){
                this.upLoad=true;
                this.$refs.upload.inject();
            },
            newAdd(){
                this.dialogVisible=true;
                let that=this;
                utils.request({
                    invoke: api.requestGetLabelList,
                    params: {
                        adminId: 10
                    },
                    result: fakeData.GET_LABEL_LIST
                }).then(res => {
                    if (res.data.code === 1) {
                        that.allLabel = res.data.labelList;
                        for(let i=0;i<that.allLabel.length;i++){
                            this.$set(that.allLabel[i],'isChecked',false);
                            for(let j=0;j<that.selectData.length;j++){
                                this.$set(that.selectData[j],'isChecked',false);
                                if(that.selectData[j].labelId===that.allLabel[i].labelId){
                                    that.isHave=1;
                                }
                            }
                            if(that.isHave===-1){
                                that.temp.push(that.allLabel[i]);
                            }
                            that.isHave=-1;
                        }
                    }
                });
            },
            add(){
                let that=this;
                for(let i=0;i< that.temp.length;i++){
                    if(that.temp[i].isChecked){
                        that.selectData.push(that.temp[i]);
                    }
                }
                that.temp=[];
                that.dialogVisible=false;
            },
            del(index){
                utils.request({
                    invoke: api.requestAssignedRemove,
                    params: {
                        adminId: 10
                    },
                    result: fakeData.REMOVE_COURSE_LABEL
                }).then(res => {
                    if(res.data.code===1){
                        this.selectData.splice(index,1)
                    }
                });
            }
        }
    }
</script>

<style scoped>
  .button-box{
    margin-top: 1%;
    width: 100%;
  }
  .button{
    margin-top: 1%;
    float: right;
    margin-left: 2%;
  }
  .tag {
    margin-right: 2%;
  }
  .select{
    margin-bottom:2%;
    float:right;
  }
  .addLabel{
    margin-right:1em;
  }
  .tip{
    padding:15em;
    text-align:center;
  }
  .content{
    margin-top:1%;
  }
</style>