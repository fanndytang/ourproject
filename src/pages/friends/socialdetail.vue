<template>
  <rs-detail :model="model" :title="'动态详情'" :column="column"></rs-detail>
</template>

<script>
  import Social from '@/model/friends/social'
  /** @vue */
  export default {
    data () {
      return {
        model: new Social({
          get_detail_data: {
            cid: this.$xhr.get_query('id', 'friends/social/detail')
          }
        }),
        column: [
          {prop: 'kind_name', label: '类型'},
          {prop: 'file_pic', label: '动态内容', type: (data) => {return data.kind === 2 ? 'video' : 'img'}, max_height: '30px'},
          {prop: 'content', label: '动态文字'},
          {prop: 'publish_status_name', label: '发布状态'},
          {prop: 'user', label: '发布用户'},
          {prop: 'publish_time', label: '发布时间', type: 'date'},
          {prop: 'comment_num', label: '评论数', type: 'a', a_href: 'comment_href'},
          {prop: 'like_num', label: '点赞数', type: 'a', a_href: 'like_href'},
          {prop: 'collection_num', label: '收藏数', type: 'a', a_href: 'collection_href'},
          {prop: 'audit_user', label: '审核人'},
          {prop: 'audit_status_name', label: '状态'},
          {prop: 'audit_result_show', label: '审核结果'}
        ]
      }
    }
  }
</script>
