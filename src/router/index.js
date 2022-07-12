import Vue from 'vue'
import VueRouter from 'vue-router'
// import home from './modules/home'
import layout from '../layout'
Vue.use(VueRouter)

export const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404')
  },
  {
    path: '/',
    component: layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('../views/home')
      }
    ]
  }
]

export const privateRoutes = []

const router = new VueRouter({
  routes: publicRoutes
})

export default router
