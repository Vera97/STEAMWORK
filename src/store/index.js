import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

import home from './modules/home'
import studentsList from './modules/studentsList'

Vue.use(Vuex);

// 应用初始状态
const state = {
    login_state: false,
    userName: '',
    avatar: '../assets/avatar.png',
    introduce: '',
    cached_courseId: ''             /* cache a courseId for the course page. */
};

// 创建 store 实例
export default new Vuex.Store({
    modules: {
        home: home,
        studentsList: studentsList
    },
    actions,
    getters,
    state,
    mutations
})
