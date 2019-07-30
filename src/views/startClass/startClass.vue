<template>
    <el-container>
        <el-header><Nav></Nav></el-header>
        <el-main class="main-box">
            <el-row :gutter="24">
                <el-col :span="5"><classList></classList><askList></askList></el-col>
                <el-col :span="14"><show></show></el-col>
                <el-col :span="5"><startActivities></startActivities><monitor></monitor></el-col>
            </el-row>

        </el-main>
        <el-footer><Footer></Footer></el-footer>
    </el-container>
</template>

<script>
    import Nav from "../../components/hd-nav";
    import Footer from "../../components/hd-footer";
    import classList from "../../components/class-list"
    import askList from "../../components/startClass/ask-list";
    import monitor from "../../components/startClass/monitor";
    import show from "../../components/startClass/show";
    import startActivities from "../../components/startClass/start-activities";

    import {api, fakeData} from '../../api';
    import utils from '../../utils';
    import store from '../../store';

    export default {
        name: "startClass",
        components: {askList, monitor, show, startActivities, classList, Footer, Nav},
        props: {
            id: String
        },
        data () {
            return {
                name: 'startClass'
            }
        },
        methods: {
            async getSubCourses() {
                let that = this;
                let flag = false;

                for (let k = 0; k < this.listData.length; k++) {
                    let classId = this.listData[k].id.toString();

                    await utils.request({
                        invoke: api.courseDetail,
                        params: {
                            code: 'course_list',           /* need a method to get the list of courses. */
                            classId: classId
                        },
                        result: fakeData.COURSES_IN_CLASS
                    })
                        .then(res => {
                            that.listData[k].courseDetail.push(...res.data.courseList);
                        });

                    if (!flag) {
                        if(that.listData[k].courseDetail.length !== 0) {
                            flag = true;
                            let id = that.listData[k].courseDetail[0].id;

                            // use the id to fetch the list of student
                            // if currently no course has been rendered
                            if(store.state.studentsList.courseId === '') {
                                store.dispatch('studentsList/render_course', id).then()
                            }
                        }
                    }
                }
            }
        },
    }
</script>

<style scoped>
    *{
        margin-left: 0;
        padding-left: 0;
    }
    .main-box{
        margin-left: 10px;
    }

</style>
