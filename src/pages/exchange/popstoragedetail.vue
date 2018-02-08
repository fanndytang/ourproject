<template>
  <rs-detail :model="model" :title="'出库详情'" :column="column"></rs-detail>
</template>

<script>
  import Storage from '@/model/exchange/popstorage'
  /** @vue */
  export default {
    data () {
      return {
        model: new Storage({
          get_detail_data: {
            bill_sn: this.$xhr.get_query('id', 'market/popstorage/detail')
          }
        }),
        column: [
          {prop: 'goods_name', label: '出库产品', type: 'a', a_href: ''},
          {prop: 'brand_name', label: '品牌'},
          {prop: 'kind_name', label: '出库类型'},
          {prop: 'goods_number', label: '出库数量'},
          {prop: 'price_show', label: '商品价格'},
          {prop: 'order_bill_sn', label: '关联订单'},
          {prop: 'pic', label: '实物图', type: 'img', max_height: '30px'},
          {prop: 'name', label: '入库时间'},
          {prop: 'warehouse_name', label: '入库仓库'},
          {prop: 'handler_time', label: '操作日期'},
          {prop: 'handler_name', label: '操作人'},
          {prop: 'remark', label: '备注'},
        ]
      }
    }
  }
</script>
