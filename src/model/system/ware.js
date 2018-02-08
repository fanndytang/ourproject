//  仓库模型

import Base from '@/model/base'

/**
 * @class
 * @classdesc 仓库
 * */
class Ware extends Base {
  constructor(data) {
    data = !!data ? data : {}

    data.add_url = `${process.env.API.EXCHANGE}/v2/admin/market/warehouse`
    data.get_list_url = `${process.env.API.EXCHANGE}/v2/admin/market/warehouse`
    data.update_url = `${process.env.API.EXCHANGE}/v2/admin/market/warehouse`
    data.delete_url = `${process.env.API.EXCHANGE}/v2/admin/market/warehouse`
    data.get_detail_url = `${process.env.API.EXCHANGE}/v2/admin/market/warehouse`

    data.id = data.id || ''
    data.current_model = Ware

    super(data)

    this.kind = parseInt(data.kind || '1')                         //  入库类型  1鉴定  2商品
    this.name = data.name || ''                         //  仓库名称
    this.location = data.location || ''                 //  仓库所在地址
    this.manager = data.manager || ''                   //  仓库管理员
    this.status = parseInt(data.status || '0')                     //  启用状态  0未启用  1启用
    this.remark = data.remark || ''                     //  备注

    this.kind_name = this.kind === 1 ? '鉴定' : this.kind === 2 ? '商品' : ''
    this.status_name = this.status === 0 ? '未启用' : this.status === 1 ? '启用' : ''

    this.pkeysearch = {
      title: ''
    }

    this.sessionkey_search = 'sysware'

    this.config = {
      add: this.api_rights.market[`v1,market,admin,warehouse,post`],
      edit: this.api_rights.market[`v1,market,admin,warehouse,put`],
      del: this.api_rights.market[`v1,market,admin,warehouse,delete`],
      search: true
    }

    this.$storeList = 'SysWareList'
  }
  /**
   * @function
   * @description 表单提交时所传参数 */
  setPostParam () {
    return {
      kind: this.kind,
      name: this.name,
      location: this.location,
      manager: this.manager,
      status: this.status,
      remark: this.remark
    }
  }
}

export default Ware
