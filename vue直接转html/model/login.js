/**
 * @class
 * @classdesc 登录*/
class Login {
  constructor(data) {
    data = !!data ? data : {}

    this.username = data.username || ''   //  用户名
    this.password = data.password || ''   //  密码
  }

  /** 登录 */
  loginIn (obj) {
    console.log(obj)
    sessionStorage.setItem('username', this.username)
    obj.success('登录成功')
  }


  /** 退出 */
  loginOut () {
    console.log('退出')
  }
}

// export default  Login
