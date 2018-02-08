<template>
  <rs-detail
    :use_model="model"
    :title="'展厅详情'"
    :init_model_data="init_data"
    :column="column"></rs-detail>
</template>

<script>
  import hall from '@/model/system/hall'
  /** @vue */
  export default {
    data () {
      return {
        model: hall,
        init_data: {
          get_detail_data: {
            id: this.$xhr.get_query('id', 'system/hall/detail')
          }
        },
        column: [
          {prop: 'code', label: '展厅编号'},
          {prop: 'location', label: '展厅所在地址'},
          {prop: 'coord', label: '坐标'},
          {prop: 'manager', label: '展厅负责人'},
          {prop: 'contact', label: '展厅联系人'},
          {prop: 'cover_pic', label: '展厅门店图', type: 'img'},
          {prop: 'file_pic', label: '展厅详情图', type: 'img'},
          {prop: 'tel', label: '电话'},
          {prop: 'remark', label: '备注'}
        ]
      }
    }
  }
</script>
