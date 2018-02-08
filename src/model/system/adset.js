//  广告位  模型

import Base from '@/model/base'

/**
 * @class
 * @classdesc 广告位
 * */
class Adsense extends Base {
  constructor(data) {
    data = !!data ? data : {}

    data.add_url = `${process.env.API.SYSTEM}/v1/admin/system/ad`
    data.update_url = `${process.env.API.SYSTEM}/v1/admin/system/ad`
    data.delete_url = `${process.env.API.SYSTEM}/v1/admin/system/ad`
    data.get_list_url = `${process.env.API.SYSTEM}/v1/admin/system/ad`
    data.get_detail_url = `${process.env.API.SYSTEM}/v1/admin/system/ad`

    data.id = data.id || ''
    data.current_model = Adsense

    super(data)

    this.title = data.title || ''                           //  标题
    this.description = data.description || ''                       //  描述
    this.url = data.url || ''                             //  链接
    this.file_id = data.file_fid || data.file_id || ''                       //  图片
    this.file_fid = data.file_fid || ''                    //  图片 fid
    this.file_pic = data.file_pic || ''                   //  图片 路径
    this.status = parseInt(data.status || 1)                         //  状态
    this.status_name = data.status_name || ''
    this.sort = parseInt(data.sort || '1')                             //  排序
    this.terminal = data.terminal                           //  展示端口
    this.terminal_name = data.terminal_name || ''                             //  展示端口
    this.create_time = data.create_time || ''               //  创建时间
    this.create_uid = data.create_uid || ''               //  创建用户
    this.update_time = data.update_time || ''
    this.update_uid = data.update_uid || ''               //  创建用户
    this.position = data.position || ''
    this.aid = data.aid || ''

    if(this.status_name === '') {
      let text = {1: '展示', 2: '不展示'}
      this.status_name = text[this.status]
    }
    if(this.terminal_name === '') {
      let text = {0: '移动端', 1: 'PC端'}
      this.terminal_name = text[parseInt(this.terminal)]
    }

    this.position_array = [
      {id: 'circle', name: 'PC首页'}
    ]

    this.position_name = ''
    for(let k=0, len=this.position_array.length; k<len; k++) {
      if(this.position === this.position_array[k].id) {
        this.position_name = this.position_array[k].name
      }
    }

    this.pkeysearch = {
      title: ''
    }

    this.sessionkey_search = 'sysadset'

    this.config = {
      add: this.api_rights.system[`v1,system,admin,ad,post`],
      edit: this.api_rights.system[`v1,system,admin,ad,put`],
      search: true,
      del: this.api_rights.system[`v1,system,admin,ad,delete`],
      language: true
    }

    this.$storeList = 'SysAdSetList'
    this.update_must_data = 'aid'
  }

  /**
   * @function
   * @description 删除数据时所传参数 */
  setDeleteOneParam () {
    return {
      id: this.id,
      aid: this.aid
    }
  }

  /**
   * @function
   * @description 表单提交时所传参数 */
  setPostParam () {
    return {
      title: this.title,
      description: this.description,
      url: this.url,
      file_fid: this.file_id || this.file_fid,
      status: this.status,
      terminal: this.terminal,
      sort: this.sort,
      position: this.position,
      aid: this.aid
    }
  }
}


export default Adsense
