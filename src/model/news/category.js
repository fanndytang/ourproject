//  资讯分类  模型

import Category from '@/model/category'
//import Vue from 'vue'

/**
 * @class
 * @classdesc 分类
 * */
class NewsCategory extends Category {
  constructor(data) {
    data = !!data ? data : {}
    super(data)

    this.add_url = `${process.env.API.NEWS}/v1/admin/news/articlecate`
    this.update_url = `${process.env.API.NEWS}/v1/admin/news/articlecate`
    this.delete_url = `${process.env.API.NEWS}/v1/admin/news/articlecate`
    this.get_list_url = `${process.env.API.NEWS}/v1/admin/news/articlecate`
    this.get_detail_url = `${process.env.API.NEWS}/v1/admin/news/categoryinfo`
    if(this.model_type === 'cascader') {
      this.get_list_url = `${process.env.API.NEWS}/v1/admin/news/category`
    }

    this.current_model = NewsCategory
    let num = {1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九', 10: '十'}
    this.level_name = data.level ? `${num[data.level]}级` : ''                                          //  等级显示名称
    this.pkeysearch = {                                                                                 //  关键词搜索
      title: ''
    }
    this.sessionkey_search = 'newscate'                                                                 //  搜索唯一标识
    this.config = {                                                                                     //  权限配置
      add: this.api_rights.news[`v1,news,admin,articlecate,post`],
      edit: this.api_rights.news[`v1,news,admin,articlecate,put`],
      del: this.api_rights.news[`v1,news,admin,articlecate,delete`],
      search: true,
      language: true
    }
    this.config.notools = !this.config.edit && !this.config.del
  /*  this.get_detail_data = data.get_detail_data || {
      code: typeof this.code === 'string' ? this.code : this.code[this.code.length - 1]
    }*/
    this.update_must_data = 'code,self_code'                                                            //  编辑时，必传字段（多语言）
    this.$storeList = data.model_type === 'cascader' ? 'NewsCascaderList' : 'NewsCategoryList'                  //  vuex 缓存标识
  }

  /**
   * @function
   * @description 删除分类 */
  delete_one() {
    if(this.sons > 0) {
      new Vue().$message.error('请先删除该分类下的子分类')
    }else {
      super.delete_one()
    }
  }


  /**
   * @function
   * @description 获取列表(主要是区分级联列表)
   * */
  get_list (obj) {
    let that = this
    if(that.model_type === 'cascader') {
      super.baseHttp({
        method: 'get',
        url: `${process.env.API.NEWS}/v1/admin/news/category`,
        params: {
          lang: obj.lang || that.web_language || 'zh-cn'
        },
        httpSuccess (res) {
          let list = res.data.data
          let pages = res.data && res.data.page ? res.data.page.total_count : 0

          if(obj.callback) {
            obj.callback({
              data: list,
              totals: pages || list.length || 0,
              pages: Math.ceil(pages/(obj.rows || 10))
            })
          }else {
            that.datalists.data = list
            that.datalists.pages = pages
          }
        },
        httpError(res) {
          if(obj.callback) {
            obj.callback({
              data: [],
              totals: 0,
              pages: 1
            })
          }else {
            that.datalists.data = []
            that.datalists.pages = 1
            that.datalists.current = 1
          }
        }
      })
    }else {
      super.get_list(obj)
    }

    this.sessionkey_search = 'newscate'
  }
}

export default NewsCategory
