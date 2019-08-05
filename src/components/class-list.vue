<template>
  <el-card class="box-card">
    <h3>班级列表</h3>
    <el-tree :default-expanded-keys="expandKey"
             auto-expand-parent
             highlight-current
             node-key="key"
             ref="tree"
             :data="listData"
             :props="defaultProps"
             @node-click="handleNodeClick"
             :render-after-expand="false"
    ></el-tree>
  </el-card>
</template>

<script>
    import store from '../store'
    import {api, fakeData} from '../api'
    import utils from '../utils'

    export default {
        name: "class-list",
        props: {
            showSection: Boolean
        },
        data() {
            return {
                listData: [],
                defaultProps: {
                    children: 'child',
                    label: function (data, node) {
                        if (node.level === 1) return data.className;
                        else if (node.level === 2) {
                            return data.courseName;
                        } else return data.courseSectionName;
                    }
                },
                key: 0,                 /* a unique key for the node. to select a node after loaded. */
                expandKey: []
            };
        },
        methods: {
            handleNodeClick(data, node) {
                if (node.isLeaf) {
                    if (node.level === 1) {
                        // note id not classId
                        this.$emit('course-selected', data.courseId, null);
                    } else if (node.level === 2) {
                        this.$emit('course-selected', node.parent.data.courseId, data.courseId);
                    } else {
                        this.$emit('section-selected', data.courseSectionId)
                    }
                }
            },
            getClass() {
                let that = this;

                return utils.request({
                    invoke: api.requestTeacherClasses,
                    params: {
                        teacherId: parseInt(store.state.teacherId)
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
                        for (let i of res.data.classList) {
                            that.listData.push({...i, child: [], key: that.key});
                            that.key++
                        }
                    })
            },
            // get the courses in the classes
            // grab the first course and render it
            async getSubCourses() {
                let that = this;
                let flag = false;

                for (let k = 0; k < this.listData.length; k++) {
                    let classId = this.listData[k].classId;
                    await utils.request({
                        invoke: api.requestClassCourseList,
                        params: {
                            classId: parseInt(classId)
                        },
                        result: fakeData.COURSES_IN_CLASS
                    })
                        .then(res => {
                            let courseList = res.data.courseList.map(item => {
                                return {
                                    courseId: item.courseId,
                                    courseName: item.courseName,
                                    key: that.key++
                                }
                            });
                            that.listData[k].child.push(...courseList);
                        });

                    if (!flag && !this.showSection) {
                        if (that.listData[k].child.length !== 0) {
                            flag = true;
                            let classId = that.listData[k].classId;
                            let courseId = that.listData[k].child[0].courseId;
                            let key = that.listData[k].child[0].key;
                            that.expandKey = [that.listData[k].key];

                            // use the id to fetch the list of student
                            // if currently no course has been rendered
                            if (store.state.studentsList.courseId === '') {
                                that.$emit('course-selected', classId, courseId);
                                that.$refs.tree.setCurrentKey(key);
                            }
                        }
                    }

                    if(this.showSection) {
                        for (let i = 0; i < this.listData[k].child.length; i++) {
                            utils.request({
                                invoke: api.requestCourseDetail,
                                params: {
                                    courseId: this.listData[k].child[i].courseId
                                },
                                result: fakeData.COURSE_DETAIL
                            })
                                .then(res => {
                                    this.$set(this.listData[k].child[i], 'child', []);
                                    let courseSectionList = res.data.courseSection.map(item => {
                                        return {
                                            courseSectionId: item.courseSectionId,
                                            courseSectionName: item.courseSectionName,
                                            key: that.key++
                                        }
                                    });
                                    this.listData[k].child[i].child.push(...courseSectionList);
                                })
                        }
                    }
                }
            },
            addCourse(course) {
                this.listData.push(course)
            },
            addRelated(value) {
                for (let i = 0; i < this.listData.length; i++) {
                    if (this.listData[i].id === store.state.studentsList.classId) {
                        this.listData[i].courseDetail.push(...value)
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
</style>
