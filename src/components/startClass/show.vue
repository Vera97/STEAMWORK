<template>
  <div class="wrapper">
    <el-card class="ppt-box">
      <img
              v-for="(item, index) in slideList"
              class="display"
              :key="index"
              :src="item"
              v-show="index === display"
              alt="there is some error in the slides"
      >
      <div class="col-box">
        <el-button-group>
          <div class="banner" v-if="!classroomId"><strong>请先选择上课的课时</strong></div>
          <el-button type="plain" plain icon="el-icon-arrow-left" @click="previous" v-if="classroomId"></el-button>
          <el-button type="plain" plain icon="el-icon-arrow-right" @click="next" v-if="classroomId"></el-button>
        </el-button-group>
      </div>
    </el-card>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'

    export default {
        name: 'show',
        props: {
            classroomId: Number,
            // selectedSectionId:null
        },
        data () {
            return {
                slideList: [],
                display: 0,
                courseSectionId: null
            }
        },
        methods: {
            getSlides(courseSectionId) {
                this.courseSectionId = courseSectionId;
                this.display = 0;
                utils.request({
                    invoke: api.requestSlides,
                    params: {
                        courseSectionId: this.courseSectionId
                    },
                    result: fakeData.GET_SLIDES_RESPONSE
                })
                    .then(function(res) {
                        if(res.data.code === 1) {
                            this.slideList.push(...res.data.pptImagesList);
                            this.$emit('get-ppt', res.data.pptId)
                        }
                        else this.$message.error('获取ppt失败');
                    }.bind(this))
            },
            next() {
                this.display = this.display === this.slideList.length - 1 ? this.display : this.display + 1;
                this.getPage()
            },
            previous() {
                this.display = this.display === 0 ? 0 : this.display - 1;
                this.getPage()
            },
            getPage() {
                utils.request({
                    invoke: api.requestSubmitPPTPage,
                    params: {
                        classroomId: this.classroomId,
                        pptPage: this.display
                    },
                    result: fakeData.RETURN_PPTPAGE
                });
                this.$emit('page-turning', this.display)
            }
        }
    }
</script>

<style scoped lang="scss">
  .wrapper {
    position: relative;
    width: 100%;
  }
  .ppt-box {
    text-align: center;
  }
  .display {
        width: 100%;
  }
  .banner {
    text-align: center;
    margin-bottom: 180%;
    margin-top: 180%;
  }

  .button-box {
    text-align: center;
    margin-top: 10px;
  }
</style>
