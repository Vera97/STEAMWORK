import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import assignment from './modules/assignment'
import startClass from './modules/startClass'
import ppt from './modules/ppt'
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
// 创建 store 实例
export default new Vuex.Store({
    modules: {
        assignment: assignment,
        startClass: startClass,
        ppt:ppt
    },
    actions,
    getters,
    state,
    mutations
})