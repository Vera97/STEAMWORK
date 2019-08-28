<template>
  <div class="student-box">
    <div>
      <el-button type="primary" class="button-box" @click="initData" style="width: 100%">学生学习进度监控</el-button>
    </div>
    <div class="pie">
      <div id="pie1">
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="main1" style="float:left;width:100%;height: 20em"></div>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex'

    let echarts = require('echarts/lib/echarts');
    // 引入饼状图组件
    require('echarts/lib/chart/pie');
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');

    export default {
        name: 'monitor',
        data(){
          return{
              aheadList:[],
              commonList:[],
              fallList:[],
              worstList:[],
              allData:[]
          }
        },
        computed: {
            ...mapState({
                prog: state => state.startClass.prog
            })
        },
        methods: {
            initData() {
                this.$emit('progress-get');
                for(let i=0;i<this.prog.length;i++){
                    let  value=this.prog[i].progress;
                    if (value<= 0.25) {
                        this.worstList.push(this.prog[i]);
                    } else if (value> 0.25 && value<= 0.5) {
                        this.fallList.push(this.prog[i]);
                    } else if (value > 0.5 &&value <= 0.75) {
                        this.commonList.push(this.prog[i]);
                    } else if ( value > 0.75&& value<= 1) {
                        this.aheadList.push(this.prog[i]);
                    }
                }
                // 基于准备好的dom，初始化echarts实例
                const myChart = echarts.init(document.getElementById('main1'));//var -> let 8.24
                // 绘制图表
                        myChart.setOption({
                            // title : {
                            //     // text: '某站点用户访问来源',//主标题
                            //     // subtext: '纯属虚构',//副标题
                            //     //以上两行需要的时候再说 8.24
                            //     x:'center',//x轴方向对齐方式
                            //     y:'100%'
                            // },
                            // tooltip : {
                            //     trigger: 'item',
                            //     formatter: "{a} <br/>{b} : {c} ({d}%)"
                            // },
                            legend: {
                                x:'center',
                                y:'bottom',
                                orient: 'horizontal',
                                left:'0',
                                bottom: '100%',
                                data: ['超前', '正常', '滞后' ,'严重滞后']
                            },
                            series : [
                                {
                                    name: '进度监控',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['50%', '60%'],
                                    data:[
                                        {value:this.aheadList.length, name:'超前',stu:this.aheadList},
                                        {value:this.commonList.length, name:'正常',stu:this.commonList},
                                        {value:this.fallList.length, name:'滞后',stu:this.fallList},
                                        {value:this.worstList.length, name:'严重滞后',stu:this.worstList},
                                    ],
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                                        }
                                    }
                                }
                            ],
                            color: ['#FFFF33','#FFCC22','#FFAA33','#d58512']
                });
                myChart.on('click',  (param) => {//饼状图点击函数
                    // let that = this;
                    if(param.data.name === '超前'){
                        let template = '';
                        for (let i of param.data.stu) {
                            let tmp = `${i.stuName}\n`;
                            template += tmp;
                        }
                        this.$alert(template, '学习进度超前学生', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });
                    }
                    if(param.data.name === '正常'){
                        let template = '';
                        for (let i of param.data.stu) {
                            let tmp = `${i.stuName}\n`;
                            template += tmp;
                        }
                        this.$alert(template, '学习进度正常学生', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });
                    }
                    if(param.data.name === '滞后'){
                        let template = '';
                        for (let i of param.data.stu) {
                            let tmp = `${i.stuName}\n`;
                            template += tmp;
                        }
                        this.$alert(template, '学习进度滞后学生', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });
                    }
                    if(param.data.name === '严重滞后'){
                        let template = '';
                        for (let i of param.data.stu) {
                            let tmp = `${i.stuName}\n`;
                            template += tmp;
                        }
                        this.$alert(template, '学习进度严重滞后学生', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });
                    }

                });
            }
        }
    }
</script>

<style scoped>
  .button-box {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .student-id-box {
    padding: .5em;
    float: left;
    margin: 2px;
    text-align: center;
    border-radius: 2px;
  }

  p {
    margin-top: 130px;
  }
</style>
