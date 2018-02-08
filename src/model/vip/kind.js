/**
 * 会籍等级
 * */

import Base from '@/model/base'

/**
 * @class
 * @classdesc 会籍类型*/
class VipKind extends Base {
  constructor(data) {
    data = !!data ? data : {}

    data.add_url = `${process.env.API.VIP}/v1/admin/vip/level`
    data.get_list_url = `${process.env.API.VIP}/v1/admin/vip/level`
    data.update_url = `${process.env.API.VIP}/v1/admin/vip/level`
    data.delete_url = `${process.env.API.VIP}/v1/admin/vip/level`
    data.get_detail_url = `${process.env.API.VIP}/v1/admin/vip/levelinfo`


    data.current_model = VipKind

    super(data)

    this.code = data.code || ''
    this.name = data.name || ''                                        //  名称
    this.money = parseFloat((data.money || '0').replace('$', '').replace('￥', '').replace(/,/g, '')) || 0
    this.money_name = data.money || ''
    this.description = data.description || ''                                         //  logo 图片路径
    this.icon_fid = data.icon_fid || ''                                 //  logo file_id 用于上传
    this.icon_pic = data.icon_pic || ''
    this.create_time = data.create_time || ''
    this.logo_fid = data.logo_fid || ''                               //  logo fid
    this.logo_pic = data.logo_pic || ''                               //  logo fid

    this.pc_description = this.sethtml(data.pc_description || '')   //  pc详情描述
    this.description = this.sethtml(data.description || '')
    this.pc_remark = this.sethtml(data.pc_remark || '')   // pc  备注
    this.remark = data.remark || ''                                 //  app  备注
    this.is_pc = parseInt(data.is_pc || 0)
    this.version_name = this.is_pc === 1 ? 'pc端' : '移动端'

    this.list_detail_href = `${process.env.URL.VIP}/#/vip/kind/detail?id=${this.code}&lang=${this.web_language}&is_pc=${this.is_pc}`
    this.pkeysearch = {
      name: '',
      code: ''
    }

    this.code_name = ''
    let text  = {
      'lev1': '一级',
      'lev2': '二级',
      'lev3': '三级',
      'lev4': '四级',
      'lev5': '五级',
      'lev6': '六级',
      'lev7': '七级',
      'lev8': '八级',
      'lev9': '九级',
      'lev10': '十级',
    }

    if(this.code) {
      this.code_name = text[this.code.toString()]
    }

    this.sessionkey_search = 'vipkind'

    this.config = {
      add: this.api_rights.vip[`v1,vip,admin,level,post`],
      edit: this.api_rights.vip[`v1,vip,admin,level,put`],
      del: this.api_rights.vip[`v1,vip,admin,level,delete`],
      detail: this.api_rights.vip[`v1,vip,admin,levelinfo,get`],
      search: true,
      language: true
    }
    this.config.notools = !this.config.edit && !this.config.del && !this.config.detail

    this.update_must_data = 'code,is_pc'
    this.$storeList = 'vipKind'
    this.get_detail_data = data.get_detail_data || {code: this.code, lang: this.web_language, is_pc: this.is_pc}
  }

  /**
   * 添加属性时传递的值（不同的属性可能不是全部都要传）
   * */
  setPostParam () {
    return {
      code: this.code,
      name: this.name,                             //  名称
      money: this.money,                           //  商品品类 id
      icon_fid: this.icon_fid,                     //  备注
      logo_fid: this.logo_fid,                     //  描述
      remark: this.remark,                         //  备注
      is_pc: this.is_pc,                           //  是否pc端
      description: this.description,               //  描述
      pc_description: this.pc_description,
      pc_remark: this.pc_remark
    }
  }

  setDeleteOneParam () {
    return {
      is_pc: this.is_pc,
      code: this.code
    }
  }
}

export default VipKind
