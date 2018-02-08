<template>
  <rs-list :page_title="'粉丝列表'" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="手机号" prop="tel">
        <el-input v-model="model.pkeysearch.tel" @keyup.enter.native="model.search()" placeholder="输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="关注日期" prop="datetimerange">
        <el-date-picker @change="model.search()" v-model="model.pkeysearch.datetimerange"
                        type="daterange" placeholder="选择时间范围"></el-date-picker>
      </el-form-item>
      <el-form-item label="昵称" prop="user">
        <el-input v-model="model.pkeysearch.user" @keyup.enter.native="model.search()" placeholder="输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="model.pkeysearch.sex" @change="model.search()">
          <el-option label="全部" value=""></el-option>
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="model.pkeysearch.status" @change="model.search()">
          <el-option label="全部" value=""></el-option>
          <el-option label="已关注" value="1"></el-option>
          <el-option label="已取消关注" value="0"></el-option>
         <!-- <el-option label="已相互关注" value="2"></el-option>-->
        </el-select>
      </el-form-item>
    </template>
  </rs-list>
</template>

<script>
  import Fans from '@/model/user/fans'
  /** @vue */
  export default {
    data () {
      return {
        model: new Fans({'uid': this.$xhr.get_query('id', 'user/fans') || ''}),
        column: [
          {prop: 'tel', label: '手机号'},
          {prop: 'name', label: '昵称', type: 'a', a_href: 'userdetail_href'},
          {prop: 'gender_name', label: '性别'},
          {prop: 'status_name', label: '状态'},
          {prop: 'focus_time', label: '关注时间', type: 'date'},
        ]
      }
    }
  }
</script>
