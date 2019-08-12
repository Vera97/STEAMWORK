import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

import home from './modules/home'
import assignment from './modules/assignment'
import ppt from './modules/ppt'
import startClass from './modules/startClass'
import stuClass from './modules/stuClass'
import team from './modules/team'

Vue.use(Vuex);

const state = {
    teacherId: '',
    stuId: '',
    userName: '',
    avatar: '',
    introduce: '',
    cached_courseId: ''             /* cache a courseId for the course page. */
};

// 创建 store 实例
export default new Vuex.Store({
    modules: {
        home: home,
        assignment: assignment,
        ppt: ppt,
        startClass: startClass,
        stuClass:stuClass,
        team:team,
    },
    actions,
    getters,
    state,
    mutations
})
