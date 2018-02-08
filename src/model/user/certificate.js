//  实名认证  模型

import xhr from '@/plugin/main'
import Base from '@/model/base'

/**
 * @class
 * @classdesc 实名认证*/
class Certificate extends Base {
  constructor(data) {
    data = !!data ? data : {}

    super(data)

    this.get_list_url = `${process.env.API.USER}/v1/admin/user/identify`
    this.get_detail_url = `${process.env.API.USER}/v1/admin/user/identuserinfo`
    this.current_model = Certificate

    this.username = data.username || ''                    //  认证姓名
    this.realname = data.realname || ''
    this.id_kind = data.id_kind || ''
    this.id_kind_name = data.id_kind_name || ''                            //  认证类型
    this.id_number = data.id_number || ''                        //  认证号码
    this.front_pic = data.front_pic || ''                  //  认证照片 正面
    this.back_pic = data.back_pic || ''                    //  认证照片  反面
    this.usertel = data.usertel || ''                              //  认证用户
    this.user_uid = data.user_uid || ''                    //  认证用户 uid
    this.create_time = data.create_time || ''                    //  认证时间
    this.audit_time = data.audit_time || ''          //  操作时间
    this.audit_user = data.audit_user || ''          //  操作用户
    this.audit_uid = data.audit_uid || ''                  //  操作用户uid
    this.audit_status = data.audit_status || ''                        //  审核状态
    this.audit_status_name = data.audit_status_name || ''

    if(this.audit_status_name === '未审核') {
      this.audit_status_name = '待审核'
    }

    this.reason = data.reason || ''                        //  失败原因
    this.audit_result = data.audit_result || ''
    this.remark = data.remark || ''
    this.user_uid = data.user_uid || ''

    this.tel = data.tel || ''
    this.audit_status_use = this.audit_status || 1  //  用于表单审核状态

    this.has_audit_result = data.audit_result || ''   //  之前已经审核过，填写的审核结果

    this.can_check = parseInt(this.audit_status) !== 1 && this.api_rights.user[`v1,user,admin,identify,put`]            //  当前用户的认证信息是否可以审核
    this.user_href = data.user_href || ''
    if(this.usertel && this.api_rights.user[`v1,user,admin,userinfo,get`]) {
      this.user_href = `${process.env.URL.USER}/#/user/use/detail?id=${this.user_uid}`
    }

    this.list_detail_href = `${process.env.URL.USER}/#/user/cerdetail?id=${this.user_uid}`

    /**
     * 关键词搜索
     * */
    this.pkeysearch = {
      tel: '',
      status: '',
      datetimerange: [],
      handler_uid: ''
    }

    this.sessionkey_search = 'usercertify'
    this.$storeList = 'UserCertify'

    this.config = {
      detail: this.api_rights.user[`v1,user,admin,identuserinfo,get`],
      search: true
    }
    this.has_check_rights = this.api_rights.user[`v1,user,admin,identify,put`]
    this.config.notools = !this.config.detail && !this.has_check_rights

    this.get_detail_data = data.get_detail_data || {uid: this.user_uid}
  }


  /**
   * 审核
   * */
  check (obj) {
    super.baseHttp({
      method: 'put',
      url: `${process.env.API.USER}/v1/admin/user/identify`,
      data: {
        user_uid: this.user_uid,
        audit_uid: this.audit_uid,
        audit_status: this.audit_status_use,
        audit_result: this.audit_result,
        remark: this.remark
      },
      httpSuccess: obj.success ? obj.success : '',
      httpError: obj.error ? obj.error : ''
    })
  }
}


export default Certificate
