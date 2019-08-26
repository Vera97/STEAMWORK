<template>
  <div>
    <el-button type="primary" class="button-box">学生学习进度监控</el-button>
    <div class="pie">
      <div id="pie1">
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="main1" style="float:left;width:100%;height: 20em"></div>
      </div>
    </div>
  </div>
</template>

<script>
    import {api, fakeData} from '../../api';
    import utils from '../../utils';

    let echarts = require('echarts/lib/echarts');
    // 引入饼状图组件
    require('echarts/lib/chart/pie');
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');


    export default {
        created(){
        },
        mounted(){
            this.initData();
        },
        methods:{
            openChao:function(){//超前弹出
                alert('nihao');
                // this.$alert('这是一段内容', '标题名称', {
                //     confirmButtonText: '确定',
                //     callback: action => {
                //         this.$message({
                //             type: 'info',
                //             message: `action: ${ action }`
                //         });
                //     }
                // });
            },
            //初始化数据
            initData() {
                // 基于准备好的dom，初始化echarts实例
                const myChart = echarts.init(document.getElementById('main1'));//var -> let 8.24
                // 绘制图表
                utils.request({
                    invoke: api.requestGetProgressStu,
                    params: {
                        code: 'stu_get_progress',
                        stuId: '',//how?
                    },
                    result: fakeData.PROGRESS_STU
                }).then(res => {
                    if(res.data.code === 1){
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
                                        {value:res.data.progress[0].length, name:'超前',stu:res.data.progress[0]},
                                        {value:res.data.progress[1].length, name:'正常',stu:res.data.progress[1]},
                                        {value:res.data.progress[2].length, name:'滞后',stu:res.data.progress[2]},
                                        {value:res.data.progress[3].length, name:'严重滞后',stu:res.data.progress[3]},
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
                    }
                })

                myChart.on('click',  (param) => {//饼状图点击函数
                    // let that = this;
                    console.log(param.data.stu);
                    if(param.data.name === '超前'){
                        let template = '';
                        for (let i of param.data.stu) {
                            let tmp = `${i}\n`;
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
                            let tmp = `${i}\n`;
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
                            let tmp = `${i}\n`;
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
                            let tmp = `${i}\n`;
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
            },

            openZhi() {//滞后弹出
                this.$alert('这是一段内容', '标题名称', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                });
            },
            openZheng() {//正常弹出
                this.$alert('这是一段内容', '标题名称', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                });
            },
            openStrong() {//严重滞后弹出
                this.$alert('这是一段内容', '标题名称', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                });
            }
        }
    }
</script>
<style>
  .button-box{
    width: 100%;
    margin-bottom: 0px;
  }
</style>