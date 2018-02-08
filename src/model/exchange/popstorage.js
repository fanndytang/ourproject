import Base from '@/model/base'

/**
 * @class
 * @classdesc 入库
 * */
class PopStorage extends Base{
  constructor(data) {
    data = !!data ? data : {}
    super(data)
    this.add_url = `${process.env.API.EXCHANGE}/v2/admin/market/warehouseout`
    this.get_list_url = `${process.env.API.EXCHANGE}/v2/admin/market/warehouseout`
    this.update_url = `${process.env.API.EXCHANGE}/v2/admin/market/warehouseout`
    this.delete_url = `${process.env.API.EXCHANGE}/v2/admin/market/warehouseout`
    this.get_detail_url = `${process.env.API.EXCHANGE}/v2/admin/market/outinfo`
    this.id = data.id || ''
    this.current_model = PopStorage
    this.warehouse_id = (data.warehouse_id || '').toString()         //  仓库ID
    this.source = data.source || 'platform'                     //  来源
    this.source_name = data.source ? (data.source === 'platform' ? '产品入库' : '订单入库') : ''
    this.bill_sn = data.bill_sn || ''                   //  订单号
    this.bill_sn_source = data.bill_sn_source || ''     //  订单来源号
    this.goods_name = data.goods_name || ''             //  商品名称
    this.brand_id = data.brand_id || ''                 //  品牌ID
    this.brand_name = data.brand_name || ''
    this.goods_sn = data.goods_sn || ''                 //  商品编号
    this.goods_number = parseFloat(data.goods_number || '0')          //  数量
    this.price = data.price || ''                       //  价格
    this.price_show = data.price
    this.remark = data.remark || ''                     //  备注
    this.fid = data.credential_fid_list  || ''                    //  实物图
    this.pic = data.credential_pic ? data.credential_pic.split(',') : []
    this.handler_time = data.handler_time || ''
    this.handler_uid = data.handler_uid || ''
    this.order_bill_sn = data.order_bill_sn || ''
    this.kind_name = data.kind_name || ''
    this.kind = data.kind || ''
    this.warehouse_name = data.warehouse_name || ''
    this.handler_name = data.handler_name || ''
    this.list_detail_href = `${process.env.URL.EXCHANGE}/#/market/popstorage/detail?id=${this.bill_sn}`
    this.pkeysearch = {
      title: '',
      type: '',
      bill_sn: '',
      brand_id: ''
    }
    this.sessionkey_search = 'exstorage' + (data.model_type ? data.model_type : '')
    this.config = {
      add: this.api_rights.market[`v2,market,admin,warehouseout,post`],
      detail: this.api_rights.market[`v2,market,admin,outinfo,get`],
      search: true
    }
    this.$storeList = 'MarketPopStorageList'
    this.get_detail_data = data.get_detail_data || {bill_sn: this.bill_sn}
  }

  setPostParam () {
    return {
      warehouse_id: this.warehouse_id,
      source: this.source === 'platform' ? 'platform' : this.bill_sn,
      bill_sn: this.source === 'platform' ? '' : this.bill_sn,
      bill_sn_source: this.source === 'platform' ? '' : this.bill_sn,
      goods_name: this.goods_name,
      brand_id: this.brand_id,
      goods_sn: this.goods_sn,
      goods_number: this.goods_number,
      price: this.price,
      uid: this.uid,
      remark: this.remark,
      fid: this.fid.split(',')
    }
  }

  /**
   * @function
   * @description 添加数据功能
   * */
  add () {
    let d = this.setPostParam()
    let msg = ''
    if(!d.goods_name) {
      msg = '请填写商品名称'
    }else if(!d.goods_sn) {
      msg = '请填写商品编号'
    }else if(!d.brand_id) {
      msg = '请选择品牌'
    }else if(!d.warehouse_id) {
      msg = '请选择仓库'
    }else if(d.fid.length <= 0) {
      msg = '请上传图片'
    }

    if(msg) {
      typeof this.afterError === 'function' ? this.afterError({msg: msg}) : ''
    }else {
      super.add()
    }
  }


  /**
   * @function
   * @description 更新数据功能
   * */
  update () {
    let d = this.setPutParam()
    let msg = ''
    if(!d.goods_name) {
      msg = '请填写商品名称'
    }else if(!d.goods_sn) {
      msg = '请填写商品编号'
    }else if(!d.brand_id) {
      msg = '请选择品牌'
    }else if(!d.warehouse_id) {
      msg = '请选择仓库'
    }else if(d.fid.length <= 0) {
      msg = '请上传图片'
    }

    if(msg) {
      typeof this.afterError === 'function' ? this.afterError({msg: msg}) : ''
    }else {
      super.update()
    }
  }
}


export default PopStorage
