const state = {
    prog: [ ],
    code:'',
    exerciseList: []
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
    ADD_EXERCISE(state,exerciseList)
    {
        state.exerciseList=exerciseList;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
