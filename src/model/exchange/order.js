import Base from '@/model/base'

/** @class
 * @classdesc 订单*/
class Order extends Base{
  constructor(data) {
    data = !!data ? data : {}
    super(data)
    this.get_list_url = `${process.env.API.EXCHANGE}/v2/admin/market/orderlist`
    this.get_detail_url = `${process.env.API.EXCHANGE}/v2/admin/market/orderinfo`
    this.id = data.id || ''
    this.current_model = Order
    /** 订单编号 */
    this.bill_sn = data.bill_sn || ''                                     //  订单编号
    this.address = data.address || ''
    this.address_id = data.address_id || ''
    this.buyer_uid = data.buyer_uid || ''
    this.city_id = data.city_id || ''
    this.del_time = data.del_time || ''
    this.delivery_method = data.delivery_method || ''
    this.delivery_method_name = data.delivery_method_name || ''
    this.delivery_stage = data.delivery_stage || ''
    this.delivery_stage_name = data.delivery_stage_name || ''
    this.dist_id = data.dist_id || ''
    this.goods_gid = data.goods_gid || ''
    this.goods_kind_id = data.goods_kind_id || ''
    this.handler_time = data.handler_time || ''
    this.handler_uid = data.handler_uid || ''
    this.is_del = data.is_del || ''
    this.order_stage = data.order_stage || ''
    this.order_stage_name = data.order_stage_name || ''
    this.order_time = data.order_time || ''
    this.pay_fid = data.pay_fid || ''
    this.pay_method = data.pay_method || ''
    this.pay_method_name = data.pay_method_name || ''
    this.pay_stage = data.pay_stage || ''
    this.pay_time = data.pay_time || ''
    this.platform_account_id = data.platform_account_id || ''
    this.price = data.price || ''
    this.prov_id = data.prov_id || ''
    this.seller_uid = data.seller_uid || ''
    this.receiver_tel = data.receiver_tel || ''
    this.receiver = data.receiver || ''
    this.tel = data.tel || ''                                          //  下单用户
    this.terminal = data.terminal || ''                                //  终端
    this.title = data.title || ''                                      //  名称

    this.put_href = `${process.env.URL.EXCHANGE}/#/market/putstorage?orderid=${this.bill_sn}`                             //  入库url
    this.pop_href = `${process.env.URL.EXCHANGE}/#/market/popstorage?orderid=${this.bill_sn}`                             //  出库url
  //  this.check_href = `${process.env.URL.EXCHANGE}/#/evaluation?orderid=${this.bill_sn}`                          //  鉴定url
    this.check_href = `${process.env.URL.EXCHANGE}/#/market/evaluation`                          //  鉴定url


    this.pay_pic = data.pay_pic || ''


    if(typeof this.pay_pic === 'string' && this.pay_pic != '') {
      this.pay_pic = data.pay_pic.split(',')
    }

    this.goods_img = []

    this.remark = data.remark || ''

    this.original_price = data.original_price || ''
    this.cover_pic = data.cover_pic || ''
    this.details = data.details || ''


    this.list_detail_href = `${process.env.URL.EXCHANGE}/#/market/order/detail?id=${this.bill_sn}`
    this.pkeysearch = {
      bill_sn: '',
      status: '',
      datetimerange: [],
      tel: '',
      methods: ''
    }

    this.sessionkey_search = 'exorder'

    this.handler_user = data.handler_user || ''
    this.audit_time = data.audit_time || ''

    this.config = {
      detail: this.api_rights.market[`v2,market,admin,orderinfo,get`],
      search: true
    }

    this.$storeList = 'MarketOrderList'
    this.get_detail_data = data.get_detail_data || {bill_sn:this.bill_sn}
  }

  /**
   * @function
   * @description 取消订单
   * */
  cancelOrder (obj) {
    super.baseHttp({
      method: 'put',
      url: `${process.env.API.EXCHANGE}/v2/admin/market/cancelorder`,
      data: {
        uid: this.uid,
        bill_sn: this.bill_sn
      },
      httpSuccess: obj.success ? obj.success : '',
      httpError: obj.error ? obj.error : ''
    })
  }


  /**
   * @function
   * @description 获取发货信息
   * */
  getMessage (obj) {
    super.baseHttp({
      method: 'get',
      url: `${process.env.API.EXCHANGE}/v2/admin/market/delivernotice`,
      httpSuccess (res) {
        obj.success(res)
      },
      httpError: obj.error ? obj.error : ''
    })
  }
  /**
   * @function
   * @description 通知卖方发货
   * */
  sendGood (obj) {
    super.baseHttp({
      method: 'post',
      url: `${process.env.API.EXCHANGE}/v2/admin/market/delivernotice`,
      data: {
        uid: this.uid,
        bill_sn: this.bill_sn
      },
      httpSuccess: obj.success ? obj.success : '',
      httpError: obj.error ? obj.error : ''
    })
  }

  /**
   * @function
   * @description 确认收货
   * */
  getGood (obj) {
    super.baseHttp({
      method: 'post',
      url: `${process.env.API.EXCHANGE}/v2/admin/market/received`,
      data: {
        bill_sn: this.bill_sn,
        hand_uid: this.uid,
        fid: this.fid ? this.fid.split(',') : [],
        remark: this.remark
      },
      httpSuccess: obj.success ? obj.success : '',
      httpError: obj.error ? obj.error : ''
    })
  }
}


export default Order
