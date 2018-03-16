/** 菜单、权限、控制路由 */
let exchange = {
  name: '商品管理',
  icon: 'fa-users',
  child: [
    {
      name: '订单列表',
      child: [
        { path: '/login', name: '订单', component: resolve => {require(['@/pages/login'], resolve)}}
      ]
    },
    {
      path: '/exchange/watch/list',
      name: '腕表列表',
      component: resolve => {require(['@/pages/exchange/watch'], resolve)}
    }
  ]
}

let user = {
  name: '用户管理',
  icon: 'fa-users',
  child: [
    {
      name: '订单列表',
      child: [
        { path: '/login', name: '订单', component: resolve => {require(['@/pages/login'], resolve)}}
      ]
    },
    {
      path: '/exchange/watch/list',
      name: '腕表列表',
      component: resolve => {require(['@/pages/exchange/watch'], resolve)}
    }
  ]
}

export default {
  exchange,
  user
}
