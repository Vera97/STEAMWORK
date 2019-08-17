import notFound from "./views/notFound/notFound";
import Course from "./views/course/course";
import Assignment from "./views/assignment/assignment";
import PPT from "./views/PPT/PPT";
import Design from "./views/design/design";
import studentsList from "./views/studentsList/studentsList";
import startClass from "./views/startClass/startClass";
import team from "./views/team/team";
import resource from "./views/resource/resource"
import mySuccess from "./views/mySuccess/mySuccess"
import stuClass from "./views/stuClass/stuClass"
import admin from "./views/admin/admin"
import index from "./views/index"

import store from './store'

const Home = () => import('./views/home/home.vue');

const teacherGuard = function(to, form, next) {
    routeBase('teacherId', next)
};

const studentGuard = function(to, from, next) {
    routeBase('stuId', next)
};

const routeBase = (identity, next) => {
    if(!store.state[identity] || store.state[identity] === '') {
        store.commit('PROBE');
        if(!store.state[identity] || store.state[identity] === '') {
            alert('请先登陆');
            next({path: '/'})
        } else next()
    } else next()
};

///正确的姿势建议应该是在组件的created钩子中，或者在组件的beforeEach导航钩子中从服务器请求资
// 源然后提交vuex，组件再同一从vuex中获取数据

let routes = [
    {
        path: '/',
        component: index,
        beforeEnter(to, from, next) {
            store.commit('LOG_OUT');
            next()
        }
    },
    {
        path: '/home',
        component: Home,
        beforeEnter: teacherGuard
    },
    {
        name: 'course',
        path: '/course',
        component: Course,
        props: true,
        beforeEnter: teacherGuard
    },
    {
        path: '/assignment',
        component: Assignment,
        props: true,
        beforeEnter: teacherGuard
    },
    {
        path: '/ppt',
        component: PPT,
        props: true,
        beforeEnter: teacherGuard
    },
    {
        path: '/design',
        component: Design,
        props: true,
        beforeEnter: teacherGuard
    },
    {
        path: '/studentsList',
        component: studentsList,
        props: true,
        beforeEnter: teacherGuard
    },
    {
        path: '/startClass',
        component: startClass,
        props: true,
        beforeEnter: teacherGuard
    },
    {
        path: '/team',
        name: 'team',
        component: team,
        props: true,
        beforeEnter: studentGuard
    },
    {
        path: '/resource',
        component: resource,
        props: true,
        beforeEnter: studentGuard
    },
    {
        path: '/mySuccess',
        component: mySuccess,
        props: true,
        beforeEnter: studentGuard
    },
    {
        path: '/stuClass',
        component: stuClass,
        props: true,
        beforeEnter: studentGuard
    },
    {
        path: '/admin',
        component: admin,
        props: true
    },
    {
        path: '*',
        component: notFound
    }
];

export default routes;
