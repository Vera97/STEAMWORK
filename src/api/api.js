import axios from 'axios';

let base = 'api';

export const DEVELOPMENT = true;

//csrf验证
export function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

export function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    let user = getCookie("username");
    if (user !== "") {
        alert("欢迎再次登录" + user);
    } else {
        user = prompt("输入用户名:", "");
        if (user !== "" && user !== null) {
            setCookie("username", user, 30);
        }
    }
}

let csrftoken = getCookie('csrftoken');
let headers = {'X-CSRFtoken': csrftoken};

/**
 * request to login
 * @param params {Object} fields: userName, password
 * @returns {Promise<AxiosResponse<T> | never>} data fields: code, userdata{head_icon, introduce}
 */
export const requestLogin = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/login`, params, {headers:headers});
};

/**
 * get courses liked by the teacher
 * @param params {object} fields: code ...
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getCourses = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/courses`, params, {headers:headers});
};

/**
 * get the details of a course
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const courseDetail = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/course_teacher`, params, {headers:headers});
};

/**
 * get or edit the classes of a teacher
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const requestClasses = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/classes`, params, {headers:headers});
};

/**
 * url: /teacher/sources
 * @param params
 * @returns {Promise<AxiosResponse<T>>|Promise<any>}
 */
export const requstCourseSteps = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/sources`, params, {headers:headers});
};

/**
 * url: /classroom/confirm_question
 * @param params
 * @returns {Promise<AxiosResponse<T>>|Promise<any>}
 */
export const requestSolveQuestion = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/classroom/confirm_question`, params, {headers:headers});
};

/**
 * url: /classroom/ask_question
 * @param params
 * @returns {Promise<AxiosResponse<T>>|Promise<any>}
 */
export const requestPushQuestion = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/classroom/ask_question`, params, {headers:headers});
};

/**
 * url: /classroom/stu_question_queue
 * @param params
 * @returns {Promise<AxiosResponse<T>>|Promise<any>}
 */
export const requestQueueStu = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/classroom/stu_question_queue`, params, {headers:headers});
};

/**
 * url: /classroom/stu_question_queue
 * @param params
 * @returns {Promise<AxiosResponse<T>>|Promise<any>}
 */
export const requestClearQueueStu = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/classroom/stu_question_queue`, params, {headers:headers});
};

/**
 * url: /courses_prepare/new_course
 * @param params
 * @returns {Promise<AxiosResponse<T>>|Promise<any>}
 */
export const requestNewCourse = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/courses_prepare/new_course`, params, {headers:headers});
};