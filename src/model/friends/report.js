import Base from '@/model/base'
import xhr from '@/plugin/main'

/**
 * @class
 * @classdesc 举报
 * */
class Report extends Base {
  constructor(data) {
    data = !!data ? data : []
    super(data)

    this.get_list_url = `${process.env.API.FRIENDS}/v1/admin/friends/report`

    this.current_model = Report

    this.cid = data.cid || ''
    this.tel = data.tel || '无'   //  手机号
    this.name = data.username || '无'  //  昵称
    this.gender = data.sex || ''  // 性别
    this.report_time = data.report_time || ''   //  举报时间
    this.report_uid = data.report_uid || ''   //  举报者 uid

    let s = xhr.get_query('user', 'report', 'zh')

    this.report_name = data.report_name || decodeURI(decodeURI(s)) || ''

    let sex = {
      1: '男',
      2: '女'
    }
    this.gender_name = data.gender_name || sex[parseInt(this.gender)] || '无'

    this.userdetail_href = this.report_uid ? `${process.env.URL.USER}/#/user/use/detail?id=${this.report_uid}` : ''

    this.pkeysearch = {
      tel: '',
      datetimerange: [],
      user: '',
      sex: ''
    }

    this.sessionkey_search = 'reportfriends'
    this.$storeList = 'FriendsReportFriends'

    this.config = {
      search: true,
      notools: true
    }

  }

  /**
   * @function
   * @description 获取列表所需要传的参数 */
  setGetListParam () {
    return {
      cid: this.cid
    }
  }
}

export default Report
