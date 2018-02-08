import Base from '@/model/base'

/**
 * @class
 * @classdesc 分类基本*/
class CategoryBase extends Base {
  constructor(data) {
    data = !!data ? data : {}

    super(data)

    let code = []
    if(data.code !== '' && typeof data.code === 'string') {
      let parent = data.code.substr(0, 2) + '00'
      if(data.code !== parent) {
        code = (parent + ',' + data.code).split(',')
      }else {
        code[0] = data.code
      }
    }

    this.name = data.name || ''                                         //  分类名称
    this.code = code || data.code || []                                 //  分类标识
    this.code_string = (data.code || '').toString()                     //  分类标识对应的字符串格式
    this.level = data.level || ''                                       //  分类级别
    this.level_name = data.level_name || ''                             //  分类级别对应的级别名称

 //   this.get_cascader_list_url = data.get_cascader_list_url || ''    //  获取级联形式的列表地址

   // this.category_level1 = []
  }

 /* get_cascader_list (list, resultCallback, errorCallback) {     //  获取级联结构的分类数据
    let result = list ? list : this.datalists
    xhr.get_list({
      url: this.get_cascader_list_url,
      list: result,
      model: this.current_model,
      lang: list.lang || '',
      resultCallback(res, model) {
        if(typeof resultCallback === 'function') {
          resultCallback(res, model)
        }
      },
      errorCallback (res, model) {
        if(typeof errorCallback === 'function') {
          errorCallback(res, model)
        }
      }
    })
  }*/

  /**
   * 获取分类列表，不做任何修改
   * */
/*  get_category_level1 (data) {
    let obj = data || {}
    let that = this

    xhr.axios_xhr({
      url: this.get_cascader_list_url,
      method: 'get',
      p: 1,
      params: {lang: obj.lang || this.web_language || 'zh-cn'},
      success(res) {
        that.category_level1 = []
        that.category_level1 = res.data.data
      },
      error() {
        that.category_level1 = []
      }
    })
  }*/
}

/**
 * @class
 * @classdesc 分类深化*/
class Category extends CategoryBase {
  constructor(data) {
    data = !!data ? data : {}

    super(data)

    this.parent = new CategoryBase(data.parent || {})         //  当前分类的父分类

    //  当前分类拥有的子分类
    if(data.sons && typeof(data.sons) === 'number') {
      this.sons = data.sons
    }else {
      this.sons = []
      if(data.sons) {
        for(let k=0, len=data.sons.length; k<len; k++) {
          this.sons[k] = new CategoryBase(data.sons[k] || {})
        }
      }
    }

    this.parent_code = this.parent && this.parent.code ? this.parent.code : ''
  }


  setPostParam () {
    return {
      name: this.name,
      code: this.parent.code_string,
  //    code: this.parent.code,
    //  code: this.parent.code.length ? this.parent.code[this.parent.code.length - 1] : '',
      self_code: this.code.length > 0 ? this.code[this.code.length - 1] : ''
     // self_code: this.code
    }
  }
}

export default Category
