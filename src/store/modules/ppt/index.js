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
    },
    flag:'',
    text: {
        pptId: '',
        pptPage: '',
        type: '',
        content: '',
    },
    newQuestion:{
        pptId: '',
        pptPage: '',
        type: '',
        contentQuestion: '',
        contentAnswerList: [{choice: '', choiceContent: ''}, ],
        answer: ''
    }
    
};

const getters = {};

const actions = {};

const mutations = {
    ADD_SECTION(state, courseSection) {
        state.courseSection= courseSection;
    },
    ADD_COURSE(state, course) {
        state.course= course;
    },
    ADD_QUESTION(state,question) {
        state.question = question;
    },
    ADD_FLAG(state,flag){
        state.flag = flag;
    },
    ADD_TEXT(state,content){
        state.content = content;
    },
    ADD_QUESTIONS(state, question) {//教师上课页面的新建活动里的新建问题
        state.question = question;
    },
    
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
