const state = {
    exerciseList: [
        {
            exerciseId: '',
            title: '',
            type: '',
            state:'',
        }
    ],
    wealthAllStu:'',
    number: '',
    pptId: '',
    currentExercise:''
};

const getters = {};

const actions = {};

const mutations = {
    SHOW_EXERCISE(state, exerciseList) {
        state.exerciseList = exerciseList;
    },
    SHOW_WEALTH(state, wealthAllStu) {
        state.wealthAllStu=wealthAllStu
    },

    SHOW_NUMBER(state, number) {
        state.number = number;
    },
    SHOW_PPT(state, pptId) {
        state.pptId= pptId;
    },
    ADD_CURRENT_EXERCISE(state, currentExercise){
        state.currentExercise=currentExercise;
    }
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
