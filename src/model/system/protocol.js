//  协议

import News from '@/model/news/news'

/**
 * @class
 * @classdesc 协议
 * */
class Protocol extends News {
  constructor(data) {
    data = !!data ? data : {}

    super(data)

    this.current_model = Protocol

    this.get_list_url = `${process.env.API.NEWS}/v1/admin/news/protocol`
    this.list_detail_href = `${process.env.URL.SYSTEM}/#/system/protocol/detail?id=${this.aid}&lang=${this.web_language}`

    this.sessionkey_search = 'sysprotocol'

    this.$storeList = 'SysProtocolList'

    this.update_must_data = 'is_system,aid'
    this.get_detail_data = data.get_detail_data || {aid: this.aid, lang: this.web_language}
  }
  /**
   * @function
   * @description 表单提交时所传参数 */
  setPostParam () {
    return {
      title: this.title,
      content: this.content,
      category_code: this.category.code[this.category.code.length - 1],
      is_system: 1
    }
  }
  /**
   * @function
   * @description 表单提交时所传参数 */
  setPutParam (xhr) {
    super.setPutParam(xhr)
    xhr.request.data.aid = this.aid
  }
}

export default Protocol
