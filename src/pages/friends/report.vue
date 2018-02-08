<template>
  <rs-list :page_title="'举报对象列表'" :column="column" :model="model">
    <template slot="search">
      <el-form-item label="手机号" prop="tel">
        <el-input v-model="model.pkeysearch.tel" @keyup.enter.native="model.search()" placeholder="输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="举报时间" prop="datetimerange">
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
    </template>
  </rs-list>
</template>

<script>
  import Report from '@/model/friends/report'
  /** @vue */
  export default {
    data () {
      return  {
        model: new Report({'cid': this.$xhr.get_query('id', 'friends/report') || ''}),
        column: [
          {prop: 'report_name', label: '发布用户'},
          {prop: 'tel', label: '举报用户手机号'},
          {prop: 'name', label: '举报者用户名', type: 'a', a_href: 'userdetail_href'},
          {prop: 'gender_name', label: '性别'},
          {prop: 'report_time', label: '举报时间', type: 'date'}
        ]
      }
    }
  }
</script>
