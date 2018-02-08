<template>
  <rs-detail :model="model" :title="'关于我们详情'" :column="column"></rs-detail>
</template>

<script>
  import About from '@/model/system/aboutus'
  /** @vue */
  export default {
    data () {
      return {
        model: new About({
          get_detail_data: {
            id: this.$xhr.get_query('id', 'system/aboutus/detail')
          }
        }),
        column: [
          {prop: 'title', label: '公司名称'},
          {prop: 'cover_pic', label: '封面图', type: 'img'},
          {prop: 'tel', label: '联系电话'},
          {prop: 'address', label: '公司地址'},
          {prop: 'coord', label: '坐标'},
          {prop: 'content', label: '公司介绍', type: 'html'},
          {prop: 'create_time', label: '创建时间', type: 'date'},
          {prop: 'update_time', label: '操作时间', type: 'date'},
          {prop: 'update_uid', label: '操作人'}
        ]
      }
    }
  }
</script>
