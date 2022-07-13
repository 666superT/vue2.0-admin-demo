import layout from '../../layout'
export default {
  path: '/sys',
  name: 'sys:user:list',
  component: layout,
  redirect: '/sys/users',
  meta: { title: '用户管理' },
  children: [
    {
      path: '/sys/users',
      component: () => import('../../views/users'),
      meta: { title: '用户管理' }
    }
  ]
}
