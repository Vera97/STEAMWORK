import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        /* the courses in the carousel, must have title, introduction, id fields. */
        courses: [
            {
                title: '课程1',
                introduction: '我是一门好课',
                courseid: '1',
                cover: ''
            },
            {
                title: '课程2',
                introduction: '我是一门好课',
                courseid: '2',
                cover: ''
            },
            {
                title: '课程3',
                introduction: '我是一门好课',
                courseid: '3',
                cover: ''
            },
            {
                title: '课程4',
                introduction: '我是一门好课',
                courseid: '4',
                cover: ''
            }
        ]
    },
    mutations: {
        addCourses(state, course) {
            state.courses.push(...course)   /* the response is pushed into the original courses. So that the course won't be empty. */
        }
    }
});


export default store
