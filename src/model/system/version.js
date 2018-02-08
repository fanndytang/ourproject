//  模型  版本管理

import Base from '@/model/base'

/**
 * @class
 * @classdesc 版本
 * */
class Version extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)

    this.add_url = `${process.env.API.SYSTEM}/version/update/version`
    this.get_list_url = `${process.env.API.SYSTEM}/version/update/version`
    this.update_url = `${process.env.API.SYSTEM}/version/update/version`
    this.delete_url = `${process.env.API.SYSTEM}/version/update/version`
    this.get_detail_url = `${process.env.API.SYSTEM}/version/update/version`
    this.current_model = Version

    this.sha1 = data.sha1 || ''
    this.md5 = data.md5 || ''
    this.terminal = (data.terminal || '').toString()           //  终端   1: ios  2: 安卓
    this.version = data.version || ''             //  版本
    this.details = data.details || ''             //  详情
    this.fid = data.fid || ''                     //  文件id
    this.file_size = data.file_size || ''         //  文件大小
    this.is_force = (data.is_force || '').toString()           //  是否强制更新   1： 强制  0： 不强制
    this.create_time = data.create_time || ''     //  创建时间
    this.create_uid = data.create_uid || ''
    this.update_time = data.update_time || ''     //  更新时间

    this.name = data.name || ''   // 文件名

    this.file_list = data.file_list ? data.file_list : data.name ? [data.name] : []


    this.pkeysearch = {
      //     kind: ''
    }

    this.sessionkey_search = 'sysversion'

    this.filetype = data.filetype || ''


    this.terminal_name = data.terminal_name ? data.terminal_name : data.terminal == 1 ? 'IOS' : data.terminal == 2 ? '安卓' : ''

    this.force_name = data.force_name ? data.force_name : data.is_force == '1' ? '是' : '否'

    this.handler_time = this.update_time || this.create_time || ''

    this.username = data.username || ''

    this.config = {
      add: this.api_rights.system['version,system,update,version,post'],
      edit: this.api_rights.system['version,system,update,version,put']
    }

    this.$storeList = 'SysVersionList'
    this.uploadFileName = ''
  }
  /**
   * @function
   * @description 删除数据所传参数 */
  setDeleteOneParam() {
    return {
      uid: this.create_uid
    }
  }

  /**
   * @function
   * @description 表单提交时所传参数 */
  setPostParam() {
   /* if (this.file_list && this.file_list.length) {
      let file = this.file_list[this.file_list.length - 1]
      this.fid = file.fid
      this.file_size = file.file_size
      this.md5 = file.md5
      this.sha1 = file.sha1
    }*/

    return {
      sha1: this.sha1,
      md5: this.md5,
      terminal: this.terminal,
      version: this.version,
      details: this.details,
      fid: this.fid,
      file_size: this.file_size,
      is_force: this.is_force
    }
  }


 /* subFormBefore() {
    if (!(parseInt(this.terminal) == 1 && this.filetype == '.ipa' || parseInt(this.terminal) == 2 && this.filetype == '.apk')) {
      xhr.tip.$message.error('文件格式错误')
      return false
    }
  }*/

}

export  default  Version
