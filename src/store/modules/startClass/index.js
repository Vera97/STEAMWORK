import {api, fakeData} from '../../../api'
import utils from '../../../utils'

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

const actions = {
    getStuList(context) {
        return utils.request({
            invoke: api.requestStudentList,
            params: {
                classId: parseInt(context.state.classId)
            },
            result: fakeData.STUDENT_LIST
        })
            .then(res => {
                context.state.stuList = [];
                context.state.stuList = res.data.stuList.map(item => {
                    return {
                        stuId: item.stuId,
                        stuName: item.stuName,
                        stuNumber: item.stuNumber,
                        selected: false
                    }
                })
            })
    }
};

const mutations = {
    GET_PROG(state, prog) {
        state.prog = prog
    },
    UPDATE_PROG(state, code) {
        state.code = code
    },
    ADD_EXERCISE(state,exerciseList)
    {
        state.exerciseList=exerciseList;
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
