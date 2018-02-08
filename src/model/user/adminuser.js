import Base from '@/model/base'
import sha from '@/plugin/sha1'

/**
 * @class
 * @classdesc 后端用户*/
class Admin extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)

    this.current_model = Admin
    this.get_list_url = `${process.env.API.USER}/v1/admin/user/userlist?admin=admin`
    this.get_detail_url = `${process.env.API.USER}/v1/admin/user/userinfo`
    this.add_url = `${process.env.API.USER}/v1/admin/user/userlist`
    this.update_url = `${process.env.API.USER}/v1/admin/user/userlist`
    this.delete_url = `${process.env.API.USER}/v1/admin/user/userlist`
    this.user_uid = data.uid || ''                                                                          //  唯一标识
    this.username = data.username || ''                                                                     //  用户名
    this.reg_time = data.reg_time || ''                                                                     //  注册时间
    this.group_id = (data.group_id || data.user_group_id || '').toString()                                  //  用户组id
    this.user_group_name = data.user_group_name || data.group_name || ''                                    //  用户组名
    this.password = ''                                                                                      //  密码
    this.new_password = data.new_password || ''                                                             //  新密码
    this.list_detail_href=this.user_uid?`${process.env.URL.USER}/#/user/admin/detail?id=${this.user_uid}`:''      //  详情
    this.group_list = []                                                                                    //  用户组列表
    /**
     * 关键词搜索
     * */
    this.pkeysearch = {}
    this.sessionkey_search = 'adminuserlist'
    this.$storeList = 'Useradminuserlist'
    this.edit_name = this.username || ''

    this.config = {
      add: this.api_rights.user[`v1,user,admin,userlist,post`] && this.api_rights.system[`v1,system,admin,usergroup,get`],
      edit: this.api_rights.user[`v1,user,admin,userlist,put`] && this.api_rights.system[`v1,system,admin,usergroup,get`],
      del: this.api_rights.user[`v1,user,admin,userlist,delete`],
      detail: this.api_rights.user[`v1,user,admin,userinfo,get`]
    }
    this.config.notools = !this.config.detail && !this.config.edit && !this.config.del

    this.get_detail_data = data.get_detail_data || {uid: this.user_uid}
  }


  /**
   * post 参数
   * */
  setPostParam() {
    return {
      uid: this.user_uid,
      username: this.username,
      password: sha(this.username + '_' + this.password),
      group_id: this.group_id
    }
  }

  /**
   * 删除参数
   * */
  setDeleteOneParam() {
    return {
      uid: this.user_uid
    }
  }

  /**
   * 修改个人登录密码
   * */
  updatePWD (obj) {
    let xhr = new this.httpXHR()
    xhr.request.method = 'put'
    xhr.request.url = `${process.env.API.USER}/v1/admin/user/updatepwd`
    xhr.request.data = {
      password: sha(this.username + '_' + this.password),
      new_password: sha(this.username + '_' + this.new_password)
    }
    xhr.httpSuccess = obj.success ? obj.success : ''
    xhr.httpError = obj.error ? obj.error : ''
    xhr.httpRequest()
  }
}
export default Admin
