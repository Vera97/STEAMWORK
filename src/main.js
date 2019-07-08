import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App.vue'
//Vuex
import store from './store';
//Vue-router
import VueRouter from 'vue-router'
import routes from './routes'

Vue.config.productionTip = false;
//Vue-router设置
Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

router.beforeEach((to, from, next) => {
    if (to.path === '/home') {
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user === null && to.path !== '/home') {
        next({path: '/home'});
    } else {
        next();
    }
});

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app');
