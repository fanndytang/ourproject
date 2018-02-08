import News from '@/model/news/news'

/**
 * @class
 * @classdesc 活动入口
 * */
class Activity extends News {
  constructor(data) {
    data = !!data ? data : {}

    super(data)

    this.current_model = Activity

    this.get_list_url = `${process.env.API.NEWS}/v1/admin/news/article?name=ACTIVITY`
    this.add_url = `${process.env.API.NEWS}/v1/admin/news/article?name=ACTIVITY`
    this.update_url = `${process.env.API.NEWS}/v1/admin/news/article?name=ACTIVITY`
    this.delete_url = `${process.env.API.NEWS}/v1/admin/news/article?name=ACTIVITY`
    this.get_detail_url = `${process.env.API.NEWS}/v1/admin/news/articleinfo?name=ACTIVITY`

    this.list_detail_href = `${process.env.URL.FRIENDS}/#/friends/activity/detail?id=${this.aid}&lang=${this.web_language}`

    this.sessionkey_search = 'friactivity'

    this.$storeList = 'friactivityList'

    this.update_must_data = 'aid'
  }
}

export default Activity
