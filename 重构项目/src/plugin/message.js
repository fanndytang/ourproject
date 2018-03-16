/** 提示小弹窗 */
let message = {}
message.install = (Vue, options) => {
  Vue.prototype.$message = {
    success (msg) {
      let tpl = Vue.extend({
        template: '<div class="rs-message success">'+msg+'</div>'
      })

      let node = new tpl().$mount().$el
      document.body.appendChild(node)
      setTimeout(function () {
        document.body.removeChild(node)
      }, 2500)
    },
    error (msg) {
      let tpl = Vue.extend({
        template: '<div class="rs-message error">'+msg+'</div>'
      })
      let node = new tpl().$mount().$el
      document.body.appendChild(node)
      setTimeout(function () {
        document.body.removeChild(node)
      }, 2500)
    }
  }
}
export default message
