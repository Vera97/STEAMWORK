import {api, fakeData} from '../../../api'
import utils from '../../../utils'


const state = {
    group:'',
};

const mutations = {
    GROUP_CONTENT(state, group) {
        state.group = group;
    },
};

const getters = {};

const actions = {

};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
