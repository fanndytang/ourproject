<template>
  <rs-list :page_title="'收藏管理'" :model="model" :column="column">
    <template slot="search" slot-scope="p">
      <el-form-item label="用户" prop="commentuser">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.commentuser"  placeholder="请输入用户"></el-input>
      </el-form-item>
      <el-form-item label="文章标题" prop="title">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.title"  placeholder="请输入标题"></el-input>
      </el-form-item>
    </template>
  </rs-list>
</template>

<script>
  import Favorite from '@/model/news/favorite'
  /** @vue */
  export default {
    data() {
      let aid = this.$xhr.get_query('aid', 'news/collect')
      let cid = this.$xhr.get_query('cid', 'news/collect')
      let did = this.$xhr.get_query('did', 'news/collect')

      return {
        column: [
          {prop: 'title', label: '文章标题', type: 'a', a_href: 'title_href', modaltext: true},
          {prop: 'tel', label: '收藏用户', type: 'a', a_href: 'tel_href'},
          {prop: 'create_time', label: '收藏时间', type: 'date'}
        ],
        model: new Favorite({
          type: 'article',
          model_type: 'collect',
          data_id: aid || cid || did || ''
        })
      }
    }
  }
</script>

