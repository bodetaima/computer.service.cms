import Vue from 'vue';
import Router from 'vue-router';
import Home from "../components/Home";
import Components from "../components/pcparts/Components";
import ComponentsCreate from "../components/pcparts/ComponentsCreate";
import Login from '../components/auth/Login';
import ComponentView from "../components/pcparts/ComponentView";

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
            path: '/components',
            name: 'Components',
            component: Components,
            meta: {
                title: 'Linh kiện máy tính - WeFixIt'
            }
        },
        {
            path: '/component/create',
            name: 'Components Create',
            component: ComponentsCreate,
            meta: {
                title: 'Tạo linh kiện máy tính mới - WeFixIt'
            }
        },
        {
            path: '/component/:type/:id',
            name: 'Components Vie',
            component: ComponentView,
            meta: {
                title: 'Sửa thông tin phụ kiện - WeFixIt'
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