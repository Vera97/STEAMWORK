const state = {
    courseSection: {
        courseSectionId: '',
        code: ''
    },
    course:{
        courseId: '',
        code: ''
    }
};

const getters = {};

const actions = {};

const mutations = {
    ADD_SECTION(state, courseSection) {
        state.courseSection= courseSection
    },
    ADD_COURSE(state, course) {
        state.course= course
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}