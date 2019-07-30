const state = {
    step: {
        title: '',
        stepId: ''
    },
    content: ''
};

const getters = {};

const actions = {};

const mutations = {
    ADD_STEP(state, step) {
        state.step = step
    },
    ADD_CONTENT(state, content) {
        state.content = content
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}