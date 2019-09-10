<template>
  <div>
  <div v-if="isSelect">
    <el-card class="tip">请选择课程</el-card>
  </div>
  <div v-else>
    <el-tag v-for="(item,index) in selectData" :key="index" class="tag">{{item.labelName}}<i class="el-icon-close" @click="del(item,index)"></i></el-tag>
    <el-button type="primary" class="addLabel" @click="newAdd" size="medium">新增标签</el-button>
  </div>
    <div v-if="upLoad">
      <VueUeditorWrap v-model="stepContent" :config="myConfig"></VueUeditorWrap>
<!--    <div class="content">-->
<!--      <el-input-->
<!--              type="textarea"-->
<!--              :rows="10"-->
<!--              placeholder="请输入内容"-->
<!--              v-model="stepContent">-->
<!--      </el-input>-->
<!--    </div>-->

<!--    <div>-->
<!--      <media-uploader class="uploader"></media-uploader>-->
<!--    </div>-->
    <div>
      <el-button class="button" type="primary" round @click="conserve">保存</el-button><el-button  class="button" type="danger" round>取消</el-button>
    </div>
  </div>
  <el-dialog title="addLabel" :visible.sync="dialogVisible">
    <div v-for="(item,index) in temp" :key="index">
      <el-checkbox :label="item.labelName" v-model="item.isChecked" border></el-checkbox>
    </div>
    <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add">确 定</el-button>
          <el-button @click="dialogVisible = false" type="danger">取 消</el-button>
        </span>
  </el-dialog>
  </div>
</template>

<script>
    import {api, fakeData} from '../../api'
    import utils from '../../utils'
    // import mediaUploader from '../../upload/media-uploader'
    import VueUeditorWrap from "vue-ueditor-wrap";



    export default {
        name: "resource-content",
        components: {VueUeditorWrap},
        props:{
            courseId:Number,
            courseName:String,
            courseSectionId: Number,
            courseSectionName: String,
            stepId:Number,
            stepName:String,
            isSelect:Boolean,
            selectData:Array
        },
        data(){
            return{
                allLabel:[],
                temp:[],
                dialogVisible:false,
                isHave:-1,
                upLoad:false,
                stepContent:'',
                msg: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定</h2>',
                myConfig: {
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 初始容器高度
                    initialFrameHeight: 372,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                    // serverUrl: 'http://35.201.165.105:8000/controller.php',
                    // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                    // UEDITOR_HOME_URL: '/static/UEditor/'
                }
            }
        },
        methods:{
            conserve(){
                utils.request({
                    invoke: api.requestEditCourseSectionStep,
                    params: {
                        courseStepId: this.stepId,
                        stepName: this.stepName,
                        stepContent: this.stepContent,
                    },
                    result: fakeData.SECTION_STEP
                }).then(res => {
                    if (res.data.code === 1) {
                        alert("保存成功！");
                    }
                });
            },
            getStep(){
                this.upLoad=true;
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
                    if (res.data.code === 1) {//66
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
                console.log(that.temp);
                for(let i=0;i< that.temp.length;i++){
                    if(that.temp[i].isChecked){
                        utils.request({

                            invoke: api.requestAssignLabel,
                            params: {
                                labelId: that.temp[i].labelId,
                                courseId:that.courseId
                            },
                            //result: fakeData.GET_LABEL_LIST
                        }).then(res=>{
                            if(res.data.code===1){
                                console.log('标签添加成功！！');
                            }
                        });
                        that.selectData.push(that.temp[i]);
                    }
                }
                that.temp=[];
                that.dialogVisible=false;
            },
            del(item,index){
                this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    utils.request({
                        invoke: api.requestAssignedRemove,
                        params: {
                            labelId:item.labelId,
                            courseId: this.courseId,
                        },
                        //result: fakeData.REMOVE_COURSE_LABEL
                    }).then(res => {
                        if(res.data.code===1){
                            this.selectData.splice(index,1);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });
                });
            },
        }

    }
    // let editor = new VueUeditorWrap.ui.Editor({ initialFrameHeight:100,initialFrameWidth:400 });
    // editor.render("myEditor");
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
    margin-top:0.7%;
    margin-bottom: 0.7%;
  }
  .tip{
    padding:15em;
    text-align:center;
  }
  .content{
    margin-top:1%;
  }

  .uploader {
    width: 100%;
  }
  /*.ueditor{*/
  /*  height: 1500px;*/
  /*}*/
</style>
