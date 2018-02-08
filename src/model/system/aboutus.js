//  关于我们  模型

import Base from '@/model/base'

/**
 * @class
 * @classdesc 关于我们
 * */
class AboutUs extends Base {
  constructor(data) {
    data = !!data ? data : {}

    data.add_url = `${process.env.API.SYSTEM}/v1/admin/system/aboutus`
    data.get_list_url = `${process.env.API.SYSTEM}/v1/admin/system/aboutus`
    data.update_url = `${process.env.API.SYSTEM}/v1/admin/system/aboutus`
    data.delete_url = `${process.env.API.SYSTEM}/v1/admin/system/aboutus`
    data.get_detail_url = `${process.env.API.SYSTEM}/v1/admin/system/aboutusinfo`


    //   data.id = data.id || ''
    data.current_model = AboutUs

    super(data)


    this.coord = data.coord || ''                         //  公司地址坐标
    this.cover_fid = data.cover_fid || ''                 //  封面图
    this.cover_pic = data.cover_pic || ''                 //  封面图
    this.file_id = data.file_id || this.cover_fid || ''  //  封面图
    this.tel = data.tel || ''                             //  公司联系电话
    this.title = data.title || ''                         //  标题
    this.content = data.content || ''                     //  内容
    this.address = data.address || ''                     //  公司地址
    this.create_time = data.create_time || ''             //  创建时间
    this.update_time = data.update_time || ''             //  操作时间
    this.update_uid = data.update_uid || ''               //  操作用户

    this.content_show = data.content ? this.sethtml(data.content) : ''


    if(this.content !== '') {
      this.content = this.sethtml(this.content)
    }

    this.list_detail_href = `${process.env.URL.SYSTEM}/#/system/aboutus/detail?id=${this.id}`
    this.pkeysearch = {
      title: ''
    }

    this.sessionkey_search = 'sysabout'

    this.config = {
      add: this.api_rights.system[`v1,system,admin,aboutus,post`],
      edit: this.api_rights.system[`v1,system,admin,aboutus,put`],
      del: this.api_rights.system[`v1,system,admin,aboutus,delete`],
      language: true
    }

    this.$storeList = 'SysAboutList'
  //  this.update_must_data
    this.get_detail_data = data.get_detail_data || {id: this.id}
  }

  /**
   * @function
   * @description 设置表单发送时传递参数
   * */
  setPostParam () {

  //  this.content = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"> <title></title> </head><body id="editor-body-my">'+this.content+ '</body></html>'


    return {
    //  coord: this.coord,
   //   cover_fid: this.file_id,
    //  tel: this.tel,
    //  title: this.title,
      content: this.content,
    //  address: this.address
    }
  }
}

export default AboutUs
