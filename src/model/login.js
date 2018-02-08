import sha from '@/plugin/sha1'
import XHR from '@/model/api/xhr'
//import Vue from 'vue'

/**
 * @class
 * @classdesc 登录*/
class Login {
  constructor(data) {
    data = !!data ? data : {}

    this.username = data.username || ''   //  用户名
    this.password = data.password || ''   //  密码
  }

  /**
   * 登录
   * */
  loginin () {
    let password = sha(this.username+'_'+this.password)
    let msg = ''
    let that = this

    if(!that.username) {
      msg = '请输入用户名'
    }else if(!that.password) {
      msg = '请输入密码'
    }
    if(msg) {
      new Vue().$message.error(msg)
      return false
    }

    let xhr = new XHR()
    xhr.request.method = 'post'
    xhr.request.url = `${process.env.API.USER}/v1/admin/user`
    xhr.request.data = {
      password: password,
      username: that.username
    }
    xhr.httpSuccess = (res) => {
      if(res.data.Authorization && res.data.rights && res.data.rights.length > 0) {
        /**
         * 如果是登录过期跳转回之前访问的页面
         * */
        localStorage.removeItem('use_model_url')
        localStorage.setItem('Authorization',res.data.Authorization)
        localStorage.setItem('admin_rights',res.data.rights)
        localStorage.setItem('admin_username', that.username)

        /**
         * 细分权限，控制单个按钮没权限不显示*/
        let rightlist = res.data.rights_list
        let cache = []
        let result = {}
        let flag = false
        if(rightlist) {
          for(let k in rightlist) {
            cache = []
            result[k] = {}
            let admin = rightlist[k]['admin']
            let user = rightlist[k]['user']
            if(admin) cache = admin
            if(user) cache = cache.concat(user)
            for(let q in cache) {
              result[k][cache[q]['id']] = 1
              if(!flag) flag = true
            }
          }
        }

        if(flag) localStorage.setItem('admin_rights_list',JSON.stringify(result))

        new Vue().$message.success('登录成功')

        let r = res.data.rights
        if(r) {
          let menu = {
            friends: 6, market: 5, vip: 3, dict: 4, news: 2, user: 1, system: 7
          }
          let url = {
            1: 'USER', 2: 'NEWS', 3: 'VIP', 4: 'DICT', 5: 'EXCHANGE', 6: 'FRIENDS', 7: 'SYSTEM'
          }
          let first_url_key = 7
          for(let k in r) {
            if(first_url_key > menu[r[k]]) {
              first_url_key = menu[r[k]]
            }
          }
          window.location.href = process.env.URL[url[first_url_key]]  //  拥有权限的第一个菜单页面  window.localStorage
        }else {
          location.href = `${process.env.URL.ADMIN}/#/login`
        }
      }
    }
    xhr.httpError = (res) => {
      new Vue().$message.error(res.msg || '登录失败')
    }

    xhr.httpRequest()
  }


  /**
   * 退出
   * */
  loginout () {
    localStorage.removeItem('Authorization')
    localStorage.removeItem('admin_rights')
    let xhr = new XHR()
    xhr.request.method = 'get'
    xhr.request.url =  `${process.env.API.USER}/v1/logout`
    xhr.request.httpSuccess = res => {
      window.location.href = `${process.env.URL.ADMIN}/#/login`
    }
    xhr.request.httpError = res => {
      window.location.href = `${process.env.URL.ADMIN}/#/login`
    }
    xhr.httpRequest()
  }
}

export default  Login
