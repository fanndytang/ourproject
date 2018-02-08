<template>
  <rs-list :page_title="'动态收藏'" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="用户">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.commentuser" placeholder="输入用户"></el-input>
      </el-form-item>
    </template>
  </rs-list>
</template>
<script>
  import Favorite from "@/model/friends/favorite";
  /** @vue */
  export default {
    data() {
      let cid = this.$xhr.get_query('cid', 'friends/collect')

      return {
        model: new Favorite({model_type: 'collect', data_id: cid || ''}),
        column: [
          {prop: 'list_show_pic', label: '动态内容',
            video_src: 'file_pic',
            type: (data) => {return data.kind === 2 ? 'video' : 'img'}, imgarr: true, max_height: '30px', width: '125px'},
          {prop: 'tel', label: '收藏用户', type: 'a', a_href: 'tel_href'},
          {prop: 'create_time', label: '收藏时间', type: 'date'}
        ]
      }
    }
  }
</script>
