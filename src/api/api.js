import axios from 'axios';

let base = '';

/**
 * request to login
 * @param params {Object} fields: username, password
 * @returns {Promise<AxiosResponse<T> | never>}
 */
export const requestLogin = params => {
    return axios.post(`${base}/login`, params).then(res => res.data);
};

export const getUserList = params => {
    return axios.get(`${base}/user/list`, {params: params});
};

/**
 * get course list by the keyword
 * @param params {Object} fields: keyword
 * @returns {Promise<AxiosResponse<T>>}
 */
export const searchByKeyword = params => {
    return axios.post(`${base}/search/keyword`, params);
};

/**
 * get course list by the search condition provided.
 * @param params {object} fields: kind, class, teacher, time, other.
 * @returns {Promise<AxiosResponse<T>>}
 */
export const searchByCondition = params => {
    return axios.post(`${base}/search/condition`, params);
};
