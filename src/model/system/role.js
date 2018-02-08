//  模型

import Base from '@/model/base'

/**
 * @class
 * @classdesc 角色
 * */
class Role extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)

    this.add_url = `${process.env.API.SYSTEM}/v1/admin/system/usergroup`
    this.get_list_url = `${process.env.API.SYSTEM}/v1/admin/system/usergroup`
    this.update_url = `${process.env.API.SYSTEM}/v1/admin/system/usergroup`
    this.delete_url = `${process.env.API.SYSTEM}/v1/admin/system/usergroup`
    this.get_detail_url = `${process.env.API.SYSTEM}/v1/admin/system/usergroup`
    this.current_model = Role

    this.name = data.name || ''   //  用户组名
    this.remark = data.remark || ''   //  备注
    this.rights = data.rights || []  //  权限

    this.rolelist = []  //  权限总列表
    this.sessionkey_search = 'sysrole'
    this.config = {
      add: this.api_rights.system[`v1,system,admin,usergroup,post`] && this.api_rights.system[`v1,system,admin,rightslist,get`],
      edit: this.api_rights.system[`v1,system,admin,usergroup,put`] && this.api_rights.system[`v1,system,admin,rightslist,get`] && this.api_rights.system[`v1,system,admin,groupinfo,get`],
      del: this.api_rights.system[`v1,system,admin,usergroup,delete`]
    }
    this.$storeList = 'SysRoleList'
  }

  /**
   * @function
   * @description 设置选中的权限列表
   * */
  setCheck (list) {
    let checked = []
    for(let key in list) {
      for(let d in list[key].admin) {
        if(list[key].admin[d].all) {
          checked.push(list[key].admin[d].id)
        }
      }
      for(let u in list[key].user) {
        if(list[key].user[u].all) {
          checked.push(list[key].user[u].id)
        }
      }
    }

    return checked
  }

  /**
   * @function
   * @description 表单提交时所传参数 */
  setPostParam() {
    return {
      name: this.name,
      rights: this.rights,
      remark: this.remark
    }
  }

  /**
   *  @function
   *  @description 设置权限组名
   *  */
  setLabel(key) {
    let name = ''
    switch (key) {
      case 'user': name = '用户管理'; break;
      case 'news': name = '资讯管理'; break;
      case 'vip': name = '会籍管理'; break;
      case 'finance': name = '财务管理'; break;
      case 'market': name = '交易管理'; break;
      case 'friends': name = '圈子管理'; break;
      case 'system': name = '系统设置'; break;
      case 'dict': name = '字典管理'; break;
    }


    return name
  }

  /**
   *  @function
   *  @description 通过组名获取 对应的键值
   *  */
  setName(key) {
    let name = ''
    switch (key) {
      case '用户管理': name = 'user'; break;
      case '资讯管理': name = 'news'; break;
      case '会籍管理': name = 'vip'; break;
      case '财务管理': name = 'finance'; break;
      case '交易管理': name = 'market'; break;
      case '圈子管理': name = 'friends'; break;
      case '系统设置': name = 'system'; break;
      case '字典管理': name = 'dict'; break;
    }


    return name
  }

  /**
   * @function
   * @description 获取权限列表
   * */
  getRoleList () {
    let that = this
    let xhr = new this.httpXHR()
    xhr.request.method = 'get'
    xhr.request.url = `${process.env.API.SYSTEM}/v1/admin/system/rightslist`
    xhr.httpSuccess = res => {
      let data = res.data
      let cache = []
      that.rolelist = []
      for(let key in data) {
        let name = that.setLabel(key)
        if(name) {
          let s =  {
            label: name,
            all: false,
            admin_all: false,
            user_all: false,
            user: [],
            admin: []
          }

          /**
           * 重组数据，前台后台权限分开
           * */
          for(let d in data[key].admin) {
            s.admin.push({
              id: data[key].admin[d].id,
              label: data[key].admin[d].name,
              all: false
            })
          }

          for(let u in data[key].user) {
            s.user.push({
              id: data[key].user[u].id,
              label: data[key].user[u].name,
              all: false
            })
          }

          cache.push(s)
        }
      }

      that.rolelist = cache
    }
    xhr.httpRequest()
  }

  /**
   * @function
   * @description 清空已选择的用户组权限
   * */
  clearGroup (model) {
    for(let p in model.rolelist) {
      model.rolelist[p].admin_all = false
      model.rolelist[p].user_all = false
      model.rolelist[p].all =  false

      for(let k in model.rolelist[p].admin) {
        model.rolelist[p].admin[k].all = false
      }
      for(let k in model.rolelist[p].user) {
        model.rolelist[p].user[k].all = false
      }
    }
  }

  /**
   * @function
   * @description 获取当前用户组权限
   * */
  getRoleGroup (model) {
    let that = this
    let xhr = new this.httpXHR()
    xhr.request.method = 'get'
    xhr.request.url = `${process.env.API.SYSTEM}/v1/admin/system/groupinfo`
    xhr.request.params = {
      id: this.id
    }
    xhr.httpSuccess = res => {
      let data = res.data.data    //  返回的已经拥有的权限

      let index = {}

      for(let p in model.rolelist) {
        index[that.setName(model.rolelist[p].label)] = p

        model.rolelist[p].admin_all = false
        model.rolelist[p].user_all = false
        model.rolelist[p].all =  false

        for(let k in model.rolelist[p].admin) {
          model.rolelist[p].admin[k].all = false
        }
        for(let k in model.rolelist[p].user) {
          model.rolelist[p].user[k].all = false
        }
      }

      for(let k in data) {
        let m = model.rolelist[parseInt(index[k])]

        model.rolelist[parseInt(index[k])].admin_all = data[k] && data[k].admin && m.admin.length === data[k].admin.length
        model.rolelist[parseInt(index[k])].user_all = data[k] && data[k].user && m.user.length === data[k].user.length

        model.rolelist[parseInt(index[k])].all =  model.rolelist[parseInt(index[k])].admin_all &&  model.rolelist[parseInt(index[k])].user_all

        for(let d in m.admin) {
          for(let n in data[k].admin) {
            if(data[k].admin[n].id === m.admin[d].id) {
              model.rolelist[parseInt(index[k])].admin[d].all = true
            }
          }
        }

        for(let u in m.user) {
          for(let n in data[k].user) {
            if(data[k].user[n].id === m.user[u].id) {
              model.rolelist[parseInt(index[k])].user[u].all = true
            }
          }
        }
      }
    }
    xhr.httpRequest()
  }


  /**
   * @function
   * @description 获取当前用户组的权限后，不做其它操作
   * */
  getGroupRights (obj) {
    let xhr = new this.httpXHR()
    xhr.request.method = 'get'
    xhr.request.url = `${process.env.API.SYSTEM}/v1/admin/system/groupinfo`
    xhr.request.params = obj.params
    xhr.httpSuccess = res => {
      typeof (obj.success === 'function') ? obj.success(res) : ''
    }
    xhr.httpRequest()
  }
}

export  default  Role
