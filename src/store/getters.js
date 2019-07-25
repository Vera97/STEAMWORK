
const getters = {
    get_login_state(state) {
        return state.login_state
    },
    get_avatar_url(state) {
        return state.avatar
    },
    get_username(state) {
        return state.userName
    },
    get_introduce(state) {
        return state.introduce
    }
};

export default getters;
