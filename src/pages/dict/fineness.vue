<template>
  <rs-list :page_title="'商品成色'" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="商品品类" prop="goods_kind_id" v-if="has_kind_rights">
        <select-scroll @change="model.search()" v-model="model.pkeysearch.goods_kind_id" :model="kind" :prop="{label: 'name', value: 'id'}"></select-scroll>
      </el-form-item>
      <el-form-item label="商品成色" prop="name">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.name"  placeholder="请输入商品成色"></el-input>
      </el-form-item>
    </template>
    <template slot-scope="p" slot="form-item">
      <el-form-item label="id" v-if="!!p.edit"> {{ p.item.id }} </el-form-item>
      <el-form-item label="商品品类" prop="goods_kind_id" :rules="{ required: true, message: '请选择商品品类', trigger: 'blur' }" v-if="has_kind_rights">
        <select-scroll :lang="model.web_language" :model="kind" v-model="p.item.goods_kind_id" :prop="{label: 'name', value: 'id'}"></select-scroll>
      </el-form-item>
      <el-form-item label="名称" prop="name" :rules="{ required: true, message: '请输入名称', trigger: 'blur' }">
        <el-input v-model="p.item.name"  placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="终端" prop="is_platform">
        <el-radio-group v-model="details_type">
          <el-radio :label="0">PC端</el-radio>
          <el-radio :label="1">移动端</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="买家保障" prop="pc_details" class="rs-editor" v-show="details_type === 0">
        <rs-editor v-model="p.item.pc_details" :id="`pc_details${Math.ceil(Math.random()*10000)}`"></rs-editor>
      </el-form-item>
      <el-form-item label="买家保障" prop="app_details" class="rs-editor" v-show="details_type === 1">
        <rs-editor v-model="p.item.app_details" :id="`app_details${Math.ceil(Math.random()*10000)}`"></rs-editor>
      </el-form-item>
    </template>
  </rs-list>
</template>

<script>
  import Goods from '@/model/dict/goods'
  /** @vue */
  export default {
    data() {
      return {
        has_kind_rights: false,
        details_type: 0,
        column: [
          {prop: 'goods_kind_name', label: '商品品类'},
          {prop: 'name', label: '名称'},
          {prop: 'pc_details', label: 'PC端买家保障', type: 'article', width: 400},
          {prop: 'app_details', label: '移动端买家保障', type: 'article',  width: 400}
        ],
        kind: new Goods({model_type: 'kind'}),
        model: new Goods({'model_type': 'fineness'})
      }
    },
    mounted() {
      let rights = localStorage.getItem('admin_rights_list')
      if(rights) rights = JSON.parse(rights)
      this.has_kind_rights = rights && rights.news && rights.dict[`v1,dict,admin,goodskind,get`]

      this.$root.eventHub.$on('add-tab-success', (res) => {
        res.item.model_type = 'fineness'
        res.item.setApiUrl()
      })
    }
  }
</script>
