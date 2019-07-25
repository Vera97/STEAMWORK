const mutations = {
    LOG_IN (state, userdata) {
        state.login_state = true;
        if(userdata.head_icon) {
            state.avatar = userdata.head_icon
        }
        state.introduce = userdata.introduce
    },

    LOG_OUT(state) {
        state.login_state = false;
        state.avatar = '../assets/avatar.png';
        state.introduce = ''
    },

    CACHE_ID(state, courseId) {
        console.log(`invoked ${courseId}`);
        state.cached_courseId = courseId
    }
};

export default mutations;
