<template>
  <rs-list :page_title="'资讯分类'" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="分类名称" prop="title">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.title"  placeholder="请输入分类名称"></el-input>
      </el-form-item>
    </template>
    <template slot-scope="p" slot="form-item">
      <el-form-item label="所属分类" prop="parent.code" v-if="!!p.edit && !!p.item.parent.code_string || !p.edit && model.datalists.data.length > 1">
        <select-scroll :lang="model.web_language" :model="cascader" v-model="p.item.parent.code_string" :prop="{label: 'name', value: 'code'}"></select-scroll>
      </el-form-item>
      <el-form-item label="分类名称" prop="name" :rules="{required: true, message: '请输入分类名称', trigger: 'blur'}">
        <el-input v-model="p.item.name"></el-input>
      </el-form-item>
    </template>
  </rs-list>
</template>

<script>
  import Category from '@/model/news/category'
  /** @vue */
  export default {
    data() {
      return {
        column: [
          {prop: 'name', label: '分类名称'},
          {prop: 'level_name', label: '分类级别'},
          {prop: 'parent', label: '所属分类', deep: 'name'}
        ],
        model: new Category(),
        cascader: new Category({model_type: 'cascader'})
      }
    },
    mounted () {
      this.$root.eventHub.$on('form-success-tab', (res) => {
        this.$store.state['NewsCascaderList'] = {}
      })
    }
  }
</script>
