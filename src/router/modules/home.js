import layout from '../../layout'
export default {
  path: '/',
  name: 'sys:home',
  component: layout,
  redirect: '/sys/home',
  children: [
    {
      path: '/sys/home',
      component: () => import('../../views/home'),
      meta: { title: '控制台' }
    }
  ]
}
