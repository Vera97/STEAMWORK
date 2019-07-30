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
 * url: /login/teacher
 * @param {Object} params
 * @param {String} params.username
 * @param {String} params.password
 * @returns {Promise<any> | {code: number, teacherId: number, userdata: {head_icon: String, introduce: String}}}
 */
export const loginTeacher = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/login/teacher`, params, {headers:headers});
};

/**
 * url: /login/stu
 * @param {Object} params
 * @param {String} params.username
 * @param {String} params.password
 * @returns {Promise<any> | {code: number, stuId: number, userdata: {head_icon: String, introduce: String}}}}
 */
export const loginStudent = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/login/stu`, params, {headers:headers});
};


/**
 * url: /courses/getchunk
 * @param {Object} params
 * @param {String} params.code
 * @param {number} params.gotten
 * @param {number} params.length
 * @returns {Promise<any> | {totalCount: number, chunks: Array<{courseId: number, title: String, cover: String, introduce: String}>}}
 */
export const getCourseChunk = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/courses/getchunk`, params, {headers:headers});
};


/**
 * url: /courses/detail
 * @param {Object} params
 * @param {number} params.courseId
 * @param {Array<String>} params.courseList
 * @param {String} params.courseIntro
 * @returns {Promise<any> | {title: String, courseList: Array<String>, courseIntro: String, courseImgVideo: String, relatedCourse: Array<number>}}
 */
export const requestCourseDetail = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/courses/detail`, params, {headers:headers});
};

/**
 * url: /courses/steps
 * @param {Object} params
 * @param {number} params.courseId
 * @returns {Promise<any> | Array<{title: String, stepId: number}>}
 */
export const requestCourseSteps = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/courses/steps`, params, {headers:headers});
};

/**
 * url: /courses/steps_content
 * @param {Object} params
 * @param {number} params.stepId
 * @returns {Promise<any> | {html: String}}
 */
export const requestStepsContent = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/courses/steps_content`, params, {headers:headers});
};

/**
 * url: /courses/search
 * @param {Object} params
 * @param {String} params.course_name_keyword
 * @returns {Promise<any> | {chunks: Array<{courseid: String, cover: String, introduce: String}>}}
 */
export const requestSearchCourses = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/courses/search`, params, {headers:headers});
};

/**
 * url: /courses/filter
 * @param {Object} params
 * @param {String} params.type
 * @param {String} params.coursename
 * @param {String} params.teacher
 * @param {number} params.time
 * @returns {Promise<any> | {chunks: Array<{courseId: number, title: String, cover: String, introduce: String}>}}
 */
export const requestFilterCourses = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/courses/filter`, params, {headers:headers});
};

/**
 * url: /teacher/favorite_list
 * @param {Object} params
 * @param {String} params.code
 * @param {String} params.userName
 * @param {number} params.courseId
 * @returns {Promise<any> | {code: number}}
 */
export const requestAlterFavoriteTeacher = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/favorite_list`, params, {headers:headers});
};


/**
 * url: /teacher/favorite_courses
 * @param {Object} params
 * @param {String} params.code
 * @param {number} params.teacherId
 * @param {number} params.courseId
 * @returns {Promise<any> | Array<{courseid: number, cover: String, introduce: String}>}
 */
export const requestTeacherFavoriteList = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/favorite_courses`, params, {headers:headers});
};

/**
 * url: /teacher/classes
 * @param {Object} params
 * @param {String} params.code
 * @param {number} params.teacherId
 * @param {Array<{id: number, className: String, createDate: String}>} params.classList
 * @returns {Promise<any> | {code: String, classList: Array<{id: number, className: String, createDate: String}>}}
 */
export const requestTeacherClasses = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/classes`, params, {headers:headers});
};

/**
 * url: /teacher/stu
 * @param {Object} params
 * @param {String} params.code
 * @param {number} params.classId
 * @param {Array<{stuId: number, stuName: String}>} params.stulist
 * @returns {Promise<any> | {code: String, stuList: Array<{stuId: number, stuName: String}>}}
 */
export const requestOrAlterStudentList = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/stu`, params, {headers:headers});
};

/**
 * url: /teacher/stu_score
 * @param {Object} params
 * @param {String} params.code
 * @param {number} params.stuId
 * @param {number} params.courseId
 * @param {String} params.courseTimeName
 * @param {number} params.score
 * @returns {Promise<any> | {code: String, score: number}}
 */
export const requestClassStuScore = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/stu_score`, params, {headers:headers});
};

/**
 * url: /teacher/course_list
 * @param {Object} params
 * @param {String} params.code
 * @param {number} params.classId
 * @param {Array<{id: number, name: String}>} params.courseList
 * @returns {Promise<any> | {code: String, courseList: Array<{id: number, name: String}>}}
 */
export const requestClassCourseList = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/course_list`, params, {headers:headers});
};
