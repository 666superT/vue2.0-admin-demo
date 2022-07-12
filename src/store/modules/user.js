import { getUserInfo, login, getNavList } from '@/api/user'
import storage from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    token: storage.getItem('token') || '',
    userInfo: '',
    navList: ''
  },
  mutations: {
    SET_TOKEN(state, res) {
      state.token = res
      storage.setItem('token', res)
    },
    SET_USER_INFO(state, res) {
      state.userInfo = res
    },
    SET_NAV_LIST(state, res) {
      state.navList = res
    }
  },
  actions: {
    async handleLogin({ commit }, data) {
      const res = await login(data)
      commit('SET_TOKEN', res)
      return res
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      commit('SET_USER_INFO', res)
      return res
    },
    async getNav({ commit }) {
      const res = await getNavList()
      commit('SET_NAV_LIST', res)
      return res
    }
  }
}
