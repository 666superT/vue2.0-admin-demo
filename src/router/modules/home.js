import layout from '../../layout'

export default {
  path: '/layout',
  component: layout,
  name: 'sys:home',
  redirect: '/',
  children: [
    {
      path: '/',
      name: 'sys:home',
      component: () => import('../../views/home')
    }
  ]
}
