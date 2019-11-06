import Vue from 'vue'
import Vuex from 'vuex'
import Users from './modules/user/users'
import Sockets from './modules/socket.io/socket'
import VuexPersist from 'vuex-persist'


Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: '**-jive-data-00-**',
  storage: localStorage
});

const store = new Vuex.Store({
  state: {
    
  },
  getters: {

  },
  mutations: {
     

  },
  actions: {

  },
  modules: {
    User: Users,
    Socket: Sockets

  },
  plugins: [vuexPersist.plugin]
});

store.watch(
  (state) => state.sessions,
  (val) => {
    window.console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
  }, {
    deep: true
  }
);
export default store;

