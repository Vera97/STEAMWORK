import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import Vue from 'vue'
import App from './App.vue'
import VueDrawing from 'vue-drawing'
import echarts from 'echarts'
import VueUeditorWrap from 'vue-ueditor-wrap'
//Vuex
import store from './store';
//Vue-router
import VueRouter from 'vue-router'
import routes from './routes'

Vue.config.productionTip = false;
//Vue-router设置
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueDrawing);
Vue.use(VueUeditorWrap);
Vue.prototype.$echarts = echarts;

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app');
