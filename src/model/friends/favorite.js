//  收藏 / 点赞  模型

import Base from '@/model/base'
import xhr from '@/plugin/main'
/**
 * @class
 * @classdesc 点赞收藏
 * */
class Favorite extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)

    if(data.model_type === 'collect') {
      this.get_list_url = `${process.env.API.USER}/v1/admin/user/collection`
    }else if(data.model_type === 'praise') {
      this.get_list_url = `${process.env.API.USER}/v1/admin/user/userlike`
    }

    this.current_model = Favorite

    this.tel = data.tel || ''                                   //  收藏用户 / 点赞
    this.create_time = data.create_time || ''                   //  收藏时间  / 点赞
    this.data_id = data.data_id || ''                           //  动态 id （aid: 资讯  gid: 商品  cid:  圈子）
    this.kind = data.circle_kind || 1                           //  动态 类型

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

    this.user_uid = data.user_uid || ''
    this.tel_href = this.tel ? `${process.env.URL.USER}/#/user/use/detail?id=${this.user_uid}` : ''
    if(!this.tel) this.tel = '未登录用户'
    /**
     * 关键词搜索参数
     * */
    this.pkeysearch = {
      commentuser: '',
      type: 'circle'
    }

    this.sessionkey_search = data.sessionkey_search + (data.model_type || '')

    if(xhr.get_query('comuser', 'friends/commentpraise')) {
      this.comment_user = xhr.get_query('comuser', 'friends/commentpraise') || ''
    }

    this.$storeList = 'FriendsFavoriteList' + this.model_type

    this.config = {
      search: true,
      notools: true,
    //  exp_data: true
    }

    if(data.model_type === 'collect') {
      this.module_export_data = {
        url_api: `http://192.168.10.103:8004/v1/admin/excel`,
        m: 'collection',
        name: '圈子收藏',
        t: 'circle',
        data: {
          '动态内容': 'file_pic',
          '收藏用户手机': 'tel',
          '收藏用户昵称': 'username',
          '收藏时间': 'create_time'
        }
      }
    }else {
      this.module_export_data = {
        url_api: `http://192.168.10.103:8004/v1/admin/excel`,
        m: 'userlike',
        t: !!xhr.get_query('cid', 'friends/praise') ? 'circle_comment' : xhr.get_query('comuser', 'friends/commentpraise') ? 'circle_discuss' : 'circle',
        name: '圈子点赞',
        data: {
          '动态内容': 'file_pic',
          '点赞用户手机': 'tel',
          '点赞用户昵称': 'username',
          '点赞时间': 'create_time'
        }
      }
    }
  }

  /**
   * @function
   * @description 获取列表  参数
   * */
  setGetListParam () {
    return {
      type: 'circle',
      data_id: this.data_id
    }
  }
}

export default Favorite
