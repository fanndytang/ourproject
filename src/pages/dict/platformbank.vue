<template>
  <rs-list :page_title="'平台账户'" :model="model" :column="column">
    <template slot-scope="p" slot="form-item">
      <el-form-item label="开户名称" prop="name" :rules="{ required: true, message: '请输入开户名称', trigger: 'blur' }">
        <el-input v-model="p.item.name"  placeholder="请输入开户名称"></el-input>
      </el-form-item>
      <el-form-item label="开户银行" prop="bank" :rules="{ required: true, message: '请输入开户银行', trigger: 'blur' }">
        <el-input v-model="p.item.bank" placeholder="请输入开户银行"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="number" :rules="{ required: true, message: '请输入账号', trigger: 'blur' }">
        <el-input v-model="p.item.number" placeholder="请输入账号"></el-input>
      </el-form-item>
    </template>
  </rs-list>
</template>
<script>
  import Platform from '@/model/dict/platform'
  /** @vue */
  export default {
    data() {
      return {
        column: [
          {prop: 'name', label: '开户名称'},
          {prop: 'bank', label: '开户银行'},
          {prop: 'number', label: '账号'}
        ],
        model: new Platform()
      }
    }
  }
</script>
