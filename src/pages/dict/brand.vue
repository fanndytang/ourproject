<template>
  <rs-list :page_title="'商品品牌'" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="商品品类" prop="goods_kind_id" v-if="has_kind_rights">
        <select-scroll @change="model.search()" v-model="model.pkeysearch.goods_kind_id" :model="kind" :prop="{label: 'name', value: 'id'}"></select-scroll>
      </el-form-item>
      <el-form-item label="商品品牌" prop="name">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.name"  placeholder="请输入商品品牌"></el-input>
      </el-form-item>
    </template>
    <template slot-scope="p" slot="form-item">
      <el-form-item label="id" v-if="p.edit"> {{ p.item.id }} </el-form-item>
      <el-form-item label="商品品类" prop="goods_kind_id" :rules="{ required: true, message: '请选择商品品类', trigger: 'blur' }" v-if="has_kind_rights">
        <select-scroll :lang="model.web_language" :model="kind" v-model="p.item.goods_kind_id" :prop="{label: 'name', value: 'id'}"></select-scroll>
      </el-form-item>
      <el-form-item label="品牌名称" prop="name" :rules="{ required: true, message: '请输入品牌名称', trigger: 'blur' }">
        <el-input v-model="p.item.name"  placeholder="请输入品牌名称"></el-input>
      </el-form-item>
      <el-form-item label="LOGO" prop="file_id" :rules="{ required: true, message: '请上传品牌LOGO', trigger: 'blur' }">
        <upload-img v-model="p.item.file_id" :url="p.item.pic"></upload-img>
      </el-form-item>
      <el-form-item label="首字母" prop="initial" :rules="{ required: true, message: '请输入首字母', trigger: 'blur' }">
        <el-input type="textarea" v-model="p.item.initial"  placeholder="请输入首字母"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="p.item.remark"  placeholder="请输入品牌备注"></el-input>
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
          {prop: 'name', label: '品牌名称'},
          {prop: 'pic', label: '品牌LOGO', type: 'img'},
          {prop: 'remark', label: '备注'}
        ],
        kind: new Goods({model_type: 'kind'}),
        model: new Goods({'model_type': 'brand'})
      }
    },
    mounted () {
      /**
       * 判断是否有获取商品品类的权限 */
      let rights = localStorage.getItem('admin_rights_list')
      if(rights) rights = JSON.parse(rights)
      this.has_kind_rights = rights && rights.news && rights.dict[`v1,dict,admin,goodskind,get`]

      /** 设置api */
      this.$root.eventHub.$on('add-tab-success', (res) => {
        res.item.model_type = 'brand'
        res.item.setApiUrl()
      })
    }
  }
</script>

