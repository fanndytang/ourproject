//  财务审核  模型

import Base from '@/model/base'

/**
 * @class
 * @classdesc 财务
 * */
class SellFinance extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)
    this.model_type = data.model_type || ''
    this.add_url = `${process.env.API.EXCHANGE}/v2/admin/market/auditaccounts`
    this.update_url = `${process.env.API.EXCHANGE}/v2/admin/market/auditaccounts`
    this.delete_url = `${process.env.API.EXCHANGE}/v2/admin/market/auditaccounts`
    this.get_list_url = `${process.env.API.EXCHANGE}/v2/admin/market/auditaccounts`
    this.get_cascader_list_url = `${process.env.API.EXCHANGE}/v2/admin/market/auditaccounts`
    this.current_model = SellFinance
    this.get_detail_url = `${process.env.API.EXCHANGE}/v2/admin/market/auditinfo`
    /** 订单编号 */
    this.bill_sn = data.bill_sn || ''                                    //  订单编号
    this.price = data.price || ''                                        //  订单金额
    this.order_time = data.order_time || ''                            //  下单日期
    this.tel = data.tel || ''                                            //  用户信息
    this.pay_fid = data.pay_fid || ''                         //  转账凭证
    this.pay_pic = data.pay_pic ? data.pay_pic.split(',') : []                            //  转账凭证
    this.status = data.status || 0                         //  状态
    this.status_name = data.status_name || ''                            //  状态对应的名称
    this.remark = data.remark || ''                                      //  备注
    this.goods_gid = data.goods_gid || ''
    this.username = data.username || ''
    this.money = data.money || ''
    this.order_bill_sn = data.order_bill_sn || ''
    this.order_time = data.order_time || ''

    this.audit_status = data.audit_status || ''
    this.audit_status_name = data.audit_status_name || ''

    this.order_href = `${process.env.URL.EXCHANGE}/#/market/order/detail?id=${data.bill_sn}`   //  订单编号 对应的 订单详情链接

    if(this.status_name === '') {
      let status = {3: '待查账', 4: '已到账', 5: '未到账'}
      this.status_name = status[this.status] || ''
    }

    if(this.audit_status_name === '') {
      let status = {0: '待查账', 1: '已到账', 2: '未到账'}
      this.audit_status_name = status[this.audit_status] || ''
    }
    this.list_detail_href = `${process.env.URL.FINANCE}/#/finance/audit/detail?id=${this.bill_sn}`
    this.pkeysearch = {
      bill_sn: '',
      datetimerange: [],
      user: ''
    }
    this.sessionkey_search = 'finauditexchange'
    this.handler_user = data.handler_user || ''
    this.audit_time = data.audit_time || ''
    this.handler_name = data.handler_name || ''
    this.$storeList = 'financeauditlist'
    this.config = {
      detail: this.api_rights.market[`v2,market,admin,auditinfo,get`]
    }
    this.can_check = this.api_rights.market[`v2,market,admin,auditaccounts,put`]                                                               //  审核权限
    this.config.notools = !this.config.detail && !this.can_check
    this.get_detail_data = data.get_detail_data || {bill_sn: this.bill_sn}
  }

  /**
   * @function
   * @description 审核 */
  check(obj) {
    super.baseHttp({
      method: 'put',
      url: `${process.env.API.EXCHANGE}/v2/admin/market/auditaccounts`,
      data: {
        gid: this.goods_gid,
        bill_sn: this.bill_sn,
        status: this.status,
        uid: this.uid,
        remark: this.remark
      },
      httpSuccess: obj.success ? obj.success : '',
      httpError: obj.error ? obj.error: ''
    })
  }
}

export default SellFinance
