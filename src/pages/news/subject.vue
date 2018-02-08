<template>
  <rs-list :page_title="'专题管理'" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="专题名称" prop="title">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.title" placeholder="请输入专题名称"></el-input>
      </el-form-item>
      <el-form-item label="专题分类" prop="code" v-if="has_category_rights">
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
    <template slot-scope="p" slot="table-tool">
      <a class="table-tool" v-if="p.item.lookarticles" :href="`${url.NEWS}/#/news/list?sid=${p.item.sid}`">查看专题文章</a>
    </template>
    <template slot-scope="p" slot="form-item">
      <el-form-item label="专题名称" prop="title" :rules="{required:true, message: '请输入专题名称', trigger: 'blur'}">
        <el-input v-model="p.item.title" placeholder="请输入专题名称"></el-input>
      </el-form-item>
      <el-form-item label="主编" prop="editor_uid" :rules="{required:true, message: '请输入主编名称', trigger: 'blur'}">
        <el-input v-model="p.item.editor_uid" placeholder="请输入主编名称"></el-input>
      </el-form-item>
      <el-form-item label="封面图" prop="cover_fid" :rules="{required:true, message: '请上传封面图', trigger: 'blur'}">
        <upload-img v-model="p.item.cover_fid" :url="p.item.cover_pic"></upload-img>
      </el-form-item>
      <el-form-item label="专题分类" prop="category.code" :rules="{required:true, message: '请输入专题分类', trigger: 'blur'}">
        <rs-cascader>
          <template slot-scope="c" slot="cascader">
            <el-cascader expand-trigger="hover" placeholder="试试搜索：新闻" filterable change-on-select
                         v-model="p.item.category.code"
                         :options="categoryList[model.web_language]"
                         :props="{label: 'name', value: 'code', children: 'sons'}"
                         @change="getNews(p.item, c.change)">
            </el-cascader>
          </template>
        </rs-cascader>
      </el-form-item>
      <el-form-item label="专题介绍" prop="description">
        <el-input v-model="p.item.description" type="textarea" :rows="2" placeholder="请输入专题介绍"></el-input>
      </el-form-item>
      <el-form-item label="SEO">
        <el-input placeholder="请输入内容" v-model="p.item.seo_title">
          <template slot="prepend">title</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="p.item.seo_keywords" style="margin: 20px 0;">
          <template slot="prepend">keywords</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="p.item.seo_description">
          <template slot="prepend">description</template>
        </el-input>
      </el-form-item>
      <el-form-item label="专题文章" class="rs-transfer">
        <div class="transfer-panel">
          <div class="p-header">
            <div class="title">资讯列表</div>
            <el-input class="right" placeholder="请输入搜索内容" @change="searchArticle($event, p.item)" size="small" icon="search"></el-input>
          </div>
          <div class="p-body">
            <el-checkbox-group @change="changeCheckAll" v-model="p.item.aid_array" v-if="news_list.all && news_list.all.data">
              <div class="check_list all_list" v-for="item,i in news_list.all.data" :key="i">
                <el-checkbox @change="setSelectNews($event, [news_list.all.data[i]], p.item)" :label="item.aid">{{item.title}}</el-checkbox>
              </div>
            </el-checkbox-group>
            <div v-if="news_list.all.data.length <= 0" class="no-data">暂无数据</div>
          </div>
          <div class="p-footer">
            <el-checkbox v-model="news_list.check_all" @change="checkAll($event, p)">全选</el-checkbox>
            <button class="btn btn-primary btn-sm transfer-footer" type="button" @click="getMore(p.item)">
              <i class="fa fa-refresh" style="margin-right: 5px;"></i>换一批</button>
          </div>
        </div>
        <i class="fa fa-angle-double-right"></i>
        <div class="transfer-panel">
          <div class="p-header">
            <div class="title">专题列表</div>
            <div class="right" v-if="p.item.art_sub_list.data.length > 1">（可拖动排序）</div>
          </div>
          <div class="p-body">
            <rs-draggable v-if="p.item.art_sub_list.data.length > 0" :list="p.item.art_sub_list.data">
              <div v-for="item,i in p.item.art_sub_list.data" :key="i" role="button" class="check_list">
                <div class="check_title">{{item.title}}</div>
                <div class="check_del">
                  <i @click="deleteSelect(p.item, i)" class="fa fa-trash" title="删除"></i></div>
              </div>
            </rs-draggable>
          </div>
          <div class="p-footer"></div>
        </div>
      </el-form-item>
    </template>
  </rs-list>
</template>
<script>
  import Subject from '@/model/news/subject'
  import News from '@/model/news/news'
  import Category from '@/model/news/category'
 // import _ from 'lodash'
  /** @vue */
  export default {
    data () {
      return {
        url: process.env.URL,
        has_category_rights: false,
        column: [
          {prop: 'title', label: '专题名称', modaltext: true},
          {prop: 'cover_pic', label: '封面图', type: 'img'},
          {prop: 'category', label: '专题分类', deep: 'name'},
          {prop: 'create_time', label: '创建时间', type: 'date'}
        ],
        news_list: {
          all: {data: [], current: 1, pages: 1},
          check_all: []
        },
        model: new Subject(),
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
      this.$root.eventHub.$on('add-tab-success', (res) => {
        if(!!res.edit) {
          res.item.article_aid_list = res.originItem.article_aid_list
        }
        res.item.get_subject_news(res.item.art_sub_list)
        res.item.file_id = !!res.item.file_id ? res.item.file_id : res.item.cover_fid
        res.item.query_article_title = ''
        res.item.get_news(this.news_list.all)
      })
    },
    methods: {
      getCategoryList(model) {
        if(this.has_category_rights) {
          let that = this
          model.model_type = 'cascader'
          that.$store.dispatch('getList', {
            lang: model.web_language || 'zh-cn',
            p: 1,
            model: model,
            callback (res) {
              that.categoryList[model.web_language] = that.$store.state[model.$storeList][model.web_language] || []
            }
          })
        }
      },
      getNews: _.debounce(function(item, call) {
        if(typeof call === 'function') call()
        item.query_article_title = ''
        item.get_news(this.news_list.all)
      }, 300),
      deleteSelect (item, i) {
        let aid = item.art_sub_list.data[i].aid
        item.art_sub_list.data.splice(i, 1)
        this.news_list.check_all = false

        if(item.aid_array && item.aid_array.length) {
          for(let i=0, len=item.aid_array.length; i<len; i++) {
            if(item.aid_array[i] == aid) {
              item.aid_array.splice(i, 1)
            }
          }
        }
      },
      changeCheckAll(value) {
        let checkedCount = value.length;
        this.news_list.check_all = checkedCount === this.news_list.all.data.length;
      },
      checkAll (event, props) {
        let check = this.setSelectNews(event, this.news_list.all.data, props.item)
        props.item.aid = event ? check : []

        let d = this.news_list.all.data
        let str = props.item.aid_array || []
        str = str.join(',')
        for(let k in d) {
          let aid = d[k].aid
          if(event) {
            if(str.match(aid) === null) {
              props.item.aid_array.push(aid)
              str = props.item.aid_array.join(',')
            }
          }else {
            if(str.match(aid) !== null) {
              str = str.replace(aid+',', '').replace(aid, '')
              props.item.aid_array = str.split(',')
            }
          }
        }

        this.news_list.check_all = event
      },
      setSelectNews(flag, data, item) {
        let check = []
        let aid = ''
        let has_item = false
        let target = item.art_sub_list.data

        for(let i=0, ilen=data.length; i<ilen; i++) {
          aid = data[i].aid
          has_item = false
          check.push(aid)
          for(let k=0,len=target.length; k<len; k++) {
            if(target[k] && target[k].aid && aid === target[k].aid) {
              if(!flag) {   //  没选中 则删除
                target.splice(k, 1)
              }
              has_item = true
            }
          }
          if(!has_item) {   //  新值  则push
            target.push(data[i])
          }
        }
        return check
      },
      searchArticle: _.debounce(function(val, item) {
        item.query_article_title = val
        item.get_news(this.news_list.all)
      }, 300),
      getMore (item) {
        if(this.news_list.all.current >= this.news_list.all.pages) {
          this.news_list.all.current = 1
        }else {
          this.news_list.all.current ++
        }
        item.get_news(this.news_list.all)
      }
    }
  }
</script>
