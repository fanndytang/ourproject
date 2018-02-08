import XHR from '@/model/api/xhr'
import SHA1 from '@/plugin/sha1'

/**
 * @class
 * @classdesc Token处理
 * */
class Token extends XHR {
  constructor(data) {
    data = !!data ? data : {}
    super(data)

    const AppId = 'swisstimevip';
    const AppSecret = '469d8b353e271ea4750793fb656cc331d8fd6bc1';
    let ClientType = 3;
    let ClientId;
    let AppDigest;

    AppDigest = SHA1(AppId + AppSecret);
    ClientId = SHA1(new Date().getTime() + Math.floor(Math.random() * 9999));
    localStorage.setItem('RequestToken', AppDigest)
    localStorage.setItem('ClientType', ClientType)
    localStorage.setItem('ClientId', ClientId)

    /** api 请求参数 */
    this.request = {
      method: 'get',
      url: `${process.env.API.USER}/v1/login`
    }

    /** http请求的次数 */
    this.count = 0
  }

  /**
   * @function
   * @description token请求成功
   * */
  httpSuccess (res) {
    this.count = 0
    localStorage.setItem('AccessToken', res.data.AccessToken)
  }

  /**
   * @function
   * @description 获取token失败
   * */
  getTokenFailed(res) {

  }

  /**
   * @function
   * @description 请求失败
   * */
  httpError (res) {
    this.count ++
    if(this.count >= 3) {
      this.getTokenFailed(res)
    }else {
      this.httpRequest()
    }

  }
}


export default Token
