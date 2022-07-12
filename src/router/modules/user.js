import layout from '../../layout'
export default {
  path: '/',
  name: 'sys:user:list',
  component: layout,
  children: [
    {
      path: '/sys/users',
      component: () => import('../../views/users'),
      meta: { title: '用户管理' }
    }
  ]
}
