<template>
  <div>
    <el-card class="box-card">
      <h3>课程列表</h3>
      <el-tree
              :data="listData"
              :props="defaultProps"
              :expand-on-click-node="true"
              accordion
              @node-click="handleNodeClick">
      </el-tree>
    </el-card>
  </div>
</template>

<script>
    import {api, fakeData} from '../../api'
    import utils from '../../utils'

    export default {
        name: "course-directory",
        data() {
            return {
                defaultProps: {
                    children: 'courseSection',
                    label: function (data, node) {
                        if (node.level === 1) return data.title;
                        else return data.courseSectionName
                    }
                },
                listData: [],
            };
        },
        methods: {
            handleNodeClick(data, node) {
                if (node.isLeaf) {
                    this.$emit('section-selected', {
                        courseSectionId: data.courseSectionId,
                        courseSectionName: data.courseSectionName
                    })
                }
            },
        },
        async created() {
            let amount = await utils.request({
                invoke: api.getCourseChunk,
                params: {
                    code: 'course_all'
                },
                result: fakeData.COURSE_COUNT
            })
                .then(function (res) {
                    return Promise.resolve(res.data.totalCount)
                });
            await utils.request({
                invoke: api.getCourseChunk,
                params: {
                    code: 'course_chunk',
                    gotten: 0,
                    length: amount
                },
                result: fakeData.COURSE_CHUNK
            })
                .then(function (res) {
                    this.listData = res.data.chunks.map(item => {
                        return {
                            courseId: item.courseId,
                            title: item.title,
                            courseSection: []
                        }
                    });
                }.bind(this));

            for (let i = 0; i < this.listData.length; i++) {
                utils.request({
                    invoke: api.requestCourseDetail,
                    params: {
                        courseId: this.listData[i].courseId
                    },
                    result: fakeData.COURSE_DETAIL
                })
                    .then(res => {
                        this.listData[i].courseSection.push(...res.data.courseSection)
                    })
            }
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

  .box-card {
    max-height: 30em;
    overflow: auto;
    margin-left: 0;
  }

  h3 {
    margin-top: 0;
  }
</style>
