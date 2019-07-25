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
          <classList :list-data="listData"></classList>
        </el-col>
        <!-- 对应图片右侧，rstulist为右侧学生列表 -->
        <el-col :span="19" style="float:right;">
          <rStuList></rStuList>
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
                            invoke: api.requestClasses,
                            params: {
                                code: 'class_list_edit',
                                teacherId: store.state.userName
                            },
                            result: fakeData.SINGLE_CODE
                        })
                            .then(res => {
                                // successfully added a class, so the course list ought to be updated.
                                if(res.data.code === 'ok') {
                                    alert('修改成功！');
                                }
                                else alert('修改失败！')
                            })
                    }
                })
            },
            getClass() {
                let that = this;

                return utils.request({
                    invoke: api.getCourses,
                    params: {
                        code: 'class_list',
                        teacherId: store.state.userName
                    },
                    result: fakeData.CLASSES
                })
                    .then(res => {
                        /* watch out! adding attributes and array items directly after the mount
                        * cannot be caught by the el-tree, and the node tree won't be updated.
                        * so the offspring won't appear in the subtree, and the whole tree remain
                        * unchanged. so make every modification in the binding data after the mount
                        * via Array.push method, and add every attributes before the mount or use the
                        * method provided by vue. */
                        for(let i of res.data.classList) {
                            that.listData.push({...i, courseDetail: []})
                        }
                    })
            },
            // get the courses in the classes
            // grab the first course and render it
            async getSubCourses() {
                let that = this;
                let flag = false;

                for (let k = 0; k < this.listData.length; k++) {
                    let classId = this.listData[k].id.toString();

                    await utils.request({
                        invoke: api.courseDetail,
                        params: {
                            code: 'course_list',           /* need a method to get the list of courses. */
                            classId: classId
                        },
                        result: fakeData.COURSES_IN_CLASS
                    })
                        .then(res => {
                            that.listData[k].courseDetail.push(...res.data.courseList);
                        });

                    if (!flag) {
                        if(that.listData[k].courseDetail.length !== 0) {
                            flag = true;
                            let id = that.listData[k].courseDetail[0].id;

                            // use the id to fetch the list of student
                            // if currently no course has been rendered
                            if(store.state.studentsList.courseId === '') {
                                store.dispatch('studentsList/render_course', id).then()
                            }
                        }
                    }
                }
            }
        },
        async created() {
            await this.getClass();
            this.getSubCourses();
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
