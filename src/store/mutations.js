import {api} from '../api'

const fetch = function (item) {
    let tmp = window.sessionStorage.getItem(item);
    return tmp ? tmp : ''
};

const mutations = {
    LOG_IN (state, userdata) {
        api.setCookie('userName', userdata.userName);
        api.setCookie('avatar', userdata.head_icon);
        api.setCookie('introduce', userdata.introduce);

        state.userName = userdata.userName;
        state.avatar = userdata.head_icon;
        state.introduce = userdata.introduce
    },

    LOG_OUT(state) {
        api.setCookie('userName', '');
        api.setCookie('avatar', '');
        api.setCookie('introduce', '');

        state.userName = '';
        state.avatar = '';
        state.introduce = '';
        this.commit('home/CLEAR_COURSES')
    },

    // fetch the user information from cookie 'cause getters cannot re-evaluate when the cookie changes.
    PROBE(state) {
        state.userName = api.getCookie('userName');
        state.avatar = api.getCookie('avatar');
        state.introduce = api.getCookie('introduce')
    },

    CACHE_ID(state, courseId) {
        console.log(`invoked ${courseId}`);
        window.sessionStorage.setItem('cached_courseId', courseId.toString());
        state.cached_courseId = courseId
    },
    PROBE_COURSE(state) {
        state.cached_courseId = fetch('cached_courseId')
    }
};

export default mutations;