<template>
  <div>
    <rs-list :page_title="'评论回复'" :model="model" :column="column">
      <template slot="search">
        <el-form-item label="评论用户" prop="user">
          <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.user"  placeholder="请输入评论用户"></el-input>
        </el-form-item>
        <el-form-item label="评论时间" prop="datetimerange">
          <el-date-picker
            @change="model.search()"
            v-model="model.pkeysearch.datetimerange"
            type="daterange"
            placeholder="选择时间范围"
            align="right">
          </el-date-picker>
        </el-form-item>
      </template>
      <template slot-scope="p" slot="table-tool">
        <span class="table-tool" @click="close(p.item)" v-if="p.item.is_del != 1 && p.item.can_close">关闭</span>
      </template>
    </rs-list>
    <div class="rs-dialog" v-show="showdialog">
      <div class="dialog-pane" v-loading="loading" element-loading-text="提交中">
        <h1 class="dialog-title">提示</h1>
        <div class="dialog-body">
          该评论及相关的回复信息将会不展示，确认关闭吗？
        </div>
        <div class="dialog-foot">
          <button class="btn btn-sm" type="button" @click="showdialog=false">取消</button>
          <button class="btn btn-primary btn-sm" type="button" @click="closeComment()">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Comment from '@/model/friends/comment_2'
  /** @vue */
  export default {
    data() {
      let ccid = this.$xhr.get_query('ccid', 'friends/commentreplay')
      let first = this.$xhr.get_query('first', 'friends/commentreplay')
      let kind = this.$xhr.get_query('kind', 'friends/commentreplay')
      let file = this.$xhr.get_query('file', 'friends/commentreplay')

      sessionStorage.setItem('circle-first-content', decodeURI(first))
      sessionStorage.setItem('circle-kind', kind)
      sessionStorage.setItem('circle-file-pic', file)
      return {
        showdialog: false,
        loading: false,
        currentItem: {},
        column: [
          {prop: 'list_show_pic', label: '动态内容',
            video_src: 'file_pic',
            type: (data) => {return data.kind === 2 ? 'video' : 'img'}, imgarr: true, max_height: '30px', width: '125px'},
          {prop: 'comment_content', label: '评论内容', type: 'a', a_href: 'discuss_href'},
          {prop: 'target_username', label: '评论用户', type: 'a', a_href: 'user_target_href'},
          {prop: 'comment_time', label: '评论时间', type: 'date'},
          {prop: 'content', label: '回复内容'},
          {prop: 'tel', label: '回复者', type: 'a', a_href: 'user_comment_href'},
          {prop: 'create_time', label: '回复时间', type: 'date'},
          {prop: 'is_del_name', label: '状态'}
        ],
        model: new Comment({ccid: ccid}),
        init_data: {ccid: ccid}
      }
    },
    methods: {
      closeComment() {
        let that = this
        this.loading = true
        this.currentItem.close = 1
        this.currentItem.afterSend = res => {
          that.showdialog = false
          that.loading = false
          that.$root.eventHub.$emit('form-success-tab', res)
        }
        this.currentItem.afterError = res => {
          that.loading = false
        }
        this.currentItem.delete_one()
      },
      close(item) {
        this.currentItem = item
        this.showdialog = true
      }
    }
  }
</script>

