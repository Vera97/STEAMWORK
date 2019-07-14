<template>
    <el-container>
        <el-header><Nav></Nav></el-header>
          <el-main class="w">
             <el-row :gutter="0">
                 <el-col :span="5"><Coursedirectory></Coursedirectory></el-col>
                 <el-col :span="18"  style="float:right;">
                     <el-button type="primary" style="margin-bottom:2%;">上传课件（上传ppt/pdf,上传后自动解析成如下幻灯片）</el-button>
                     <el-upload
                             class="upload-demo"
                             action="https://jsonplaceholder.typicode.com/posts/"
                             :on-preview="handlePreview"
                             :on-remove="handleRemove"
                             :before-remove="beforeRemove"
                             multiple
                             :limit="3"
                             :on-exceed="handleExceed"
                             :file-list="fileList">
                     </el-upload>
                     <PPTshow></PPTshow>
                     <el-button type="primary" style="margin-bottom:2%;margin-top:2%;">上传相关学习资源（上传后将出现在学生端“课程资源”处）</el-button>
                     <a href="#" class="ll">导出内容</a>
                     <el-upload
                             class="upload-demo"
                             action="https://jsonplaceholder.typicode.com/posts/"
                             :on-preview="handlePreview"
                             :on-remove="handleRemove"
                             :before-remove="beforeRemove"
                             multiple
                             :limit="3"
                             :on-exceed="handleExceed"
                             :file-list="fileList">
                     </el-upload>
                 </el-col>
             </el-row>
          </el-main>
        <el-footer><Footer></Footer></el-footer>
    </el-container>

</template>

<script>
    import Nav from "../../components/Nav";
    import Coursedirectory from "../../components/Coursedirectory";
    import PPTshow from "../../components/PPT/PPTshow";
    import Footer from "../../components/Footer";
    export default {
        name: "PPT",
        components: {PPTshow ,Coursedirectory, Nav, Footer},
        props: [
            'id'
        ],
        data() {
            return {
                name:'PPT',
                fileList: []
            };
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
    }

</script>

<style scoped>
    *{
        margin-left: 0px;
        margin-right: 0px;
        padding-left: 0px;
        padding-right: 0px;
    }
  .ll{
      float:right;
      margin-top:20px;
  }
    .w{
        margin-left: 10px;
        margin-right: 10px;
    }
    .upload-demo{
        margin-bottom:10px;
        float-offset:2%
    }
</style>