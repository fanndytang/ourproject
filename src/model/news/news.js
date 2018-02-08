//  资讯  模型

import Base from '@/model/base'
import NewsCategory from '@/model/news/category'
import NewsCollect from '@/model/news/favorite'
import NewsPraise from '@/model/news/favorite'
import Comment from '@/model/news/comment_1'

/**
 * @class
 * @classdesc 点赞收藏
 * */
class News extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)

    this.get_list_url = `${process.env.API.NEWS}/v1/admin/news/article`
    this.add_url = `${process.env.API.NEWS}/v1/admin/news/article`
    this.update_url = `${process.env.API.NEWS}/v1/admin/news/article`
    this.delete_url = `${process.env.API.NEWS}/v1/admin/news/article`
    this.get_detail_url = `${process.env.API.NEWS}/v1/admin/news/articleinfo`


    this.current_model = News

    this.title = data.title || ''                           //  文章标题
    this.aid = data.aid || ''                               //  文章标识
    this.file_id = data.file_id || data.cover_fid || ''                       //  封面图  用于上传
    this.cover_fid = data.cover_fid || ''                    //  封面图 fid
    this.cover_pic = data.cover_pic || ''                   //  封面图路径
    this.summary = data.summary || ''                       //  简介
    this.publish_time = data.publish_time || ''             //  发布时间
    this.content = data.content || ''                       //  文章内容
    this.author = data.author || ''                         //  文章作者
    this.seo_title = data.seo_title || ''                   //  seo
    this.seo_keywords = data.seo_keywords || ''
    this.seo_description = data.seo_description || ''
    this.source = data.source || ''                         //  来源
    this.pv = data.pv || ''                                 //  浏览量
    this.like_num = data.like_num || '0'                     //  点赞量
    this.collection_num = data.collection_num || '0'                 //  收藏量
    this.comment_num = data.comment_num || '0'               //  评论数
    this.unlike_num = data.unlike_num || '0'                 //  踩
    this.publish_uid = data.publish_uid || ''               //  发布者uid
    this.publish_status = data.publish_status         //  发布状态  0: 草稿  1: 发布
    this.is_system = data.is_system || 0                    //  是否是用户协议，是则为1
    this.is_recommend = data.is_recommend || ''             //  是否推荐（状态）
    this.recommend_name = data.recommend_name  || (this.is_recommend ? '已推荐' : '') || ''         //  是否推荐（文字）
    this.article_subject_sid = data.article_subject_sid || ''  //  所属专题
    this.subject_sid = data.subject_sid || data.article_subject_sid || ''
    this.subject_title = data.subject_title || data.subject_name || '无'           //  所属专题名称
    this.subject_href = this.subject_sid && this.subject_title !== '无' ? `${process.env.URL.NEWS}/#/news/subject/detail?id=${this.subject_sid}&lang=${this.web_language}` : ''

    this.category =  new NewsCategory({
      code: data.category_code || '',
      name: data.category_name || ''
    })
    this.comment = new Comment()
    this.collect = new NewsCollect()
    this.praise = new NewsPraise()
    this.close = data.close || 0     // 是否下架

    //  进一步处理数据
    this.content = this.sethtml(this.content)

    this.comment_num_show = this.comment_num ? this.comment_num > 99 ? '99+' : this.comment_num : 0
    this.collection_num_show = this.collection_num ? this.collection_num > 99 ? '99+' : this.collection_num : 0
    this.like_num_show = this.like_num ? this.like_num > 99 ? '99+' : this.like_num : 0
    this.comment_href = parseInt(this.comment_num) > 0 ? `${process.env.URL.NEWS}/#/news/comment?aid=${this.aid}&title=${encodeURI(encodeURI(this.title))}` : ''
    this.collect_href = parseInt(this.collection_num) > 0 ? `${process.env.URL.NEWS}/#/news/collect?aid=${this.aid}&title=${encodeURI(encodeURI(this.title))}` : ''
    this.praise_href = parseInt(this.like_num) > 0 ? `${process.env.URL.NEWS}/#/news/praise?aid=${this.aid}&title=${encodeURI(encodeURI(this.title))}` : ''

    this.list_detail_href = `${process.env.URL.NEWS}/#/news/list/detail?id=${this.aid}&lang=${this.web_language}`
    /**
     * 关键词搜索字段
     * */
    this.pkeysearch = {
      title: '',
      category_code: '',
      sid: (data.search_sid || '').toString()
    }
    if(data.search_sid && sessionStorage.getItem('newslist-pkeysearch-sid')) sessionStorage.setItem('newslist-pkeysearch-sid', data.search_sid)

    this.sessionkey_search = 'newslist'

    this.config = {
      add: this.api_rights.news[`v1,news,admin,article,post`] && this.api_rights.news[`v1,news,admin,category,get`],
      edit: this.api_rights.news[`v1,news,admin,article,put`] && this.api_rights.news[`v1,news,admin,category,get`],
      del: this.api_rights.news[`v1,news,admin,article,delete`],
      detail: this.api_rights.news[`v1,news,admin,articleinfo,get`],
      search: true,
      language: true
    }
    this.downarticle = this.api_rights.news[`v1,news,admin,article,delete`]   //  下架功能权限
    this.config.notools = !this.config.add && !this.config.edit && !this.config.del && !this.config.detail && !this.downarticle
    this.can_downart = parseInt(this.publish_status) === 1
    this.can_openart = parseInt(this.publish_status) === 0 || !this.publish_status
    this.status_name = parseInt(this.publish_status) === 1 ? '上架中' : '下架中'
    this.update_must_data = 'aid,publish_status'

    this.$storeList = 'NewsList'
    this.get_detail_data = data.get_detail_data || {aid: this.aid, lang: this.web_language}
  }

  /**
   * @function
   * @description 处理关键词搜索参数
   * */
  setSearch () {
    let s = this.pkeysearch.category_code.split(',')
    let data = {
      title: this.pkeysearch.title,
      category_code: s[s.length - 1]
    }
    if(this.pkeysearch.sid) {
      data.sid = this.pkeysearch.sid
    }
    return data
  }

  /**
   * @function
   * @description post 发送数据
   * */
  setPostParam () {
    return {
      aid: this.aid || '',
      title: this.title,
      cover_fid: this.cover_fid,
      summary: this.summary,
      category_code: this.category.code[this.category.code.length - 1],
      article_subject_sid: this.subject_sid,
      content: this.content,
      keywords: this.keywords,
      author: this.author,
      pv: this.pv,
      like_num: this.like_num,
      source: this.source,
      seo_title: this.seo_title,
      seo_keywords: this.seo_keywords,
      seo_description: this.seo_description,
      is_system: this.is_system,
      publish_status: this.publish_status
    }
  }

  /**
   * @function
   * @description 删除功能发送数据
   * */
  setDeleteOneParam () {
    return {
      id: this.id,
      aid: this.aid,
      close: this.close,
      publish_status: 2
    }
  }
}


export default News
