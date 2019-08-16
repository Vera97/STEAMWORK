import {api} from '../api'

const fetch = function (item) {
    let tmp = window.sessionStorage.getItem(item);
    return tmp ? tmp : ''
};

const mutations = {
    LOG_IN_TEACHER (state, userData) {
        api.setCookie('userName', userData.userName);
        api.setCookie('avatar', userData.headIcon);
        api.setCookie('introduce', userData.introduce);
        api.setCookie('teacherId', userData.teacherId);

        state.teacherId = userData.teacherId;
        state.userName = userData.userName;
        state.avatar = userData.headIcon;
        state.introduce = userData.introduce
    },

    LOG_IN_STUDENT(state, userData) {
        api.setCookie('userName', userData.userName);
        api.setCookie('avatar', userData.headIcon);
        api.setCookie('introduce', userData.introduce);
        api.setCookie('stuId', userData.stuId);

        state.stuId = userData.stuId;
        state.userName = userData.userName;
        state.avatar = userData.headIcon;
        state.introduce = userData.introduce
    },

    LOG_OUT(state) {
        api.setCookie('userName', '');
        api.setCookie('avatar', '');
        api.setCookie('introduce', '');
        api.setCookie('teacherId', '');
        api.setCookie('stuId', '');

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
        let tmp = api.getCookie('teacherId');
        state.teacherId = tmp === '' ? '' : parseInt(tmp);
        tmp = api.getCookie('stuId');
        state.stuId = tmp === '' ? '' : parseInt(tmp)
    },

    CACHE_ID(state, courseId) {
        window.sessionStorage.setItem('cached_courseId', courseId.toString());
        state.cached_courseId = courseId
    },
    PROBE_COURSE(state) {
        let tmp = fetch('cached_courseId');
        state.cached_courseId = tmp === '' ? '' : parseInt(tmp)
    },
    STU_CLASSROOM_ID(state, {classroomId}) {
        state.classroomId = classroomId
    },
    STU_GROUP_LIST(state, {groupList}) {
        state.groupList = [];
        if(groupList.length !== 0) {
            state.groupList.push(...groupList)
        }
    },
    STU_COURSE_SECTION_ID(state, {courseSectionId}) {
        state.courseSectionId = courseSectionId
    },
    STU_PPT_ID(state, {pptId}) {
        state.pptId = pptId
    },
    STU_PPT_PAGE(state, {currentPage}) {
        state.currentPage = currentPage
    }
};

export default mutations;
