import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Home = () => import("@/components/Home.vue");
const Parts = () => import("@/components/parts/Parts.vue");
const Login = () => import("@/components/auth/Login.vue");

export const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
            meta: {
                title: "Trang chủ - WeFixIt",
            },
        },
        {
            path: "/parts",
            name: "Parts",
            component: Parts,
            meta: {
                title: "Linh kiện máy tính - WeFixIt",
            },
        },
        {
            path: "/login",
            name: "Đăng nhập",
            component: Login,
            meta: {
                title: "Đăng nhập",
            },
        },
    ],
});

const DEFAULT_TITLE = "Computer Services";
router.afterEach((to) => {
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});

router.beforeEach((to, from, next) => {
    const publicPages = ["/login"];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem("user");

    if (authRequired && !loggedIn) {
        next("/login");
    } else {
        next();
    }
});
