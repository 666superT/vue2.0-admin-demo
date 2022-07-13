import layout from '../../layout'
export default {
  path: '/sys',
  name: 'sys:menu:list',
  component: layout,
  redirect: '/sys/users',
  meta: { title: '系统管理' },
  children: [
    {
      path: '/sys/menus',
      // name: 'sys:menu:list',
      component: () => import('../../views/menu'),
      meta: { title: '菜单管理' }
    }
  ]
}
