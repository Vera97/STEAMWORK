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
                id: '1'
            },
            {
                title: '课程2',
                introduction: '我是一门好课',
                id: '2'
            },
            {
                title: '课程3',
                introduction: '我是一门好课',
                id: '3'
            },
            {
                title: '课程4',
                introduction: '我是一门好课',
                id: '4'
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
