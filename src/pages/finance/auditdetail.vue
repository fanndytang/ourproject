<template>
  <rs-detail :model="model" :title="'挑表查账详情'" :column="column"></rs-detail>
</template>

<script>
  import Order from '@/model/exchange/order'
  /** @vue */
  export default {
    data () {
      return {
        model: new Order({
          get_detail_data: {
            bill_sn: this.$xhr.get_query('id', 'finance/audit/detail')
          }
        }),
        column: [
          {prop: 'bill_sn', label: '订单编号'},
          {prop: 'title', label: '商品名称', type: 'a', a_url: 'id', a_path: `${process.env.URL.EXCHANGE}/#/selldetail?id=`},
          {prop: 'cover_pic', label: '商品封面图', type: 'img'},
          {prop: 'details', label: '商品描述'},
          {prop: 'tel', label: '下单用户', type: 'a', a_url: 'id', a_path: `${process.env.URL.USER}/#/userdetail?id=`},
          {prop: 'order_time', label: '下单时间', type: 'date'},
          {prop: 'original_price', label: '产品原价'},
          {prop: 'price', label: '订单金额'},
          {prop: 'order_stage_name', label: '订单状态'},
          {prop: 'receiver', label: '收货方'},
          {prop: 'receiver_tel', label: '收货方联系方式'},
          {prop: 'delivery_method_name', label: '配送方式'},
          {prop: 'delivery_stage_name', label: '配送状态'},
          {prop: 'address', label: '配送地址'},
          {prop: 'pay_method_name', label: '支付方式'},
          {prop: 'pay_pic', label: '支付凭证', type: 'img'},
          {prop: 'pay_time', label: '支付时间', type: 'date'},
          {prop: 'audit_time', label: '操作时间', type: 'date'},
          {prop: 'handler_user', label: '操作人'},
        ]
      }
    }
  }
</script>

