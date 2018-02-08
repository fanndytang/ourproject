<template>
  <rs-list :page_title="'动态管理'" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="发布用户" prop="commentuser">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.commentuser"  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" prop="datetimerange">
        <el-date-picker style="width:220px;" @change="model.search()" v-model="model.pkeysearch.datetimerange" type="datetimerange" placeholder="选择时间范围" align="right"></el-date-picker>
      </el-form-item>
      <el-form-item label="审核状态" prop="audit_status">
        <el-select v-model="model.pkeysearch.audit_status" @change="model.search()">
          <el-option value="0" label="未审核"></el-option>
          <el-option value="1" label="审核通过"></el-option>
          <el-option value="2" label="审核失败"></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template slot-scope="p" slot="table-tool">
      <span class="table-tool" v-if="!p.item.is_del&&p.item.can_check" @click="$root.eventHub.$emit('add-tab',{item: p.item, tab_name: '审核动态', slot_name: 'check', edit: true})">审核</span>
    </template>
    <template slot-scope="p" slot="check">
      <el-form :model="p.item" :ref="`form${p.index}`" label-width="100px" v-loading="loading" element-loading-text="提交中">
        <span style="display:none;">{{  p.item.audit_status = p.item.audit_status === 0 ? 1 : p.item.audit_status }}</span>
        <el-form-item label="动态类型"> {{ p.item.kind_name }}  </el-form-item>
        <el-form-item label="动态内容" style="width: 220%">
          <preview-img :url="p.item.file_pic" v-if="p.item.kind==1"></preview-img>
          <video controls="controls" webkit-playsinline v-if="p.item.kind==2" style="max-height: 500px;">
            <source :src="p.item.file_pic" type="video/mp4">
          </video>
        </el-form-item>
        <el-form-item label="动态文字"> {{ p.item.content ? p.item.content : '无' }} </el-form-item>
        <el-form-item label="发布状态" prop="audit_status">
          <el-radio-group v-model="p.item.audit_status">
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="2">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发布用户"> {{ p.item.user }} </el-form-item>
        <el-form-item label="发布时间"> {{ p.item.publish_time | formateDate }} </el-form-item>
        <el-form-item label="浏览量">
          <el-input v-model="p.item.pv" placeholder="请输入浏览量" :maxlength="9"></el-input>
        </el-form-item>
        <el-form-item label="审核结果" prop="audit_result" :rules="{required: p.item.audit_status === 2, message: '请输入审核失败的原因', trigger: 'blur'}">
          <span class="form-label-tip">（100字以内）</span>
          <el-input v-model="p.item.audit_result" :maxlength="100" type="textarea" :rows="3" placeholder="如果审核失败，请输入审核失败的原因"></el-input>
        </el-form-item>
        <el-form-item>
          <button type="button" class="btn btn-primary" @click="check($refs[`form${p.index}`], p.item)">提交</button>
        </el-form-item>
      </el-form>
    </template>
  </rs-list>
</template>
<script>
  import Social from '@/model/friends/social'
  /** @vue */
  export default {
    data() {
      return {
        column: [
          {prop: 'kind_name', label: '类型'},
          {prop: 'list_show_pic', label: '动态内容',
            video_src: 'file_pic',
            type: (data) => {return data.kind === 2 ? 'video' : 'img'}, imgarr: true, max_height: '30px', width: '125px'},
          {prop: 'summary', label: '动态文字', type: 'html', width: '200px'},
          {prop: 'user', label: '发布用户'},
          {prop: 'publish_time', label: '发布时间', type: 'date'},
          {prop: 'comment_num', label: '评论数', type: 'a', a_href: 'comment_href'},
          {prop: 'like_num', label: '点赞数', type: 'a', a_href: 'like_href'},
          {prop: 'collection_num', label: '收藏数', type: 'a', a_href: 'collection_href'},
          {prop: 'report_num', label: '被举报次数', type: 'a', a_href: 'report_num_href'},
          {prop: 'audit_status_name', label: '审核状态'}
        ],
        model: new Social(),
        loading: false
      }
    },
    methods: {
      check(form, item) {
        let that = this
        if(!!form) {
          form.validate((valid) => {
            if (!valid)  return false
            that.loading = true
            item.check({
              success (res) {
                that.$root.eventHub.$emit('form-success-tab', res)
                that.loading = false
              },
              error(res) {
                that.$message.error(res.msg || '提交失败')
                that.loading = false
              }
            })
          })
        }
      }
    }
  }
</script>
