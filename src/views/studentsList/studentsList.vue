<template>
  <el-container>
    <el-header>
      <Nav></Nav>
    </el-header>
    <el-main>
      <el-row :gutter="0">
        <!--,对应图片左侧classList为左侧班级列表 -->
        <el-col :span="4" class="classlist">
          <el-button type="primary" class="button" @click="open"> + 创建班级</el-button>
          <classList @course-selected="render" ref="classList"></classList>
        </el-col>
        <!-- 对应图片右侧，rstulist为右侧学生列表 -->
        <el-col :span="19" style="float:right;">
          <rStuList ref="rStuList" @change-class-list="updateClassList"></rStuList>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
    import Nav from "../../components/hd-nav";
    import Footer from "../../components/hd-footer";
    import classList  from "../../components/class-list";
    import rStuList from "../../components/studentsList/r-stu-list";

    import {api, fakeData} from '../../api';
    import store from '../../store';
    import utils from '../../utils';

    export default {
        name: "studentsList",
        components: {Footer, Nav, classList, rStuList},
        data () {
            return {
                /* ATTENTION. do not add 'name' or 'className' attributes to listData's item or its item's item. */
                listData: []
            }
        },
        methods: {
            open() {
                let that = this;

                this.$prompt('班级名称:', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(res => {
                    if(res.action === 'confirm') {
                        utils.request({
                            invoke: api.requestTeacherClasses,
                            params: {
                                code: 'class_list_edit',
                                teacherId: parseInt(store.state.userName)
                            },
                            result: fakeData.SINGLE_RESPONSE_WORD
                        })
                            .then(res => {
                                // successfully added a class, so the class list ought to be updated.
                                if(res.data.code === 'ok') {
                                    alert('修改成功！');
                                    that.$refs.classList.addCourse({
                                        id: 9989,
                                        className: 'new',
                                        createDate: '2019-01-01',
                                        courseDetail: []
                                    })
                                }
                                else alert('修改失败！')
                            })
                    }
                })
            },
            render() {
                this.$refs.rStuList.render()
            },
            updateClassList(value) {
                this.$refs.classList.addRelated(value)
            }
        }
    }
</script>

<style scoped>
    * {
        margin-left: 0;
        padding-left: 0;
    }
    .classlist{
        margin-left:20px;
    }
     .button{
        margin-bottom:10px;
         width:100%;
     }

    .el-footer {
        padding: 0;
    }
</style>
