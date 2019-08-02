const state = {
    courseSection: {
        courseSectionId: '',
        code: ''
    },
    course: {
        courseId: '',
        code: ''
    },
    question: {
        code: '',
        quesList: []
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
    },
    ADD_QUESTION(state,question) {
        state.question = question
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
