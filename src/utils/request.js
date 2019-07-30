import {api} from '../api'

export const request = function (obj) {
    return obj.invoke(obj.params).then(res => {
        if(api.DEVELOPMENT)
            return new Promise(resolve => resolve({data: obj.result}));
        else return new Promise(resolve => resolve(res))
    })
};