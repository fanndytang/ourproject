//  仓库模型

import Base from '@/model/base'
import xhr from '@/plugin/main'

/**
 * @class
 * @classdesc 展厅
 * */
class Hall extends Base {
  constructor(data) {
    data = !!data ? data : {}

    data.add_url = `${process.env.API.SYSTEM}/v1/admin/system/hall`
    data.get_list_url = `${process.env.API.SYSTEM}/v1/admin/system/hall`
    data.update_url = `${process.env.API.SYSTEM}/v1/admin/system/hall`
    data.delete_url = `${process.env.API.SYSTEM}/v1/admin/system/hall`
    data.get_detail_url = `${process.env.API.SYSTEM}/v1/admin/system/hallinfo`

    data.id = data.id || ''
    data.current_model = Hall

    super(data)

    this.code = data.code || ''
    this.prov_id = data.prov_id || ''
    this.city_id = data.city_id || ''
    this.dist_id = data.dist_id || ''
    this.location = data.location || ''
    this.coord = data.coord || ''
    this.tel = data.tel || ''
    this.manager = data.manager || ''
    this.contact = data.contact || ''
    this.cover_fid = data.cover_fid || ''
    this.cover_pic = data.cover_pic || ''
    this.file_fid_list = data.file_fid_list || ''
    this.file_pic = data.file_pic ? (typeof(data.file_pic) === 'string' ? data.file_pic.split(',') : data.file_pic) : []
    this.remark = data.remark || ''

    this.goods_img = []

    this.list_detail_href = `${process.env.URL.SYSTEM}/#/system/hall/detail?id=${this.id}`


  /*  if(this.file_fid_list.length && this.file_pic.length <= 0) {
      for(let i=0, len=this.file_fid_list.length; i<len; i++) {
        this.goods_img.push({
          file_id: this.file_fid_list[i] || '',
          url: this.file_pic[i] || '',
          file_fid: this.file_fid_list[i] || '',
          name: ''
        })
    }
   }
*/
    this.pkeysearch = {
      hall_code: '',
      location: ''
    }
    this.sessionkey_search = 'syshall'


    this.config = {
      add: this.api_rights.system[`v1,system,admin,hall,post`],
      edit: this.api_rights.system[`v1,system,admin,hall,put`],
      del: this.api_rights.system[`v1,system,admin,hall,delete`]
    }

    this.$storeList = 'SysHallList'

  }




  /**
   * @function
   * @description 表单提交时所传参数 */
  setPostParam () {

  /*  let file_id = []
    if(this.goods_img.length) {
      for(let i=0,len=this.goods_img.length; i<len; i++) {
        file_id.push(this.goods_img[i].file_fid)
      }
    }
    file_id = file_id.join(',')*/

    return {
      code: this.code,
      prov_id: this.prov_id,
      city_id: this.city_id,
      dist_id: this.dist_id,
      location: this.location,
      coord: this.coord,
      tel: this.tel,
      manager: this.manager,
      contact: this.contact,
      cover_fid: this.cover_fid,
      file_fid_list: this.file_fid_list,
      remark: this.remark
    }
  }
}

export default Hall
