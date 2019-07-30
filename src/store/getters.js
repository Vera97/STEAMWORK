//test
export const getCount = state => {
    return state.course
};


const getters = {
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