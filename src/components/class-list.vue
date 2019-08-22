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
             :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{node}">
        <span>{{ node.label }}</span>
        <span v-if="showOptions">
          <el-popover
                  class="pop-pane"
                  v-if="node.level === 1"
                  placement="right"
                  title="请选择要添加的课程"
                  trigger="click"
                  v-model="visible[node.key]"
          >
            <i class="node-icon el-icon-plus" slot="reference"></i>
            <el-select
                    class="course-selector"
                    value-key="courseId"
                    v-model="relatedSelect"
                    filterable
                    remote
                    :remote-method="search"
                    placeholder="请选择"
            >
              <el-option
                      v-for="item in options"
                      :key="item.courseId"
                      :label="item.courseName"
                      :value="item">
              </el-option>
            </el-select>
            <el-button type="primary" size="small" class="select-confirm" @click="addRelated(node)">确定</el-button>
          </el-popover>
          <i class="node-icon el-icon-edit" @click="editPrompt(node)" v-if="node.level === 1"></i>
          <i class="el-icon-delete" @click="deletePrompt(node)"></i>
        </span>
      </span>
    </el-tree>
  </el-card>
</template>

<script>
    import store from '../store'
    import {api, fakeData} from '../api'
    import utils from '../utils'
    export default {
        name: "class-list",
        props: {
            showSection: Boolean,
            showOptions: Boolean
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
                expandKey: [],
                options: [],
                relatedSelect: null,
                visible: []
            };
        },
        methods: {
            handleNodeClick(data, node) {
                if (node.isLeaf) {
                    if (node.level === 1) {
                        this.$emit('course-selected', data.classId, null);
                    } else if (node.level === 2) {
                        this.$emit('course-selected', node.parent.data.classId, data.courseId);
                    } else {
                        this.$confirm('确认开始这节课吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消'
                        })
                            .then((function () {
                                this.$emit('section-selected', data.courseSectionId, node.parent.parent.data.classId)
                            }).bind(this)).catch()
                    }
                }
            },
            getClass() {
                return utils.request({
                    invoke: api.requestTeacherClasses,
                    params: {
                        teacherId: parseInt(store.state.teacherId)
                    },
                    result: fakeData.CLASSES
                })
                    .then((function(res) {
                        /* watch out! adding attributes and array items directly after the mount
                        * cannot be caught by the el-tree, and the node tree won't be updated.
                        * so the offspring won't appear in the subtree, and the whole tree remain
                        * unchanged. so make every modification in the binding data after the mount
                        * via Array.push method, and add every attributes before the mount or use the
                        * method provided by vue. */
                        for (let i of res.data.classList) {
                            this.listData.push({...i, child: [], key: this.key});
                            this.key++
                        }
                    }).bind(this))
            },
            // get the courses in the classes
            // grab the first course and render it
            async getSubCourses() {
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
                        .then((function(res) {
                            let courseList = res.data.courseList.map(item => {
                                return {
                                    courseId: item.courseId,
                                    courseName: item.courseName,
                                    key: this.key++
                                }
                            });
                            this.listData[k].child.push(...courseList);
                        }).bind(this));
                    if (!flag && !this.showSection && this.listData[k].child.length !== 0) {
                        flag = true;
                        let classId = this.listData[k].classId;
                        let courseId = this.listData[k].child[0].courseId;
                        let key = this.listData[k].child[0].key;
                        this.expandKey = [this.listData[k].key];
                        // use the id to fetch the list of student
                        // if currently no course has been rendered
                        this.$emit('course-selected', classId, courseId);
                        this.$refs.tree.setCurrentKey(key);
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
                                .then((function(res) {
                                    this.$set(this.listData[k].child[i], 'child', []);
                                    let courseSectionList = res.data.courseSection.map(item => {
                                        return {
                                            courseSectionId: item.courseSectionId,
                                            courseSectionName: item.courseSectionName,
                                            key: this.key++
                                        }
                                    });
                                    this.listData[k].child[i].child.push(...courseSectionList);
                                }).bind(this))
                        }
                    }
                }
            },
            addCourse(course) {
                this.listData.push(course)
            },
            addRelated(node) {
                utils.request({
                    invoke: api.requestAlterClassCourseList,
                    params: {
                        code: 'course_list_add',
                        classId: node.data.classId,
                        courseId: this.relatedSelect.courseId
                    },
                    result: fakeData.SINGLE_NUMBER_CODE
                })
                    .then((function (res) {
                        if(res.data.code === 1) {
                            this.$refs.tree.append(this.relatedSelect, node);
                            this.$set(this.visible, node.key, false);
                            this.relatedSelect = null;
                            this.$message.success('添加成功')
                        } else
                            this.$message.error('添加失败')
                    }).bind(this))
            },
            deletePrompt(node) {
                if(node.level === 2) {
                    this.$confirm('确认要删除这个课程吗', '确认', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => this.deleteRelated(node)).catch()
                } else {
                    this.$confirm('确认要删除这个班级吗', '确认', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => this.deleteClass(node)).catch()
                }
            },
            deleteRelated(node) {
                utils.request({
                    invoke: api.requestAlterClassCourseList,
                    params: {
                        code: 'course_list_remove',
                        classId: node.parent.data.classId,
                        courseId: node.data.courseId
                    },
                    result: fakeData.SINGLE_NUMBER_CODE
                })
                    .then((function (res) {
                        if(res.data.code === 1) {
                            this.$refs.tree.remove(node);
                            this.$message.success('删除成功')
                        } else
                            this.$message.error('删除失败')
                    }).bind(this))
            },
            deleteClass(node) {
                utils.request({
                    invoke: api.requestAlterClassList,
                    params: {
                        code: 'class_list_remove',
                        teacherId: store.state.teacherId,
                        classId: node.data.classId
                    },
                    result: fakeData.SINGLE_NUMBER_CODE
                })
                    .then((function (res) {
                        if(res.data.code === 1) {
                            this.$refs.tree.remove(node);
                            this.$message.success('删除成功')
                        } else
                            this.$message.error('删除失败')
                    }).bind(this))
            },
            editPrompt(node) {
                this.$prompt('请输入想要修改的名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                })
                    .then((function ({value}) {
                        if(node.level === 1) this.editClassName(node, value);
                        else this.$message.error('无法在此处修改课程名称')
                    }).bind(this))
            },
            editClassName(node, className) {
                utils.request({
                    invoke: api.requestAlterClassList,
                    params: {
                        code: 'class_list_update',
                        teacherId: parseInt(store.state.teacherId),
                        classId: node.data.classId,
                        className: className
                    },
                    result: fakeData.SINGLE_NUMBER_CODE
                })
                    .then((function (res) {
                        if(res.data.code === 1) {
                            node.data.className = className;
                            this.$message.success('修改成功')
                        } else this.$message.error('修改失败')
                    }).bind(this))
            },
            search(input) {
                utils.request({
                    invoke: api.requestSearchCourses,
                    params: {
                        course_name_keyword: input
                    },
                    result: fakeData.SEARCH_COURSE
                })
                    .then((function (res) {
                        this.options = res.data.chunks.map(item => {
                            return {courseName: item.title, courseId: item.courseId}
                        });
                    }).bind(this))
            }
        },
        async created() {
            await this.getClass();
            this.getSubCourses();
        }
    }
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .select-confirm {
    position: relative;
    width: 5em;
    margin: 0 auto;
    display: block;
  }

  .node-icon {
    margin-right: 8px;
  }
</style>

