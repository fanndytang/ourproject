//  付款申请  模型

import Base from '@/model/base'

/**
 * @class
 * @classdesc 付款
 * */
class Pay extends Base {
  constructor(data) {
    data = !!data ? data : {}

    super(data)
    this.get_list_url = `${process.env.API.EXCHANGE}/v1/admin/market/payment`
    //  data.get_cascader_list_url = `${process.env.API.NEWS}/v1/admin/news/category`
    this.current_model = Pay

    this.bill_sn = data.bill_sn || ''                                    //
    this.order_bill_sn = data.order_bill_sn || ''                                    //
    this.amount = data.amount || ''                                        //  订单金额
    this.username = data.username || ''                            //  下单日期
    this.tel = data.tel || ''                                            //  用户信息
    this.cardnum = data.cardnum || ''                         //  转账凭证
    this.name = data.name || ''                         //  转账凭证
    this.status = data.status                         //  状态
    this.status_name = data.status_name || ''                            //  状态对应的名称
    this.apply_time = data.apply_time || ''                                      //  备注
    this.handler_time = data.handler_time || ''
    this.handle_uid = data.handle_uid || ''
    this.handle_user = data.handle_user || ''
    this.bank_name = data.bank_name || ''
    this.bank_card = data.bank_card || ''

    this.method = data.method || 1
    this.platform_account_id = data.platform_account_id || ''

    this.pkeysearch = {
      bill_sn: '',
      datetimerange: []
    }

    this.sessionkey_search = 'finpay'

    this.$storeList = 'financePay'
    this.can_pay = this.api_rights.market[`v1,market,admin,payment,put`]
    this.config.notools = !this.can_pay
  }

  /**
   * @function
   * @description 已付款 */
  pay(obj) {
    super.baseHttp({
      method: 'put',
      url: `${process.env.API.EXCHANGE}/v1/admin/market/payment`,
      data: {
        bill_sn: this.bill_sn,
        handler_uid: this.uid,
        status: this.status,
        remark: this.remark
      },
      httpSuccess: obj.success ? obj.success : '',
      httpError: obj.error ? obj.error : ''
    })
  }
}

export default Pay
