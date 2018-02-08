//import Token from '@/model/api/token'

/**
 * @class
 * @classdesc 网络请求类
 * */
class XHR {
  constructor(data) {
    data = !!data ? data : {}
    /** api 请求参数 */
    this.request = data.request || {
      data: {},
      params: {},
      method: 'post',
      url: '',
      headers: ''
    }

    /** api  返回状态码 */
    this.errcode = data.errcode || {
      //  通用
      40001: '无效的客户端',
      40002: '无效的验证码',
      40003: '需要登录',
      40004: '登录已过期',
      40005: '登录失败',
      40006: '注册失败',
      40020: '需要实名认证',
      40021: '对不起，您没有权限进行此操作',
      40023: '账号在其他地方登陆',

      //  dict
      //   40508: '暂不支持该操作',             // 此错误一般为服务器错误

      40401: '参数错误',
      40402: '暂无数据',
      40403: '添加失败，请刷新后重试',
      40404: '修改失败，请刷新后重试',
      40405: '删除失败，请刷新后重试',
      40406: '不支持的请求方式',

      // system
      40700: '请登录后操作',
      40702: '参数错误',
      40703: '暂无数据',
      40704: '添加失败，请刷新后重试',
      40705: '修改失败，请刷新后重试',
      40706: '删除失败，请刷新后重试',
      40707: '不支持的请求类型',
      40708: '暂不支持该操作',
      40709: '暂不支持该操作',                //  此错误一般为服务器错误
      40710: '发送失败',
      40711: '手机号错误',
      40712: '当前为最新版本',

      // friends
      40502: '参数错误',
      40503: '暂无数据',
      40504: '添加失败，请刷新后重试',
      40505: '修改失败，请刷新后重试',
      40506: '删除失败，请刷新后重试',
      40507: '不支持的请求方式',
      40508: '暂不支持该操作',                 //  此错误一般为服务器错误

      //  vip
      40011: '暂不支持该操作',                  //  此错误一般为服务器错误
      40300: '请登录后操作',
      40302: '参数错误',
      40303: '暂无数据',
      40304: '添加失败，请刷新后重试',
      40305: '修改失败，请刷新后重试',
      40306: '删除失败，请刷新后重试',
      40307: '不支持的请求类型',
      40308: '暂不支持该操作',
      40309: '暂不支持该操作',
      40310: '对不起，该用户不可换戴产品',

      //  news
      40609: '暂不支持该操作',                 // 此错误一般为服务器错误
      40600: '参数错误',
      40601: '暂无数据',
      40602: '添加失败，请刷新后重试',
      40603: '修改失败，请刷新后重试',
      40604: '删除失败，请刷新后重试',
      40605: '不支持的请求方式',
      40606: '暂不支持该操作',
      40607: '暂不支持该操作',


      // user
      40100: '请登录后操作',
      40102: '参数错误',
      40103: '暂无数据',
      40104: '添加失败，请刷新后重试',
      40105: '修改失败，请刷新后重试',
      40106: '删除失败，请刷新后重试',
      40107: '不支持的请求类型',
      40108: '暂不支持该操作',
      40109: '文件不存在',
      40110: '上传失败',
      40111: '已存在该用户',
      40112: '下载失败',
      40113: '该银行卡存在商品，不能解绑',

      //  market
      40200: '请登录后操作',
      40202: '参数错误',
      40203: '暂无数据',
      40204: '添加失败，请刷新后重试',
      40205: '修改失败，请刷新后重试',
      40206: '删除失败，请刷新后重试',
      40207: '不支持的请求方式',
      40208: '暂不支持该操作',                             //  此错误一般为服务器错误
      40209: '购买失败',
      40210: '取消失败',
      40211: '付款操作失败',
    }
  }


  /**
   * @function
   * @description 请求接口
   * */
  httpRequest () {
    let that = this
    let data = that.request.data
    let params = that.request.params

    if(data && data.lang && typeof data.lang !== 'string') {
      data.lang = data.lang.join(',')
    }
    if(params && params.lang && typeof params.lang !== 'string') {
      params.lang = params.lang.join(',')
    }

    let headers = {}
    if(localStorage.getItem('AccessToken')) {
      headers['AccessToken'] = localStorage.getItem('AccessToken')
      if(localStorage.getItem('Authorization')) {
        headers['Authorization'] = localStorage.getItem('Authorization')
      }
    }else {
      headers['RequestToken'] = localStorage.getItem('RequestToken')
      headers['ClientType'] = localStorage.getItem('ClientType')
      headers['ClientId'] = localStorage.getItem('ClientId')
    }

    let $http = new XMLHttpRequest()
   // $http.defaults.timeout = 12000
    $http.open(that.request.method, that.request.url, true)
    $http.onreadystatechange = (res) => {
      if($http.readyState === 4) {
        let res = JSON.parse($http.response)
        if($http.status === 200) {
          that.httpSuccess(res)
        }else {
          /*that.httpError({
            msg: that.errcode[parseInt(res.data.errcode)] || res.data.errmsg || '',
            errcode: parseInt(res.data.errcode) || ''
          })*/
        }
      }
    }
   // $http.send(params)
    $http.send()

   /* $http({
      method: that.request.method,
      url: that.request.url,
      data: data,                  //  post  或  put  请求
      params: params,              //  get  或  delete 请求
      headers: that.request.headers || headers
    }).then((res) => {
     if(typeof that.httpResponse === 'function') {
       that.httpResponse(res)
       return false
     }
      if(parseInt(res.data.errcode) === 0) {
        that.httpSuccess(res)
      }else {
        that.checkErrorCode(parseInt(res.data.errcode))
        that.httpError({
          msg: that.errcode[parseInt(res.data.errcode)] || res.data.errmsg || '',
          errcode: parseInt(res.data.errcode) || ''
        })
      }
    }).catch(() => {
      that.httpError({
        msg: '网络错误',
        errcode: '500'
      })
    })*/
  }

  /**
   * @function
   * @description 请求完成后自定义操作
   * httpResponse(res)  需要使用时再定义
   * */

  /**
   * @function
   * @description 请求成功
   * */
  httpSuccess (res) {
  //  new Vue().$message.error(res.data.errmsg || '请求成功')
  }

  /**
   * @function
   * @description 请求失败
   * */
  httpError (res) {
    new Vue().$message.error(res.msg || '请求失败')
  }

  /**
   * @function
   * @description 检查errcode
   * */
  checkErrorCode(code) {
    switch(code) {
      case 40001:  //如果token过期重新请求
        localStorage.removeItem('AccessToken')
        let x = new Token()
        x.getTokenFailed = res => {
          if(!!this.errcode[code])new Vue().$message.error(this.errcode[code])
          if(process.env.NODE_ENV === 'production') {
            setTimeout(()=>{window.location.href = `${process.env.URL.ADMIN}/#/login`}, 2000)
          }else {
            new Vue().$message.error('token 请求失败')
          }
        }
        x.httpRequest()
        break;
      case 40021:   //  没有权限
        if(!!this.errcode[code])new Vue().$message.error(this.errcode[code])
        break;
      case 40023:   //  账号在其他地方登录
      case 40004:   //  登录已过期
        if(!!this.errcode[code])new Vue().$message.error(this.errcode[code])
        localStorage.removeItem('Authorization')
        localStorage.removeItem('admin_rights')
        localStorage.removeItem('admin_rights_list')
        localStorage.removeItem('admin_username')
        localStorage.removeItem('AccessToken')

        if(process.env.NODE_ENV === 'production') {
          setTimeout(()=>{window.location.href = `${process.env.URL.ADMIN}/#/login`}, 2000)
        }
        break;
      default: break;
    }
  }
}

export default XHR
