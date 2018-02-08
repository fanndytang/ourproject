import Base from '@/model/base'

/**
 * @class Area
 * @classdesc 省市区模型
 * */
class Area extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)
    this.get_list_url = `${process.env.API.DICT}/v1/admin/dict/area`
    this.id = data.id || ''
    this.current_model = Area

    /** 不经过getlist 处理的原始数据 */
    this.all_list = data.all_list || []
    /** 权限配置 */
    this.config = {
      get: this.api_rights.dict[`v1,dict,admin,area,get`]
    }
  }

  /**
   * @function
   * @description 获取地区列表*/
  getAllArea () {
    let that = this
    let xhr = new this.httpXHR()
    xhr.request.method = 'get'
    xhr.request.url = `${process.env.API.DICT}/v1/admin/dict/area`
    xhr.request.params = {
      kind: 'all'
    }
    xhr.httpResponse = res => {
      let list = res.data
      for(let k in list) {
        list[k].children = list[k].city
        for(let c in list[k].city) {
          list[k].children[c].children = list[k].city[c].dist
        }
      }

      that.all_list = list || []
    }
    xhr.httpRequest()
  }
}

export default Area
