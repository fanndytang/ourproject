import XHR from '@/model/api/xhr'
//import Vue from 'vue'

/** 权限 */
let rights = localStorage.getItem('admin_rights_list')
if(rights) {
  rights = JSON.parse(rights)
  rights.user = rights.user || {}
  rights.news = rights.news || {}
  rights.vip = rights.vip || {}
  rights.market = rights.market || {}
  rights.friends = rights.friends || {}
  rights.system = rights.system || {}
  rights.dict = rights.dict || {}
}
console.log(rights)
/**
 * @class
 * @classdesc 基类 */
class Base {
  constructor(data) {
    data = !!data ? data : {}

    this.id = data.id ? data.id.toString() : ''
    this.current_model = data.current_model || ''

    this.api_base = data.api_base || ''
    this.add_url = data.add_url || ''
    this.get_list_url = data.get_list_url || ''
    this.get_detail_url = data.get_detail_url || ''
    this.update_url = data.update_url || ''
    this.delete_url = data.delete_url || ''

    this.model_type = data.model_type || ''
    this.edit_name = data.name || data.title || data.id || ''
    this.check_name = data.name || data.title || data.id || ''

    this.datalists = {    //  列表获取时，所有数据（分页获取、正常情况下的获取， 没有筛选关键词之类的）
      data: [],
      current: 1,
      pages: 1,
      loading: false,
      totals: 0
    }

    /**
     * 审核
     * */
    this.form_check_failed = data.form_check_failed || false

    /**
     * 关键词搜索
     * */
    this.pkeysearch = data.pkeysearch || {}
    this.sessionkey_search = data.sessionkey_search || ''
    /**
     * 搜索时不需要缓存的字段
     * */
    this.search_ignore = data.search_ignore || {}

    /** 表格排序 */
    this.rsListSort = data.rsListSort || {}

    /**
     * 获取详情要传的字段
     * */
    this.get_detail_data = data.get_detail_data || {}

    /**
     * 是否有增册改查权限
     * */
    this.config = {
      edit: data.config && data.config.edit || false,
      add: data.config && data.config.add || false,
      del: data.config && data.config.del || false,
      detail: data.config && data.config.detail || false,
      search: data.config && data.config.search || false,  //  搜索
      notools: data.config && data.config.notools || false,  //  是否显示操作列
      language: data.config && data.config.language || false,   //  增删改查内容时，是否需要多语言录入
      exp_data: data.config && data.config.exp_data || false,   //  导出数据
    }
    this.api_rights = rights                               //  权限列表

    /**
     * 如果是多语言，录入的语言
     * */
    this.web_language = data.web_language || 'zh-cn'

    /** 导出数据 */
    this.module_export_data = data.module_export_data || {}

    this.origin_obj_data = data
    this.update_must_data = data.update_must_data || ''  //  编辑时，必传字段（多语言）

    this.httpXHR = XHR
  }
  /**
   * 设置 post接口数据
   * */
  setPostParam () {
    return {}
  }

  /**
   * @function
   * @description 编辑时传递参数
   * @param {object} xhr 一个http请求对象
   * */
  setPutParam (xhr) {
    let data = this.setPostParam()
    if(!!this.id) data.id = this.id
    if(this.config.language && !this.edit_lang_one) {
      let oldP = new this.current_model(this.origin_obj_data).setPostParam()
      let must = this.update_must_data ? this.update_must_data.split(',') : ''
      let result = {}
      for(let k in data) {
        if(data[k] !== oldP[k]) {
          if(typeof data[k] === 'object') {
            if(data[k].length && data[k].length !== oldP[k].length || oldP[k].length > 0 && data[k].length<= 0) {
              result[k] = data[k]
            }else {
              for(let i in data[k]) {
                if(data[k][i] !== oldP[k][i]) {
                  result[k] = data[k]
                  break;
                }
              }
            }
          }else {
            result[k] = data[k]
          }
        }
      }
      for(let k in must) {
        result[must[k]] = data[must[k]]
      }
      xhr.request.data = result
    }else {
      xhr.request.data = data
    }
  }

  /**
   * 设置 getlist接口数据
   * */
  setGetListParam () {
    return {

    }
  }

  /**
   * 设置 getone 接口数据（详情）
   * */
  setDetailParam () {
    return this.get_detail_data
  }

  /**
   * 设置 deleteone接口数据
   * */
  setDeleteOneParam () {
    return {
      id: this.id
    }
  }

  /**
   * 设置发送时间格式
   * */
  setDateFormat (val, hashour) {
    if(val) {
      let date = new Date(val)

      let year = date.getFullYear().toString()
      let month = ('00' + (parseInt(date.getMonth()) + 1)).substr(-2).toString()
      let day = ('00' + date.getDate()).substr(-2).toString()
      let hour = ('00' + date.getHours()).substr(-2).toString()
      let minute = ('00' + date.getMinutes()).substr(-2).toString()
      let second = ('00' + date.getSeconds()).substr(-2).toString()

      if(hashour) {
        return  `${year}-${month}-${day} ${hour}:${minute}:${second}`
      }else {
        return year + '-' + month + '-' + day
      }
    }else {
      return ''
    }
  }

  /**
   * 每个页面对关键词的特殊处理
   * */
  setSearch () {
    return false
  }
  /**
   * 设置 关键词搜索 接口数据
   * */
  setSearchParam () {
    let k = this.setSearch()
    let d = {}
    let sessionkey = this.sessionkey_search
    if(k) {
      d = k
    }else {
      for(let key in this.pkeysearch) {
        if(this.pkeysearch[key] && this.pkeysearch.length || typeof this.pkeysearch === 'object' && (this.pkeysearch[key] !== {} || this.pkeysearch[key] !== null)) {
          if(key == 'datetimerange' && this.pkeysearch.datetimerange && this.pkeysearch.datetimerange.length <= 0) {
            let date_s = sessionStorage.getItem(`${sessionkey}-pkeysearch-datetimerange-s`)
            let date_e = sessionStorage.getItem(`${sessionkey}-pkeysearch-datetimerange-e`)
            if(date_s) {
              this.pkeysearch.datetimerange = [new Date(date_s),new Date(date_e)]
            }
          }
          d[key] = this.pkeysearch[key]
        }
      }
    }
    if(d.datetimerange && d.datetimerange.length) {
      d.create_time_l = this.setDateFormat(d.datetimerange[0])
      d.create_time_h = this.setDateFormat(d.datetimerange[1])
    }
    if(d.datetimerange) {
      delete d.datetimerange
    }

    return d
  }

  /**
   * @function
   * @description 设置导出数据所传参数 */
  setExportParams (obj) {
    let params = {}
    obj = !!obj ? obj : {}
    let selected = obj.selected

    /** 导出字段(excel所用) */
    let output = '', v
    for(let k in selected) {
      v = this.module_export_data.data[selected[k]]
      if(v) output += v + ',' + selected[k] + ';'
    }
    params.output = output

    /** 导出字段附带的其它参数 */
    for(let k in this.module_export_data) {
      if(k !== 'data' && k !== 'url_api') params[k] = this.module_export_data[k]
    }
    params.rows = obj.rows || '-1'

    /** 关键词搜索 */
    let search = this.setSearchParam()
    for(let k in search) {
      if(search[k]) params[k] = search[k]
    }

    /** 请求参数拼接 */
    let str = ''
    for(let k in params) {
      str += `${!!str ? '&' : ''}${k}=${params[k]}`
    }

    return `${this.module_export_data.url_api}?${str}`
  }

  /**
   * 添加数据功能
   * */
  add () {
    let xhr = new XHR()
    xhr.request.method = 'post'
    xhr.request.data = this.setPostParam()
    xhr.request.url = this.add_url || this.api_base || ''
    if(this.config.language) {
      //xhr.request.data.lang = this.web_language
    }
    xhr.httpSuccess = (res) => {
      typeof this.afterSend === 'function' ? this.afterSend(res) : ''
    }
    xhr.httpError = (res) => {
      typeof this.afterError === 'function' ? this.afterError(res) : ''
    }
    xhr.httpRequest()
  }

  /**
   * 数据更新功能
   * */
  update () {
    let xhr = new XHR()
    xhr.request.method = 'put'
    xhr.request.url = this.update_url || this.api_base || ''
    this.setPutParam(xhr)
    if(this.config.language && !xhr.request.data.lang) {
      xhr.request.data.lang = this.web_language || 'zh-cn'
    }
    xhr.httpSuccess = (res) => {
      typeof this.afterSend === 'function' ? this.afterSend(res) : ''
    }
    xhr.httpError = (res) => {
      typeof this.afterError === 'function' ? this.afterError(res) : ''
    }
    xhr.httpRequest()
  }

  /**
   * 获取列表数据（可带上关键词搜索）
   * */
  get_list (obj) {
    obj = !!obj ? obj : {}
    let xhr = new XHR()
    let that = this
    that.datalists.loading = true

    /**
     * 设置查询参数
     * 关键词、分页信息、额外查询参数、多语言信息
     * */
    let keyword = this.setSearchParam()
    let getlist = this.setGetListParam()

    for(let key in keyword) {
      if(keyword[key] !== '') {
        getlist[key] = keyword[key]
      }
    }

    /** 表格排序字段 */
    for(let key in this.rsListSort) {
      getlist[key] = this.rsListSort[key]
    }

    getlist.p = obj.p || this.datalists.current || 1  //  第几页面
    getlist.rows = obj.rows || 10   //  每页 10 条数据

    if(obj.params) {
      for(let k in obj.params) {
        getlist[k] = obj.params[k]
      }
    }

  //  if(this.config.language) {
      getlist.lang = getlist.lang || obj.lang || this.web_language || 'zh-cn'
   // }

    xhr.request.method = 'get'
    xhr.request.params = getlist
    xhr.request.url = obj.url || this.get_list_url || this.api_base || ''

    /**
     * 请求成功后的操作
     * */
    xhr.httpSuccess = (res) => {
      let list = []
      let pages = 0
      if(res.data && res.data.page && res.data.page.total_count) {  //  优先取总条数
        pages = Math.ceil(res.data.page.total_count / getlist.rows)
      }else if(res.data && res.data.page && res.data.page.total_pages) {
        pages = res.data.page.total_pages
      }

      let result = res.data.data

      if(!!result.length) {
        for(let i=0,len=result.length; i<len; i++) {
          result[i].model_type = result[i].model_type || that.model_type || ''
          if(that.config.language) {
            result[i].web_language = result[i].web_language || that.web_language || 'zh-cn'
          }

          list.push(new that.current_model(result[i]))
        }
      }

      if(obj.callback) {
        obj.callback({
          errcode: 0,
          data: list,
          totals: res.data && res.data.page && res.data.page.total_count ? res.data.page.total_count : (list.length || 0),
          pages: pages,
        })
      }else {
        that.datalists.data = list
        that.datalists.pages = pages
        that.datalists.totals = res.data && res.data.page && res.data.page.total_count ? res.data.page.total_count : (list.length || 0)
      }

      that.datalists.loading = false
    }

    /**
     * 网络请求失败的操作
     * */
    xhr.httpError = (res) => {

      that.datalists.loading = false
      if(obj.callback) {
        obj.callback({
          data: [],
          totals: 0,
          pages: 1,
          current: 1,
          msg: res.msg || '',
          errcode: res.errcode || ''
        })
      }else {
        that.datalists.data = []
        that.datalists.pages = 1
        that.datalists.current = 1
        that.datalists.totals = 0
      }

      if(res.msg === '网络错误') {
        new Vue().$message.error(res.msg)
      }
    }

    xhr.httpRequest()
  }

  /**
   * 获取单条数据
   * */
  get_detail (obj) {
    let that = this
    let xhr = new XHR()

    //  设置好请求参数
    xhr.request.params = obj.params || that.setDetailParam()
    xhr.request.method = 'get'
    xhr.request.url = this.get_detail_url || ''

    if(this.config.language) {
      xhr.request.params.lang = xhr.request.params.lang || this.web_language
    }

    //  请求成功
    xhr.httpSuccess = (res) => {
      let init = res.data.data
      if(this.config.language) {
        init.web_language = that.web_language
      }
      let detail = new that.current_model(init)
      if(obj.success) {
        obj.success(detail)
      }
    }

    //  请求失败
    xhr.httpError = (res) => {
      typeof obj.error === 'function' ? obj.error(res) : ''
    }

    //  发出请求
    xhr.httpRequest()
  }

  /**
   * 删除单条数据
   * */
  delete_one () {
    let xhr = new XHR()
    xhr.request.method = 'delete'
    xhr.request.params = this.setDeleteOneParam()
    xhr.request.url = this.delete_url || this.api_base || ''
    if(this.config.language && !xhr.request.data.lang) {
      xhr.request.params.lang = this.web_language
    }
    xhr.httpSuccess = (res) => {
      typeof this.afterSend === 'function' ? this.afterSend(res) : ''
    }
    xhr.httpError = (res) => {
      typeof this.afterError === 'function' ? this.afterError(res) : ''
    }
    xhr.httpRequest()
  }


  /** 请求通用 */
  baseHttp(obj) {
    let xhr = new this.httpXHR()
    xhr.request.method = obj.method
    xhr.request.url = obj.url
    xhr.request.data = obj.data
    xhr.request.params = obj.params
    if(xhr.request && xhr.request.data && this.config && this.config.language) {
      xhr.request.data.lang = xhr.request.data.lang || this.web_language || 'zh-cn'
    }
    if(xhr.request && xhr.request.params && this.config && this.config.language) {
      xhr.request.params.lang = xhr.request.params.lang || this.web_language || 'zh-cn'
    }
    if(typeof obj.httpSuccess === 'function') {
      xhr.httpSuccess = obj.httpSuccess
    }
    if(typeof obj.httpError === 'function') {
      xhr.httpError = obj.httpError
    }
    xhr.httpRequest()
  }

  /**
   * 格式化 html
   * */
  sethtml (html) {
    return html
      .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, "\"")
      .replace(/&#39;/g, "\'");
  }

}

export default Base
