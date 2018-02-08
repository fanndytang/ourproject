import Base from '@/model/base'
/**
 * @class
 * @classdesc 活动分类
 * */
class Activities extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)
    this.add_url = `${process.env.API.SYSTEM}/v1/admin/system/actcate`
    this.get_list_url = `${process.env.API.SYSTEM}/v1/admin/system/actcate`
    this.update_url = `${process.env.API.SYSTEM}/v1/admin/system/actcate`
    this.delete_url = `${process.env.API.SYSTEM}/v1/admin/system/actcate`
    this.id = data.id || ''
    this.current_model = Activities

    /** 分类 id　*/
    this.id = (data.id || '').toString()
    /** 分类编码 */
    this.code = (data.code || '').toString()
    /** 分类名称 */
    this.title = data.title || data.name || ''
    /** 专题介绍 */
    this.description = data.description || data.remark || ''
    /** 查看关联活动的权限 */
    this.has_rights_act = this.api_rights.system[`v1,system,admin,activity,get`]
    /** 是否有上架的关联活动 */
    this.has_begin = data.has_begin
    /** 关联活动链接 */
    this.activity_href = this.has_rights_act ? `${process.env.URL.SYSTEM}/#/system/ownactivity?code=${this.code}` : ''
    /** 关键词 */
    this.pkeysearch = {
      name: ''
    }
    /** 关键词搜索标识 */
    this.sessionkey_search = 'sysactivities'
    /** 权限配置 */
    this.config = {
      add: this.api_rights.system[`v1,system,admin,actcate,post`],
      edit: this.api_rights.system[`v1,system,admin,actcate,put`],
      del: this.api_rights.system[`v1,system,admin,actcate,delete`],
      search: true
    }
    this.config.notools = !this.config.edit && !this.config.del && !this.has_rights_act

    /** 有上架的关联活动的分类不可删除  */
    this.config.del = this.config.del && !this.has_begin
    /** 在vuex中的缓存标识 */
    this.$storeList = 'sysactivities'
  }
  /**
   * @function
   * @description 新增编辑时要传的字段 */
  setPostParam () {
    return {
      id: this.id,
      name: this.title,
      remark: this.description
    }
  }
  /**
   * @function
   * @description 删除时所传字段 */
  setDeleteOneParam() {
    return {
      id: this.id
    }
  }
}

export default Activities
