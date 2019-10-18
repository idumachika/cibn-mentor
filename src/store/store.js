import Vue from 'vue'
import Vuex from 'vuex'
import Users from './modules/user/users'
import VuexPersist from 'vuex-persist'
import Categorys from './modules/category/categorys'

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: '**-jive-data-00-**',
  storage: localStorage
});

export default new Vuex.Store({
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
    Category: Categorys
  },
  plugins: [vuexPersist.plugin]
});