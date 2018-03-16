import Base from '/model/base.js'
/**
 * @class
 * @classdesc 订单 */
class Order extends Base {
  constructor(data) {
    data = data || {}
    super(data)

    this.useModel = Order

    this.title = data.title || ''
    this.id = data.id || ''

    /** 唯一标识 */
    this.$unique = 'order'

    /** 关键词搜索 */
    this.rsSearch = {
      title: ''
    }
  }
}

export default Order
