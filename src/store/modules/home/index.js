import utils from '../../../utils'
import {api, fakeData} from '../../../api'


const state = {
    /* the courses in the carousel, must have title, introduction, id fields. */
    courses: [],
    /* whether the courses is the user's favorite courses. */
    liked: false,
    /* courses in the class list. */
    all: [],
    totalCount: 0
};

const mutations = {
    // NOTE: the response format is incompatible
    // both courseid and courseId is possible.
    // and courseid or courseId may be string or number
    ADD_COURSES(state, course) {
        state.courses = [];
        course.forEach(item => {
            if(item.courseId) {
                state.courses.push(item)
            } else {
                state.courses.push({
                    title: item.title,
                    introduction: item.introduction,
                    courseId: item.courseid,
                    cover: item.cover
                })
            }
        })
    },
    // do not directly set the length to 0, which cannot be tracked.
    CLEAR_COURSES(state) {
        state.courses = []
    },
    CLEAR_ALL(state) {
        state.all = []
    },
    ADD_ALL(state, course) {
        state.all.push(...course)
    },
    /* get the total count of the courses in the database. */
    PUSH_COUNT(state, count) {
        state.totalCount = count
    },
    /* if search is used, the list is no longer the favorite list. */
    TOGGLE_FAV(state, fav) {
        state.liked = fav
    },
    GET_FAV_COURSES(state) {
        utils.request({
            invoke: api.requestTeacherFavoriteList,
            params: {
                code: 'like',
                userName: parseInt(this.userName)
            },
            result: fakeData.COURSE_LIST
        })
            .then(res => {
                this.commit('ADD_COURSES', res.data);
                this.commit('TOGGLE_FAV', true)
            });
    }
};

const getters = {
    get_fav(state, getters, rootState) {
        let id = rootState.cached_courseId;
        if (state.liked) {
            for (let i of state.courses) {
                if (i.courseId === id) {
                    return true
                }
            }
            return false
        } else
            return null
    }
};

const actions = {
    get_fav_courses (context) {
        return utils.request({
            invoke: api.requestTeacherFavoriteList,
            params: {
                code: 'like',
                userName: parseInt(context.rootState.userName)
            },
            result: fakeData.COURSE_LIST
        })
            .then(res => {
                context.commit('ADD_COURSES', res.data);
                context.commit('TOGGLE_FAV', true)
            });
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
