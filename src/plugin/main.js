/**
 * 通用方法
 * */
//import Vue from 'vue'
let tip = new Vue({})

export default {
  /** vue 实例，用做提示 */
  tip,
  /** 获取url 查询参数 */
  get_query(name, data, zh) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    data = data||''
    let r = window.location.hash.replace(`#/${data}?`, '').match(reg);
    if (r != null) {
      if(!!zh) {
        return r[2];
      }else {
        return unescape(r[2]);
      }
    }
    return null;
  },
  /** 提示 */
  message : {
    error (msg) {
      let node = document.createElement('div')
      node.innerHTML = msg
      node.className = 'tip-message error'
      document.body.appendChild(node)
      setTimeout(() => {
        document.body.removeChild(node)
      }, 2000)
    },
    success (msg) {
      let node = document.createElement('div')
      node.innerHTML = msg
      node.className = 'tip-message success '
      document.body.appendChild(node)
      setTimeout(() => {
        document.body.removeChild(node)
      }, 2000)
    }
  }
}

