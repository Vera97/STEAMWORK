import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

import home from './modules/home'
import studentsList from './modules/studentsList'
import assignment from './modules/assignment'
// import startClass from './modules/startClass'

Vue.use(Vuex);

// 应用初始状态
const state = {
    teacherId: '',
    userName: '',
    avatar: '',
    introduce: '',
    cached_courseId: ''             /* cache a courseId for the course page. */
};

// 创建 store 实例
export default new Vuex.Store({
    modules: {
        home: home,
        studentsList: studentsList,
        assignment: assignment,
        // startClass:startClass,
    },
    actions,
    getters,
    state,
    mutations
})
