import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './modules/home'
import user from './modules/user'
import role from './modules/role'
import menu from './modules/menu'
import layout from '../layout'
Vue.use(VueRouter)

export const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login')
  },
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/sys/home',
    children: [
      {
        path: '404',
        name: '404',
        component: () => import('../views/404')
      }
    ]
  }
]

export const privateRoutes = [user, role, menu, home]

const router = new VueRouter({
  routes: publicRoutes
})

export default router
