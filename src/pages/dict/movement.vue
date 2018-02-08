<template>
  <rs-list :page_title="'商品机芯'" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="手表功能" prop="name">
        <el-input v-model="model.pkeysearch.name" @keyup.enter.native="model.search()"  placeholder="请输入手表功能"></el-input>
      </el-form-item>
    </template>
    <template slot-scope="p" slot="form-item">
      <el-form-item label="id" v-if="!!p.edit"> {{ p.item.id }} </el-form-item>
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
        column: [
          {prop: 'name', label: '名称'},
          {prop: 'remark', label: '备注'}
        ],
        model: new Goods({'model_type': 'movement'})
      }
    },
    mounted () {
      this.$root.eventHub.$on('add-tab-success', (res) => {
        res.item.model_type = 'movement'
        res.item.setApiUrl()
      })
    }
  }
</script>
