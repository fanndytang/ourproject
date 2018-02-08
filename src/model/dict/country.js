import Base from '@/model/base'

/**
 * @class Country
 * @classdesc 国家
 * */
class Country extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)
    this.get_list_url = `${process.env.API.DICT}/v1/admin/dict/country`
    this.update_url = `${process.env.API.DICT}/v1/admin/dict/country`
    this.id = (data.id || '').toString()
    this.current_model = Country

    /** 国家名称  */
    this.country = data.country || ''
    /** 国家简称 */
    this.short_name = data.short_name || ''
    /** 国家图标 */
    this.file_fid = data.file_fid || ''
    /** 国家图标显示路径  */
    this.pic = data.file_pic || ''
    /** 国家编号 */
    this.country_code = data.country_code || ''
    /** 国家简写 */
    this.country_code = data.country_code || ''

    /** 国家名称  繁体 */
    this.country_zh_t = data.country_zh_t || ''
    /** 国家名称 简体 */
    this.country_zh_s = data.country_zh_s || ''
    /** 国家首字母 */
    this.initial = data.initial || ''
    this.region = data.region || ''
    this.region_zh_s = data.region_zh_s || ''
    this.region_zh_t = data.region_zh_t || ''
    this.country_name = data.country_zh_s || ''      //  前端在此转换国家名称
    this.query_string = data.query_string || ''      //  根据关键词查询
    /** 关键词搜索 */
    this.pkeysearch = {
      country: '',
      country_code: ''
    }
    /** 关键词搜索标识 */
    this.sessionkey_search = 'dictcountry'
    /** 在Vuex中的缓存标识 */
    this.$storeList = 'dictcountry'
    /** 权限配置 */
    this.config = {
      edit: this.api_rights.dict[`v1,dict,admin,country,put`],
      search: true,
      get: this.api_rights.dict[`v1,dict,admin,country,get`]
    }
  }

  /**
   * 表单提交时要传字段 */
  setPostParam () {
    return {
      id: this.id,
      file_fid: this.file_fid,
      short_name: this.short_name
    }
  }
}


export default Country
