<template>
  <el-container>
    <el-header>
      <Nav active-index="3"></Nav>
    </el-header>
    <el-main class="main-box">
      <el-row :gutter="0">
        <!--,对应图片左侧classList为左侧班级列表 -->
        <el-col :span="4" class="class-list">
          <el-button type="primary" class="button" @click="open"> + 创建班级</el-button>
          <class-list :show-section="false" :show-options="true" @course-selected="render" ref="classList"></class-list>
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
                this.$prompt('班级名称:', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(res => {
                    if(res.action === 'confirm') {
                        utils.request({
                            invoke: api.requestAlterClassList,
                            params: {
                                code: 'class_list_add',
                                teacherId: parseInt(store.state.teacherId),
                                className: res.value
                            },
                            result: fakeData.ALTER_CLASS_RESPONSE
                        })
                            .then((function(res) {
                                // successfully added a class, so the class list ought to be updated.
                                if(res.data.code === 1) {
                                    this.$message.success('修改成功');
                                    this.$refs.classList.addCourse({
                                        classId: res.data.class.classId,
                                        className: res.data.class.className,
                                        createDate: res.data.class.createDate,
                                        courseDetail: []
                                    })
                                }
                                else this.$message.error('修改失败')
                            }).bind(this))
                    }
                })
            },
            render(classId, courseId) {
                this.$refs.rStuList.render(classId, courseId);
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
  .class-list {
    margin-left: 20px;
  }
  .button {
    margin-bottom: 10px;
    width: 100%;
  }
  .el-footer {
    padding: 0;
  }
  .main-box{
    min-height: 715px;
  }
</style>