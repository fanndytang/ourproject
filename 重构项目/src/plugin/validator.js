/** 表单验证 */
let va = {}

let config = {
  /** 校验规则 */
  rules: {
    required: /\S/,          //  必填项
    min: (val, len) => {     //  最小值（数字类型）
      return !(isNaN(val) || (!isNaN(val) && val < len))
    },
    max: (val, len) => {     //  最大值（数字类型）
      return !(isNaN(val) || (!isNaN(val) && val > len))
    },
    maxLength(val, len) {    //  最大长度
      return val.length <= len
    },
    minLength(val, len) {    //  最小长度
      return val.length >= len
    }
  },
  /** 校验默认提示 */
  rMsg: {
    required: '必填项',
    min: (len)=> {return `最小值为${len}`},
    max: (len)=> {return `最大值为${len}`},
    maxLength: (len)=> {console.log(len);return `最大长度为${len}`},
    minLength: (len)=> {return `最小长度为${len}`}
  },
  /** 校验方法 */
  check(exp, el) {
    let val = el.value
    let flag = true    //  找不到校验规则，默认返回true ,  为真则表示校验有效
    let msg = ''

    /** 设置校验提示 */
    let setMsg = (k) => {
      msg = exp.msg
      if(!msg && config.rMsg[k]) {
        let t = Object.prototype.toString.call(config.rules[k]).toLocaleLowerCase() === '[object function]'
        msg = t ? config.rMsg[k](exp[k]) : config.rMsg[k]
      }
      msg = msg || '校验失败'
    }

    for(let k in exp) {
      if(config.rules[k]) {   //  存在校验规则
        setMsg(k)
        switch(Object.prototype.toString.call(config.rules[k]).toLocaleLowerCase()) {
          case '[object function]' : flag = config.rules[k](val, exp[k]); break;
          case '[object regexp]' : flag = val.match(config.rules[k]) !== null; break;
        }
        break;
      }else if(k === 'valid') {      //  自定义的校验规则（校验错误时返回校验错误信息或返回false，返回true 表示校验成功）
        setMsg(k)
        switch(Object.prototype.toString.call(exp[k]).toLocaleLowerCase()) {
          case '[object function]' :
            let res = exp[k](val)
            flag = res && Boolean(res)
            if(!flag) msg = (typeof res === 'string' ? res : '') || msg
            break;
          case '[object regexp]' : flag = val.match(exp[k]) !== null; break;
          default: flag = exp[k]; break;
        }
        break;
      }
    }

    el.setAttribute('va-valid', flag ? 1 : 0)
    el.setAttribute('va-msg', flag ? '' : msg)

    return flag
  },
  /** 整合校验规则 */
  setExpress(binding) {
    let exp = []
    if(binding.value) {
      let v = binding.value
      let type = Object.prototype.toString.call(v).toLocaleLowerCase()
      //  保证exp为数组，同时说明value要求只接受对象或数组
      if(type === '[object object]')  exp = [v]
      exp = type !== '[object object]' && type !== '[object array]' ? [] : v
    }else if(!binding.expression && binding.arg) {
      let r = binding.arg.split(':')
      for(let k in r) {
        if(config.rules[r[k]]) {
          let cache = {}
          cache[r[k]] = true
          exp.push(cache)
        }
      }
    }

    for(let k=0,len=exp.length;k<len;k++) {
      //  如果设置了required: false ，则相当于不是必填项，故而移除此验证条件
      if(Object.prototype.toString.call(exp[k].required).toLocaleLowerCase() === '[object boolean]' && !exp[k].required) {
        exp.splice(k, 1)
        break;
      }
    }

    return exp
  },
  /** 校验结果提示 */
  showTip(el) {
    let error = el.parentNode.querySelector('.va-error')
    let flag = !!parseInt(el.getAttribute('va-valid'))
    if(flag) {
      if(error) error.style.display = 'none'
      el.className = el.className.replace('va-field-error', '')
    }else {
      if(error) {
        error.innerHTML = el.getAttribute('va-msg')
        error.style.display = 'block'
      }else {
        let tpl = Vue.extend({
          template: `<div class="va-error">${el.getAttribute('va-msg')}</div>`
        })
        el.parentNode.insertBefore(new tpl().$mount().$el, el)
      }

      el.className = `${el.className.replace('va-field-error', '')} va-field-error`
    }
    el.setAttribute('va-actived', 1)  // 当前元素已经被用户编辑过
  }
}

va.install = (Vue, options) => {
  /* 添加全局指令
  * bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
    componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    unbind：只调用一次，指令与元素解绑时调用。 */

  // 注册一个全局自定义指令 `v-va`
  Vue.directive('va', {
    inserted (el, binding, vnode, oldVnode) {
      el.parentNode.className = `${el.parentNode.className} va-field-box`
      el.className = `${el.className} va-field`
      let exp = config.setExpress(binding)

      for(let k in exp) {
        if(exp[k].required) {   //  如果有必填项，则设置必填样式
          let $label = el.parentNode.querySelector('.label')
          $label.className = `${$label.className} va-required`
          break;
        }
      }

      let handler = () => {
        for(let k in exp) {
          if(!config.check(exp[k], el)) break;            //  校验有不成功的，立即停止当前元素以后的校验
        }
        config.showTip(el)
      }

      el.addEventListener('blur', handler)
      el.addEventListener('change', handler)
    },
    update (el, binding, vnode, oldVnode) {
      let exp = config.setExpress(binding)
      let edit = !!parseInt(el.getAttribute('va-actived')) //  edit: true  已经有编辑过
      let flag
      for(let k in exp) {
        flag = config.check(exp[k], el)                    //  没有被编辑过的，比如页面刚刚载入的时候（不给错误提示）
        if(edit && !flag) break;                           //  已经编辑过，且校验有不成功的，立即停止校验
      }
      if(edit) config.showTip(el)
    },
    unbind (el, binding, vnode, oldVnode) {
     // el.removeEventListener('change')
    }
  })

  //  校验表单
  Vue.directive('check', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el, binding, vnode, oldVnode) {
      let exp = binding.value
      if(exp.ref) {
        /** 触发表单内的校验 */
        el.addEventListener('click', function(){
          let $form = document.querySelector(exp.ref)
          let $vaField = $form.querySelectorAll('.va-field-box')
          let flag = 1, $field
          for(let k=0,len=$vaField.length;k<len;k++) {
            $field = $vaField[k].querySelector('.va-field')
            flag = flag && !!parseInt($field.getAttribute('va-valid'))
            config.showTip($field)
          }
          $form.setAttribute('va-valid', (flag ? 1 : 0).toString())

          if(exp.callback && typeof exp.callback === 'function') {
            exp.callback()
          }
        })
      }
    }
  })
}


export default va
