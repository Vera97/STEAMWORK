import axios from 'axios';

let base = '';

/**
 * request to login
 * @param params {Object} fields: username, password
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
