import Vue from 'vue'
import Vuex from 'vuex'
//import * as actions from './actions'
//import * as getters from './getters'

Vue.use(Vuex);

// 应用初始状态
// 应用挂载后从服务器加载实验室包含实验的总表、用户已选择的总表
const state = {
    course: [],
    login_state: false
};

// 定义所需的 mutations
const mutations = {
    PUSH_COURSE(state, course){
        state.course = course
    },
};
// 定义所需的 actions
const actions = {
    push_course_async(commit, course){
        commit('PUSH_COURSE', course);
    },
};
// 定义所需的 getters
const getters = {
    get_course(state){
        return state.course
    },
};

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})