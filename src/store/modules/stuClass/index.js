const state = {
    number: '',
    pptId: '',
    exerciseList: [
        {
            exerciseId: '',
            title: '',
            type: '',
            state:'',
        }
    ],
    stuList: [],
    exerciseText:{
        code: '',
        content: '',
    },
    exerciseMedia:{
        code:'',
        mediaUrl:''
    },
    exercise:'',
    wealthAll:''
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
    TEXT_RESOURCE(state,exerciseText)
    {
        state.exerciseText=exerciseText;
    },
    PLAY_RESOURCE(state,exerciseMedia)
    {
        state.exerciseMedia=exerciseMedia;
    },
    TEXT_DESIGN(state,exerciseDesign){
        state.exerciseDesign = exerciseDesign;
    },
    ADD_CURRENT_EXERCISE(state,exercise){
        state.exercise = exercise;
    },
    ADD_WEALTH(state, wealthAll) {
        state.wealthAll = wealthAll;
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
