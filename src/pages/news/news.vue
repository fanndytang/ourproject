<template>
  <div>
    <rs-list :page_title="'资讯文章'" :model="model" :form_self_btn="true" :column="column">
      <template slot="search">
        <el-form-item label="文章标题" prop="title">
          <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.title"  placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="category_code" v-if="has_category_rights">
          <rs-cascader v-model="model.pkeysearch.category_code"
                       v-if="categoryList && categoryList[model.web_language] && categoryList[model.web_language].length > 0"
                       @change="model.search()"
                       :options="categoryList[model.web_language]"
                       :prop="{label: 'name', value: 'code', children: 'sons'}">
           <!-- <template slot-scope="c" slot="cascader">
              <el-cascader expand-trigger="hover" placeholder="试试搜索：新闻" filterable change-on-select
                           v-model="model.pkeysearch.code"
                           :options="categoryList[model.web_language]"
                           :props="{label: 'name', value: 'code', children: 'sons'}"
                           @change="c.change">
              </el-cascader>
            </template>-->
          </rs-cascader>
        </el-form-item>
        <el-form-item label="所属专题" prop="sid" v-if="has_sub_rights">
          <select-scroll
            @change="model.search()"
            :model="subject"
            v-model="model.pkeysearch.sid"
            :search="{value: `${model.sessionkey_search}-pkeysearch-sid`, label: `${model.sessionkey_search}-pkeysearch-sid_name`}"
            :prop="{label: 'title', value: 'sid'}"></select-scroll>
        </el-form-item>
      </template>
      <template slot-scope="p" slot="table-tool">
        <span v-if="p.item.downarticle && p.item.can_downart" class="table-tool" @click="close(p.item, 1)">下架</span>
        <span v-if="p.item.downarticle && p.item.can_openart" class="table-tool" @click="close(p.item, 2)">上架</span>
      </template>
      <template slot-scope="p" slot="form-item">
        <el-form-item label="文章标题" prop="title" :rules="{required: true, message: '请填写文章标题', trigger: 'blur'}">
          <el-input v-model="p.item.title"  placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="category.code" v-if="has_category_rights" :rules="{required: true, type: 'array', message: '请选择文章分类', trigger: 'change'}">
          <rs-cascader>
            <template slot-scope="c" slot="cascader">
              <el-cascader expand-trigger="hover" placeholder="试试搜索：新闻" filterable change-on-select
                           v-model="p.item.category.code"
                           :options="categoryList[model.web_language]"
                           :props="{label: 'name', value: 'code', children: 'sons'}"
                           @change="c.change">
              </el-cascader>
            </template>
          </rs-cascader>
        </el-form-item>
        <el-form-item label="简介" prop="summary">
          <el-input type="textarea" :rows="3" v-model="p.item.summary" placeholder="请输入文章简介"></el-input>
        </el-form-item>
        <el-form-item label="封面图" prop="cover_fid" :rules="{required: true, message: '请上传封面图', trigger: 'blur'}">
          <upload-img v-model="p.item.cover_fid" :url="p.item.cover_pic"></upload-img>
        </el-form-item>
        <el-form-item label="内容" class="rs-editor" prop="content" :rules="{required: true, validator: checkContent, trigger: 'blur'}">
          <rs-editor v-model="p.item.content" :sha="'news'" :id="`newscon${Math.ceil(Math.random()*10000)}`" :detail="true"></rs-editor>
        </el-form-item>
        <el-form-item label="所属专题" prop="subject_sid" v-if="has_sub_rights">
          <select-scroll :model="subject" v-model="p.item.subject_sid" :lang="model.web_language" :prop="{label: 'title', value: 'sid'}"></select-scroll>
        </el-form-item>
        <el-form-item label="作者" prop="author" :rules="{required: true, message: '请填写作者', trigger: 'blur'}">
          <el-input v-model="p.item.author" placeholder="请输入文章作者"></el-input>
        </el-form-item>
        <el-form-item label="来源" prop="source">
          <el-input v-model="p.item.source"  placeholder="请输入来源"></el-input>
        </el-form-item>
        <el-form-item label="浏览量" prop="pv">
          <span class="form-label-tip">(9位数字以内)</span>
          <el-input v-model="p.item.pv" :maxlength="9"  placeholder="请输入浏览量"></el-input>
        </el-form-item>
        <el-form-item label="点赞量" prop="like_num">
          <span class="form-label-tip">(9位数字以内)</span>
          <el-input :maxlength="9" v-model="p.item.like_num" placeholder="请输入点赞量"></el-input>
        </el-form-item>
        <el-form-item label="SEO">
          <el-input placeholder="请输入内容" v-model="p.item.seo_title">
            <template slot="prepend">title</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="p.item.seo_keywords" style="margin: 8px 0;">
            <template slot="prepend">keywords</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="p.item.seo_description">
            <template slot="prepend">description</template>
          </el-input>
        </el-form-item>

        <el-form-item style="position:absolute;bottom:0;left:0;">
          <button class="btn btn-primary" type="button" @click="sub(p.item, 0, p.edit)">草稿</button>
          <button class="btn btn-primary" type="button" @click="sub(p.item, 1, p.edit)">发布</button>
        </el-form-item>
      </template>
    </rs-list>
    <div class="rs-dialog" v-show="showdialog">
      <div class="dialog-pane" v-loading="loading" element-loading-text="提交中">
        <h1 class="dialog-title">提示</h1>
        <div class="dialog-body">
          确定要{{currentItem.close === 1 ? '下架' : '上架'}} <span style="color: teal;margin-top: 10px;">{{currentItem.title}}</span>文章吗？
        </div>
        <div class="dialog-foot">
          <button class="btn btn-sm" type="button" @click="showdialog=false">取消</button>
          <button class="btn btn-primary btn-sm" type="button" @click="downArticle()">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import News from '@/model/news/news'
  import Subject from '@/model/news/subject'
  import Category from '@/model/news/category'
  /** @vue */
  export default {
    data() {
      return {
        has_category_rights: false,
        has_sub_rights: false,
        loading: false,
        column: [
          {prop: 'title', label: '文章标题', type: 'a', a_href: 'list_detail_href', modaltext: true},
          {prop: 'category', label: '文章分类', deep: 'name', width: 130},
          {prop: 'subject_title', label: '所属专题', type: 'a', a_href: 'subject_href'},
          {prop: 'comment_num_show', label: '评论数', type: 'a', a_href: 'comment_href', width: 70},
          {prop: 'collection_num_show', label: '收藏数', type: 'a', a_href: 'collect_href', width: 70},
          {prop: 'like_num_show', label: '点赞数', type: 'a', a_href: 'praise_href', width: 70},
          {prop: 'author', label: '作者', width: 150},
          {prop: 'publish_time', label: '发布时间', type: 'date', width:150},
          {prop: 'recommend_name', label: '推荐状态', width: 100},
          {prop: 'status_name', label: '状态', width: 100}
        ],
        model: new News({search_sid: this.$xhr.get_query('sid', 'news/list')}),
        subject: new Subject(),
        categoryList: {
          'zh-cn': [],
          'zh-hk': [],
          'en-us': [],
          'fr-fr': [],
          'de-de': []
        },
        showdialog: false,
        currentItem: {}  //  点击下架文章时选中的文章
      }
    },
    watch: {
      'model.web_language' (val) {
        this.getCategoryList(new Category({model_type: 'cascader', web_language: val}))
      }
    },
    mounted () {
      let rights = localStorage.getItem('admin_rights_list')
      if(rights) rights = JSON.parse(rights)
      this.has_category_rights = rights && rights.news && rights.news[`v1,news,admin,category,get`]
      this.has_sub_rights = rights && rights.news && rights.news[`v1,news,admin,subject,get`]

      this.getCategoryList(new Category({model_type: 'cascader', web_language: this.model.web_language}))
    },
    methods: {
      /** 检查文章内容 */
      checkContent(rule, value, callback) {
        let flag = value.indexOf('id="my-frame-text"></div>')
        if (value === '' || flag !== -1) {
          callback(new Error('请输入文章内容'))
        } else {
          callback()
        }
      },
      /** 获取分类 */
      getCategoryList(model) {
        if(this.has_category_rights) {
          let that = this
          model.model_type = 'cascader'
          that.$store.dispatch('getList', {
            lang: model.web_language || 'zh-cn',
            p: 1,
            model: model,
            callback(res) {
              that.categoryList[model.web_language] = that.$store.state[model.$storeList][model.web_language] || []
            }
          })
        }
      },
      /** 提交表单 */
      sub (item, status, edit) {
        item.publish_status = status
        this.$root.eventHub.$emit('sub-form', {
          data: item,
          edit: !!edit
        })
      },
      /** 下架文章 */
      close (item, status) {
        this.currentItem = item
        this.showdialog = true
        this.currentItem.close = status
      },
      downArticle() {
        let that = this
        that.loading = true
        that.currentItem.afterSend = res => {
          that.showdialog = false
          that.loading = false
          that.$root.eventHub.$emit('form-success-tab', res)
        }
        that.currentItem.afterError = res => {
          that.loading = false
          that.$message.error(res.msg || that.currentItem.close === 1 ? '文章下架失败' : that.currentItem.close === 2 ? '文章上架失败' : '')
        }
        that.currentItem.delete_one()
      }
    }
  }
</script>

<style lang="less" scoped>
  .link {
    white-space: nowrap;
    font-size:12px;
    margin-right:5px;
  }
</style>
