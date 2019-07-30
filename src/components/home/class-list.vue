<template>
  <el-row>
    <el-col :span="4" v-for="(item, index) in coursesInDisplay" :key="item.courseId" :offset="index > 0 ? 1 : 0">
      <CourseCell :title="item.title" :introduction="item.introduction"
                  :id="item.courseId"></CourseCell>
    </el-col>
    <el-col>
      <el-button-group>
        <el-button type="primary" size="mini" icon="el-icon-arrow-left" @click="lastPage">上一页</el-button>
        <el-button :type="index === current ? 'primary' : ''" size="mini" v-for="(o, index) in display" :key="index"
                   :offset="index > 0 ? 1 : 0">{{index + base + 1}}
        </el-button>
        <el-button type="primary" size="mini" @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </el-button-group>
    </el-col>
  </el-row>
</template>

<script>
    import CourseCell from "../course-cell";
    import store from '../../store';
    import {api, fakeData} from '../../api';
    import utils from '../../utils';

    const PAGE_COUNT = 5;
    const MAX_FOOTER = 5;

    export default {
        name: "ClassList",
        components: {CourseCell},
        computed: {
            /* the total number of the pages. */
            length() {
                return Math.ceil(store.state.home.totalCount / PAGE_COUNT)
            },
            /* the number of pages to display in the footer. */
            display() {
                return this.length >= MAX_FOOTER ? MAX_FOOTER : this.length
            },
            coursesInDisplay() {
                return store.state.home.all.slice((this.base + this.current) * PAGE_COUNT, (this.base + this.current + 1) * PAGE_COUNT)
            },
        },
        data() {
            return {
                current: 0,
                base: 0,
                title: '科目xxxx',
                introduction: '一句话的简介xxxx'
            }
        },
        methods: {
            lastPage() {
                if (this.current === Math.floor(MAX_FOOTER / 2) && this.base > 0) {
                    this.base--
                } else if (this.current > 0) {
                    this.current--
                }
            },
            async nextPage() {
                if (this.current === Math.floor(MAX_FOOTER / 2) && (this.current + this.base + Math.ceil(MAX_FOOTER / 2) + 1) * PAGE_COUNT < store.state.home.totalCount) {
                    this.getMore();
                    this.base++
                } else if (this.current !== this.display - 1) {
                    this.getMore();
                    this.current++
                }

            },
            getMore() {
                utils.request({
                    invoke: api.getCourseChunk,
                    params: {
                        code: "course_chunk",
                        gotten: ((this.base + this.current + 1) * PAGE_COUNT),
                        length: PAGE_COUNT
                    },
                    result: fakeData.COURSE_CHUNK
                })
                    .then(res => {
                        store.commit('home/ADD_ALL', res.data.chunks)
                    })
            }
        },
        created() {
            window.vm = this;
            utils.request({
                invoke: api.getCourseChunk,
                params: {
                    code: 'course_all'
                },
                result: fakeData.COURSE_COUNT
            })
                .then(res => {
                    store.commit('home/PUSH_COUNT', res.data.totalCount)
                });
            this.base = -1;
            this.getMore();
            this.base = 0;
        }
    }
</script>

<style scoped>
  .el-col{
    padding-bottom:20px;
    text-align: center;
  }
  .bottom{
    padding-top:10px;
  }
</style>
