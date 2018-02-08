<template>
  <rs-detail :model="model" :title="'协议详情'" :column="column"></rs-detail>
</template>

<script>
  import Protocol from '@/model/news/news'
  /** @vue */
  export default {
    data () {
      return {
        model: new Protocol({
          get_detail_data: {
            aid: this.$xhr.get_query('id', 'system/protocol/detail'),
            lang: this.$xhr.get_query('lang', 'system/protocol/detail')
          }
        }),
        column: [
          {prop: 'title', label: '标题'},
          {prop: 'category', label: '分类', deep: 'name'},
          {prop: 'publish_time', label: '发布时间', type: 'date'},
          {prop: 'content', label: '协议内容', type: 'html'}
        ]
      }
    }
  }
</script>
