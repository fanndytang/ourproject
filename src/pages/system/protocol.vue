<template>
  <rs-list :page_title="'协议'" :model="model" :form_self_btn="true" :column="column">
    <template slot="search">
      <el-form-item label="标题" prop="title">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.title"  placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="code" v-if="has_category_rights">
        <rs-cascader v-if="categoryList && categoryList[model.web_language] && categoryList[model.web_language].length > 0">
          <template slot-scope="c" slot="cascader">
            <el-cascader expand-trigger="hover" placeholder="试试搜索：新闻" filterable change-on-select
                         v-model="model.pkeysearch.code"
                         :options="categoryList[model.web_language]"
                         :props="{label: 'name', value: 'code', children: 'sons'}"
                         @change="c.change">
            </el-cascader>
          </template>
        </rs-cascader>
    </el-form-item>
    </template>
    <template slot-scope="p" slot="form-item">
      <el-form-item label="协议标题" prop="title" :rules="{ required: true, message: '请输入协议标题', trigger: 'blur' }">
        <el-input v-model="p.item.title"  placeholder="请输入协议标题"></el-input>
      </el-form-item>
      <el-form-item label="协议分类" prop="category.code" :rules="{required: true, message: '请选择协议分类', trigger: 'blur'}">
        <rs-cascader v-if="categoryList && categoryList[model.web_language] && categoryList[model.web_language].length > 0">
          <template slot-scope="c" slot="cascader">
            <el-cascader expand-trigger="hover" filterable change-on-select
                         v-model="p.item.category.code"
                         :options="categoryList[model.web_language]"
                         :props="{label: 'name', value: 'code', children: 'sons'}"
                         @change="c.change">
            </el-cascader>
          </template>
        </rs-cascader>
      </el-form-item>
      <el-form-item  class="rs-editor" label="内容" prop="content" :rules="{ required: true, message: '请输入内容', trigger: 'blur' }">
        <rs-editor v-model="p.item.content" :id="`protocol${Math.ceil(Math.random()*10000)}`"></rs-editor>
      </el-form-item>

      <el-form-item style="position:absolute;bottom:0;left:0;">
        <button type="button" class="btn btn-primary" @click="sub(p.item, 1, !!p.edit)">发布</button>
      </el-form-item>
    </template>
  </rs-list>
</template>

<script>
  import Protocol from '@/model/system/protocol'
  import Category from '@/model/news/category'
  /** @vue */
  export default {
    data() {
      return {
        has_category_rights: false,
        column: [
          {prop: 'title', label: '标题'},
          {prop: 'category', label: '分类', deep: 'name'},
          {prop: 'publish_time', label: '发布时间', type: 'date'}
        ],
        model: new Protocol(),
        category_model: Category,
        changelang: '',
        categoryList: {
          'zh-cn': [],
          'zh-hk': [],
          'en-us': [],
          'fr-fr': [],
          'de-de': []
        }
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

      this.getCategoryList(new Category({model_type: 'cascader', web_language: this.model.web_language}))
      this.$root.eventHub.$on('add-tab', (res) => {
        if(!!res.edit) {
          res.item.get_detail_data = {
            aid: res.item.aid
          }
          res.item.get_detail((d) => {
            res.item.category = d.category
          })
        }
      })
    },
    methods: {
      sub (item, status, edit) {
        item.publish_status = status
        this.$root.eventHub.$emit('sub-form', {
          data: item,
          edit: !!edit
        })
      },
      /**
       * 获取分类
       * */
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
    }
  }
</script>
