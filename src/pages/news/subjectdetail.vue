<template>
  <rs-detail :model="model" :title="'专题详情'" :column="column">
    <template slot="detail_article_list" slot-scope="p">
      <ul class="article-list">
        <li v-for="el,i in p.item.data" :key="i"><a :href="`${url}/#/news/list/detail?id=${el.aid}`">{{ el.title }}</a></li>
      </ul>
    </template>
  </rs-detail>
</template>

<script>
  import Subject from '@/model/news/subject'
  /** @vue */
  export default {
    data () {
      return {
        url: process.env.URL.NEWS,
        model: new Subject({
          get_detail_data: {
            sid: this.$xhr.get_query('id', 'news/subject/detail'),
            lang: this.$xhr.get_query('lang', 'news/subject/detail')
          }
        }),
        column: [
          {prop: 'title', label: '专题名称'},
          {prop: 'editor_uid', label: '主编'},
          {prop: 'cover_pic', label: '封面图', type: 'img'},
          {prop: 'category', label: '专题分类', deep: 'name'},
          {prop: 'description', label: '专题介绍'},
          {prop: 'seo_title', label: 'SEO-title'},
          {prop: 'seo_keywords', label: 'SEO-keywords'},
          {prop: 'seo_description', label: 'SEO-description'},
          {prop: 'create_time', label: '创建时间', type: 'date'},
          {prop: 'detail_article_list', label: '文章列表', type: 'slot'},
        ]
      }
    },
    mounted () {
      let that = this
      that.$on('get-detail', (res) => {
        that.model.get_subject_news(res.detail_article_list,'', res.sid)
      })
    }
  }
</script>

<style lang="less" scoped>
  .article-list {
    padding-left: 0;
    margin: 0;
    list-style: none;
    li {
      border-bottom: 1px dotted #ddd;
      line-height: 30px;
      a {
        color: #1d90e6;
        text-decoration: none;
      }
    }
  }
</style>
