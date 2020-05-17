import Vue from 'vue';
import Router from 'vue-router';
import Home from "../components/Home";
import Parts from "../components/parts/Parts";
import PartCreate from "../components/parts/PartCreate";
import Login from '../components/auth/Login';
import PartView from "../components/parts/PartView";
import Orders from "../components/orders/Orders";
import Profile from "../components/auth/Profile";
import Computers from "../components/computers/Computers";
import Customers from "../components/customers/Customers";

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                title: 'Trang chủ - WeFixIt'
            }
        },
        {
            path: '/parts',
            name: 'Parts',
            component: Parts,
            meta: {
                title: 'Linh kiện máy tính - WeFixIt'
            }
        },
        {
            path: '/part/create',
            name: 'PartCreate',
            component: PartCreate,
            meta: {
                title: 'Tạo linh kiện máy tính mới - WeFixIt'
            }
        },
        {
            path: '/part/:type/:id',
            name: 'PartView',
            component: PartView,
            meta: {
                title: 'Sửa thông tin phụ kiện - WeFixIt'
            }
        },
        {
            path: '/orders',
            name: 'Orders',
            component: Orders,
            meta: {
                title: 'Đơn hàng - WeFixIt'
            }
        },
        {
            path: '/computers',
            name: 'Computers',
            component: Computers,
            meta: {
                title: 'Máy tính - WeFixIt'
            }
        },
        {
            path: '/customers',
            name: 'Customers',
            component: Customers,
            meta: {
                title: 'Khách hàng - WeFixIt'
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                title: 'Thông tin cá nhân - WeFitIt'
            }
        },
        {
            path: '/login',
            name: 'Đăng nhập',
            component: Login,
            meta: {
                title: 'Đăng nhập'
            }
        },
    ]
})

const DEFAULT_TITLE = 'Computer Services';
router.afterEach((to) => {
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});