
const state = {
    index:''
};

const getters = {};

const actions = {};

const mutations = {
    ADD_INDEX(state, index) {
        state.index = index
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
