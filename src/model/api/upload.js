import XHR from '@/model/api/xhr'

/**
 * @class
 * @classdesc 文件上传
 * */
class Upload extends XHR {
  constructor(data) {
    data = !!data ? data : {}
    super(data)

    /** 已请求的次数 */
    this.count = 0
  }

  /**
   * @function
   * @description 设置发送数据
   * */
  setFormData (obj) {
    let form_data = new FormData()
    form_data.append('file', obj.file)
    this.request.data = form_data
  }

  /**
   * @function
   * @description 请求成功
   * */
  httpSuccess (res) {
    this.count = 0
  }

  /**
   * @function
   * @description 上传失败
   * */
  uploadError (res) {

  }

  /**
   * @function
   * @description 请求失败
   * */
  httpError (res) {
    this.count ++
    if(this.count >= 3) {
      this.uploadError(res)
    }else {
      this.httpRequest()
    }
  }
}

export default Upload

