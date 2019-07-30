const state = {
    prog: [ ],
    code:''
};

const getters = {};

const actions = {};

const mutations = {
    GET_PROG(state, prog) {
        state.prog = prog
    },
    UPDATE_PROG(state, code) {
        state.code = code
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
