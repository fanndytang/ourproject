<template>
  <rs-list :page_title="'评论点赞'" :model="model" :column="column">
    <template slot="search" slot-scope="p">
      <el-form-item label="文章标题" prop="title">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.title"  placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="评论用户" prop="commentuser">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.commentuser"  placeholder="请输入评论用户"></el-input>
      </el-form-item>
      <el-form-item label="点赞用户" prop="priseuser">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.priseuser"  placeholder="请输入标题"></el-input>
      </el-form-item>
    </template>
  </rs-list>
</template>

<script>
  import Favorite from '@/model/news/favorite'
  /** @vue */
  export default {
    data() {
      let aid = this.$xhr.get_query('aid', 'news/commentpraise')
      let cid = this.$xhr.get_query('cid', 'news/commentpraise')
      let did = this.$xhr.get_query('did', 'news/commentpraise')

      return {
        column: [
          {prop: 'title', label: '文章标题', type: 'a', a_href: 'title_href', modaltext: true},
          {prop: 'comment_user', label: '评论用户', type: 'a', a_href: 'comment_user_href'},
          {prop: 'tel', label: '点赞用户', type: 'a', a_href: 'tel_href'},
          {prop: 'create_time', label: '点赞时间', type: 'date'},
        ],
        model: new Favorite({
          type: 'article_comment',
          model_type: 'like',      //  collect:收藏  like: 点赞
          data_id: aid || cid || did || ''
        })
      }
    }
  }
</script>

