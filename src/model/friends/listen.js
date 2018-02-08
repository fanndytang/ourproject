import Base from '@/model/base'

/**
 * @class
 * @classdesc   圈子审核状态监听
 * */
class Listen extends Base {
  constructor(data) {
    data = !!data ? data : {}
    data.id = data.id || data.cid || ''
    data.current_model = Listen
    super(data)

    this.has_listen_rights = this.api_rights.friends[`v1,friends,admin,tips,get`]
  }

  /**
   * @function
   * @description 检查是否有新动态更新
   * */
  check (obj) {
    super.baseHttp({
      method: 'get',
      url: `${process.env.API.FRIENDS}/v1/admin/friends/tips`,
      httpSuccess: obj.success ? obj.success : '',
      httpError: obj.error ? obj.error : ''
    })
  }
}

export default Listen
