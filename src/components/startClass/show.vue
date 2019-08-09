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
          <el-button type="plain" plain icon="el-icon-arrow-left" @click="previous"></el-button>
          <el-button type="plain" plain @click="next"><i class="el-icon-arrow-right el-icon--right"></i></el-button>
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
        data () {
            return {
                slideList: [],
                display: 0
            }
        },
        methods: {
            getSlides(courseSectionId) {
                this.display = 0;
                let that = this;

                utils.request({
                    invoke: api.requestSlides,
                    params: {
                        courseSectionId: courseSectionId
                    },
                    result: fakeData.GET_SLIDES_RESPONSE
                })
                    .then(res => {
                        if(res.data.code === 1) {
                            that.slideList.push(...res.data.pptImagesList)
                        }
                        else that.$message.error('获取ppt失败');
                    })
            },
            next() {
                console.log(`next with current ${this.display}`);
                this.display = this.display === this.slideList.length - 1 ? this.display : this.display + 1;
                this.getPage();
            },
            previous() {
                this.display = this.display === 0 ? 0 : this.display - 1
            },
            getPage() {
                utils.request({
                    invoke: api.requestUploadPPT,
                    params: {
                        classroomId: this.classroomId,
                        pptPage: this.display
                    },
                    result: fakeData.RETURN_PPTPAGE
                })
                    .then(()=> {
                        alert("获取成功！");
                    })
            },
        },
        mounted() {
            this.getSlides(0);
        }
    }
</script>

<style scoped lang="scss">
  .wrapper {
    position: relative;
    width: 100%;

    .ppt-box {
      text-align: center;

      .display {
        width: 100%;
      }
    }
  }

  .button-box {
    text-align: center;
    margin-top: 10px;
  }
</style>
