/*webPack高版本已经不推荐使用，所以这里还是用官方推荐的工厂函数
const  Login = loadcomponents => require.ensure([], () => loadcomponents(require('@/components/login/login.vue')), 'home');
const Main = loadcomponents => require.ensure([], () => loadcomponents(require('@/components/Main.vue')), 'main');
//
const Navleft = loadcomponents => require.ensure([], () => loadcomponents(require('@/components/experiment/navleft.vue')), 'experiment');
const experimentTree = loadcomponents => require.ensure([], () => loadcomponents(require('@/components/experiment/experimentTree.vue')), 'experiment');
const listTable = loadcomponents => require.ensure([], () => loadcomponents(require('@/components/experiment/listTable.vue')), 'experiment');
const labinfo = loadcomponents => require.ensure([], () => loadcomponents(require('@/components/experiment/labinfo.vue')), 'experiment');
*/

import notFound from "./views/notFound/notFound";
import Course from "./views/course/course";
import Assignment from "./views/assignment/assignment";
import PPT from "./views/PPT/PPT";
import Design from "./views/design/design";
import studentsList from "./views/studentsList/studentsList";
import startClass from "./views/startClass/startClass";

const Home = () => import('./views/home/home.vue');

///正确的姿势建议应该是在组件的created钩子中，或者在组件的beforeEach导航钩子中从服务器请求资
// 源然后提交vuex，组件再同一从vuex中获取数据

let routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        name: 'course',
        path: '/course',
        component: Course,
        props: true
    },
    {
        path: '/assignment',
        component: Assignment,
        props: true
    },
    {
        path: '/ppt',
        component: PPT,
        props: true
    },
    {
        path: '/design',
        component: Design,
        props: true
    },
    {
        path: '/studentsList',
        component: studentsList,
        props: true
    },
    {
        path: '/startClass',
        component: startClass,
        props: true
    },

    {
        path: '*',
        component: notFound
    }
];

export default routes;
