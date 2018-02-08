//  评论  模型

import Base from '@/model/base'
import xhr from '@/plugin/main'

let api = {
  circle_level1: `${process.env.API.NEWS}/v1/admin/news/comment`,     //  圈子一级评论
}

/**
 * @class
 * @classdesc 评论
 * */
class Comment extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)


    this.is_del = data.is_del || ''
    this.is_del_name = parseInt(data.is_del) == 1 ? '已关闭' : ''

    this.get_list_url =  `${process.env.API.NEWS}/v1/admin/news/comment`
    this.delete_url =  `${process.env.API.NEWS}/v1/admin/news/comment`

    this.current_model = Comment

    this.model_type = data.model_type || ''
    let title = decodeURI(xhr.get_query('title', 'news/comment'))
    this.article_title = title && title !== 'null' ? title : (data.article_title || '')
    this.content = data.content || ''                                      //  评论内容
    this.tel = data.tel || ''                                              //  评论用户
    this.create_time = data.create_time || ''                              //  评论时间

    this.first_time = data.first_time || ''                                //  评论时间 （有多级时，表示一级评论时间）
    this.first_content = data.first_content || ''                          //  评论内容 （有多级时，表示一级评论内容）
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

    if(this.is_del) {
      this.discuss_num = 0
    }

    this.like_num = data.like_num || 0                                       //  点赞数

    this.comment_uid = data.comment_uid || ''                                //  评论者uid
    this.target_uid = data.target_uid || ''                                  //  回复者uid
    this.comment_username = data.comment_username || data.username || ''     //  评论者用户名
    this.target_username = data.target_username || ''                        //  回复者用户名

    this.discuss_num = this.discuss_num ? this.discuss_num > 99 ? '99+' : this.discuss_num : 0
    this.like_num = this.like_num ? this.like_num > 99 ? '99+' : this.like_num : 0

    this.close = data.close || 0  //  是否关闭评论

    let userinfo_rights = !!this.api_rights.user[`v1,user,admin,userinfo,get`]
    this.user_comment_href = this.tel && userinfo_rights ? `${process.env.URL.USER}/#/user/use/detail?id=${this.comment_uid}` : ''
    this.user_target_href = this.tel && userinfo_rights ? `${process.env.URL.USER}/#/user/use/detail?id=${this.target_uid}` : ''
    this.article_href = `${process.env.URL.NEWS}/#/news/list/detail?id=${this.aid}`
    this.circle_href = ''

    this.kind = data.kind || ''
    let pic = data.file_pic
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

    this.like_href = parseInt(this.like_num) > 0 ? `${process.env.URL.NEWS}/#/news/commentpraise?did=${this.cid}&tel=${this.tel}` : ''

    this.discuss_href = parseInt(this.discuss_num) > 0 ? `${process.env.URL.NEWS}/#/news/commentreplay?cid=${this.cid}&first=${encodeURI(encodeURI(data.content))}&tel=${this.tel}` : ''

    this.group_discuss_href = `${process.env.URL.NEWS}/#/news/commentreplay?cid=${this.cid}&first=${encodeURI(encodeURI(data.content))}`

    /**
     * 关键词搜索字段
     * */
    this.pkeysearch = {
      title: '',
      user: '',
      tel: '',
      datetimerange: [],
      commentuser: ''
    }

    this.sessionkey_search = 'NewsComment1'

    this.config = {
      search: true
    }

    this.can_del = this.api_rights.news[`v1,news,admin,comment,delete`]   //  关闭评论权限
    this.config.notools = !this.can_del
    this.$storeList = 'CommentList1'
  }

  /**
   * @function
   * @description 设置获取列表数据的参数
   * */
  setGetListParam () {
    return {
      aid: this.aid,
    //  cid: this.cid,
   //   ccid: this.ccid
    }
  }

  /**
   * @function
   * @description 关闭功能参数
   * */
  setDeleteOneParam () {
    return {
    //  id: this.id,
     // cid: this.cid,
    //  did: this.did,
      cid: this.cid,
    //  close: this.close
    }
  }
}

export default Comment
