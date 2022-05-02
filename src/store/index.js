import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfiles: []
  },
  mutations: {
    'SET_PROFILES': (state, profiles) => {
      return state.userProfiles = profiles;
    }
  },
  actions: {
    async fetchProfiles({ commit }) {
      commit('SET_PROFILES', []);
      await fetch("https://jsonplaceholder.typicode.com/users")
      .then((resp) => {
      return resp.json().then((data) => {
           commit('SET_PROFILES', data);
        });
      });
    }
  },
})
