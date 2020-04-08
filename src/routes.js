import Login from './views/Login.vue'
import Index from './views/Index.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Fangchan from './views/nav1/Fangchan.vue'
import User from './views/nav1/User.vue'
import Gonggao from './views/system/Gonggao.vue'
import Register from './views/Register.vue'
import Tingche from './views/nav1/Tingche.vue'
import Calendar from './views/system/Calendar.vue'
import Baoxiu from './views/nav2/Baoxiu.vue'
import Tousu from './views/nav2/Tousu.vue'
import Shebei from './views/nav1/Shebei.vue'
import Jiaofei from './views/nav1/Jiaofei.vue'
import BaoxiuMsg from './views/nav1/Baoxiu.vue'
import TousuMsg from './views/nav1/Tousu.vue'

let routes = [

    {
        path: '/register',
        component: Register,
        name: '',
        hidden: true
    },
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/index',
        component: Index,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '个人管理',
        iconCls: 'fa fa-id-card-o',//图标样式class
        children: [
           
            { path: '/user', component: User, name: '用户信息' },
            { path: '/fangchan', component: Fangchan, name: '房产信息' },
            { path: '/tingche', component: Tingche, name: '停车位信息' },
            { path: '/shebei', component: Shebei, name: '设备信息' },
            { path: '/jiaodei', component: Jiaofei, name: '缴费信息' },
            { path: '/baoxiumsg', component: BaoxiuMsg, name: '报修管理'},
            { path: '/tousumsg', component: TousuMsg, name: '投诉管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '社区服务',
        iconCls: 'el-icon-service',
        children: [
            { path: '/baoxiu', component: Baoxiu, name: '我要报修'},
            { path: '/tousu', component: Tousu, name: '我要投诉' },
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '系统信息',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/gonggao', component: Gonggao, name: '公告' },
            { path: '/calendar', component: Calendar,name: '日历'}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;