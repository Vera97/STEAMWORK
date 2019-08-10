<template>
  <el-container>
    <el-header>
      <Nav></Nav>
    </el-header>
    <el-main>
      <el-row :gutter="75">
        <!-- 这里是课时介绍栏，应该展示相应课程的id和课时列表 -->
        <el-col :span="16">
          <Periods :title="title" :period-list="periodList"></Periods>
        </el-col>
        <!-- 这里是课程信息介绍，对应图右上角 -->
        <el-col :span="8">
          <Introduction :introduction="introduction" :src="src"></Introduction>
        </el-col>
      </el-row>
      <el-row :gutter="75">
        <!-- 相关课程，课程卡片我提取成了独立的组件，在course-cell.vue中，使用的时候传入标题，介绍，id即可。现在可以给它们随意传入一些信息，真实的标题介绍等内容以后加上 -->
        <el-col :span="16">
          <Related :related-list="relatedList"></Related>
        </el-col>
        <!-- 这里是按钮，对应图右下角 -->
        <el-col :span="8">
          <el-button type="primary" @click="toggleFav">{{ inFav ? '取消收藏' : '收藏课程' }}</el-button>
          <br>
          <el-button type="primary" @click="toggleList">{{ inList ? '从我的课程列表移出' : '另存为“我的课程”' }}</el-button>
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
    import Periods from "../../components/course/periods";
    import Introduction from "../../components/course/introduction";
    import Related from "../../components/course/related";

    import {api, fakeData} from '../../api';
    import store from '../../store';
    import utils from '../../utils';

    export default {
        name: "course",
        components: {Related, Introduction, Periods, Footer, Nav},
        props: {
            courseId: Number
        },
        data () {
            return {
                title: '',
                introduction: '',
                src: '',
                relatedId: [],
                inFav: false,
                inList: false,
                periodList: [],
                relatedList: []
            }
        },
        created () {
            let that = this;

            // judge whether the course is favorite
            if(store.getters['home/get_fav'] !== null) {
                this.inFav = store.getters['home/get_fav']
            } else {
                store.dispatch('home/get_fav_courses').then(() => {
                    that.inFav = store.getters['home/get_fav']
                })
            }

            // judge whether the course is own
            utils.request({
                invoke: api.requestTeacherOwnCourses,
                params: {
                    teacherId: store.state.teacherId
                },
                result: fakeData.TEACHER_OWN_COURSE
            })
                .then(res => {
                    for(let i of res.data.courses) {
                        if(i.courseId === store.state.cached_courseId) {
                            this.inList = true;
                            break
                        }
                    }
                });

            utils.request({
                invoke: api.requestCourseDetail,
                params: {
                    courseId: parseInt(store.state.cached_courseId)
                },
                result: fakeData.COURSE_DETAIL
            })
                .then(res => {
                    this.title = res.data.title;
                    this.introduction = res.data.courseIntro;
                    this.src = res.data.courseImgVideo;
                    this.periodList.push(...res.data.courseSection);
                    this.relatedId.push(...res.data.relatedCourse);

                    for(let i of this.relatedId) {
                        utils.request({
                            invoke: api.requestCourseDetail,
                            params: {
                                courseId: parseInt(i)
                            },
                            result: fakeData.COURSE_DETAIL
                        })
                            .then(res => {
                                this.relatedList.push({
                                    title: res.data.title,
                                    introduction: res.data.courseIntro,
                                    courseId: parseInt(i),
                                    cover: ''                               /* maybe this field will matter in the future. */
                                })
                            })
                    }
                });
        },
        methods: {
            toggleFav() {
                let that = this;
                let code = this.inFav ? 'remove_favorite' : 'add_favorite';

                // NOTE: missing the add favorite code in the newest api
                utils.request({
                    invoke: api.requestAlterFavoriteTeacher,
                    params: {
                        code: code,
                        teacherId: parseInt(store.state.teacherId),
                        courseId: parseInt(store.state.cached_courseId),
                    },
                    result: fakeData.SINGLE_NUMBER_CODE
                })
                    .then((res) => {
                        if (res.data.code === 1)
                            that.inFav = !that.inFav
                    })
            },
            toggleList() {
                let that = this;
                let code = this.inList ? 'remove_course_self' : 'add_course_self';

                utils.request({
                    invoke: api.requestAlterFavoriteTeacher,
                    params: {
                        code: code,
                        teacherId: store.state.teacherId,
                        courseId: parseInt(store.state.cached_courseId),
                    },
                    result: fakeData.SINGLE_NUMBER_CODE
                })
                    .then((res) => {
                        if (res.data.code === 1)
                            that.inList = !that.inList
                    })
            }
        },
        beforeRouteEnter(to, from, next) {
            store.commit('PROBE_COURSE');
            if(!to.params.courseId && store.state.cached_courseId === '') {
                next(false)
            } else {
                if(to.params.courseId)
                    store.commit('CACHE_ID', to.params.courseId);
                next()
            }
        }
    }
</script>

<style scoped lang="scss">
  .el-header {
    padding: 0;
  }

  .el-footer {
    padding: 0;
  }

  .el-row {
    margin-bottom: 0;
    width: 100%;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .el-button {
    width: 70%;
    margin-top: 15px;
    margin-left: 15%;
    margin-right: 15%;
  }
</style>
