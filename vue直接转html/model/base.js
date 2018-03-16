/**
 * @class
 * @classdesc 基类 */
class Base {
  constructor(data) {
    /** 关键词搜索 */
    this.rsSearch = data.rsSearch || ''
    /** 配置 */
    this.config = data.config || ''
    /** 唯一标识 */
    this.$unique = data.$unique || ''
    /** 模型引用 */
    this.useModel = data.useModel || ''


  }


  /**
   * @function
   * @description 删除某一项 */
  deleteOne() {

  }
}

export default Base
