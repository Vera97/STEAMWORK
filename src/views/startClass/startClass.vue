<template>
  <el-container>
    <el-header>
      <Nav active-index="4"></Nav>
    </el-header>
    <el-main class="main-box">
      <el-row :gutter="24">
        <el-col :span="5">
          <classList @course-selected="loadMaterial"></classList>
          <askList></askList>
        </el-col>
        <el-col :span="14">
          <show v-if="current"></show><newComp :exercise="exercise" v-else @onEmmitCurrent="onEmmitCurrent"></newComp>
        </el-col>
        <el-col :span="5">
          <startActivities @onEmitIndex="onEmitIndex"></startActivities>
          <monitor :prog="prog"></monitor>
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
    import classList from "../../components/class-list"
    import askList from "../../components/startClass/ask-list";
    import monitor from "../../components/startClass/monitor";
    import show from "../../components/startClass/show";
    import newComp from "../../components/startClass/new-comp";
    import startActivities from "../../components/startClass/start-activities";

    import {api, fakeData} from '../../api';
    import utils from '../../utils';
    import store from '../../store';

    export default {
        name: "startClass",
        components: {askList, monitor, show,newComp, startActivities, classList, Footer, Nav},
        computed:
            {
                prog() {
                    return store.state.startClass.prog;
                }
            },
        data () {
            return {
                name: 'startClass',
                current: true,
                exercise: '',
            }
        },
        methods:{
            updateData() {
                let that = this;
                utils.request({
                    invoke: api.requestPushProgressStu,
                    params: {
                        code: 'stu_push_progress',
                        stuId: that.id,
                        progress: that.progress
                    },
                    result: fakeData.UP_PROGRESS
                })
                    .then(res => {
                        store.commit('startClass/UPDATE_PROG', res.data);
                        alert("chenggong");
                    })
            },
            loadMaterial() {
            },
            onEmitIndex(index) {
                this.current = false;
                this.exercise = index;
                console.log(index)
            },
            onEmmitCurrent(current) {
                this.current = current;
            }
        },
        created() {
            let that = this;
            utils.request({
                invoke: api.requestGetProgressStu,
                params: {
                    code: 'stu_get_progress',
                    stuId: that.id,
                },
                result: fakeData.PROGRESS_STU
            })
                .then(res => {
                    store.commit('startClass/GET_PROG', res.data);
                    // setInterval(that.updateData,1500);
                })
        }
    }
</script>

<style scoped>
  * {
    margin-left: 0;
    padding-left: 0;
  }

  .main-box {
    margin-left: 10px;
  }

  .el-footer {
    padding-right: 0;
  }
</style>
