<template>
  <rs-detail :model="model" :title="'会籍等级详情'" :column="column"></rs-detail>
</template>

<script>
  import Kind from '@/model/vip/kind'
  /** @vue */
  export default {
    data () {
      return {
        model: new Kind({
          get_detail_data: {
            code: this.$xhr.get_query('id', 'vip/kind/detail'),
            lang: this.$xhr.get_query('lang', 'vip/kind/detail'),
            is_pc: this.$xhr.get_query('is_pc', 'vip/kind/detail')
          }
        }),
        column: [
          {prop: 'name', label: '会籍名称'},
          {prop: 'code_name', label: '会籍等级'},
          {prop: 'icon_pic', label: '图标', type: 'img'},
          {prop: 'logo_pic', label: 'LOGO', type: 'img'},
          {prop: 'money_name', label: '价格'},
          {prop: 'description', label: '会籍描述', type: 'html'},
          {prop: 'remark', label: '备注'}
        ]
      }
    }
  }
</script>
