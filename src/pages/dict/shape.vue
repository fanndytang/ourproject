<template>
  <rs-list :page_title="'表盘形状'" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="商品品类" prop="goods_kind_id" v-if="has_kind_rights">
        <select-scroll @change="model.search()" :model="kind" v-model="model.pkeysearch.goods_kind_id" :prop="{label: 'name', value: 'id'}"></select-scroll>
      </el-form-item>
      <el-form-item label="表盘形状" prop="name">
        <el-input v-model="model.pkeysearch.name" @keyup.enter.native="model.search()"  placeholder="请输入表盘形状"></el-input>
      </el-form-item>
    </template>
    <template slot-scope="p" slot="form-item">
      <el-form-item label="id" v-if="!!p.edit"> {{ p.item.id }} </el-form-item>
      <el-form-item label="商品品类" prop="goods_kind_id" :rules="{required: true, message: '请选择商品品类', trigger: 'blur' }" v-if="has_kind_rights">
        <select-scroll :lang="model.web_language" :model="kind" v-model="p.item.goods_kind_id" :prop="{label: 'name', value: 'id'}"></select-scroll>
      </el-form-item>
      <el-form-item label="名称" prop="name" :rules="{ required: true, message: '请输入名称', trigger: 'blur' }">
        <el-input v-model="p.item.name"  placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="p.item.remark" type="textarea" placeholder="请输入备注"></el-input>
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
        column: [
          {prop: 'goods_kind_name', label: '商品品类'},
          {prop: 'name', label: '名称'},
          {prop: 'remark', label: '备注'}
        ],
        kind: new Goods({model_type: 'kind'}),
        model: new Goods({model_type: 'shape'})
      }
    },
    mounted() {
      let rights = localStorage.getItem('admin_rights_list')
      if(rights) rights = JSON.parse(rights)
      this.has_kind_rights = rights && rights.news && rights.dict[`v1,dict,admin,goodskind,get`]

      this.$root.eventHub.$on('add-tab-success', (res) => {
        res.item.model_type = 'shape'
        res.item.setApiUrl()
      })
    }
  }
</script>

