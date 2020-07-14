const Home = () => import("@/components/Home.vue");
const Parts = () => import("@/components/parts/Parts.vue");
const Login = () => import("@/components/auth/Login.vue");

export default {
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
};
