import Base from '@/model/base'

/**
 * @class Bank
 * @classdesc 银行卡（列表api: `${process.env.API.DICT}/v1/admin/dict/bank`）*/
class Bank extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)

    this.add_url = `${process.env.API.DICT}/v1/admin/dict/bank`
    this.get_list_url = `${process.env.API.DICT}/v1/admin/dict/bank`
    this.update_url = `${process.env.API.DICT}/v1/admin/dict/bank`
    this.delete_url = `${process.env.API.DICT}/v1/admin/dict/bank`
    this.current_model = Bank

    /**  名称  */
    this.name = data.name || ''
    /**  LOGO显示路径 */
    this.pic = data.pic || ''
    /** LOGO 图片fid */
    this.file_id = data.file_id || data.file_fid || ''
    /**  英文简写 */
    this.abbreviation = data.abbreviation || ''
    /** 备注 */
    this.remark = data.remark || ''
    /** 权限配置 */
    this.config = {
      add: this.api_rights.dict[`v1,dict,admin,bank,post`],
      del: this.api_rights.dict[`v1,dict,admin,bank,delete`],
      edit: this.api_rights.dict[`v1,dict,admin,bank,put`],
      search: true,
      language: true
    }
  }

  /**
   * @function
   * @description 设置添加银行卡时需要传递的参数（name: 名称, abbreviation: 英文简写, file_id: LOGO fid, remark: 备注） */
  setPostParam () {
    return {
      name: this.name,
      abbreviation: this.abbreviation,
      file_id: this.file_id,
      remark: this.remark
    }
  }
}

export default Bank
