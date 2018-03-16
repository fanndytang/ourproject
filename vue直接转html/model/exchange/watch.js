import Base from '/model/base.js'
/**
 * @class
 * @classdesc 腕表 */
class Watch extends Base {
  constructor(data) {
    data = data || {}
    super(data)

    this.useModel = Watch

    this.title = data.title || ''
    this.id = data.id || ''

    /** 唯一标识 */
    this.$unique = 'watch'

    /** 关键词搜索 */
    this.rsSearch = {
      title: '',
      detail: ''
    }
  }
}

export default Watch
