<template>
  <rs-detail :model="model" :title="'换戴产品详情'" :column="column">
  </rs-detail>
</template>

<script>
  import Market from '@/model/vip/market'
  /** @vue */
  export default {
    data () {
      return {
        model: new Market({
          get_detail_data: {
            gid: this.$xhr.get_query('id', 'vip/market/detail'),
            lang: this.$xhr.get_query('lang', 'vip/market/detail')
          }
        }),
        column: [
          {prop: 'title', label: '商品名称'},
          {prop: 'cover_pic', label: '封面图'},
          {prop: 'code_name', label: '换戴等级'},
          {prop: 'level_name', label: '等级名称'},
          {prop: 'hall_name', label: '体验厅所在地'},
          {prop: 'hall_code', label: '体验厅编号'},
          {prop: 'publish_status_name', label: '状态'},
          {prop: 'brand_name', label: '品牌'},
          {prop: 'original_price', label: '原价'},
          {prop: 'market_price', label: '售价'},
          {prop: 'movement_name', label: '机芯类型'},
          {prop: 'material_name', label: '表壳材质'},
          {prop: 'shape_name', label: '表盘形状'},
          {prop: 'function_name', label: '复杂功能'},
          {prop: 'fineness_name', label: '成色'},
          {prop: 'gender_name', label: '性别'},
          {prop: 'diameter_name', label: '表盘直径'},
          {prop: 'file_fid', label: '商品图片', type: 'img'},
          {prop: 'details', label: '详情描述'},
          {prop: 'publish_time', label: '发布时间', type: 'date'},
          {prop: 'username', label: '发布人'},
        ]
      }
    }
  }
</script>
