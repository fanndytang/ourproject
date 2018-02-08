<template>
  <rs-detail :model="model" :title="'会籍查账详情'" :column="column"></rs-detail>
</template>

<script>
  import Order from '@/model/vip/order'
  /** @vue */
  export default {
    data () {
      return {
        model: new Order({
          get_detail_data: {
            bill_sn: this.$xhr.get_query('id', 'finance/vip/detail')
          }
        }),
        column: [
          {prop: 'bill_sn', label: '订单号'},
          {prop: 'name', label: '订单标题'},
          {prop: 'code_name', label: '会籍等级'},
          {prop: 'icon_pic', label: '会籍图标', type: 'img'},
          {prop: 'logo_pic', label: '会籍LOGO', type: 'img'},
          {prop: 'order_stage_name', label: '订单状态'},
          {prop: 'tel', label: '下单用户'},
          {prop: 'money', label: '价格'},
          {prop: 'order_time', label: '下单时间', type: 'date'},
          {prop: 'pay_time', label: '支付时间', type: 'date'},
          {prop: 'pay_method_name', label: '支付方式'},
          {prop: 'pay_pic', label: '支付凭证', type: 'img'},
          {prop: 'handler_user', label: '操作人'},
          {prop: 'audit_time', label: '操作时间', type: 'date'},
        ]
      }
    }
  }
</script>

