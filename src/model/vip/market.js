/**
 * 换戴产品
 * */

import Base from '@/model/base'
import xhr from '@/plugin/main'

/**
 * @class
 * @classdesc 换戴*/
class VipMarket extends Base {
  constructor(data) {
    data = !!data ? data : {}

    data.add_url = `${process.env.API.EXCHANGE}/v1/market/seller/publish`
    data.update_url = `${process.env.API.EXCHANGE}/v1/market/seller/publish`
    data.get_list_url = `${process.env.API.VIP}/v1/admin/vip/watchlist`
    data.get_detail_url = `${process.env.API.VIP}/v1/admin/vip/memberwatchinfo`

    /*
    data.update_url = `${process.env.API.EXCHANGE}/v1/market/seller/publish`
    data.delete_url = `${process.env.API.EXCHANGE}/v1/market/seller/publish`*/

    data.current_model = VipMarket

    super(data)

    //let gtext = {1: '男', 2: '女', 3: '中性'}

    this.gender = data.gender || 1   // 性别  1.男  2.女  3.中性

    this.gender_name = data.gender_name || ''
  //  if(data.gender) {
    //  this.gender_name = gtext[parseInt(data.gender)]
  //  }

    this.diameter = data.diameter || ''   // 表盘直径

    this.diameter_name = data.diameter ? (data.diameter + 'mm') : ''


    this.publish_status = data.publish_status || ''
    this.title = data.title || ''
    this.brand_id = (data.brand_id || '').toString()
    this.fineness_id = (data.fineness_id || '').toString()
    this.material_id = (data.material_id || '').toString()
    this.shape_id = (data.shape_id || '').toString()

    this.price = parseFloat((data.price || '0').replace('$', '').replace('￥', ''))
    this.original_price = parseFloat((data.original_price || '0').replace('$', '').replace('￥', ''))
    this.market_price = parseFloat((data.market_price || '0').replace('$', '').replace('￥', ''))

    this.original_price = isNaN(this.original_price) ? 0 : this.original_price
    this.market_price = isNaN(this.market_price) ? 0 : this.market_price
    this.price = isNaN(this.price) ? 0 : this.price

    this.original_price_show = '￥' + this.original_price
    this.price_show = '￥' + this.price

    this.details = data.details || ''
    this.remark = data.remark || ''
    this.cover_fid = data.cover_fid || ''
    this.cover_pic = data.cover_pic || ''
    this.file_id = data.file_id || ''
    this.file_fid = data.file_fid ? data.file_fid.split(',') : []
    this.file_pic = data.file_pic ? data.file_pic.split(',') : []
    this.function_id = data.function_id ? data.function_id.split(',') : []
    this.prov_id = data.prov_id || ''
    this.city_id = data.city_id || ''
    this.location = data.location || ''
    this.exchange_stage = data.exchange_stage || ''
    this.exchange_stage_status = data.exchange_stage_status || 10
    this.exchange_time = data.exchange_time || ''
    this.movement_id = (data.movement_id || '').toString()
    this.is_platform = data.is_platform || ''
    this.hall_code = data.hall_code || ''
    this.publish_status = data.publish_status == 0 ? 0 : (data.publish_status || '')
    this.publish_status_name = data.publish_status_name || ''
    this.publish_time = data.publish_time || ''
    this.username = data.username || ''
    this.tel = data.tel || ''
    this.user_uid = data.user_uid || ''
    this.gid = data.gid || ''
    this.level_name = data.level_name || ''

    this.hall_name = data.hall_name || ''
    this.brand_name = data.brand_name || ''
    this.movement_name = data.movement_name || ''
    this.material_name = data.material_name || ''
    this.shape_name = data.shape_name || ''
    this.fineness_name = data.fineness_name || ''
    this.function_name = data.function_name || ''


    this.create_time = data.create_time || ''

    this.member_level_code = data.member_level_code || ''

    this.level_code = data.level_code || data.member_level_code || ''     //  换戴等级编号
    this.code_name = ''
    let text  = {
      'lev1': '一级',
      'lev2': '二级',
      'lev3': '三级',
      'lev4': '四级',
      'lev5': '五级',
    }
    if(this.member_level_code) {
      this.code_name = text[this.member_level_code.toString()]
    }


 //   this.goods_img = []

   /* let text = ['正面', '右侧面', '左侧面', '背面', '表扣', '上手图', '全貌', '证书', '发票']
    for(let k=0; k<9; k++) {
      this.goods_img.push({
        file_id: '',
        pic: '',
        text: text[k]
      })
    }*/

    this.goods_img = []
    for(let i=0, len=this.file_pic.length; i<len; i++) {
      this.goods_img.push({
        file_id: this.file_fid[i] || '',
        url: this.file_pic[i] || '',
        file_fid: this.file_fid[i] || '',
        name: ''
      })
    }

    this.list_detail_href = `${process.env.URL.VIP}/#/vip/market/detail?id=${this.gid}&lang=${this.web_language}`
    this.pkeysearch = {
      title: '',
      status: '',
      location: '',
      code: ''
    }

    this.sessionkey_search = 'vipmarket'
    this.$storeList = 'VipMarket'


    this.config = {
      add: this.api_rights.market[`v1,market,seller,publish,post`],
      edit: this.api_rights.market[`v1,market,seller,publish,put`],
      detail: this.api_rights.vip[`v1,vip,admin,memberwatchinfo,get`],
      search: true,
      language: true
    }
    this.down_goods = this.api_rights.vip[`v1,vip,admin,watchlist,put`]  //  下架产品权限
    this.get_detail_data = data.get_detail_data || {gid: this.gid, lang: this.web_language}
  }

  /**
   * 添加属性时传递的值（不同的属性可能不是全部都要传）
   * */
  setPostParam () {
  //  let file_id = []

   /* for(let key in this.goods_img) {
      if(!!this.goods_img[key].file_id) {
        file_id.push(this.goods_img[key].file_id)
      }
    }*/

    let file_id = []
    if(this.goods_img.length) {
      for(let i=0,len=this.goods_img.length; i<len; i++) {
        file_id.push(this.goods_img[i].file_fid)
      }
    }
    if(typeof file_id === 'string') {
      file_id = file_id.split(',')
    }

    return {
      gid: this.gid,
      gender: this.gender,
      diameter: this.diameter,
      title: this.title,
      brand_id: this.brand_id,
      fineness_id: this.fineness_id,
      material_id: this.material_id,
      shape_id: this.shape_id,

      price: parseFloat(this.price.toString().replace('$', '').replace('￥', '')).toString(),
      original_price: parseFloat(this.original_price.toString().replace('$', '').replace('￥', '')).toString(),

      details: this.details,
      file_id: file_id,
      cover_fid: this.cover_fid,
      function_id: this.function_id,
      prov_id: this.prov_id,
      city_id: this.city_id,
      location: this.location,
      movement_id: this.movement_id,
      is_platform: 1,
      hall_code: this.hall_code,
      publish_status: this.publish_status,
      level_code: this.level_code,
    //  user_uid: this.uid
    }
  }


  /**
   * 添加
   * */
  add () {
    let msg = ''

    if(!parseInt(this.diameter)) {
      msg = '请输入表盘直径'
    }

    if(!this.cover_fid) {
      msg = '请上传封面图'
    }else if(!this.brand_id) {
      msg = '请选择品牌'
    }else if(!this.original_price) {
      msg = '请输入商品原价'
    }else if(!this.price) {
      msg = '请输入商品售价'
    }else if(!this.fineness_id) {
      msg = '请选择成色'
    }else if(parseInt(this.diameter) > 70) {
      msg = '表盘直径最大为70mm'
    }else if(!this.level_code) {
      msg = '请选择换戴等级'
    }else if(!this.hall_code) {
      msg = '请选择体验厅'
    }else if(this.goods_img.length < 3) {
      msg = '商品图片不可少于3张'
    }else if(this.goods_img.length > 10) {
      msg = '商品图片不可多于9张'
    }
    if(msg) {
      xhr.tip.$notify.error({
        title: '错误',
        message: msg
      });
      return false
    }

    let d = this.setPostParam()
    d.lang = this.web_language

    super.baseHttp({
      method: 'post',
      url: this.add_url,
      data: d
    })
  }

  /**
   * 修改
   * */
  update () {
    let msg = ''
    if(!parseInt(this.diameter)) {
      msg = '请输入表盘直径'
    }

    if(!this.cover_fid) {
      msg = '请上传封面图'
    }else if(!this.brand_id) {
      msg = '请选择品牌'
    }else if(!this.original_price) {
      msg = '请输入商品原价'
    }else if(!this.price) {
      msg = '请输入商品售价'
    }else if(!this.fineness_id) {
      msg = '请选择成色'
    }else if(parseInt(this.diameter) > 70) {
      msg = '表盘直径最大为70mm'
    }else if(!this.level_code) {
      msg = '请选择换戴等级'
    }else if(!this.hall_code) {
      msg = '请选择体验厅'
    }else if(this.goods_img.length < 3) {
      msg = '商品图片不可少于3张'
    }else if(this.goods_img.length > 10) {
      msg = '商品图片不可多于9张'
    }

    if(msg) {
      xhr.tip.$notify.error({
        title: '错误',
        message: msg
      });
      return false
    }

    let d = this.setPostParam()
    d.lang = this.web_language

    super.baseHttp({
      method: 'put',
      url: this.update_url,
      data: d
    })
  }


  /**
   * 下架
   * */
  down () {
    xhr.tip.$confirm('确认下架该产品吗', '下架产品', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      super.baseHttp({
        method: 'put',
        url: `${process.env.API.VIP}/v1/admin/vip/watchlist`,
        data: {
          gid: this.gid,
          status: 2
        }
      })
    }).catch(() => {});
  }
}

export default VipMarket
