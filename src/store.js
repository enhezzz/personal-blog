import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    code: 0,
    loading: false,
    isLogin: false,
    username: '',
    account: '',
    phone: ''
  },
  mutations: {
    updateAuthorizedCode(state,payload){
      state.code = payload;
    },
    toggleLoading(state){
      state.loading = !state.loading;
    },
    toggleLoginState(state,payload){
      state.isLogin = payload;
    },
    setUsername(state,username){
      state.username = username
    },
    setAccount(state,account){
      state.account = account
    },
    setPhone(state,phone){
      state.phone = phone
    }
  },
  actions: {

  }
})
