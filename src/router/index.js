/*
//import Vue from 'vue'
//import Router from 'vue-router'

/!** 导入所有路由 *!/
import menu from '@/router/menu'

let routes = []
let cache = menu
if(process.env.NODE_ENV === 'production') {
  /!** 根据当前所处项目更换为对应的component *!/
  let m = menu.dict
  cache = { m }
}
/!** 整理路由 *!/
for(let k in cache) {
  for(let i in cache[k]) routes.push(cache[k][i])
}
/!** 开发环境下，引入login ,方便token使用 *!/
import login from '@/pages/login/login'
import logout from '@/pages/login/logout'
routes.push({path: '/login', name: 'login', component: login, notmenu: true})
routes.push({path: '/logout', name: 'logout', component: logout, notmenu: true})

Vue.use(VueRouter)
export default new VueRouter({
  routes:  routes
})
*/

import test from '@/test'

Vue.use(VueRouter)
export default new VueRouter({
  routes:  [
    {path: '/', component: test}
  ]
})
