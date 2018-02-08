import Base from '@/model/base'

/**
 * @class Evaluation
 * @classdesc 鉴定
 * */
class Evaluation extends Base{
  constructor(data) {
    data = !!data ? data : {}
    super(data)
    this.add_url = `${process.env.API.EXCHANGE}/v2/admin/market/certify`
    this.get_list_url = `${process.env.API.EXCHANGE}/v2/admin/market/certify`
    this.get_detail_url = `${process.env.API.EXCHANGE}/v2/admin/market/certifyinfo`
    this.update_url = `${process.env.API.EXCHANGE}/v2/admin/market/certify`
    this.delete_url = `${process.env.API.EXCHANGE}/v2/admin/market/certify`
    this.id = data.id || ''
    this.current_model = Evaluation

    /** 申请类型 */
    this.apply_kind = data.apply_kind || ''    //  申请类型
    /** 申请类型名称  */
    this.apply_kind_name = data.apply_kind_name || ''  //  申请类型名称
    /** 申请日期 */
    this.apply_time = data.apply_time || ''    //  申请日期
    /** 订单编号 */
    this.certify_bill_sn = data.certify_bill_sn || ''                    //  订单编号
    /** 鉴定方式 */
    this.method = data.method || ''                //  鉴定方式
    /** 鉴定方式 */
    this.method_name = data.method_name || ''                //  鉴定方式
    this.report_uid = data.report_uid || ''
    this.report_status = data.report_status || 0
    this.report_time = data.report_time || ''
    this.tel = data.tel || ''
    this.title = data.title || ''
    this.username = data.username || data.tel || ''
    this.report_status_name = data.report_status_name || ''
    if(this.report_status_name === '鉴定不通过') {
      this.report_status_name = '鉴定失败'
    }
    this.report_name = data.report_name || ''
    this.credential_pic = data.credential_pic ? data.credential_pic.split(',') : []
    this.pic = data.pic || ''
    this.file_id = data.fid || data.file_id || ''
    this.fid = data.fid || ''
    this.report_report = data.report_report || ''
    this.remark = data.remark || ''
    this.bill_sn = data.bill_sn || ''
    let report_pic = []
    if(data.report_pic) {
      if(typeof data.report_pic === 'string') {
        report_pic = data.report_pic.split(',')
      }else {
        report_pic = data.report_pic
      }
    }
    this.report_pic = report_pic
    let report_fid = []
    if(data.report_fid) {
      if(typeof data.report_fid === 'string') {
        report_fid = data.report_fid.split(',')
      }else {
        report_fid = data.report_fid
      }
    }
    this.report_fid = report_fid
    this.goods_img = []
    for(let i=0, len=this.report_pic.length; i<len; i++) {
      this.goods_img.push({
        file_id: this.report_fid[i] || '',
        url: this.report_pic[i] || '',
        file_fid: this.report_fid[i] || '',
        name: ''
      })
    }
    if(this.report_status_name === '') {
      let status = {0: '待鉴定', 1: '鉴定通过', 2: '鉴定失败'}
      this.report_status_name = status[this.report_status] || ''
    }
    let text = {1: '实物', 2: '图片'}
    this.method_name_my = this.method ? text[parseInt(this.method)] : ''
    let kindtext = {1: '订单', 2: '个人'}
    this.apply_kind_name_my = this.apply_kind ? kindtext[parseInt(this.apply_kind)] : ''
    this.list_detail_href = `${process.env.URL.EXCHANGE}/#/market/evaluation/detail?id=${this.certify_bill_sn}&bill_sn=${this.bill_sn}`
    /** 关键词搜索 */
    this.pkeysearch = {
      title: '',
      type: '',
      methods: '',
      bill_sn: ''
    }
    /** 关键词搜索标识 */
    this.sessionkey_search = 'exevaluation'
    /** 在vuex中的缓存标识 */
    this.$storeList = 'MarketEvaluationList'
    /** 权限配置 */
    this.config = {
      detail: true,
      search: true
    }
    /** 获取详情页面要传递的参数 */
    this.get_detail_data = data.get_detail_data || {bill_sn: this.certify_bill_sn}
  }

  /**
   * @function
   * @description 审核
   * */
  check (obj) {
    super.baseHttp({
      method: 'put',
      url: `${process.env.API.EXCHANGE}/v2/admin/market/certify`,
      data: {
        bill_sn: this.certify_bill_sn,
        report_uid: this.uid,
        report_status: this.report_status,
        fid: this.file_id ? this.file_id.split(',') : [],
        report_report: this.report_report,
        apply_kind: this.apply_kind,
        remark: this.remark
      },
      httpSuccess: obj.success ? obj.success : '',
      httpError: obj.error ? obj.error : ''
    })
  }
}

export default Evaluation
