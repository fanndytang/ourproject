<template>
  <rs-detail :model="model" :title="'换戴记录详情'" :column="column"></rs-detail>
</template>

<script>
  import Log from '@/model/vip/log'
  /** @vue */
  export default {
    data () {
      return {
        model: new Log({
          get_detail_data: {
            bill_sn: this.$xhr.get_query('id', 'vip/log/detail')
          }
        }),
        column: [
          {prop: 'bill_sn', label: '订单号'},
          {prop: 'tel', label: '换戴用户', type: 'a', a_href: 'tel_href'},
          {prop: 'out_title', label: '换戴产品'},
          {prop: 'in_title', label: '还回产品'},
          {prop: 'change_time', label: '换戴日期', type: 'date'},
          {prop: 'handler_time', label: '操作时间', type: 'date'},
          {prop: 'handler_uid', label: '操作者'},
          {prop: 'remark', label: '备注'},
        ]
      }
    }
  }
</script>
