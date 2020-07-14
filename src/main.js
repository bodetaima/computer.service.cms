import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import App from "./App.vue";
import appRouter from "./routes";
import appStore from "./store";
import vuetify from "@/plugins/vuetify";


Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueRouter);


export const store = new Vuex.Store(appStore);
export const router = new VueRouter(appRouter);

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

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
