<template>
  <rs-list :page_title="'用户'" :model="admin" :column="column">
    <template slot="form-item" slot-scope="p">
      <el-form-item prop="username" label="用户名" :rules="{required: true, validator: checkUsername, trigger: 'blur'}">
        <el-input :disabled="p.edit"  v-model="p.item.username" placeholder="请输入用户名,用户名请不要包含中文"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码" :rules="{required: true, validator: checkPassword, trigger: 'blur'}">
        <el-input v-model="p.item.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="group_id" label="分组" :rules="{required: true, message: '请选择分组', trigger: 'blur'}">
        <select-scroll :model="groupModel" v-model="p.item.group_id" :prop="{label: 'name', value: 'id'}"></select-scroll>
      </el-form-item>
    </template>
  </rs-list>
</template>

<script>
  import Admin from '@/model/user/adminuser'
  import Role from '@/model/system/role'
  /** @vue */
  export default {
    data() {
      return {
        admin: new Admin(),
        groupModel: new Role(),
        column: [
          {prop: 'username', label: '用户名'},
          {prop: 'user_group_name', label: '用户组'},
          {prop: 'reg_time', label: '添加时间', type: 'date'}
        ]
      }
    },
    methods: {
      /** 验证用户名 */
      checkUsername (rule, value, callback) {
        let reg = new RegExp("[\\u4E00-\\u9FFF]+","g")
        if(!value) {
          callback(new Error('请输入用户名'))
        }else if(reg.test(value)){
          callback(new Error('用户名请不要包含中文'))
        }else {
          callback()
        }
      },
      /** 验证密码 */
      checkPassword(rule, value, callback) {
        if(!value) {
          callback(new Error('请输入密码'))
        }else if(value.indexOf(' ') !== -1){
          callback(new Error('密码请不要包含空格'))
        }else {
          callback()
        }
      }
    }
  }
</script>
