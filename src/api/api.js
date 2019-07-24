import axios from 'axios';

let base = '';

export const DEVELOPMENT = true;


/**
 * request to login
 * @param params {Object} fields: userName, password
 * @returns {Promise<AxiosResponse<T> | never>} data fields: code, userdata{head_icon, introduce}
 */
export const requestLogin = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/login`, params);
};

/**
 * get courses liked by the teacher
 * @param params {object} fields: code ...
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getCourses = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/courses`, params);
};

/**
 * get the details of a course
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const courseDetail = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/course_teacher`, params);
};

/**
 * get or edit the classes of a teacher
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const requestClasses = params => {
    if(DEVELOPMENT) return new Promise(resolve => resolve());
    return axios.post(`${base}/teacher/classes`, params);
};
