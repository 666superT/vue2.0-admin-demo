import layout from '../../layout'
export default {
  path: '/sys',
  name: 'sys:role:list',
  component: layout,
  redirect: '/sys/users',
  meta: { title: '角色管理' },
  children: [
    {
      path: '/sys/roles',
      // name: 'sys:role:list',
      component: () => import('../../views/role'),
      meta: { title: '角色管理' }
    }
  ]
}
