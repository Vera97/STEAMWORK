import axios from 'axios';

let base = 'api';

export const DEVELOPMENT = true;

export const WATCH_ALL = false;

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
 * @param {String} params.userName
 * @param {String} params.passWord
 * @returns {Promise<any> | {code: number, teacherId: number, userData: {headIcon: String, introduce: String}}}
 */
export const loginTeacher = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/login/teacher`, params, {headers:headers});
};

/**
 * url: /login/stu
 * @param {Object} params
 * @param {String} params.userName
 * @param {String} params.passWord
 * @returns {Promise<any> | {code: number, stuId: number, userdata: {headIcon: String, introduce: String}}}}
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
 * @returns {Promise<any> | {title: String, courseSection: Array<{courseSectionId: number, courseSectionName: String}>, courseIntro: String, courseImgVideo: String, relatedCourse: Array<number>}}
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
 * @returns {Promise<any> | {chunks: Array<{title: String, courseId: number, cover: String, introduce: String}>}}
 */
export const requestSearchCourses = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/courses/search`, params, {headers:headers});
};

/**
 * url: /courses/filter
 * @param {Object} params
 * @param {String} params.type
 * @param {String} params.courseName
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
 * @param {String} params.teacherId
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
 * @param {number} params.teacherId
 * @returns {Promise<any> | Array<{title: String, courseId: number, cover: String, introduce: String}>}
 */
export const requestTeacherFavoriteList = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/favorite_courses`, params, {headers:headers});
};

/**
 * url: /teacher/teacher_courses
 * @param {Object} params
 * @param {number} params.teacherId
 * @returns {Promise<any> | {courses: Array<{courseId: number, title: String, cover: String, introduce: String}>}}
 */
export const requestTeacherOwnCourses = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/teacher_courses`, params, {headers:headers});
};

/**
 * url: /teacher/classes
 * @param {Object} params
 * @param {number} params.teacherId
 * @returns {Promise<any> | {classList: Array<{classId: number, className: String, createDate: String}>}}
 */
export const requestTeacherClasses = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/classes`, params, {headers:headers});
};

/**
 * url: /teacher/edit_classes
 * @param {Object} params
 * @param {String} params.code
 * @param {number} params.teacherId
 * @param {number} params.classId
 * @param {String} params.className
 * @returns {Promise<any> | {code: number, class: {classId: number, className: String, createDate: String}}}
 */
export const requestAlterClassList = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/edit_classes`, params, {headers:headers});
};

/**
 * url: /teacher/get_stulist
 * @param {Object} params
 * @param {number} params.classId
 * @returns {Promise<{code: number, stuList: Array<{stuId: number, stuName: String, stuNumber: number}>}>}
 */
export const requestStudentList = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/get_stulist`, params, {headers:headers});
};

/**
 * url: /teacher/edit_stulist
 * @param {Object} params
 * @param {String} params.code
 * @param {number} params.classId
 * @param {number} params.stuId
 * @returns {Promise<any> | {code: number}}
 */
export const requestAlterStudentList = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/edit_stulist`, params, {headers:headers});
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
 * url: /teacher/get_courselist
 * @param {Object} params
 * @param {number} params.classId
 * @returns {Promise<any> | {code: number, courseList: Array<{courseId: number, name: String}>}}
 */
export const requestClassCourseList = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/get_courselist`, params, {headers:headers});
};

/**
 * url: /teacher/edit_courselist
 * @param {Object} params
 * @param {number} params.classId
 * @param {number} params.courseId
 * @returns {Promise<any> | {code: number}}
 */
export const requestAlterClassCourseList = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/edit_courselist`, params, {headers:headers});
};

/**
 * url: /classroom/ppt
 * @param {Object} params
 * @param {number} params.courseSectionId
 * @returns {Promise<any> | {code: number, pptImagesList: Array<String>}}
 */
export const requestSlides = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/edit_courselist`, params, {headers:headers});
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

export const requestPushProgressStu = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/classroom/stu_progress`, params, {headers:headers});
};
export const requestGetProgressStu = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/classroom/stu_progress`, params, {headers:headers});
};
export const requestNewCourse = params => {
    if (DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post('${base)/course_prepare/new_course', params, {headers: headers});
};
export const requestNewCourseSection = params => {
    if (DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/course_prepare/new_coursesection`, params, {headers: headers});
};
export const requestDeleteCourseSection = params => {
    if (DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post('${base)/courses_prepare/delete_coursesection', params, {headers: headers});
};
export const requestDeleteCourse = params => {
    if (DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post('${base)/courses_prepare/delete_course', params, {headers: headers});
};
export const requestEditCourseName = params => {
    if (DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post('${base)/courses_prepare/edit_course_name', params, {headers: headers});
};

/**
 * url: /courses_prepare/new_exercise
 * @param {Object} params
 * @param {number} params.pptId
 * @param {number} params.pptPage
 * @param {String} params.type
 * @param {String} params.content
 * @returns {Promise<any> | {code: number, exerciseId: number}}
 */
export const requestNewExercise = params => {
    if (DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/courses_prepare/new_exercise`, params, {headers: headers});
};

/**
 * url: /courses_prepare/delete_exercise
 * @param {Object} params
 * @param {number} params.exerciseId
 * @returns {Promise<any> | {code: number}}
 */
export const requestDeleteExercise = params => {
    if (DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/courses_prepare/delete_exercise`, params, {headers: headers});
};
export const requestExercise= params => {
    if(DEVELOPMENT) return new Promise(  resolve=> resolve());
    return axios.post('${base)/classroom/ppt_exercise',params,{headers:headers});
};
export const requestExerciseMedia= params => {
    if(DEVELOPMENT) return new Promise(  resolve=> resolve());
    return axios.post('${base)/classroom/exercise/media',params,{headers:headers});
};
let upload_headers = {'X-CSRFtoken': csrftoken, 'Content-Type': 'multipart/form-data'};
export const uploadFile = params => {
    if (DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/api/courses_prepare/new_ppt`, params, {headers: upload_headers});

};
export const requestNewExerciseQuestion = params => {
    if (DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/courses_prepare/new_exercise/question`, params, {headers: headers});
};
export const requestEditExerciseQuestion = params => {
    if (DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/courses_prepare/edit_exercise/question`, params, {headers: headers});
};
export const requestNewExerciseText = params => {
    if (DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/courses_prepare/new_exercise/text`, params, {headers: headers});
};
export const requestEditExerciseText = params => {
    if (DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/courses_prepare/edit_exercise/text`, params, {headers: headers});
};

export const requestExerciseText = params => {
    if (DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/classroom/exercise/text`, params, {headers: upload_headers});
};
export const requestExerciseQuestion = params => {
    if (DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/classroom/exercise/question`, params, {headers: upload_headers});
};


