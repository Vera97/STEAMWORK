import {api, fakeData} from '../../../api'
import utils from '../../../utils'


const state = {
    stuList: [],
    courseId: '',        /* the id of the course being display. */
    periodsList: []
};

const mutations = {
    SUBMIT_ID(state, courseId) {
        state.courseId = courseId
    },
    REMOVE_STUDENT(state, stuId) {
        // note that the id is string but when fetched from the table, it becomes a number.
        state.stuList = state.stuList.filter(item => {
            return item.stuId.toString() !== stuId.toString()
        })
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
     * @param courseId the courseId of the course to be rendered
     * @returns {*}
     */
    async render_course (context, courseId) {
        context.commit('SUBMIT_ID', courseId);

        context.state.stuList = [];
        context.state.periodsList = [];

        let tmp;

        await utils.request({
            invoke: api.courseDetail,
            params: {
                code: 'course_detail',
                courseId: courseId
            },
            result: fakeData.COURSE_DETAIL
        })
            .then(res => {
                tmp = res.data.courseList;
            });

        await utils.request({
            invoke: api.courseDetail,
            params: {
                code: 'stu_list',
                classId: context.state.classId
            },
            result: fakeData.STUDENT_LIST
        })
            .then(res => {
                for(let i of res.data.stuList) {
                    context.state.stuList.push({...i, scoreList: []})
                }
            });

        for(let k = 0; k < context.state.stuList.length; k++) {
            let id = context.state.stuList[k].stuId.toString();

            await utils.request({
                invoke: api.requestClasses,
                params: {
                    code: 'stu_score',
                    stuId: id
                },
                result: fakeData.STUDENT_SCORE
            })
                .then(res => {
                    for(let i in res.data) {
                        context.state.stuList[k].scoreList.push(res.data[i])
                    }
                })
        }

        context.state.periodsList.push(...tmp)
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
