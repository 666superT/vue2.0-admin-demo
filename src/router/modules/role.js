import layout from '../../layout'
export default {
  path: '/',
  name: 'sys:role:list',
  component: layout,
  children: [
    {
      path: '/sys/roles',
      component: () => import('../../views/role'),
      meta: { title: '角色管理' }
    }
  ]
}
