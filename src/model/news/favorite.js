//  收藏/点赞  模型

import Base from '@/model/base'
import xhr from '@/plugin/main'

let api = {
  'collect': `${process.env.API.USER}/v1/admin/user/collection`,   // 收藏
  'like': `${process.env.API.USER}/v1/admin/user/userlike`         // 点赞
}
/**
 * @class
 * @classdesc 点赞收藏
 * */
class FavoriteWord extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)

    this.get_list_url = api[data.model_type] || ''
    this.current_model = FavoriteWord

    let title = decodeURI(xhr.get_query('title', data.model_type === 'collect' ? 'news/collect' : 'news/praise'))
    this.title = title && title !== 'null' ? title : (data.title || data.article_title || '')         //  对应的文章标题
    this.tel = data.tel || ''                                   //  收藏/点赞用户
    this.create_time = data.create_time || ''                   //  收藏/点赞时间
    this.project = data.project || ''                           //  1:收藏  2: 点赞
    this.data_id = data.data_id || ''                           //  动态 id （aid: 资讯  gid: 商品  cid:  圈子）
    this.avatar_pic = data.avatar_pic || ''
    this.file_fid_list = data.file_fid_list || ''
    this.file_pic = data.file_pic ? data.file_pic.split(',') : []
    this.user_uid = data.user_uid || ''
    this.aid = data.aid || ''

    this.title_href = ''
    this.tel_href = ''

    this.title_href = `${process.env.URL.NEWS}/#/news/list/detail?aid=${this.aid}`
    this.tel_href = this.tel ? `${process.env.URL.USER}/#/user/use/detail?id=${this.user_uid}` : ''

    if(!this.tel) this.tel = '未登录用户'

    this.title_href = `${process.env.URL.NEWS}/#/news/list/detail?id=${this.aid}`    //  链接到的详情页面

    /**
     * 关键词搜索参数
     * */
    this.pkeysearch = {
      title: '',
      commentuser: '',
      type: data.type
    }

    this.comment_user = xhr.get_query('tel', 'news/commentpraise') || ''
    this.comment_user_href = this.comment_user ? `${process.env.URL.USER}/#/user/use/detail?id=${data.publish_uid}` : ''

    this.sessionkey_search = 'newscollectlike' + (data.model_type ? data.model_type : '')
    this.$storeList = 'newscollectlike' + (data.model_type ? data.model_type : '')
    this.config = {
      search: true,
      notools: true
    }
  }

  /**
   * @function
   * @description 初始化
   * */
  setInit(res) {
    return {
      model_type: res.model_type,
      type: res.type
    }
  }

  /**
   * @function
   * @description 获取列表  参数
   * */
  setGetListParam () {
    return {
      type: this.type,
      data_id: this.data_id
    }
  }
}

export default  FavoriteWord
