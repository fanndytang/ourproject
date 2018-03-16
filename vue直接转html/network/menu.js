/** 菜单、权限、控制路由 */
window.RsAsideMenu = {
    exchange: {
        name: '商品管理',
        icon: 'fa-users',
        child: [
            {
                name: '订单列表',
                child: [
                    { path: '/login', name: '订单'}
                ]
            },
            {
                path: '/exchange/watch/list',
                name: '腕表列表'
            }
        ]
    },
    user: {
        name: '用户管理',
        icon: 'fa-users',
        child: [
            {
                name: '订单列表',
                child: [
                    { path: '/login', name: '订单'}
                ]
            },
            {
                path: '/exchange/watch/list',
                name: '腕表列表'
            }
        ]
    }
}
