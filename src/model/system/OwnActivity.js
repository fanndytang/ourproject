import Base from '@/model/base'
import main from '@/plugin/main'
import ActivityGoods from '@/model/system/ActivityGoods'

/**
 * @class
 * @classdesc 商品活动
 * */
class OwnActivity extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)
    this.add_url = `${process.env.API.SYSTEM}/v1/admin/system/activity`
    this.get_list_url = `${process.env.API.SYSTEM}/v1/admin/system/activity`
    this.update_url = `${process.env.API.SYSTEM}/v1/admin/system/activity`
    this.delete_url = `${process.env.API.SYSTEM}/v1/admin/system/activity`

    this.id = data.id || ''
    this.current_model = OwnActivity

    /** 活动id */
    this.acid = data.acid || ''
    /** 活动名称 */
    this.title = data.title || ''
    /** 封面图 */
    this.cover_fid = data.cover_fid || ''
    /** 封面图路径 */
    this.cover_pic = data.cover_pic || ''
    /** 开始时间 */
    this.start_time = new Date(parseInt(data.begin_time || Number(new Date())/1000) * 1000)
    /** 开始时间（展示）*/
    this.start_time_show = data.begin_time || ''
    /** 结束时间 */
    this.end_time = new Date(parseInt(data.end_time || Number(new Date())/1000)  * 1000)
    /** 结束时间（展示）*/
    this.end_time_show = data.end_time || ''
    /** 上架时间 */
    this.shelves_time = data.shelves_time || ''
    /** 创建时间 */
    this.create_time = data.create_time || ''
    /** 操作时间 */
    this.handler_time = data.update_time || ''
    /** 操作用户 */
    this.handler_user = data.update_username || ''
    /** 专题介绍 */
    this.description = data.description || ''
    /** 排序 */
    this.sort = data.sort || ''
    /** 活动类型 2:专题 1：商品 */
    this.type = parseInt(data.type || '')
    let str = {1: '商品', 2: '专题'}
    /** 活动类型名称 */
    this.type_name = str[parseInt(this.type)] || ''
    /** 关联商品--复选框 */
    this.watchlist_check = data.watchlist_check || (this.type === 2 ? (data.data_id ? data.data_id.split(',') : []) : [] )
    /** 关联商品--单选框 */
    this.watchlist_radio = data.watchlist_radio || (this.type === 1 ? data.data_id : '' )
    /** 关联商品--做验证用 */
    this.watchlist = this.type === 1 ? this.watchlist_radio : this.watchlist_check
    /** 关联商品（已选中的，辅助显示） */
    this.sel_list = new ActivityGoods({'activity_acid': this.acid})
    /** 归属分类 */
    this.category_code = data.category_code || ''
    /** 上架下架状态 */
    this.shelves_status = data.status
    let text = {0: '待上架', 1: '上架中', 2: '下架中'}
    /** 上架下架显示名称 */
    this.shelves_name = data.shelves_name || (text[parseInt(this.shelves_status)] || '')
    /** 查看关联商品的权限 */
    this.has_rights_watch = this.api_rights.market[`v2,market,admin,watchlist,get`]
    /** 关联商品链接 */
    this.watch_href = this.has_rights_watch ? `${process.env.URL.EXCHANGE}/#/market/sell?acid=${this.acid}` : ''
    /** 关键词 */
    this.pkeysearch = {
      title: '',
      type: '',
      status: '',
      start_time: [],
      end_time: [],
      create_time: [],
      code: main.get_query('code', 'system/ownactivity') || ''
    }
    /** 关键词搜索标识 */
    this.sessionkey_search = 'SysOwnactivitylist'
    /** 权限配置 */
    this.config = {
      add: this.api_rights.system[`v1,system,admin,activity,post`] && this.api_rights.system[`v1,system,admin,acttil,get`],
      edit: this.api_rights.system[`v1,system,admin,activity,put`] && this.api_rights.system[`v1,system,admin,acttil,get`],
      del: this.api_rights.system[`v1,system,admin,activity,delete`],
      search: true,
      language: true
    }
    this.can_shelves = this.api_rights.system[`v1,system,admin,acto,put`]
    this.config.notools = !this.config.edit && !this.config.del && !this.can_shelves && !this.has_rights_watch
    /** 在vuex中的缓存标识 */
    this.$storeList = 'SysOwnactivitylist'
    /** 多语言要传字段 */
    this.update_must_data = 'acid,data_id,type'

    /** 从其它页面跳转过来时（活动分类）,去除之前保留的筛选条件 */
    if(this.pkeysearch.code !== '') {
      for(let k in this.pkeysearch) {
        sessionStorage.removeItem(`${this.sessionkey_search}-pkeysearch-${k}`)
      }
      sessionStorage.setItem(`${this.sessionkey_search}-pkeysearch`, 'code')
      sessionStorage.setItem(`${this.sessionkey_search}-pkeysearch-code`, this.pkeysearch.code)
    }
  }

  /**
   * @function
   * @description 关键词搜索时所传字段
   * */
  setSearch() {
    let start_time = sessionStorage.getItem(`${this.sessionkey_search}-pkeysearch-start_time`)
    let end_time = sessionStorage.getItem(`${this.sessionkey_search}-pkeysearch-end_time`)
    let create_time = sessionStorage.getItem(`${this.sessionkey_search}-pkeysearch-create_time`)

    start_time = !!start_time ? start_time.split(',') : []
    end_time = !!end_time ? end_time.split(',') : []
    create_time = !!create_time ? create_time.split(',') : []

    let start_time_s = ''
    let start_time_e = ''
    let end_time_s = ''
    let end_time_e = ''
    let create_time_s = ''
    let create_time_e = ''

    if(start_time && start_time.length >= 2) {
      start_time_s = this.setDateFormat(new Date(start_time[0]))
      start_time_e = this.setDateFormat(new Date(start_time[1]))
    }

    if(end_time && end_time.length >= 2) {
      end_time_s = this.setDateFormat(new Date(end_time[0]))
      end_time_e = this.setDateFormat(new Date(end_time[1]))
    }

    if(create_time && create_time.length >= 2) {
      create_time_s = this.setDateFormat(new Date(create_time[0]))
      create_time_e = this.setDateFormat(new Date(create_time[1]))
    }

    return {
      title: this.pkeysearch.title,
      type: this.pkeysearch.type,
      status: this.pkeysearch.status,
      publish_status: this.pkeysearch.publish_status,
      begin_time_s: start_time_s,
      begin_time_e: start_time_e,
      end_time_s: end_time_s,
      end_time_e: end_time_e,
      create_time_s: create_time_s,
      create_time_e: create_time_e,
      code: this.pkeysearch.code
    }
  }

  /**
   * @function
   * @description 新增编辑时要传的字段 */
  setPostParam () {
    return {
      acid: this.acid,
      title: this.title,
      cover_fid: this.cover_fid,
      description: this.description,
      begin: this.setDateFormat(this.start_time || '', true),
      end: this.setDateFormat(this.end_time || '', true),
      type: this.type,
      data_id: parseInt(this.type) === 2 ? this.watchlist_check : [this.watchlist_radio],
      category_code: this.category_code,
      sort: this.sort
    }
  }

  /**
   * @function
   * @description 删除活动所传字段
   * */
  setDeleteOneParam() {
    return {
      acid: this.acid
    }
  }

  /**
   * @function
   * @description 提交表单之前的验证
   * */
  validForm() {
    let msg = ''
    let dataid = parseInt(this.type) === 2 ? this.watchlist_check : [this.watchlist_radio] || []
    if(!!this.start_time && !!this.end_time && Number(new Date(this.start_time)) >= Number(new Date(this.end_time))) {
      msg = '结束时间应当大于开始时间'
    }else if(dataid.length <= 0) {
      msg = '请填写关联商品'
    }
    if(msg) {
      typeof this.afterError === 'function' ? this.afterError({msg: msg}) : ''
      return false
    }else {
      return true
    }
  }

  /**
   * @function
   * @description 添加数据 */
  add() {
    if(this.validForm()) {
      super.add()
    }
  }

  /**
   * @function
   * @description 更新数据 */
  update() {
    if(this.validForm()) {
      super.update()
    }
  }

  /** 上架、下架商品 */
  ShelvesActivity(obj) {
    super.baseHttp({
      method: 'put',
      url: `${process.env.API.SYSTEM}/v1/admin/system/acto`,
      data: {
        acid: this.acid,
        status: this.shelves_status,
        end: this.setDateFormat(this.end_time || '', true)
      },
      httpSuccess: obj.success ? obj.success : '',
      httpError: obj.error ? obj.error : ''
    })
  }
}

export default OwnActivity
