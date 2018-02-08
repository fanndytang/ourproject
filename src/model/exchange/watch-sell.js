import Base from '@/model/base'
import main from '@/plugin/main'

/**
 * @class
 * @classdesc 卖表
 * */
class Watch extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super (data)
    this.add_url = `${process.env.API.EXCHANGE}/v2/market/seller/publish`
    this.get_list_url = `${process.env.API.EXCHANGE}/v2/admin/market/watchlist?lang=zh-cn`
    this.get_detail_url = `${process.env.API.EXCHANGE}/v2/admin/market/watchinfo`
    this.update_url = `${process.env.API.EXCHANGE}/v2/admin/market/watchlist`
    this.check_url = `${process.env.API.EXCHANGE}/v2/admin/market/audit`
    this.delete_url = `${process.env.API.EXCHANGE}/v2/admin/market/watchlist`
    this.current_model = Watch

    this.datalists.rows = 5

    /** id */
    this.id = data.id || ''
    /** 商品图片 fid */
    this.file_id = data.file_id || data.file_fid || ''
    /** 审核状态 */
    this.status = data.status || ''
    /** 品牌 id */
    this.brand_id = (data.brand_id || '').toString()
    /** 品牌名称 */
    this.brand_name = data.brand_name || ''
    /** 所在地（手动填写） */
    this.location = data.location || ''
    /** 所在地（下拉选择） */
    this.country_id = (data.country_id || '').toString()
    /** 所在地 （国家名称）*/
    this.country_name = data.country_name || ''
    /** 封面图fid */
    this.cover_fid = data.cover_fid || ''
    /** 封面图路径 */
    this.cover_pic = data.cover_pic || ''
    /** 发布时间 */
    this.create_time = data.create_time || ''
    /** 直径 */
    this.diameter = parseFloat((data.diameter || '0'))
    /** 360文件上传 fid */
    this.file_fid_360 = data.file_fid_360 || ''
    /** 复杂功能 id */
    this.function_id = data.function_id || ''
    /** 复杂功能 名称 */
    this.function_name = data.function_name || ''
    /** 成色 id */
    this.fineness_id = (data.fineness_id || '').toString()
    /** 成色 名称 */
    this.fineness_name = data.fineness_name || ''
    /** 材质 id */
    this.material_id = (data.material_id || '').toString()
    /** 材质 名称 */
    this.material_name = data.material_name || ''
    /** 机芯 id */
    this.movement_id = (data.movement_id || '').toString()
    /** 机芯 名称 */
    this.movement_name = data.movement_name || ''
    /** 原价  */
    this.original_price = parseFloat((data.original_price || '0').toString().replace('$', '').replace('￥', '').replace(/,/g, ''))
    this.original_price = isNaN(this.original_price) ? 0 : this.original_price
    /** 原价（列表显示）*/
    this.original_price_show = data.original_price
    /** 售价 */
    this.price = parseFloat((data.price || '0').toString().replace('$', '').replace('￥', '').replace(/,/g, ''))
    this.price = isNaN(this.price) ? 0 : this.price
    /** 售价（列表显示）*/
    this.price_show =  data.price
    /** 人民参考价 */
    this.rmb_price = data.rmb_price || ''
    /** 发布状态  1：上架中  其它：下架中 */
    this.publish_status = data.publish_status || 1
    /** 操作时间 */
    this.publish_time = data.publish_time || ''
    /** 浏览量 */
    this.pv = data.pv || ''
    /** 审核失败原因 */
    this.remark = data.remark || ''
    /** 风格 */
    this.gender = data.gender || 1
    /** 风格名称 */
    this.gender_name = data.gender_name || ''
    /** 形状 */
    this.shape_id = (data.shape_id || '').toString()
    /** 形状名称 */
    this.shape_name = data.shape_name || '无'
    /** 标题 */
    this.title = data.title || ''
    /** 推荐状态 1：推荐中 */
    this.recommend = data.is_recommend
    let is_reco = parseInt(this.recommend) === 1
    /** 标题（列表显示）*/
    this.title_td = '<span class="title-text">'+this.title+'</span>' + (is_reco ? '<span class="title-recommend">推荐中</span>' : '')
    /** 卖表标识 */
    this.gid = data.gid || ''
    /** 是否平台发布 */
    this.is_platform = data.is_platform
    if(parseInt(this.is_platform) !== 0 && parseInt(this.is_platform) !== 1) {
      this.is_platform = 1
    }
    /** 是否平台发布（显示名称）*/
    this.is_platform_name = parseInt(data.is_platform) === 1 ? '是' : '否'
    /** 表盘直径显示名称 */
    this.diameter_name = this.diameter !== '' ? (this.diameter + 'mm') : ''
    /** 所在地显示名称  */
    this.area = data.area || '无'
    /** 状态 */
    this.exchange_stage = data.exchange_stage || ''
    /** 当前表的状态 */
    this.exchange_stage_name = data.exchange_stage_name || ''
    /** 浏览量显示状态 */
    this.pv_show = data.pv || '0'
    /** 操作用户 */
    this.h_name = data.h_name || ''
    /** 详情页面链接 */
    this.list_detail_href = `${process.env.URL.EXCHANGE}/#/market/sell/detail?id=${this.gid}&lang=${this.web_language}`
    /** 发布用户 */
    this.publish_username = data.tel || data.username || ''
    /** 操作用户 */
    this.handler_username = data.handler_user || ''
    /** 关键词搜索标识 */
    this.sessionkey_search = 'wxwatchsell'
    /** 发布用户 */
    this.publish_user = data.publish_user || ''
    /** 品牌图片显示路径 */
    this.brand_pic_show = data.brand_pic || '无'
    /** 收藏数量 */
    this.collection_num = data.collection_num || '0'
    /** 360显示 */
    this.file_fid_360_show = data.file_fid_360 || '无'
    /** 列表在vuex中的缓存标识  */
    this.$storeList = 'MarketSellList'
    /** 多语言编辑时必传字段 */
    this.update_must_data = 'gid'
    /** 获取详情页面所传字段 */
    this.get_detail_data = data.get_detail_data || {gid: this.gid, lang:  this.web_language}
    /** 360显示名称 */
    this.uploadFileName = data.file_fid_360 || ''
    /** 腕表来源原始值 */
    this.origin_consignment_status = data.consignment_status
    /** 腕表来源 */
    this.consignment_status = data.consignment_status
    if(parseInt(this.consignment_status) !== 0 && parseInt(this.consignment_status) !== 1 && parseInt(this.consignment_status) !== 2) {
      this.consignment_status = 0
    }
    if(parseInt(this.consignment_status) === 2) {  // 2： 用户发布（置为1，便于显示）
      this.consignment_status = 1
    }
    /** 型号 */
    this.model_num = data.model_num || ''
    /** 机身码 */
    this.product_num = data.product_num || ''
    /** pc商品详情 */
    this.pc_graphic_details = this.sethtml(data.pc_graphic_details || '')
    /** pc腕表朔源 */
    this.pc_history = this.sethtml(data.pc_history || '')
    /** app商品详情 */
    this.app_graphic_details = this.sethtml(data.app_graphic_details || '')
    /** app腕表朔源 */
    this.app_history = this.sethtml(data.app_history || '')
    /** 价格来源： 大陆官方比价*/
    this.official_price = data.official_price || []
    this.compare_price_cn = []
    this.compare_price_cn_title = {}
    let unit = ['€', '$', '￥']
    for(let k in this.official_price) {
      this.compare_price_cn.push({
        tag: this.official_price[k][0],
        price: this.official_price[k][1],
        unit: unit[k]
      })
      this.compare_price_cn_title[this.official_price[k][0]] = 1
    }
    if(this.compare_price_cn.length <= 0) {
      this.compare_price_cn = [
        {tag: '欧洲价', price: 0, unit: '€'},
        {tag: '美国价', price: 0, unit: '$'},
        {tag: '中国价', price: 0, unit: '￥'}
        ]
      this.compare_price_cn_title = {'欧洲价': 1, '美国价': 1, '中国价': 1}
    }
    /** 价格来源： 香港官方比价*/
    this.hk_official_price = data.hk_official_price || []
    this.compare_price_hk = []
    this.compare_price_hk_title = {}
    for(let k in this.hk_official_price) {
      this.compare_price_hk.push({
        tag: this.hk_official_price[k][0],
        price: this.hk_official_price[k][1],
        unit: '$'
      })
      this.compare_price_hk_title[this.hk_official_price[k][0]] = 1
    }
    if(this.compare_price_hk.length <= 0) {
      this.compare_price_hk = [
        {tag: '香港价', price: 0, unit: '$'}
      ]
      this.compare_price_cn_title = {'香港价': 1}
    }
    let file_pic = []
    if(data.file_pic) {
      if(typeof data.file_pic === 'string') {
        file_pic = data.file_pic.split(',')
      }else {
        file_pic = data.file_pic
      }
    }
    /** 商品图片路径  */
    this.file_pic = file_pic
    let stext = {
      10: '审核中',
      20: '审核失败',
      30: '售卖中',
      31: '已下单',
      32: '买方已提交转账证明',
      40: '待鉴定',
      50: '鉴定失败',
      60: '出售成功',
      61: '已被用户换戴',
      70: '待收款',
      80: '已收款'
    }
    /** 详情页面显示状态 */
    this.publish_s_name = data.exchange_stage ? stext[parseInt(data.exchange_stage || 0)] : ''
    /** 关键词搜索 */
    this.pkeysearch = {
      tel: '',
      handler_uid: '',
      datetimerange: [],
      status: '',
      title: '',
      brand_id: '',
      product_num: '',
      model_num: '',
      consignment_status: '',
      publish_status: '',
      recommend: '',
      acid: main.get_query('acid', 'market/sell') || '',
      is_360: ''
    }
    /** 表格排序（1：升序   -1：降序） */
    this.rsListSort = {
      publish_time: -1     //  操作时间
    }
    let d_brand = this.api_rights.dict[`v1,dict,admin,brand,get`]
    let d_move = this.api_rights.dict[`v1,dict,admin,movement,get`]
    let d_mater = this.api_rights.dict[`v1,dict,admin,material,get`]
    let d_shape = this.api_rights.dict[`v1,dict,admin,shape,get`]
    let d_func = this.api_rights.dict[`v1,dict,admin,function,get`]
    let d_fine = this.api_rights.dict[`v1,dict,admin,fineness,get`]
    let country = this.api_rights.dict[`v1,dict,admin,country,get`]
    /** 权限配置 */
    this.config = {
      add: this.api_rights.market[`v2,market,seller,publish,post`] && d_brand && d_move && d_mater && d_shape && d_func && d_fine && country,
      edit: this.api_rights.market[`v2,market,admin,watchlist,put`] && d_brand && d_move && d_mater && d_shape && d_func && d_fine && country,
      del: this.api_rights.market[`v2,market,admin,watchlist,delete`],
      detail: this.api_rights.market[`v2,market,admin,watchinfo,get`],
      search: true,
      exp_data: this.api_rights.market[`v2,market,exceloperate,exp,get`]   //  导出数据
    }
    /** 审核权限 */
    this.can_check = this.api_rights.market[`v2,market,admin,audit,put`]
    /** 推荐权限 */
    this.can_recommend = this.api_rights.market[`v2,market,admin,recommend,put`]
    this.config.notools = !this.config.add && !this.config.edit && !this.config.del && !this.config.detail && !this.can_check && !this.can_recommend
    /** 是否可推荐首页 */
    this.can_uprecommend = this.can_recommend && (parseInt(data.exchange_stage || 0) === 30) && !is_reco
    /** 是否可撤销推荐 */
    this.can_downrecommend = this.can_recommend && is_reco
    /** 导出数据 */
    this.module_export_data = {
      name: '腕表数据',
      data: {
        'ID': 'id',
        '标题': 'title',
        '性别': 'gender',
        '品牌': 'brand_id',
        '机身型号': 'product_num',
        '产品型号': 'model_num',
        '材质': 'material_id',
        '形状': 'shape_id',
        '复杂功能': 'function_id',
        '成色': 'fineness_id',
        '机芯类型': 'movement_id',
        '表盘直径': 'diameter',
        '价格': 'price',
        '原价': 'original_price',
        '市场价': 'market_price',
        '比价': 'official_price',
        '国家': 'country_id',
        '详细地址': 'location',
        '浏览量': 'pv',
        '收藏量': 'collection_num',
        '创建时间': 'create_time',
        '是否平台发布': 'is_platform',
        '是否推荐': 'is_recommend',
        '寄售状态': 'consignment_status',
        '换戴等级': 'member_level_code',
        '发布状态': 'publish_status',
        '发布时间': 'publish_time',
        '交易状态': 'exchange_stage'
      }
    }

    this.status_name = data.status_name || ''
    this.audit = (data.audit || 0).toString()              //  审核状态
    this.audit_name = data.audit_name || ''              //  审核状态名称
    this.brand_fid = data.brand_fid || ''                //  品牌图片 fid
    this.brand_pic = data.brand_pic || ''                //  品牌logo 路径
    this.city_id = data.city_id || ''               //  城市id
    this.collection = data.collection || 0               //  收藏
    this.cover = data.cover || ''             //  封面fid
    this.details = data.details || ''                   //  描述
    this.exchange_status = data.exchange_status || ''    //  更新状态
    this.exchange_status_name = data.exchange_status_name || ''  //  更新状态名称
    this.exchange_time = data.exchange_time || ''         //  更新时间
    this.select_location = data.select_location || [data.prov_code || '', data.city_code || '', data.dist_code || ''] || []
    this.market_price = parseFloat((data.market_price || '0').toString().replace('$', '').replace('￥', ''))
    this.market_price = isNaN(this.market_price) ? 0 : this.market_price
    this.prov_id = data.prov_id || ''                    //  省 id
    this.user_uid = data.user_uid || ''               //  user uid
    this.bank = data.bank || ''
    this.tel = data.tel || ''
    this.audit_time = data.audit_time || ''
    this.audit_username = data.audit_username || ''
    this.hall_location = data.hall_location || ''
    this.exchange_stage_id = data.exchange_stage_id || ''
    this.handler_user_time = data.audit_time || ''    //  操作时间
    this.details_show = data.details || '无'
    this.title_show = data.title_show || '无'
    this.location_show = (data.prov_name || '') + (data.city_name || '') + (data.dist_name || '') || '无'
    this.pid = data.pid || ''
  }
  /**
   * @function
   * @description 新增、编辑时要传的字段 */
  setPostParam () {
    let type = ['hk', 'cn']
    for(let t in type) {
      let test = this[`compare_price_${type[t]}`]
      let cache = ''
      for(let k in test) {
        if(test[k].tag !== '') {
          cache += test[k].tag + ',' + test[k].price + ';'
        }
      }
      cache = cache.replace(/^(.*);$/, '$1')
      if(type[t] === 'cn') {
        this.official_price = cache
      }else {
        this[`${type[t]}_official_price`] = cache
      }
    }

    //  腕表来源（如果是用户发布，后台编辑时没有变更为内部发布，则返回原始值）
    let con_status = parseInt(this.origin_consignment_status) === 2 && parseInt(this.consignment_status) === 1 ? 2 : this.consignment_status
    return {
      lang: this.web_language,
      gid: this.gid,
      title: this.title,
      cover: this.cover_fid,
      file_id: this.file_id.split(','),
      file_fid_360: this.file_fid_360,
      model_num: this.model_num,
      product_num: this.product_num,
      consignment_status: con_status,
      gender: this.gender,
      diameter: this.diameter.toString(),
      pv: !isNaN(parseInt(this.pv)) ? parseInt(this.pv) : '',
      location: this.location,
      country_id: this.country_id,
      brand_id: this.brand_id,
      shape_id: parseInt(this.shape_id),
      fineness_id: this.fineness_id,
      material_id: this.material_id,
      function_id: this.function_id,
      movement_id: this.movement_id,
      price: parseFloat(this.price.toString().replace('$', '').replace('￥', '')).toString(),
      original_price: parseFloat(this.original_price.toString().replace('$', '').replace('￥', '')).toString(),
      official_price: this.official_price,
      hk_official_price: this.hk_official_price,
      is_platform: this.is_platform,
      publish_status: this.publish_status,
      pc_graphic_details: this.pc_graphic_details,
      pc_history: this.pc_history,
      app_graphic_details: this.app_graphic_details,
      app_history: this.app_history,
      //  details: this.details,
      //   uid: localStorage.getItem('admin_username'),
    }
  }

  /**
   * @function
   * @description 删除卖表要发送的数据
   * */
  setDeleteOneParam () {
    return {
      gid: this.gid
    }
  }

  /**
   * @function
   * @description 设置导出数据所传参数 */
  setExportParams (obj) {
    let params = {}
    obj = !!obj ? obj : {}
    let selected = obj.selected

    /** 导出字段(excel所用) */
    let output = '', v
    for(let k in selected) {
      v = this.module_export_data.data[selected[k]]
      if(v) output += (!!output ? ',' : '') + v
    }
    params.output = output
    params.name = this.module_export_data.name
    params.line = Math.max(obj.rows || 1000, 1)

    /** 关键词搜索 */
    let search = this.setSearchParam()
    if(search.create_time_l)params.publish_time_s = search.create_time_l
    if(search.create_time_h)params.publish_time_e =  search.create_time_h

    /** 请求参数拼接 */
    let str = ''
    for(let k in params) {
      str += `${!!str ? '&' : ''}${k}=${params[k]}`
    }

    let xhr = new this.httpXHR()
    xhr.request.method = 'get'
    xhr.request.url = `${process.env.API.EXCHANGE}/v2/admin/market/dcode`
    xhr.request.params = params
    xhr.httpSuccess = (res) => {
      console.log(`${process.env.API.EXCHANGE}/v2/admin/excel/exp?${str}&dcode=${res.data.dcode}`)
      window.open(`${process.env.API.EXCHANGE}/v2/admin/excel/exp?${str}&dcode=${res.data.dcode}`)
    }
    xhr.httpRequest()
  }

  /**
   * @function
   * @description 添加商品
   * */
  add() {
    if(!!this.validForm()) {
      super.add()
    }
  }

  /**
   * @function
   * @description 更新商品
   * */
  update() {
    if(!!this.validForm()) {
      super.update()
    }
  }

  /**
   * @function
   * @description 审核
   * */
  check (obj) {
    super.baseHttp({
      method: 'put',
      url: `${process.env.API.EXCHANGE}/v2/admin/market/audit`,
      data: {
        gid: this.gid,
        status: this.status,           //  1: 审核成功   2: 审核失败
        remark: this.remark            //  备注
      },
      httpSuccess: obj.success ? obj.success : '',
      httpError: obj.error ? obj.error : ''
    })
  }

  /**
   * @function
   * @description 获取人民币参考价
   * */
  getPrice() {
    let that = this
    if(this.price > 0) {
      super.baseHttp({
        method: 'get',
        url: `${process.env.API.EXCHANGE}/v2/admin/market/reference`,
        params: {
          lang: 'zh-cn',
          price: this.price
        },
        httpSuccess: (res) => {
          that.rmb_price = res.data.data
        }
      })
    }else {
      this.rmb_price = 0
    }
  }

  /**
   * @function
   * @description 推荐与撤销推荐
   * */
  recommendGood(obj) {
    super.baseHttp({
      method: 'put',
      url: `${process.env.API.EXCHANGE}/v2/admin/market/recommend`,
      data: {
        gid: this.gid,
        recommend: this.recommend
      },
      httpSuccess: obj.success ? obj.success : '',
      httpError: obj.error ? obj.error : ''
    })
  }
}

export default Watch
