//  动态  模型

import Base from '@/model/base'
import xhr from '@/plugin/main'
import store from '@/store'

/**
 * @class
 * @classdesc 圈子
 * */
class Ideas extends Base {
  constructor(data) {
    data = !!data ? data : {}

    data.add_url = `${process.env.API.FRIENDS}/v1/admin/friends/circles`
    data.update_url = `${process.env.API.FRIENDS}/v1/admin/friends/circles`
    data.delete_url = `${process.env.API.FRIENDS}/v1/admin/friends/circles`
    data.get_list_url = `${process.env.API.FRIENDS}/v1/admin/friends/circles`
    data.get_detail_url = `${process.env.API.FRIENDS}/v1/admin/friends/circleinfo`

    data.id = data.id || data.cid || ''
    data.current_model = Ideas

    super(data)

    this.check_url = `${process.env.API.FRIENDS}/v1/admin/friends/circles`

    this.cid = data.cid || ''
    this.kind = data.kind || ''                            //  动态类型
    this.kind_name = data.kind_name || ''                  //  动态类型 对应名称
    this.file_fid_list = data.file_fid_list || ''                       //  内容




    let file_pic = []
    if(data.file_pic) {
      if(typeof data.file_pic === 'string') {
        file_pic = data.file_pic.split(',')
      }else {
        file_pic = data.file_pic
      }
    }

    this.file_pic = file_pic


  //  this.file_pic = data.file_pic ? data.file_pic.split(',') : []      //  动态内容对应的图片
    this.content = data.content || ''                             //  文字
    this.publish_status = data.publish_status || '1'                      //  状态
    this.publish_status_name = data.publish_status_name || ''                    //  状态  对应文字
    this.user = data.username || data.tel || ''                            //  发布用户
    this.publish_time = data.publish_time || ''     // 发布 时间
    this.like_num = data.like_num || 0     //  点赞数
    this.comment_num = data.comment_num || 0  //  评论数
    this.collection_num = data.collection_num || 0  //  收藏数

    this.comment_num = this.comment_num ? this.comment_num > 99 ? '99+' : this.comment_num : 0
    this.collection_num = this.collection_num ? this.collection_num > 99 ? '99+' : this.collection_num : 0
    this.like_num = this.like_num ? this.like_num > 99 ? '99+' : this.like_num : 0
    this.comment_href = parseInt(this.comment_num) > 0 ? `${process.env.URL.FRIENDS}/#/friends/comment?cid=${this.cid}` : ''
    this.collection_href = parseInt(this.collection_num) > 0 ? `${process.env.URL.FRIENDS}/#/friends/collect?cid=${this.cid}` : ''
    this.like_href = parseInt(this.like_num) > 0 ? `${process.env.URL.FRIENDS}/#/friends/praise?cid=${this.cid}` : ''
    this.list_detail_href = `${process.env.URL.FRIENDS}/#/friends/social/detail?cid=${this.cid}`

    this.audit_uid = store.state.userUid
    this.audit_result = data.audit_result || ''
    this.audit_status = data.audit_status || 0
    this.audit_status_name = data.audit_status_name || (this.audit_status == 2 ? '审核失败' : (this.audit_status == 1 ? '审核成功' : '未审核')) || '未审核'

    this.audit_user = data.audit_user || '无'
    this.audit_result_show = data.audit_result || '无'
    this.is_del = data.is_del || 0
    if(data.is_del === 1) {
      this.audit_status_name = '已删除'
    }


    this.avatar_pic = data.avatar_pic || ''
    this.avatar_fid = data.avatar_fid || ''

    this.cover_pic = data.cover_pic || ''

    this.list_show_pic = this.file_pic
    if(parseInt(this.kind) === 2) {
      this.list_show_pic = this.cover_pic
    }
    this.summary = data.summary || ''

    this.list_detail_href = `${process.env.URL.FRIENDS}/#/friends/social/detail?id=${this.cid}`
    this.pkeysearch = {
      title: '',
      commentuser: '',
      audit_status: '',
      datetimerange: []
    }

    this.pv = data.pv || ''


    if(!this.kind_name && this.kind) {
      this.kind_name = parseInt(this.kind) === 1 ? '图片' : ''
      this.kind_name = parseInt(this.kind) === 2 ? '视频' : ''
    }
    if(!this.publish_status_name && this.publish_status) {
      this.publish_status_name = parseInt(this.publish_status) === 1 ? '发布' : ''
    }

    this.sessionkey_search = 'social'
    this.$storeList = 'FriendsSocial'

    this.report_num = data.report_num || 0   //  被举报数量
    this.report_num_href = this.report_num ? `${process.env.URL.FRIENDS}/#/friends/report?id=${this.cid}&user=${encodeURI(encodeURI(this.user))}` : ''

    this.config = {
      search: true,
      del: this.api_rights.friends[`v1,friends,admin,circles,delete`],
      detail: this.api_rights.friends[`v1,friends,admin,circleinfo,get`],
    //  exp_data: true   //  导出数据
    }
    this.can_check = this.api_rights.friends[`v1,friends,admin,circles,put`]
    this.config.notools = !this.config.del && !this.config.detail && !this.can_check
    this.get_detail_data = data.get_detail_data || {cid: this.cid}

    /** 导出数据 */
    this.module_export_data = {
      url_api: `http://192.168.10.103:8004/v1/admin/excel`,
      m: 'circles',
      name: '圈子数据',
      data: {
        '动态类型': 'kind_name',
        '视频封面图': 'cover_pic',
        '动态内容': 'file_pic',   //  视频
        '动态': 'source_pic',    //   图片
        '动态文字': 'content',
        '发布用户手机': 'tel',
        '发布用户昵称': 'username',
        '发布时间': 'publish_time',
        '评论数': 'comment_num',
        '收藏量': 'collection_num',
        '点赞量': 'like_num',
        '浏览量': 'pv',
        '被举报次数': 'report_num',
        '审核状态': 'audit_status_name',
        '审核结果': 'audit_result'
      }
    }
  }

  /**
   * @function
   * @description 设置删除时所需要传的参数 */
  setDeleteOneParam () {
    return {
      cid: this.cid
    }
  }

  /**
   * @function
   * @description 关键词搜索时传参数 */
  setSearch () {
    return {
      title: this.pkeysearch.title,
      commentuser: this.pkeysearch.commentuser,
      audit_status: this.pkeysearch.audit_status || '-1',
      datetimerange: this.pkeysearch.datetimerange
    }
  }

  /**
   * @function
   * @description 审核 */
  check (obj) {  //  审核
    super.baseHttp({
      method: 'put',
      url: this.check_url,
      data: {
        cid: this.cid,
        audit_status: this.audit_status,           // 0: 待审核  1: 审核成功   2: 审核失败
        audit_result: this.audit_result,
        audit_uid: this.audit_uid,
        pv: this.pv
      },
      httpSuccess: obj.success ? obj.success : '',
      httpError: obj.error ? obj.error : ''
    })
  }
}


export default Ideas
