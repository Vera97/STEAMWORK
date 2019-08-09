import {api, fakeData} from '../../../api'
import utils from '../../../utils'


const state = {
    stuList: [],
    courseId: '',        /* the id of the course being display. */
    classId: '',
    periodsList: [],
    relatedList: []
};

const mutations = {
    SUBMIT_ID(state, {classId, courseId}) {
        state.classId = classId;
        state.courseId = courseId
    },
    REMOVE_STUDENT(state, stuId) {
        // note that the id is string but when fetched from the table, it becomes a number.
        state.stuList = state.stuList.filter(item => {
            return item.stuId.toString() !== stuId.toString()
        })
    },
    ALTER_TABLE(state, stuList) {
        state.stuList = stuList
    }
};

const getters = {};

const actions = {
    /**
     * first get the periods of the courses.
     * then get the student list.
     * further get the cores of each student.
     * note that the periods should be assigned into state at last.
     * @param context
     * @returns {*}
     */
    async render_course (context) {

        context.state.periodsList = [];

        let tmp;

        await utils.request({
            invoke: api.requestCourseDetail,
            params: {
                courseId: parseInt(context.state.courseId)
            },
            result: fakeData.COURSE_DETAIL
        })
            .then(res => {
                // get the names corresponding to the courseId.
                state.relatedList = [];
                for(let i of res.data.relatedCourse) {
                    utils.request({
                        invoke: api.requestCourseDetail,
                        params: {
                            courseId: i
                        },
                        result: fakeData.COURSE_DETAIL
                    })
                        .then(res => {
                            state.relatedList.push({
                                title: res.data.title,
                                courseId: i
                            })
                        })
                }
                tmp = res.data.courseSection;
            });

        await context.dispatch('getStudentsList');

        for(let k = 0; k < context.state.stuList.length; k++) {
            let id = context.state.stuList[k].stuId;

            // get the score of each student according to all of the period names
            for(let i of tmp) {
                await utils.request({
                    invoke: api.requestClassStuScore,
                    params: {
                        code: 'stu_score',
                        stuId: parseInt(id),
                        courseId: parseInt(context.state.courseId),
                        courseSectionId: i.courseSectionId
                    },
                    result: fakeData.STUDENT_SCORE
                })
                    .then(res => {
                        context.state.stuList[k].scoreList[i.courseSectionName] = res.data.score
                    })
            }

        }

        context.state.periodsList.push(...tmp)
    },

    async getStudentsList(context) {
        context.state.stuList = [];

        return utils.request({
            invoke: api.requestStudentList,
            params: {
                classId: parseInt(context.state.classId)
            },
            result: fakeData.STUDENT_LIST
        })
            .then(res => {
                for(let i of res.data.stuList) {
                    context.state.stuList.push({...i, scoreList: {}})
                }
            });
    },

    // used to render classes which have no related courses
    async renderClass(context) {
        context.state.periodsList = [];
        return context.dispatch('getStudentsList')
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
