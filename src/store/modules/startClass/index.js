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
    classId: ''
};

const getters = {};

const actions = {
    getStuList(context) {
        utils.request({
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
