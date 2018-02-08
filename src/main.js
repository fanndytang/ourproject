// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import axios from '@/plugin/axios'
import App from './App'
import router from './router'
//import store from '@/store/index'
//import xhr from '@/plugin/main'
//import RsComponent from '@/components/index'
//import Filter from '@/plugin/filter'
//import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.less'

/** 按需引入 element-ui  插件 */
/*import {Pagination, Input, Radio, RadioGroup, Checkbox, CheckboxGroup, Select, Option, DatePicker, TimeSelect, TimePicker, Form, FormItem, Alert, Upload, Cascader, Loading } from 'element-ui'

Vue.use(Pagination)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Alert)
Vue.use(Upload)
Vue.use(Cascader)
Vue.use(Loading.directive)*/

/** 全局注册自定义的公共组件 */
//Vue.use(RsComponent)

//Vue.prototype.$loading = Loading.service
Vue.prototype.$http = axios
//Vue.prototype.$xhr = xhr
//Vue.prototype.$message = xhr.message

/** 全局过滤器 */
/*for(let key in Filter) {
  Vue.filter(key, Filter[key])
}*/

Vue.config.productionTip = false

/** 页面语法错误时，检测错误并输出错误 */
Vue.config.errorHandler = function (err, vm, info) {
  console.log(`错误信息:${err}`)
  console.log(`info:${info}`)
}


/** vue 实例，eventHub用做全局事件管理 */
new Vue({
  el: '#app',
 // store,
  router,
  template: '<App/>',
  components: { App },
  data() {
    return {
      eventHub: new Vue()      //  全局事件管理
    }
  }
})
