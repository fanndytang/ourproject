import base from '@/model/base'

/**
 * @class
 * @classdesc 关注*/
class Focus extends base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)

    this.current_model = Focus
    this.get_list_url = `${process.env.API.FRIENDS}/v1/admin/friends/attentionlist`

    this.uid = data.user_uid || data.uid || ''
    this.tel = data.tel || ''  //  手机号
    this.name = data.username || '无'  // 昵称
    this.gender = data.sex || ''  //  性别
    this.status = parseInt(data.status) === 0 ? 0 : data.status || ''  //  状态
    this.focus_time = data.attention_time || ''   //  关注时间
    this.other_uid = data.other_uid || ''  //  关注者的uid

    let sex = {
      0: '女',
      1: '男'
    }
    let text = {
      0: '已取消关注',
      1: '已关注',
      2: '已相互关注'
    }
    this.status_name = data.status_name || text[parseInt(this.status)] || '无'
    this.gender_name = data.sex_name || sex[parseInt(this.gender)] || '无'

    this.userdetail_href = this.other_uid ? `${process.env.URL.USER}/#/user/use/detail?id=${this.other_uid}` : ''


    /**
     * 关键词搜索
     * */
    this.pkeysearch = {
      tel: '',
      datetimerange: [],
      user: '',
      sex: '',
      status: ''
    }

    this.sessionkey_search = 'userfocus'

    this.config = {
      search: true,
      notools: true  //  没有操作栏
    }
    this.$storeList = 'UserFocus'
  }

  setGetListParam () {
    return {
      uid: this.uid
    }
  }
}

export default Focus
