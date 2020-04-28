import Vue from 'vue'
import App from './App.vue'
import {router} from './routes/router';
import store from './store'
import BootstrapVue from "bootstrap-vue";
import VeeValidate from "vee-validate";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {faHome, faSignInAlt, faSignOutAlt, faUser, faUserPlus} from '@fortawesome/free-solid-svg-icons';


library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);


Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false


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

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
