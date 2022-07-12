import layout from '../../layout'
export default {
  path: '/',
  name: 'sys:menu:list',
  component: layout,
  children: [
    {
      path: '/sys/menus',
      component: () => import('../../views/menu'),
      meta: { title: '菜单管理' }
    }
  ]
}
