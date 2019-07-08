<template>
    <div id="course_table_container">
        <div id="course_table_head">
            <div class="item_head">节次/时间</div>
            <div class="table_head" style="background: yellow">第一节<br>8:00-8:45</div>
            <div class="table_head" style="background: yellow">第二节<br>8:55-9:40</div>
            <div class="table_head" style="background: yellow">第三节<br>10:00-10:45</div>
            <div class="table_head" style="background: yellow">第四节<br>10:55-11:40</div>
            <div class="table_head" style="background: green">第五节<br>13:00-13:45</div>
            <div class="table_head" style="background: green">第六节<br>13:55-14:40</div>
            <div class="table_head" style="background: green">第七节<br>15:00-15:45</div>
            <div class="table_head" style="background: green">第八节<br>15:55-16:40</div>
        </div>
        <div id="monday">
            <div class="item_head">星期一</div>
            <div class="course_content"
                 v-for="(course_item, index) in selected_course_monday"
                 v-bind:key="index"
                 v-bind:style="course_item.style">
                <span>{{course_item.content}}&nbsp;</span>
            </div>
        </div>
        <div id="tuesday">
            <div class="item_head">星期二</div>
            <div class="course_content"
                 v-for="(course_item, index) in selected_course_tuesday"
                 v-bind:key="index"
                 v-bind:style="course_item.style">
                <span>{{course_item.content}}&nbsp;</span>
            </div>
        </div>
        <div id="wednesday">
            <div class="item_head">星期三</div>
            <div class="course_content"
                 v-for="(course_item, index) in selected_course_wednesday"
                 v-bind:key="index"
                 v-bind:style="course_item.style">
                <span>{{course_item.content}}&nbsp;</span>
            </div>
        </div>
        <div id="thursday">
            <div class="item_head">星期四</div>
            <div class="course_content"
                 v-for="(course_item, index) in selected_course_thursday"
                 v-bind:key="index"
                 v-bind:style="course_item.style">
                <span>{{course_item.content}}&nbsp;</span>
            </div>
        </div>
        <div id="friday">
            <div class="item_head">星期五</div>
            <div class="course_content"
                 v-for="(course_item, index) in selected_course_friday"
                 v-bind:key="index"
                 v-bind:style="course_item.style">
                <span>{{course_item.content}}&nbsp;</span>
            </div>
        </div>
        <div id="saturday">
            <div class="item_head">星期六</div>
            <div class="course_content"
                 v-for="course_item in 8"
                 v-bind:key="course_item.toString()"
                 style="border-bottom: 1px solid #ddd">
                <span>&nbsp;</span>
            </div>
        </div>
        <div id="sunday">
            <div class="item_head">星期日</div>
            <div class="course_content"
                 v-for="course_item in 8"
                 v-bind:key="course_item.toString()"
                 style="border-bottom: 1px solid #ddd">
                <span>&nbsp;</span>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "selected_course_table",
        //父子组件可通过props传参，考虑动态路由时一般选择在vuex中统一管理数据流向
        /*
        props: {
            selected_course: Array,
        },*/
        data() {
            return {
                /*
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
                ]*/
                //
                selected_course: []
            }
        },
        computed: {
            selected_course_monday: function () {
                let course = this.selected_course[0].course_list;
                let course_new = [];
                let i;
                for (i = 0; i < 8; i++) {
                    course_new.push({content: '', style: 'border-bottom: 1px solid #ddd'})
                }
                for (i = 0; i < course.length; i++) {
                    if (course[i].type === 1) {
                        course_new[0].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[1].style = 'background: lightskyblue';
                        course_new[0].content = course[i].content;
                        course_new[1].content = course[i].content_sub
                    } else if (course[i].type === 2) {
                        course_new[2].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[3].style = 'background: lightskyblue';
                        course_new[2].content = course[i].content;
                        course_new[3].content = course[i].content_sub
                    } else if (course[i].type === 3) {
                        course_new[4].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[5].style = 'background: lightskyblue';
                        course_new[4].content = course[i].content;
                        course_new[5].content = course[i].content_sub
                    } else if (course[i].type === 4) {
                        course_new[6].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[7].style = 'background: lightskyblue';
                        course_new[6].content = course[i].content;
                        course_new[7].content = course[i].content_sub
                    } else if (course[i].type === 5) {
                        course_new[0].style = 'border-bottom: none;background: lightskyblue';
                        course_new[1].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[2].style = 'background: lightskyblue';
                        course_new[1].content = course[i].content + course[i].content_sub;
                    } else {
                        course_new[5].style = 'border-bottom: none;background: lightskyblue';
                        course_new[6].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[7].style = 'background: lightskyblue';
                        course_new[6].content = course[i].content + course[i].content_sub;
                    }
                }
                return course_new;
            },
            selected_course_tuesday: function () {
                let course = this.selected_course[1].course_list;
                let course_new = [];
                let i;
                for (i = 0; i < 8; i++) {
                    course_new.push({content: '', style: 'border-bottom: 1px solid #ddd'})
                }
                for (i = 0; i < course.length; i++) {
                    if (course[i].type === 1) {
                        course_new[0].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[1].style = 'background: lightskyblue';
                        course_new[0].content = course[i].content;
                        course_new[1].content = course[i].content_sub
                    } else if (course[i].type === 2) {
                        course_new[2].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[3].style = 'background: lightskyblue';
                        course_new[2].content = course[i].content;
                        course_new[3].content = course[i].content_sub
                    } else if (course[i].type === 3) {
                        course_new[4].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[5].style = 'background: lightskyblue';
                        course_new[4].content = course[i].content;
                        course_new[5].content = course[i].content_sub
                    } else if (course[i].type === 4) {
                        course_new[6].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[7].style = 'background: lightskyblue';
                        course_new[6].content = course[i].content;
                        course_new[7].content = course[i].content_sub
                    } else if (course[i].type === 5) {
                        course_new[0].style = 'border-bottom: none;background: lightskyblue';
                        course_new[1].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[2].style = 'background: lightskyblue';
                        course_new[1].content = course[i].content + course[i].content_sub;
                    } else {
                        course_new[5].style = 'border-bottom: none;background: lightskyblue';
                        course_new[6].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[7].style = 'background: lightskyblue';
                        course_new[6].content = course[i].content + course[i].content_sub;
                    }
                }
                return course_new;
            },
            selected_course_wednesday: function () {
                let course = this.selected_course[2].course_list;
                let course_new = [];
                let i;
                for (i = 0; i < 8; i++) {
                    course_new.push({content: '', style: 'border-bottom: 1px solid #ddd'})
                }
                for (i = 0; i < course.length; i++) {
                    if (course[i].type === 1) {
                        course_new[0].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[1].style = 'background: lightskyblue';
                        course_new[0].content = course[i].content;
                        course_new[1].content = course[i].content_sub
                    } else if (course[i].type === 2) {
                        course_new[2].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[3].style = 'background: lightskyblue';
                        course_new[2].content = course[i].content;
                        course_new[3].content = course[i].content_sub
                    } else if (course[i].type === 3) {
                        course_new[4].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[5].style = 'background: lightskyblue';
                        course_new[4].content = course[i].content;
                        course_new[5].content = course[i].content_sub
                    } else if (course[i].type === 4) {
                        course_new[6].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[7].style = 'background: lightskyblue';
                        course_new[6].content = course[i].content;
                        course_new[7].content = course[i].content_sub
                    } else if (course[i].type === 5) {
                        course_new[0].style = 'border-bottom: none;background: lightskyblue';
                        course_new[1].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[2].style = 'background: lightskyblue';
                        course_new[1].content = course[i].content + course[i].content_sub;
                    } else {
                        course_new[5].style = 'border-bottom: none;background: lightskyblue';
                        course_new[6].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[7].style = 'background: lightskyblue';
                        course_new[6].content = course[i].content + course[i].content_sub;
                    }
                }
                return course_new;
            },
            selected_course_thursday: function () {
                let course = this.selected_course[3].course_list;
                let course_new = [];
                let i;
                for (i = 0; i < 8; i++) {
                    course_new.push({content: '', style: 'border-bottom: 1px solid #ddd'})
                }
                for (i = 0; i < course.length; i++) {
                    if (course[i].type === 1) {
                        course_new[0].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[1].style = 'background: lightskyblue';
                        course_new[0].content = course[i].content;
                        course_new[1].content = course[i].content_sub
                    } else if (course[i].type === 2) {
                        course_new[2].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[3].style = 'background: lightskyblue';
                        course_new[2].content = course[i].content;
                        course_new[3].content = course[i].content_sub
                    } else if (course[i].type === 3) {
                        course_new[4].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[5].style = 'background: lightskyblue';
                        course_new[4].content = course[i].content;
                        course_new[5].content = course[i].content_sub
                    } else if (course[i].type === 4) {
                        course_new[6].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[7].style = 'background: lightskyblue';
                        course_new[6].content = course[i].content;
                        course_new[7].content = course[i].content_sub
                    } else if (course[i].type === 5) {
                        course_new[0].style = 'border-bottom: none;background: lightskyblue';
                        course_new[1].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[2].style = 'background: lightskyblue';
                        course_new[1].content = course[i].content + course[i].content_sub;
                    } else {
                        course_new[5].style = 'border-bottom: none;background: lightskyblue';
                        course_new[6].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[7].style = 'background: lightskyblue';
                        course_new[6].content = course[i].content + course[i].content_sub;
                    }
                }
                return course_new;
            },
            selected_course_friday: function () {
                let course = this.selected_course[4].course_list;
                let course_new = [];
                let i;
                for (i = 0; i < 8; i++) {
                    course_new.push({content: '', style: 'border-bottom: 1px solid #ddd'})
                }
                for (i = 0; i < course.length; i++) {
                    if (course[i].type === 1) {
                        course_new[0].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[1].style = 'background: lightskyblue';
                        course_new[0].content = course[i].content;
                        course_new[1].content = course[i].content_sub
                    } else if (course[i].type === 2) {
                        course_new[2].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[3].style = 'background: lightskyblue';
                        course_new[2].content = course[i].content;
                        course_new[3].content = course[i].content_sub
                    } else if (course[i].type === 3) {
                        course_new[4].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[5].style = 'background: lightskyblue';
                        course_new[4].content = course[i].content;
                        course_new[5].content = course[i].content_sub
                    } else if (course[i].type === 4) {
                        course_new[6].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[7].style = 'background: lightskyblue';
                        course_new[6].content = course[i].content;
                        course_new[7].content = course[i].content_sub
                    } else if (course[i].type === 5) {
                        course_new[0].style = 'border-bottom: none;background: lightskyblue';
                        course_new[1].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[2].style = 'background: lightskyblue';
                        course_new[1].content = course[i].content + course[i].content_sub;
                    } else {
                        course_new[5].style = 'border-bottom: none;background: lightskyblue';
                        course_new[6].style = 'border-bottom: none;align-items: flex-end;background: lightskyblue';
                        course_new[7].style = 'background: lightskyblue';
                        course_new[6].content = course[i].content + course[i].content_sub;
                    }
                }
                return course_new;
            }
        },
        mounted() {
            return 0
        },
        //这里稍微注意，生命周期钩子只能用created和beforeMount，即在实例创建以后，模板渲染之前准备数据
        //和前面App.vue请求数据不一样，那里需要有数据以后才可以向vuex推入数据
        beforeMount() {
            this.selected_course = this.$store.state.course;
        }
    }
</script>

<style scoped>
    #course_table_container {
        width: 100%;
        display: flex;
        margin-right: 8%;
    }

    #course_table_head,
    #monday,
    #tuesday,
    #wednesday,
    #thursday,
    #friday,
    #saturday,
    #sunday {
        flex: 1;
        display: flex;
        flex-direction: column;
        border-right: 1px solid #ddd;
    }

    #sunday {
        border-right: none;
    }

    .item_head {
        height: 30px;
        background: #d5d5d5;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        text-align: center;
    }

    .table_head, .course_content {
        height: 50px;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        display: flex;
    }

    .table_head {
        text-align: center;
    }

    .course_content span {
        width: inherit;
        text-align: center;
        margin: 0 auto;
    }
</style>