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
    ADD_COURSES(state, course) {
        state.courses = [];
        state.courses.push(...course)
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
    }
};

const getters = {
    get_fav(state, getters, rootState) {
        // note that id fetched from localStorage is always string
        let id = parseInt(rootState.cached_courseId);
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
                teacherId: parseInt(context.rootState.teacherId)
            },
            result: fakeData.REQUEST_FAVORITE_COURSE
        })
            .then(res => {
                context.commit('ADD_COURSES', res.data.favorites);
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
