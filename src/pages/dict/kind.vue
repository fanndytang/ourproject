<template>
  <rs-list :page_title="'商品品类'" :model="model" :column="column">
    <template slot-scope="p" slot="form-item">
      <el-form-item label="id" prop="id" v-if="!!p.edit"> {{ p.item.id }} </el-form-item>
      <el-form-item label="商品品类" prop="name" :rules="{ required: true, message: '请选择商品品类', trigger: 'blur' }">
        <el-input v-model="p.item.name" placeholder="请选择商品品类"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <span class="form-label-tip">（100字以内）</span>
        <el-input v-model="p.item.remark" :maxlength="100" :rows="3" type="textarea" placeholder="请输入商品备注"></el-input>
      </el-form-item>
    </template>
  </rs-list>
</template>
<script>
  import Kind from '@/model/dict/goods'
  /** @vue */
  export default {
    data() {
      return {
        column: [
          {prop: 'name', label: '名称'},
          {prop: 'remark', label: '备注'}
        ],
        model: new Kind({'model_type': 'kind'})
      }
    },
    mounted () {
      this.$root.eventHub.$on('add-tab-success', (res) => {
        res.item.model_type = 'kind'
        res.item.setApiUrl()
      })
    }
  }
</script>
