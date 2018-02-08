<template>
  <div>
    <rs-list page_title="活动分类" :column="column" :model="model">
      <template slot="search">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="model.pkeysearch.name" @keyup.enter.native="model.search()" placeholder="请输入"></el-input>
        </el-form-item>
      </template>
      <template slot="table-tool-end" slot-scope="p">
        <a class="table-tool" :href="p.item.activity_href">查看关联活动</a>
      </template>
      <template slot="form-item" slot-scope="p">
        <el-form-item label="分类名称" prop="title" :rules="{required: true, message: '请输入分类名称', trigger: 'blur'}">
          <el-input v-model="p.item.title" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="分类介绍" prop="description">
          <el-input v-model="p.item.description" type="textarea" :rows="5" placeholder="请输入"></el-input>
        </el-form-item>
      </template>
    </rs-list>
  </div>
</template>

<script>
  import Activities from '@/model/system/activities'

  /** @vue  */
  export default {
    data () {
      return {
        model: new Activities(),
        column: [
          {prop: 'title', label: '分类名称'},
          {prop: 'description', label: '分类介绍'}
        ]
      }
    }
  }
</script>
