//  腕表之家  模型

//import Vue from 'vue'
import Base from '@/model/base'

/**
 * @class
 * @classdesc 腕表之家
 * */

class WatchFamily extends Base {
  constructor(data) {
    data = !!data ? data : {}
    data.current_model = WatchFamily
    super (data)

    // this.api_base = `${process.env.API.EXCHANGE}/admin/watch/wp`
    this.api_base = `${process.env.API.EXCHANGE}/v2/admin/market/xbiao`

    this.detail_url = data.detail_url || ''                    //  详情url
    this.cover_fid = data.cover_fid || ''                      //  封面图id
    this.watch_fid = data.watch_fid || ''                      //  商品图片id
    // this.model_number = data.model_number || ''                //  机型
    this.title = data.title || ''                              //  标题
    this.remark = data.remark || ''                            //  备注


    this.base_data = data.base_data || {}                      //  基本信息
    this.other_attr = data.other_attr || []                    //  详情描述
    this.hasbase = false                                       //  是否有基本信息
  }

  setPostParam () {
    let other = {}
    let basedata = {}
    for(let k in this.base_data) {
      basedata[k] = this.base_data[k]
    }
    for(let k in this.other_attr) {
      if(this.other_attr[k].key !== '' && this.other_attr[k].value !== '') {
        other[this.other_attr[k].key] = this.other_attr[k].value
      }
    }

    basedata.cover_fid = this.cover_fid
    basedata.remark = this.remark
    basedata.title  = this.title
    basedata.watch_fid = this.watch_fid.split(',') || []
    basedata.model_number = this.base_data.model_num
    return {
      base_data: basedata,
      other_attr: other
    }
  }


  /**
   * 提交表单时的验证
   * */
  validForm() {
    let msg = ''
    let file = !!this.watch_fid ? this.watch_fid.split(',') : []

    if(!this.detail_url) {
      msg = '请输入详情url获取数据'
    }else if(!this.hasbase) {
      msg = '请输入有效的详情url'
    }else if(!this.title) {
      msg = '请输入商品名称'
    }else if(!this.cover_fid) {
      msg = '请上传封面图'
    }else if(!this.watch_fid) {
      msg = '请上传商品图片'
    }else if(file.length < 3 || file.length > 10) {
      msg = '商品图片应 >= 3, <= 9 张'
    }

    if(msg) {
   //   new Vue().$message.error(msg)
      typeof this.afterError === 'function' ? this.afterError({msg: msg}) : ''
      return false
    }else {
      return true
    }
  }

  /**
   * @function
   * @description 添加数据 */
  add () {
    if(this.validForm()) {
      super.add()
    }
  }

  /**
   * @function
   * @description 根据url获取对应的价格与属性*/
  getPriceAttr () {
    let that = this
    let xhr = new that.httpXHR()
    xhr.request.method = 'get'
    xhr.request.params = {
      u: this.detail_url
    }
    xhr.request.url = `${process.env.API.EXCHANGE}/v2/admin/market/xbiao`
    xhr.httpSuccess = (res) => {
      that.base_data = res.data.data.base_data
      let other_attr = res.data.data.other_attr
      let cache = []
      for(let k in other_attr) {
        cache.push({
          key: k,
          value: other_attr[k]
        })
      }
      that.other_attr = cache

      that.hasbase = false
      for(let k in that.base_data) {
        that.hasbase = true
        break;
      }
    }
    xhr.httpError = res => {
      new Vue().$message.error(res.msg || 'url无效')
    }
    xhr.httpRequest()
  }
}

export default WatchFamily
