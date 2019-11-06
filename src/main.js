import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import {
    ApiService
} from './services/api.service'
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
import VModal from 'vue-js-modal';
// import "bootstrap-css-only/css/bootstrap.min.css";
//import "mdbvue/build/css/mdb.css";
// import "bootstrap-vue/dist/bootstrap-vue.css"
// import BootstrapVue from 'bootstrap-vue';
import './vee-validate'


window.toastr = require('toastr');
window.$ = require('jquery');
window.jQuery = require('jquery')




// Set the base URL of the API
ApiService.init('https://cibn-server.herokuapp.com/api');

if (store.dispatch('isLoggedIn'))
    ApiService.setHeader(store.getters.GET_AUTH_TOKEN);
else
    store.dispatch('UNSET_USER').then(() => {});

Vue.config.productionTip = false;

Vue.use(VModal, {
    dialog: true,
    dynamic: true,
    injectModalsContainer: true
});
Vue.use(VueToastr2);
// Vue.use(BootstrapVue)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');