const state = {
    course:'',
    courseSection:'',
    score:'',
    wealthAll:'',
    answerList:[],
    designContent:'',
    photoList:[],
    selected: false
};

const getters = {};

const actions = {};

const mutations = {
    SELECT_SECTION (state) {
        state.selected = true
    },
    SHOW_COURSE(state, course) {
        state.course= course;
    },
    SHOW_COURSESECTION(state, courseSection) {
        state.courseSection= courseSection;
    },
    SHOW_SCORE(state, score) {
        state.score= score;
    },
    SHOW_WEALTH(state,wealthAll){
        state.wealthAll=wealthAll;
    },
    SHOW_ANSWER(state,answerList){
        state.answerList=answerList
    },
    SHOW_DESIGN(state,designContent){
        state.designContent=designContent
    },
    SHOW_PHOTO(state,photoList){
        state.photoList=photoList
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
