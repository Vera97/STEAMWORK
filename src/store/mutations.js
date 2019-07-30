import {api} from '../api'

const fetch = function (item) {
    let tmp = window.sessionStorage.getItem(item);
    return tmp ? tmp : ''
};

const mutations = {
    LOG_IN (state, userData) {
        api.setCookie('userName', userData.userName);
        api.setCookie('avatar', userData.headIcon);
        api.setCookie('introduce', userData.introduce);
        api.setCookie('teacherId', userData.teacherId);

        state.teacherId = userData.teacherId;
        state.userName = userData.userName;
        state.avatar = userData.headIcon;
        state.introduce = userData.introduce
    },

    LOG_OUT(state) {
        api.setCookie('userName', '');
        api.setCookie('avatar', '');
        api.setCookie('introduce', '');
        api.setCookie('teacherId', '');

        state.teacherId = '';
        state.userName = '';
        state.avatar = '';
        state.introduce = '';
        this.commit('home/CLEAR_COURSES')
    },

    // fetch the user information from cookie 'cause getters cannot re-evaluate when the cookie changes.
    PROBE(state) {
        state.userName = api.getCookie('userName');
        state.avatar = api.getCookie('avatar');
        state.introduce = api.getCookie('introduce');
        state.teacherId = parseInt(api.getCookie('teacherId'))
    },

    CACHE_ID(state, courseId) {
        console.log(`invoked ${courseId}`);
        window.sessionStorage.setItem('cached_courseId', courseId.toString());
        state.cached_courseId = courseId
    },
    PROBE_COURSE(state) {
        state.cached_courseId = parseInt(fetch('cached_courseId'))
    }
};

export default mutations;
