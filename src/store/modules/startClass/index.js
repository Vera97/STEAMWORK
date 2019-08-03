const state = {
    prog: [ ],
    code:'',
    exerciseList: [],
    exerciseMedia:{
        code:'',
        fileType:'',
        mediaUrl:''
    },
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
    },
    PLAY_RESOURCE(state,exerciseMedia)
    {
        state.exerciseMedia=exerciseMedia;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
