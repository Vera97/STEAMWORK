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
                courseId: '1',
                cover: ''
            },
            {
                title: '课程2',
                introduction: '我是一门好课',
                courseId: '2',
                cover: ''
            },
            {
                title: '课程3',
                introduction: '我是一门好课',
                courseId: '3',
                cover: ''
            },
            {
                title: '课程4',
                introduction: '我是一门好课',
                courseId: '4',
                cover: ''
            }
        ],
        /* courses in the class list. */
        all: [
            {
                title: '课程1',
                introduction: '我是一门好课',
                courseId: '1',
                cover: ''
            },
            {
                title: '课程2',
                introduction: '我是一门好课',
                courseId: '2',
                cover: ''
            },
            {
                title: '课程3',
                introduction: '我是一门好课',
                courseId: '3',
                cover: ''
            },
            {
                title: '课程4',
                introduction: '我是一门好课',
                courseId: '4',
                cover: ''
            },
            {
                title: '课程5',
                introduction: '我是一门好课',
                courseId: '5',
                cover: ''
            },
            {
                title: '课程6',
                introduction: '我是一门好课',
                courseId: '6',
                cover: ''
            }
        ],
        totalCount: 200
    },
    mutations: {
        ADD_COURSES(state, course) {
            state.courses.push(...course)   /* the response is pushed into the original courses. So that the course won't be empty. */
        },
        CLEAR_ALL(state) {
            state.all.length = 0
        },
        ADD_ALL(state, course) {
            state.all.push(...course)
        },
        /* get the total count of the courses in the database. */
        PUSH_COUNT(state, count) {
            state.totalCount = count
        }
    }
});


export default store
