//  专题  模型

import Base from '@/model/base'
import NewsCategory from '@/model/news/category'

/**
 * @class
 * @classdesc 点赞收藏
 * */
class Subject extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)
    this.add_url = `${process.env.API.NEWS}/v1/admin/news/subject`
    this.update_url = `${process.env.API.NEWS}/v1/admin/news/subject`
    this.delete_url = `${process.env.API.NEWS}/v1/admin/news/subject`
    this.get_list_url = `${process.env.API.NEWS}/v1/admin/news/subject`
    this.get_detail_url = `${process.env.API.NEWS}/v1/admin/news/subjectinfo`

    this.current_model = Subject

    this.title = data.title || ''                                           //  文章标题
    this.aid = data.aid || data.article_aid_list || ''                     //  文章标识
    this.sid = data.sid || ''                                               //  专题标识
    this.cover_fid = data.cover_fid || ''                                   //  封面
  //  this.file_id = data.file_id || ''                                       //  上传时使用
    this.cover_pic = data.cover_pic || ''                                   //  封面路径
    this.create_time = data.create_time || ''                               //  创建时间
    this.description = data.description || ''                               //  简介
    this.seo_title = data.seo_title || ''                                   //  seo
    this.seo_keywords = data.seo_keywords || ''
    this.seo_description = data.seo_description || ''
    this.editor_uid = data.editor_uid || ''                                 //  作者
    this.article_aid_list = !!data.article_aid_list && typeof(data.article_aid_list) === 'string' ? data.article_aid_list.split(',') : (data.article_aid_list || [])

    this.list_detail_href = this.sid ? `${process.env.URL.NEWS}/#/news/subject/detail?id=${this.sid}&lang=${this.web_language}` : ''

    this.aid_array = []

    this.category = new NewsCategory({
      code: data.category_code || data.article_category_code || [],          //  所属分类
      name: data.category_name || ''
    })

    this.query_article_title = data.query_article_title || ''
    this.query_sub_title = data.query_sub_title || ''
    this.art_sub_list = {   //  专题对应的文章列表（前端展示使用）
      data: [],
      pages: 1,
      current: 1
    }

    if(this.aid !== '' && typeof this.aid === 'string') {
      this.aid_array = this.aid.split(',')
    }
    /**
     * 关键词搜索
     * */
    this.pkeysearch = {
      title: '',
      code: [],
      sid: ''
    }
    /**
     * 详情页面 文章列表
     * */
    this.detail_article_list = {
      data: [],
      page: 1,
      current: 1
    }

    this.sessionkey_search = 'newssubject'

    this.config = {
      add: this.api_rights.news[`v1,news,admin,subject,post`] && this.api_rights.news[`v1,news,admin,titles,get`],
      edit: this.api_rights.news[`v1,news,admin,subject,put`] && this.api_rights.news[`v1,news,admin,titles,get`],
      detail: this.api_rights.news[`v1,news,admin,subjectinfo,get`],
      del: this.api_rights.news[`v1,news,admin,subject,delete`],
      search: true,
      language: true
    }
    this.lookarticles = this.api_rights.news[`v1,news,admin,article,get`]   //  查看专题文章权限

    this.update_must_data = 'sid'
    this.$storeList = 'NewsSubjectList'
    this.get_detail_data = data.get_detail_data || {sid: this.sid, lang: this.web_language}
  }

  /**
   * @function
   * @description 处理关键词搜索参数
   * */
  setSearch () {
    return {
      title: this.pkeysearch.title,
      category_code: this.pkeysearch.code[this.pkeysearch.code.length - 1]
    }
  }

  /**
   * @function
   * @description post 参数
   * */
  setPostParam () {
    let aid = []
    for(let k in this.art_sub_list.data) {
      aid.push(this.art_sub_list.data[k].aid)
    }

    return {
      sid: this.sid || '',
      aid: aid && aid.length > 0 ? aid : (this.aid_array || []),
      title: this.title,
      cover_fid: this.cover_fid || '',
      category_code: this.category.code[this.category.code.length - 1] || '',
      description: this.description,
      seo_title: this.seo_title,
      seo_keywords: this.seo_keywords,
      seo_description: this.seo_description,
      editor_uid: this.editor_uid
    }
  }

  /**
   * @function
   * @description  设置编辑时的数据
   * */
  setPutParam(xhr) {
    super.setPutParam(xhr)
    let aid = []
    for(let k in this.art_sub_list.data) {
      aid.push(this.art_sub_list.data[k].aid)
    }
  //  aid = aid && aid.length > 0 ? aid : (this.aid_array || [])
    xhr.request.data.aid = this.aid_array || []
  }

  /**
   * @function
   * @description 删除专题参数
   * */
  setDeleteOneParam () {
    return {
      id: this.id,
      sid: this.sid
    }
  }

  /**
   * @function
   * @description 根据文章名称或文章分类  获取文章列表
   * */
  get_news (list, callback) {
    this.get_list({
      list: list,
      model: this.current_model,
      url: `${process.env.API.NEWS}/v1/admin/news/titles`,
      p: list.current || 1,
      params: {
        lang: this.web_language || 'zh-cn',
        title: this.query_article_title,
        category_code: this.category.code[this.category.code.length - 1] || ''
      },
      callback (res) {
        list.data = res.data
        list.pages = res.pages
      }
    })
  }

  /**
   * @function
   * @description 查询专题下的文章列表
   * */
  get_subject_news (list, callback, sid) {
    let sidd = sid || this.sid
    if(!sidd) return

    let that = this
    this.get_list({
      list: list,
      model: this.current_model,
      url: `${process.env.API.NEWS}/v1/admin/news/titles`,
      lang: sessionStorage.getItem('language-detail') || 'zh-cn',
      params: {
        lang: this.web_language || 'zh-cn',
        sid: sidd
      },
      callback (res) {
        let str = {}
        for(let k in that.article_aid_list) {
          str[that.article_aid_list[k]] = 1
        }
        list.pages = res.pages

        for(let k in res.data) {
          if(str[res.data[k].aid]) {
            list.data.push(res.data[k])
            that.aid_array.push(res.data[k].aid)
          }
        }
      }
    })
  }


  /**
   * @function
   * @description 设置获取列表数据的参数
   * */
  setGetListParam () {
    return {
      id: this.id,
      type: this.type
    }
  }
}

export default Subject
