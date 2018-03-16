/**
 * @class
 * @classdesc 获取列表 */
class RsList {
  constructor(data) {
    data = data || {}

    this.model = data.model
    this.data = data.data || []
    this.current = data.current || 1
    this.pages = data.pages || 1
    this.totals = data.totals || 1
    this.loading = data.loading || false
  }

  /**
   * @function
   * @description 获取列表 */
  getList() {
    this.data = []

    /** 关键词搜索的参数 */
    this.search()

    for(let i=0;i<10;i++) {
      this.data.push(new this.model.useModel({
        id: Math.floor(Math.random() * 10),
        title: (Math.floor(Math.random() * 10)).toString() + 'testtest'
      }))
    }
    this.data.splice(1, 1, new this.model.useModel({
      id: Math.floor(Math.random() * 10),
      title: 'aggageagdgddsdgdf旦暮 蚕茧画画东走西顾魂牵梦萦f',
      test: 'agsagasgdagdaghrhahr'
    }))

    //this.data = [this.data[0]]

  }

  /**
   * @function
   * @description 关键词搜索（查询） */
  search() {
    if(this.model && this.model.rsSearch) {
      let key
      for(let k in this.model.rsSearch) {
        key = `${this.model.$unique}-rsSearch-${k}`
        if(sessionStorage.getItem(key)) {
          this.model.rsSearch[k] = sessionStorage.getItem(key)
        }
      }
    }
  }
}

//export default RsList
