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
import {faHome, faSignInAlt, faSignOutAlt, faUser, faUserPlus, faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';


library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faPlus, faSearch);


Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
