<template>
  <rs-list :page_title="'仓库'" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="仓库名称" prop="title">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.title"  placeholder="请输入仓库名称"></el-input>
      </el-form-item>
    </template>
    <template slot-scope="p" slot="form-item">
      <el-form-item label="id" v-if="!!p.edit">{{p.item.id}}</el-form-item>
      <el-form-item label="入库类型" prop="kind" :rules="{required:true, message: '请选择入库类型', trigger: 'blur'}">
        <el-radio-group v-model="p.item.kind">
          <el-radio :label="1">鉴定</el-radio>
          <el-radio :label="2">商品</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="仓库名称" prop="name" :rules="{required:true, message: '请输入仓库名称', trigger: 'blur'}">
        <el-input v-model="p.item.name"></el-input>
      </el-form-item>
      <el-form-item label="仓库所在地址" prop="location" :rules="{required:true, message: '请输入仓库所在地址', trigger: 'blur'}">
        <el-input v-model="p.item.location"></el-input>
      </el-form-item>
      <el-form-item label="仓库管理员" prop="manager" :rules="{required:true, message: '请输入仓库管理员', trigger: 'blur'}">
        <el-input v-model="p.item.manager"></el-input>
      </el-form-item>
      <el-form-item label="启用状态" prop="kind" :rules="{required:true, message: '请选择启用状态', trigger: 'blur'}">
        <el-radio-group v-model="p.item.status">
          <el-radio :label="0">未启用</el-radio>
          <el-radio :label="1">启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <span class="form-label-tip">（100字以内）</span>
        <el-input :rows="3" :maxlength="100" type="textarea" v-model="p.item.remark"></el-input>
      </el-form-item>
    </template>
  </rs-list>
</template>
<script>
  import Ware from '@/model/system/ware'
  /** @vue */
  export default {
    data() {
      return {
        column: [
          {prop: 'kind_name', label: '入库类型'},
          {prop: 'name', label: '仓库名称'},
          {prop: 'location', label: '仓库所在地址'},
          {prop: 'manager', label: '仓库管理员'},
          {prop: 'status_name', label: '启用状态'},
          {prop: 'remark', label: '备注'}
        ],
        model: new Ware()
      }
    }
  }
</script>
