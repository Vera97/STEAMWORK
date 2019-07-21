import axios from 'axios';

let base = '';

/**
 * request to login
 * @param params {Object} fields: userName, password
 * @returns {Promise<AxiosResponse<T> | never>} data fields: code, userdata{head_icon, introduce}
 */
export const requestLogin = params => {
    return axios.post(`${base}/login`, params);
};

/**
 * get courses liked by the teacher
 * @param params {object} fields: code ...
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getCourses = params => {
    return axios.post(`${base}/courses`, params);
};

/**
 * get the details of a course
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const courseDetail = params => {
    return axios.post(`${base}/course_teacher`, params);
};
