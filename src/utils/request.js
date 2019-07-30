import {api} from '../api'

export const request = function (obj) {
    if(obj.watch || api.WATCH_ALL) {
        // log what you want to see here.
        if(obj.params.code && obj.params.code === 'stu_score_edit')
        console.log(obj);
    }
    return obj.invoke(obj.params).then(res => {
        if(api.DEVELOPMENT)
            return new Promise(resolve => resolve({data: obj.result}));
        else return new Promise(resolve => resolve(res))
    })
};
