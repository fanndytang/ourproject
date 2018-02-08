<template>
  <rs-list :model="user" :column="column" page_title="用户">
    <template slot="search">
      <el-form-item label="手机号" prop="tel" style="margin-left:-42px;">
        <el-input @keyup.enter.native="user.search()" v-model="user.pkeysearch.tel"  placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="注册时间" prop="datetimerange">
        <el-date-picker @change="user.search()" v-model="user.pkeysearch.datetimerange"
                        type="daterange" placeholder="选择时间范围"></el-date-picker>
      </el-form-item>
    </template>
    <template slot="form-item" slot-scope="p">
      <el-form-item label="手机号">{{ p.item.tel }}</el-form-item>
      <el-form-item label="昵称">{{ p.item.username || '无' }} </el-form-item>
      <el-form-item label="性别">{{ (isNaN(p.item.sex) ? p.item.sex : p.item.sex_name) || '无' }} </el-form-item>
      <el-form-item label="出生日期">{{ p.item.birthday || '无' }} </el-form-item>
      <el-form-item prop="group_id" label="用户组" :rules="{required: true, message: '请选择用户组', trigger: 'blur'}">
        <select-scroll :model="groupModel" v-model="p.item.group_id" :prop="{label: 'name', value: 'id'}"></select-scroll>
      </el-form-item>
    <!--  <el-form-item prop="is_auth" label="实名认证状态" :rules="{required: true, message: '请选择认证状态', trigger: 'blur'}">
        <el-radio-group v-model="p.item.is_auth">
          <el-radio :label="1">认证成功</el-radio>
          <el-radio :label="2">认证失败</el-radio>
        </el-radio-group>
      </el-form-item>-->
    </template>
  </rs-list>
</template>

<script>
  import User from '@/model/user/user'
  import Role from '@/model/system/role'
  /** @vue */
  export default {
    data() {
      return {
        user: new User(),
        groupModel: new Role(),
        column: [
          {prop: 'tel', label: '手机号'},
          {prop: 'username', label: '昵称'},
          {prop: 'sex', label: '性别'},
          {prop: 'birthday', label: '出生日期'},
          {prop: 'reg_time', label: '注册时间', type: 'date'},
          {prop: 'country', label: '国家'},
          {prop: 'terminal_name', label: '注册端口'},
          {prop: 'user_group_name', label: '用户组'}
        ]
      }
    }
  }
</script>
