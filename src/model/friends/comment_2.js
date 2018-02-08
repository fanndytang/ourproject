//  评论  模型

import Base from '@/model/base'
/**
 * @class
 * @classdesc 评论
 * */
class Comment extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)

    this.get_list_url =  `${process.env.API.FRIENDS}/v1/admin/friends/discuss`
    this.delete_url =  `${process.env.API.FRIENDS}/v1/admin/friends/comment`

    this.current_model = Comment

    this.model_type = data.model_type || ''
    this.article_title = data.article_title || ''                          //  文章标题
    this.content = data.content || ''                                      //  评论内容
    this.tel = data.tel || ''                                              //  评论用户
    this.create_time = data.create_time || ''                              //  评论时间

    this.first_time = data.first_time || ''                                //  评论时间 （有多级时，表示一级评论时间）
    this.first_content = sessionStorage.getItem('circle-first-content') || ''                          //  评论内容 （有多级时，表示一级评论内容）
    this.comment_group = data.comment_group || ''                          //  评论组

    this.comment_content = this.first_content || this.content || ''        //  评论内容 （统 一 一 下）
    this.comment_time = this.first_time || this.create_time || ''          //  评论时间 （统一 一下）

    this.file_fid = data.file_fid || ''
    this.status = data.status || ''
    this.status_name = data.status_name || ''

    this.cid = data.cid || ''
    this.aid = data.aid || data.article_aid || ''
    this.did = data.did || ''
    this.ccid = data.ccid || ''

    this.discuss_num = data.discuss_num || 0                                 //  评论数
    this.like_num = data.like_num || 0                                       //  点赞数

    this.comment_uid = data.comment_uid || ''                                //  评论者uid
    this.target_uid = data.target_uid || ''                                  //  回复者uid
    this.comment_username = data.comment_username || data.username || ''     //  评论者用户名
    this.target_username = data.target_username || ''                        //  回复者用户名

    this.discuss_num = this.discuss_num ? this.discuss_num > 99 ? '99+' : this.discuss_num : 0
    this.like_num = this.like_num ? this.like_num > 99 ? '99+' : this.like_num : 0

    this.close = data.close || 0  //  是否关闭评论

    this.like_href = parseInt(this.like_num) > 0 ? `${process.env.URL.FRIENDS}/#/friends/commentpraise?did=${this.did}&comuser=${this.tel}` : ''

    let userinfo_rights = !!this.api_rights.user[`v1,user,admin,userinfo,get`]
    this.user_comment_href = this.tel && userinfo_rights ? `${process.env.URL.USER}/#/user/use/detail?id=${this.comment_uid}` : ''
    this.user_target_href = this.tel && userinfo_rights ? `${process.env.URL.USER}/#/user/use/detail?id=${this.target_uid}` : ''
    this.article_href = `${process.env.URL.NEWS}/#/news/list/detail?aid=${this.aid}`
    this.circle_href = ''

    this.kind = parseInt(sessionStorage.getItem('circle-kind') || '1')

    let pic = sessionStorage.getItem('circle-file-pic')

    let file_pic = []
    if(pic) {
      if(typeof pic === 'string') {
        file_pic = pic.split(',')
      }else {
        file_pic = pic
      }
    }

    this.file_pic = file_pic
    this.list_show_pic = this.file_pic

    this.is_del = data.is_del || ''
    this.is_del_name = parseInt(data.is_del) == 1 ? '已关闭' : ''


    /**
     * 关键词搜索字段
     * */
    this.pkeysearch = {
      title: '',
      user: '',
      datetimerange: [],
      commentuser: ''
    }

    this.sessionkey_search = 'socialcomment2'
    this.$storeList = 'FriendsSocialComment2'

    this.config = {
      search: true,
    //  exp_data: true
    }
    this.can_close = this.api_rights.friends[`v1,friends,admin,comment,delete`]
    this.config.notools = !this.can_close

    this.module_export_data = {
      url_api: `http://192.168.10.103:8004/v1/admin/excel`,
      m: 'discuss',
      name: '圈子二级评论',
      data: {
        '动态内容': 'file_pic',
        '评论内容': '',                     //  无此字段
        '评论用户': 'target_username',
        '评论时间': '',                     //  无此字段
        '回复内容': 'content',
        '回复者': 'tel',
        '回复时间': 'create_time'
      }
    }
  }

  /**
   * @function
   * @description 设置获取列表数据的参数
   * */
  setGetListParam () {
    return {
      ccid: this.ccid
    }
  }

  /**
   * @function
   * @description 关闭功能参数
   * */
  setDeleteOneParam () {
    return {
      did: this.did,
      close: this.close
    }
  }
}

export default Comment
