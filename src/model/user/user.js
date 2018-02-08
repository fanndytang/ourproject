import Base from '@/model/base'

/**
 * @class
 * @classdesc 前端用户
 * */
class User extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)

    this.current_model = User
    this.get_list_url = `${process.env.API.USER}/v1/admin/user/userlist`
    this.get_detail_url = `${process.env.API.USER}/v1/admin/user/userinfo`
    this.update_url = `${process.env.API.USER}/v1/admin/user/userinfo`

    let terminal = {1: 'iOS', 2: '安卓', 3: 'wap', 4: 'pc', 5: '微信'}
    let sex = {1: '男', 2: '女'}

    this.user_uid = data.uid || ''
    this.username = data.username || ''                                                                  //  用户名 昵称
    this.tel = data.tel || ''                                                                            //  电话
    this.email = data.email || ''                                                                        //  邮件
    this.reg_time = data.reg_time || ''                                                                  //  注册时间
    this.terminal = data.terminal || ''                                                                  //  注册终端
    this.terminal_name = terminal[parseInt(data.terminal)] || ''                                         //  注册终端  名称
    this.is_auth = data.is_auth || '1'                                                                   //  是否认证
    this.is_auth_name = data.is_auth_name || ''                                                          //  是否认证
    this.auth_time = data.auth_time || ''                                                                //  认证时间
    this.group_id = (data.group_id || data.user_group_id || '').toString()                               //  用户组
    this.country = data.country || ''                                                                    //  所属国家名称
    this.sex = data.sex || ''                                                                            //  性别
    this.sex_name = data.sex_name ? data.sex_name : sex[this.sex] || '无'                                //  性别名称
    this.avatar_pic = data.avatar_pic || require('@/assets/user-default.png')                            //  头像
    this.birthday = data.birthday || ''                                                                  //  生日
    parseInt(this.birthday) === 0 ? this.birthday = '' : ''                                              //  生日显示完善
    this.focus_num = parseInt(data.attention_num || 0)                                                   //  关注总数
    this.fans_num = parseInt(data.fans_num || 0)                                                         //  粉丝总数
    this.black_num = data.blacklist_num || 0                                                             //  黑名单总数
    this.blacked_num = data.blocked_sum || 0                                                             //  被拉黑总数
    this.visited_num = data.pv || 0                                                                      //  访客总量
    this.focus_href = this.focus_num > 0 ? `${process.env.URL.USER}/#/user/focus?id=${this.user_uid}` : ''    //  关注列表链接
    this.fans_href = this.fans_num > 0 ? `${process.env.URL.USER}/#/user/fans?id=${this.user_uid}` : ''       //  粉丝列表链接
    this.list_detail_href =this.user_uid?`${process.env.URL.USER}/#/user/use/detail?id=${this.user_uid}`:''   //  查看详情链接
    this.user_group_name = data.user_group_name || data.group_name || ''                                    //  用户组名
    this.pkeysearch = {                                                                                  //  关键词搜索
      datetimerange: [],
      tel: ''
    }
    this.sessionkey_search = 'userlist'
    this.$storeList = 'userlist'
    this.config = {                                                                                     //  权限配置
      detail: this.api_rights.user[`v1,user,admin,userinfo,get`],
      search: true,
      edit: this.api_rights.user[`v1,user,admin,userinfo,put`] && this.api_rights.system[`v1,system,admin,usergroup,get`]   //  修改用户组，用户认证信息
    }
    this.config.notools = !this.config.detail && !this.config.edit
    this.get_detail_data = data.get_detail_data || {uid: this.user_uid}
  }

  /**
   * 修改用户组、用户认证状态：put请求http://apidev.swisstimevip.com:8000/user/v1/admin/user/userinfo那个接口
   参数：authorization，is_auth，group_id
   group_id从http://apidev.swisstimevip.com:8000/system/v1/admin/system/usergroup接口获取
   */

  setPostParam () {
    return {
      uid: this.user_uid,
      is_auth: this.is_auth,
      group_id: this.group_id
    }
  }

}

export default User
