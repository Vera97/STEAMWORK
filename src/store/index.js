import Vue from 'vue'
import Vuex from 'vuex'
//import * as actions from './actions'
//import * as getters from './getters'

Vue.use(Vuex);

// 应用初始状态
// 应用挂载后从服务器加载实验室包含实验的总表、用户已选择的总表
const state = {
    login_state: false,
    username: '',
    avatar: '../assets/avatar.png',
    introduce: ''
};

// 定义所需的 mutations
const mutations = {
    LOG_IN(state, userdata) {
        state.login_state = true;
        if(userdata.head_icon) {
            state.avatar = userdata.head_icon
        }
        state.introduce = userdata.introduce
    },
    LOG_OUT(state) {
        state.login_state = false;
        state.avatar = '../assets/avatar.png';
        state.introduce = ''
    }
};
// 定义所需的 actions
const actions = {
    push_course_async(commit, course){
        commit('PUSH_COURSE', course);
    },
};
// 定义所需的 getters
const getters = {
    get_login_state(state) {
        return state.login_state
    },
    get_avatar_url(state) {
        return state.avatar
    },
    get_username(state) {
        return state.username
    },
    get_introduce(state) {
        return state.introduce
    }
};

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})
