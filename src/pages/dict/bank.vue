<template>
  <rs-list page_title="银行" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="银行名称" prop="name">
        <el-input v-model="model.pkeysearch.name"  placeholder="请输入银行名称"></el-input>
      </el-form-item>
    </template>
    <template slot-scope="p" slot="form-item">
      <el-form-item label="银行名称" prop="name" :rules="{ required: true, message: '请输入银行名称', trigger: 'blur' }">
        <el-input v-model="p.item.name"  placeholder="请输入银行名称"></el-input>
      </el-form-item>
      <el-form-item label="英文简写" prop="abbreviation" :rules="{ required: true, message: '请输入英文简写', trigger: 'blur' }">
        <el-input v-model="p.item.abbreviation"  placeholder="请输入英文简写"></el-input>
      </el-form-item>
      <el-form-item label="LOGO" prop="file_id" :rules="{ required: true, message: '请上传银行LOGO', trigger: 'blur' }">
        <upload-img v-model="p.item.file_id" :url="p.item.pic"></upload-img>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="p.item.remark" type="textarea"  placeholder="请输入备注"></el-input>
      </el-form-item>
    </template>
  </rs-list>
</template>
<script>
  import Bank from '@/model/dict/bank'
  /** @vue */
  export default {
    data() {
      return {
        column: [
          {prop: 'name', label: '银行名称'},
          {prop: 'pic', label: '银行LOGO', type: 'img'},
          {prop: 'abbreviation', label: '英文简写'},
          {prop: 'remark', label: '备注'}
        ],
        model: new Bank()
      }
    }
  }
</script>
