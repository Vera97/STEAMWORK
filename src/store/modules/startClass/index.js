const state = {
    prog: [ ],
    code:'',
    exerciseList: [],
    exerciseMedia:{
        code:'',
        fileType:'',
        mediaUrl:''
    },
    stuList: [],
    classId: '',
    exerciseText:{
        code: '',
        content: '',
    },
    exerciseQuestion:{
        code: '',
        contentQuestion: '',
        contentAnswerList: [
            {choice: '', choiceContent: ''},
            {choice: '', choiceContent: ''},
            {choice: '', choiceContent: ''},
            {choice: '', choiceContent: ''},
        ],
        answer: ['A', 'B',]
    }
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
    ADD_EXERCISE(state, exerciseList)
    {
        state.exerciseList = exerciseList;
    },
    PLAY_RESOURCE(state,exerciseMedia)
    {
        state.exerciseMedia=exerciseMedia;
    },
    SELECT_CLASS(state, classId) {
        state.classId = classId
    },
    TEXT_RESOURCE(state,exerciseText)
    {
        state.exerciseText=exerciseText;
    },
    QUESTION_RESOURCE(state,exerciseQuestion)
    {
        state.exerciseQuestion=exerciseQuestion;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
