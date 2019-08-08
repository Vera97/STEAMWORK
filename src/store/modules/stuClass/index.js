const state = {
    number: '',
    pptId: '',
    exerciseList: [
        {
            exerciseId: '',
            title: '',
            type: '',
        }
    ]
};

const getters = {};

const actions = {};

const mutations = {
    ADD_NUMBER(state, number) {
        state.number = number;
    },
    ADD_pptId(state, pptId) {
        state.pptId = pptId;
    },
    ADD_EXERCISE(state, exerciseList) {
        state.exerciseList = exerciseList;
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
