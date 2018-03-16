/** loading */
let loading = {}

loading.install = (Vue, options) => {
  // 注册一个全局自定义指令 `v-loading`
  Vue.directive('loading', {
    inserted (el, binding, vnode, oldVnode) {
      el.className = `${el.className} rs-loading`
      let type = Object.prototype.toString.call(binding.value).toLocaleLowerCase()
      let show = type === '[object object]' ? binding.value.load : binding.value
      let msg = type === '[object object]' ? binding.value.msg : '加载中'

      let tpl = Vue.extend({
        template: `<div class="loading ${show ? 'open' : ''}"><div><span class="icon-load"></span>${msg}</div></div>`
      })
      el.appendChild(new tpl().$mount().$el)
    },
    update (el, binding, vnode, oldVnode) {
      let show = binding.value
      let type = Object.prototype.toString.call(binding.value).toLocaleLowerCase()
      if(type === '[object object]') show = binding.value.load
      let $load = el.querySelector('.loading')
      $load.className = $load.className.replace('open', '') + (show ? 'open' : '')
    }
  })
}

export default loading
