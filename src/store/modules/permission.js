import { publicRoutes, privateRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: publicRoutes
  },
  mutations: {
    SET_ROUTES(state, route) {
      state.routes = [...publicRoutes, ...route]
    }
  },
  actions: {
    filterRoutes({ commit }, menus) {
      const routes = []
      menus.forEach((v) => {
        const data = privateRoutes.filter((item) => item.name === v)
        routes.push(...data)
      })
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      commit('SET_ROUTES', routes)
      return routes
    }
  }
}
