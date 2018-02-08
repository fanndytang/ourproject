//  财务审核  模型

import Base from '@/model/base'

/**
 * @class
 * @classdesc 财务
 * */
class Finance extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)
    this.model_type = data.model_type || ''
    this.add_url = `${process.env.API.VIP}/v1/admin/vip/audit`
    this.update_url = `${process.env.API.VIP}/v1/admin/vip/audit`
    this.delete_url =`${process.env.API.VIP}/v1/admin/vip/audit`
    this.get_list_url = `${process.env.API.VIP}/v1/admin/vip/audit`
    this.get_cascader_list_url = `${process.env.API.VIP}/v1/admin/vip/audit`
    this.current_model = Finance
    this.get_detail_url = `${process.env.API.VIP}/v1/admin/vip/auditinfo`

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

    this.order_href = `${process.env.URL.VIP}/#/vip/order/detail?id=${data.order_bill_sn}`   //  订单编号 对应的 订单详情链接

    if(this.status_name === '') {
      let status = {3: '待查账', 4: '已到账', 5: '未到账'}
      this.status_name = status[this.status] || ''
    }

    if(this.audit_status_name === '') {
      let status = {0: '待查账', 1: '已到账', 2: '未到账'}
      this.audit_status_name = status[this.audit_status] || ''
    }
    this.list_detail_href = `${process.env.URL.FINANCE}/#/finance/vip/detail?id=${this.order_bill_sn}`
    this.pkeysearch = {
      bill_sn: '',
      datetimerange: [],
      user: ''
    }
    this.sessionkey_search = 'finauditvip'
    this.handler_user = data.handler_user || ''
    this.audit_time = data.audit_time || ''
    this.handler_name = data.handler_name || ''
    this.$storeList = 'financeAuditVip'
    this.config = {
      detail: this.api_rights.vip[`v1,vip,admin,audit,get`]
    }
    this.can_check = this.api_rights.vip[`v1,vip,admin,audit,put`]
    this.config.notools = !this.config.detail && !this.can_check
    this.get_detail_data = data.get_detail_data || {bill_sn: this.bill_sn}
  }

  /**
   * @function
   * @description 审核 */
  check_vip (obj) {
    super.baseHttp({
      method: 'put',
      url: `${process.env.API.VIP}/v1/admin/vip/audit`,
      data: {
        uid: this.uid,
        bill_sn: this.order_bill_sn,
        status: this.status,
        remark: this.remark
      },
      httpSuccess: obj.success ? obj.success : '',
      httpError: obj.error ? obj.error : ''
    })
  }
}

export default Finance
