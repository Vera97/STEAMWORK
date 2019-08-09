
const getters = {
    get_avatar_url(state) {
        return state.avatar
    },
    get_username(state) {
        return state.userName
    },
    get_introduce(state) {
        return state.introduce
    },
    get_teacherId(state) {
        return state.teacherId
    },
    get_stuId(state) {
        return state.stuId
    }
};

export default getters;
