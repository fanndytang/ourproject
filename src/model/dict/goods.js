import Base from '@/model/base'
let api = {
  kind: `${process.env.API.DICT}/v1/admin/dict/goodskind`,     //  商品品类
  shape: `${process.env.API.DICT}/v1/admin/dict/shape`,        //  商品形状
  movement: `${process.env.API.DICT}/v1/admin/dict/movement`,  //  机芯
  material: `${process.env.API.DICT}/v1/admin/dict/material`,  //  材质
  functions: `${process.env.API.DICT}/v1/admin/dict/function`, //  功能
  fineness: `${process.env.API.DICT}/v1/admin/dict/fineness`,  //  成色
  brand: `${process.env.API.DICT}/v1/admin/dict/brand`         //  品牌
}

/**
 * @class
 * @classdesc 字典模型（商品品类、商品形状、机芯、材质、功能、成色、品牌）
 * */
class Goods extends Base {
  constructor(data) {
    data = !!data ? data : {}

    super(data)
    this.add_url = api[data.model_type] || ''
    this.get_list_url = api[data.model_type] || ''
    this.update_url = api[data.model_type] || ''
    this.delete_url = api[data.model_type] || ''
    this.current_model = Goods

    /**
     *  字典类共用模型，此参数用于区分是哪种字典属性
     *  kind: 品牌， shape: 形状， movement: 机芯， brand: 品牌， functions: 复杂功能， fineness: 成色, material: 材质
     * */
    this.model_type = data.model_type || ''
    /** id */
    this.id = (data.id || '').toString()
    /** pid */
    this.pid = (data.pid || '').toString()
    /** 名称 */
    this.name = data.name || ''
    /** 品类 id*/
    this.goods_kind_id = (data.goods_kind_id || '').toString()
    /** 品类 名称 */
    this.goods_kind_name = data.goods_kind_name || ''
    /** 备注 */
    this.remark = data.remark || ''
    /** 成色 pc 买家保障 */
    this.pc_details = this.sethtml(data.pc_details || '')
    /** 成色  app 买家保障 */
    this.app_details = this.sethtml(data.app_details || '')

    /** logo 图片路径 */
    this.pic = data.pic || ''
    /** logo file_id 用于上传 */
    this.file_id = data.file_id || data.file_fid || ''
    /** 首字母 */
    this.initial = data.initial || ''
    /** 关键词搜索 */
    this.pkeysearch = {
      name: '',
      goods_kind_id: ''
    }
    /** 关键词搜索标识 */
    this.sessionkey_search = 'dictgoods' + (data.model_type ? data.model_type : '')

    let str = {
      kind: 'goodskind',
      shape: 'shape',
      movement: 'movement',
      material: 'material',
      functions: 'function',
      fineness: 'fineness',
      brand: 'brand'
    }
    let add = this.api_rights.dict[`v1,dict,admin,${str[this.model_type]},post`]
    let edit = this.api_rights.dict[`v1,dict,admin,${str[this.model_type]},put`]
    if(!(this.model_type === 'kind' || this.model_type === 'movement')) {
      add = add && this.api_rights.dict[`v1,dict,admin,goodskind,get`]
      edit = edit && this.api_rights.dict[`v1,dict,admin,goodskind,get`]
    }
    /** 权限配置 */
    this.config = {
      add: add,
      edit: edit,
      del: this.api_rights.dict[`v1,dict,admin,${str[this.model_type]},delete`],
      search: this.model_type !== 'kind',
      language: true
    }
    /** 如果在表格中没有操作按钮显示，就不显示操作列  */
    this.config.notools = !this.config.edit && !this.config.del
    /** 在vuex中的缓存标识 */
    this.$storeList = ''
    if(data.model_type) {
      let store = data.model_type.toLocaleLowerCase()  //  方便实现首字母大写
      this.$storeList = `Dict${store.substr(0, 1).toUpperCase() + store.substr(1)}List`
    }
    /** 多语言编辑时，不需要显示语言选择下拉框 */
    this.edit_lang_one = true
  }

  /**
   * @function
   * @description 添加属性时传递的值（不同的属性不是全部都要传）
   * */
  setPostParam () {
    let data = {}
    switch(this.model_type) {
      case 'brand': data = {file_id: this.file_id, initial: this.initial};break;
      case 'fineness': data = {app_details: this.app_details, pc_details: this.pc_details};break;
      default: break;
    }
    if(this.model_type !== 'kind' && this.model_type !== 'movement') {data.goods_kind_id = this.goods_kind_id}
    if(this.model_type !== 'fineness') {data.remark = this.remark}
    data.name = this.name

    return data
/*
    return {
      name: this.name,                             //  名称
      goods_kind_id: this.goods_kind_id,           //  商品品类 id
      remark: this.remark,                         //  备注
      app_details: this.app_details,               //  app 买家保障
      pc_details: this.pc_details,                 //  pc 买家保障
      file_id: this.file_id,                       //  logo
      initial: this.initial                        //  首字母
    }*/
  }

  /**
   * @function
   * @description 设置不同的属性，不同的请求接口
   * */
  setApiUrl () {
    this.add_url = api[this.model_type] || ''
    this.get_list_url = api[this.model_type] || ''
    this.update_url = api[this.model_type] || ''
    this.delete_url = api[this.model_type] || ''
  }
}

export default Goods
