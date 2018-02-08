<template>
  <rs-list :page_title="'评论点赞'" :model="model" :column="column">
    <template slot="search">
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
  import Favorite from '@/model/friends/favorite'
  /** @vue */
  export default {
    data() {
      let comuser = this.$xhr.get_query('comuser', 'friends/commentpraise')
      return {
        model: new Favorite({model_type: 'praise', comment_user: comuser, data_id: ''}),
        column: [
          {prop: 'list_show_pic', label: '动态内容',
            video_src: 'file_pic',
            type: (data) => {return data.kind === 2 ? 'video' : 'img'}, imgarr: true, max_height: '30px', width: '125px'},
          {prop: 'comment_user', label: '评论用户'},
          {prop: 'tel', label: '点赞用户', type: 'a', a_href: 'tel_href'},
          {prop: 'create_time', label: '点赞时间', type: 'date'}
        ]
      }
    }
  }
</script>
