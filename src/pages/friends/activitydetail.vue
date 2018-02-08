<template>
  <rs-detail :model="model" :title="'活动详情'" :column="column"></rs-detail>
</template>

<script>
  import Activity from '@/model/friends/activity'
  /** @vue */
  export default {
    data () {
      return {
        model: new Activity({
          get_detail_data: {
            aid: this.$xhr.get_query('id', 'friends/activity/detail'),
            lang: this.$xhr.get_query('lang', 'friends/activity/detail')
          }
        }),
        column: [
          {prop: 'title', label: '活动标题'},
          {prop: 'category', label: '活动分类', deep: 'name', width: 100},
          {prop: 'cover_pic', label: '封面图', type: 'img'},
          {prop: 'summary', label: '简介'},
          {prop: 'author', label: '作者', width: 150},
          {prop: 'publish_time', label: '发布时间', type: 'date'},
          {prop: 'status_name', label: '状态', width: 100},
          {prop: 'content', label: '活动内容', type: 'html'}
        ]
      }
    }
  }
</script>
