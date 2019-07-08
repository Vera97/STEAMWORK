import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        select: [],
        outputList: []
    },
    mutations: {
        select: (state, item) => {
            state.select.push(item)
        },
        delete: (state, key) => {
            let tmp = {};
            for(let i in state.select) {
                if(i === key) {
                    tmp[i] = state.select[i];
                    break;
                }
            }

            let index = state.select.indexOf(tmp);
            state.select.splice(index, 1);
        },
        clear: (state) => {
            state.select = [];
        },
        filter: state => {

        }
    }
});


export default store
