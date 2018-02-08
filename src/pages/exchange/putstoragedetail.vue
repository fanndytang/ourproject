<template>
  <rs-detail :model="model" :title="'入库详情'" :column="column"></rs-detail>
</template>

<script>
  import Storage from '@/model/exchange/putstorage'
  /** @vue */
  export default {
    data () {
      return {
        model: new Storage({
          get_detail_data: {
            bill_sn: this.$xhr.get_query('id', 'market/putstorage/detail')
          }
        }),
        column: [
          {prop: 'goods_name', label: '入库产品', type: 'a', a_href: ''},
          {prop: 'brand_name', label: '品牌'},
          {prop: 'source_name', label: '入库类型'},
          {prop: 'goods_number', label: '入库数量'},
          {prop: 'price_show', label: '商品价格'},
          {prop: 'order_bill_sn', label: '关联订单'},
          {prop: 'pic', label: '实物图', type: 'img', imgarr: true, max_height: '30px'},
          {prop: 'warehouse_name', label: '入库仓库'},
          {prop: 'handler_time', label: '入库时间', type: 'date'},
          {prop: 'handler_name', label: '操作人'},
          {prop: 'remark', label: '备注'},
        ]
      }
    }
  }
</script>
