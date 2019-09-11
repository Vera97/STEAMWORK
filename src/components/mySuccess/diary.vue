<template>
  <div>
    <div v-if="selected">
      <div>
        <div class="score">财富值：{{wealthAll}}&emsp; 教师评分：{{score}}</div>
        <div class="out"><a href="#">导出内容</a></div>
      </div>
      <div>
        <el-card class="box-card">
          <div class="card-box">
            <div style="text-align: center;margin-bottom: 15px">
              <div>{{stu}}学生{{course}}课程实验日志</div>
              <div>{{courseSection}}</div>
            </div>
            <div class="pro">
              <div>互动问答：<span v-for="item in answerList" :key="item">{{item}}</span></div>
              <div>设计方案：{{designContent}}</div>
              <div>拍照上传：
                <img
                        v-for="(item, index) in photoList"
                        class="photo"
                        :key="index"
                        :src="item"
                >
              </div>
            </div>
            <div style="color: grey">(该部分内容由学生课堂任务填写后自动生成)</div>
          </div>
        </el-card>
      </div>
    </div>
    <el-card v-else>
      <h2>请选择要查看的课时</h2>
    </el-card>
  </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "diary",
        computed:{
            ...mapState({
                stu: state => state.userName,
                course: state => state.mySuccess.course.courseName,
                courseSection: state => state.mySuccess.courseSection.courseSectionName,
                score: state => state.mySuccess.score,
                wealthAll: state => state.mySuccess.wealthAll,
                answerList: state => state.mySuccess.answerList,
                designContent: state => state.mySuccess.designContent,
                photoList: state => state.mySuccess.photoList,
                selected: state => state.mySuccess.selected,
            })
        },
    }
</script>

<style scoped>
  .score {
    font-size: 20px;
    display: block;
    /*float: left;*/
    text-align: center;
  }

  .out {
    font-size: 18px;
    display: block;
    margin-left: 90%;
    margin-bottom: 10px;
  }

  .pro {
    margin-bottom: 20px;
  }

  .pro > div {
    margin-bottom: 12px;
    font-size: 16px;
  }
  .photo {
    width:200px;
    margin-right:2px;
  }
</style>
