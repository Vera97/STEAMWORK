<template>
    <el-card class="box-card">
        <h3>班级列表</h3>
        <el-tree :data="listData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </el-card>
</template>

<script>
    import store from '../store'
    import {api, fakeData} from '../api'
    import utils from '../utils'

    export default {
        name: "class-list",
        data() {
            return {
                listData: [],
                defaultProps: {
                    children: 'courseDetail',
                    label(data) {
                        if(data.className) {
                            return data.className
                        } else if(data.name) {
                            return data.name
                        } else {
                            throw new DOMException()
                        }
                    }
                }
            };
        },
        methods: {
            handleNodeClick(data, node) {
                if(node.isLeaf) {
                    if(node.level === 1) {
                        // note id not classId
                        store.commit('studentsList/SUBMIT_ID', data.id, 0);
                        store.dispatch('studentsList/renderClass').then(() => {
                            this.$emit('course-selected')
                        })
                    } else {
                        store.commit('studentsList/SUBMIT_ID', node.parent.data.id, data.id);
                        store.dispatch('studentsList/render_course').then(() => {
                            this.$emit('course-selected')
                        })
                    }
                }
            },
            getClass() {
                let that = this;

                return utils.request({
                    invoke: api.requestTeacherClasses,
                    params: {
                        code: 'class_list',
                        teacherId: parseInt(store.state.userName)
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
                        invoke: api.requestClassCourseList,
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
                            let classId = that.listData[k].id;
                            let courseId = that.listData[k].courseDetail[0].id;

                            // use the id to fetch the list of student
                            // if currently no course has been rendered
                            if(store.state.studentsList.courseId === '') {
                                store.dispatch('studentsList/render_course', classId, courseId).then(() => {
                                    that.$emit('course-selected')
                                })
                            }
                        }
                    }
                }
            },
            addCourse(course) {
                this.listData.push(course)
            },
            addRelated(value) {
                for(let i = 0; i < this.listData.length; i++) {
                    if(this.listData[i].id === store.state.studentsList.classId) {
                        console.log('hit');
                        this.listData[i].courseDetail.push(...value)
                    }
                }
            }
        },
        async created() {
            await this.getClass();
            this.getSubCourses()
        }
    }
</script>

<style scoped>
</style>
