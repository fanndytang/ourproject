<template>
  <rs-detail :model="model" :title="'资讯详情'" :column="column"></rs-detail>
</template>

<script>
  import News from '@/model/news/news'
  /** @vue */
  export default {
    data () {
      return {
        model: new News({
          get_detail_data: {
            aid: this.$xhr.get_query('id', 'news/list/detail'),
            lang: this.$xhr.get_query('lang', 'news/list/detail')
          }
        }),
        column: [
          {prop: 'title', label: '文章标题'},
          {prop: 'category', label: '文章分类', deep: 'name', width: 100},
          {prop: 'subject_title', label: '所属专题', type: 'a', a_href: 'subject_href'},
          {prop: 'summary', label: '简介'},
          {prop: 'cover_pic', label: '封面图', type: 'img'},
          {prop: 'comment_num', label: '评论数', type: 'a', a_href: 'comment_href', width: 100},
          {prop: 'collection_num', label: '收藏数', type: 'a', a_href: 'collect_href', width: 100},
          {prop: 'like_num', label: '点赞数', type: 'a', a_href: 'praise_href', width: 100},
          {prop: 'author', label: '作者', width: 150},
          {prop: 'source', label: '来源'},
          {prop: 'publish_time', label: '发布时间', type: 'date'},
          {prop: 'recommend_name', label: '推荐状态', width: 100},
          {prop: 'content', label: '文章内容', type: 'html'},
        ]
      }
    }
  }
</script>
