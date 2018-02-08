<template>
  <div>
    <rs-list :page_title="'评论管理'" :model="model" :column="column">
      <template slot="search">
        <el-form-item label="文章标题" prop="title">
          <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.title"  placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="评论用户" prop="tel">
          <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.tel"  placeholder="请输入评论用户"></el-input>
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
        <span class="table-tool" v-if="p.item.is_del != 1 && p.item.can_del" size="small" @click="close(p.item)">关闭</span>
      </template>
    </rs-list>

    <div class="rs-dialog" v-show="showdialog">
      <div class="dialog-pane" v-loading="loading" element-loading-text="提交中">
        <h1 class="dialog-title">提示</h1>
        <div class="dialog-body">
          确定要关闭此条评论吗?
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
  import Comment from '@/model/news/comment_1'
  /** @vue */
  export default {
    data() {
      let aid = this.$xhr.get_query('aid', 'news/comment')
      return {
        showdialog: false,
        loading: false,
        currentItem: {},
        column: [
          {prop: 'article_title', label: '文章标题', type: 'a', a_href: 'article_href', modaltext: true},
          {prop: 'comment_content', label: '评论内容', type: 'a', a_href: 'group_discuss_href'},
          {prop: 'tel', label: '评论用户', type: 'a', a_href: 'user_comment_href'},
          {prop: 'comment_time', label: '评论时间', type: 'date'},
          {prop: 'discuss_num', label: '回复数', type: 'a', a_href: 'discuss_href'},
          {prop: 'like_num', label: '点赞数', type: 'a', a_href: 'like_href'},
          {prop: 'is_del_name', label: '状态'}
        ],
        model: new Comment({aid: aid})
      }
    },
    methods: {
      closeComment () {
        let that = this
        that.loading = true
        this.currentItem.close = 1
        this.currentItem.afterSend = res => {
          that.showdialog = false
          that.loading = false
          that.$root.eventHub.$emit('form-success-tab', res)
        }
        that.currentItem.afterError = res => {
          that.$message.error(res.msg || '评论关闭失败')
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

