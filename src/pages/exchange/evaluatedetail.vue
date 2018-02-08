<template>
  <rs-detail :model="model" :title="'鉴定商品详情'" :column="column">
    <template slot="bill_sn">{{$xhr.get_query('bill_sn', 'market/evaluation/detail')}}</template>
  </rs-detail>
</template>

<script>
  import Evaluation from '@/model/exchange/evaluation'
  /** @vue */
  export default {
    data () {
      return {
        model: new Evaluation({
          get_detail_data: {
            bill_sn: this.$xhr.get_query('id', 'market/evaluation/detail')
          }
        }),
        column: [
          {prop: 'remark', label: '鉴定描述'},
          {prop: 'credential_pic', label: '鉴定图片', type: 'img'},
          {prop: 'bill_sn', label: '订单号', type: 'slot'},
          {prop: 'tel', label: '鉴定用户'},
          {prop: 'method_name_my', label: '鉴定方式'},
          {prop: 'apply_kind_name_my', label: '申请类型'},
          {prop: 'report_status_name', label: '鉴定状态'},
          {prop: 'report_report', label: '鉴定结果'},
          {prop: 'apply_time', label: '申请日期', type: 'date'},
          {prop: 'report_time', label: '操作日期', type: 'date'},
          {prop: 'report_name', label: '操作人'}
        ]
      }
    }
  }
</script>
