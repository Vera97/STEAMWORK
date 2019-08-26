
const state = {
    index: '',
    courseData:[],
    pptList:[]
};

const getters = {};

const actions = {};

const mutations = {
    ADD_INDEX(state, index) {
        state.index = index
    },
    ADD_COURSE_DATA(state, courseData) {
        state.courseData = courseData
    },
    ADD_PPT_LIST(state,pptList ) {
        state.pptList = pptList
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
