<template>
    <div id="app">
        <!--路由渲染出口-->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        //由于用vue-router进行路由，所以这里可以不用导入，并注册组件了，提供vue-router渲染出口即可
        /*
        components: {
          HelloWorld
        }*/
        data() {
            return {
                //约定课程type，
                // 1为上午1-2节，2为上午3-4节，3为下午1-2节，4为下午3-4节，5为上午123节，6为下午123节
                selected_course: [
                    {
                        name: 'monday',
                        course_list: [
                            {
                                type: 1,
                                content: '牛顿环实验',
                                content_sub: '(实验A楼 342室)'
                            },
                        ],
                    },
                    {
                        name: 'tuesday',
                        course_list: []
                    },
                    {
                        name: 'wednesday',
                        course_list: [
                            {
                                type: 3,
                                content: '分光计实验',
                                content_sub: '(实验A楼 342室)'
                            },
                            {
                                type: 4,
                                content: '牛顿环实验',
                                content_sub: '(实验A楼 342室)'
                            },
                        ],
                    },
                    {
                        name: 'thursday',
                        course_list: []
                    },
                    {
                        name: 'friday',
                        course_list: [
                            {
                                type: 5,
                                content: '牛顿环实验',
                                content_sub: '(实验A楼 342室)'
                            },
                        ]
                    },
                ]
            }
        },
        methods: {
            setdata() {
                this.$store.commit('PUSH_COURSE',this.selected_course);
            }
        },
        //以下是模拟请求完毕后向vuex推入数据，以备后续子组件使用，这里放在mounted()周期钩子里执行
        //生命周期钩子，这里稍微注意，必须在数据加载完成以后才可以读取到methods，data，所以在mounted钩子中执行
        mounted() {
            this.setdata()
        }
    }
</script>

<style>
    @import 'assets/plugin/bootstrap/css/bootstrap.css';
</style>
