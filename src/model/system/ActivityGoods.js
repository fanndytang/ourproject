import Base from '@/model/base'

/**
 * @class
 * @classdesc 活动可选商品列表
 * */
class ActivityGoods extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)
    this.get_list_url = `${process.env.API.SYSTEM}/v1/admin/system/acttil`
    this.current_model = ActivityGoods

    /** 所属活动标识 */
    this.activity_acid = data.activity_acid || ''
    /** 商品标识 */
    this.gid = data.gid || ''
    /** 商品名称 */
    this.title = data.title || ''
    /** 关键词 */
    this.pkeysearch = {
      title: ''
    }
    /** 关键词搜索标识 */
    this.sessionkey_search = (this.activity_acid || '') + 'SysGoodsactivitylist'
    /** 在vuex中的缓存标识 */
    this.$storeList = (this.activity_acid || '') + 'SysGoodsactivitylist'
  }

  /**
   * @function
   * @description 设置请求数据时的初始参数
   * */
  setGetListParam() {
    let data = {}
    if(this.activity_acid) {
      data = { acid: this.activity_acid}
    }
    return data
  }
}

export default ActivityGoods
