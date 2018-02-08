/**
 * 会籍等级
 * */

import Base from '@/model/base'
import xhr from '@/plugin/main'

/**
 * @class
 * @classdesc 会籍订单*/
class VipKind extends Base {
  constructor(data) {
    data = !!data ? data : {}

    data.add_url = `${process.env.API.VIP}/v1/admin/vip/order`
    data.get_list_url = `${process.env.API.VIP}/v1/admin/vip/order`
    data.update_url = `${process.env.API.VIP}/v1/admin/vip/order`
    data.delete_url = `${process.env.API.VIP}/v1/admin/vip/order`
    data.get_detail_url = `${process.env.API.VIP}/v1/admin/vip/orderinfo`

    data.current_model = VipKind

    super(data)


    this.bill_sn = data.bill_sn || ''
    this.address_id = data.address_id || ''
    this.buyer_uid = data.buyer_uid ||''
    this.del_time = data.del_time || 0
    this.delivery_method = data.delivery_method || 0
    this.delivery_stage = data.delivery_stage || 0
    this.delivery_time = data.delivery_time || 0
    this.handler_time = data.handler_time || 0
    this.handler_uid = data.handler_uid || ''
    this.is_del = data.is_del || 0
    this.level_code = data.level_code || ''
    this.order_stage = data.order_stage || 0
    this.order_stage_name = data.order_stage_name || ''
    this.order_time = data.order_time || ''
    this.pay_fid = data.pay_fid || ''
    this.pay_method = data.pay_method || ''
    this.pay_stage = data.pay_stage || ''
    this.pay_time = data.pay_time || ''
    this.platform_account_id = data.platform_account_id || ''
    this.tel = data.tel || ''
    this.terminal = data.terminal || ''
    this.username = data.username || ''
    this.level_name = data.level_name || ''
    this.money = data.money || ''

    this.name = data.name || ''
    this.code = data.code || ''
    this.login_fid = data.login_fid || ''
    this.icon_fid = data.icon_fid || ''
    this.logo_pic = data.logo_pic || ''
    this.icon_pic = data.icon_pic || ''
    this.pay_pic = data.pay_pic || ''

    if(typeof this.pay_pic === 'string' && this.pay_pic != '') {
      this.pay_pic = data.pay_pic.split(',')
    }

    this.pay_method_name = data.pay_method_name || ''

    if(this.pay_method_name === '') {
      let text = {0: '支付宝', 1: '线下支付'}
      this.pay_method_name = text[this.pay_method]
    }

    this.list_detail_href = `${process.env.URL.VIP}/#/vip/order/detail?id=${this.bill_sn}`
    this.pkeysearch = {
      bill_sn: '',
      status: '',
      tel: '',
      datetimerange: []
    }


    this.code_name = ''
    let text  = {
      'lev1': '一级',
      'lev2': '二级',
      'lev3': '三级',
      'lev4': '四级',
      'lev5': '五级',
    }
    if(this.level_code) {
      this.code_name = text[this.level_code.toString()]
    }

    this.sessionkey_search = 'viporder'

    this.handler_user = data.handler_user || ''
    this.audit_time = data.audit_time || ''
    this.handler_name = data.handler_name || ''


    this.config = {
      detail: this.api_rights.vip[`v1,vip,admin,orderinfo,get`],
      search: true
    }

    this.can_closeorder = this.api_rights.vip[`v1,vip,admin,cancelorder,put`]  //  取消订单权限
    this.config.notools = !this.config.detail && !this.can_closeorder

    this.$storeList = 'vipOrder'
    this.get_detail_data = data.get_detail_data || {bill_sn: this.bill_sn}
  }


  /**
   * 取消订单
   * */
  cancel_order (obj) {
    super.baseHttp({
      method: 'put',
      url:  `${process.env.API.VIP}/v1/admin/vip/cancelorder`,
      data: {
        uid: this.uid,
        bill_sn: this.bill_sn
      },
      httpSuccess: obj.success ? obj.success : '',
      httpError: obj.error ? obj.error : ''
    })
  }
}

export default VipKind
