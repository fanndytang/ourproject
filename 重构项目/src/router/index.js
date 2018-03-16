Vue.use(VueRouter)
import Login from '@/pages/login'
import P404 from '@/pages/404'

import menu from '@/router/menu'

let routes = [
  {path: '/', name: '瑞时会全球购', redirect: '/login'},
  {path: '/login', name: '登录', component: Login},
  {path: '/404', name: '404', component: P404}
]

let setRoute = (list) => {
  for(let k in list) {
    if(!!list[k].path) routes.push(list[k])
    if(list[k].child && list[k].child.length) {
      setRoute(list[k].child)
    }
  }
}

setRoute(menu)

const routerResult = new VueRouter({
  routes:  routes
})


routerResult.beforeEach((to, from, next) => {
  if (to.matched.length ===0) {                                        //  如果未匹配到路由
    next('/404')
  } else {
    next();                                                                            //如果匹配到正确跳转
  }
});

export default routerResult
