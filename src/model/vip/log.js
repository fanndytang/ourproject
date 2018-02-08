/**
 * 会籍等级
 * */

import Base from '@/model/base'
import xhr from '@/plugin/main'

/**
 * @class
 * @classdesc 会籍日志*/
class VipLog extends Base {
  constructor(data) {
    data = !!data ? data : {}

    data.add_url = `${process.env.API.VIP}/v1/admin/vip/change`
    data.get_list_url = `${process.env.API.VIP}/v1/admin/vip/change`
    data.update_url = `${process.env.API.VIP}/v1/admin/vip/change`
    data.delete_url = `${process.env.API.VIP}/v1/admin/vip/change`
    data.get_detail_url = `${process.env.API.VIP}/v1/admin/vip/memberchangeinfo`

    data.current_model = VipLog

    super(data)

    this.change_time = data.change_time || ''
    this.handler_time = data.handler_time || ''
    this.handler_uid = data.handler_uid || ''
    this.in_gid = data.in_gid || ''
    this.out_gid = data.out_gid || ''
    this.remark = data.remark || ''
    this.tel = data.tel || ''
    this.title = data.title || ''
    this.username = data.username || ''
    this.member_uid = data.member_uid || ''
    this.member_tel = data.member_tel || ''
    this.hall_code = data.hall_code || ''
    this.in_title = data.in_title || ''
    this.out_title = data.out_title || ''
    this.bill_sn = data.bill_sn || ''

    this.handler_user = data.handler_user || ''

    this.tel_href = `${process.env.URL.USER}/#/tel=${this.tel}`

    this.list_detail_href = `${process.env.URL.VIP}/#/vip/log/detail?id=${this.bill_sn}`
    this.pkeysearch = {
      user: '',
      title: '',
      datetimerange: []
    }

    this.sessionkey_search = 'viplog'

    this.config = {
      add: this.api_rights.vip[`v1,change,post`],
      detail: this.api_rights.vip[`v1,memberchangeinfo,get`],
      search: true
    }
    this.get_detail_data = data.get_detail_data || {bill_sn: this.bill_sn}
  }

  /**
   * 添加属性时传递的值（不同的属性可能不是全部都要传）
   * */
  setPostParam () {
    return {
      hall_code: this.hall_code,
      uid: this.member_uid,
      out_gid: this.out_gid,
      in_gid: this.in_gid,
      handler_uid: this.uid,
      remark: this.remark,
      time: xhr.date_string(this.change_time)
    }
  }


  searchLive (val, type, call) {
    let url = ''
    let params = {}
    switch (type) {
      case 'watch':
        url = `${process.env.API.VIP}/v1/admin/vip/watchinfo`
        params = { title: val }
        break
      case 'tel':
        url = `${process.env.API.VIP}/v1/admin/vip/memberinfo`
        params = { tel: val }
        break
      default: break
    }
    super.baseHttp({
      method: 'get',
      url: url,
      params: params,
      httpSuccess: call ? call : ''
    })
  }

}

export default VipLog
