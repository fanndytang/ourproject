<template>
  <div style="width:35%;padding-bottom:30px;">
    <h1 style="font-weight:bold;margin: 0;padding:20px;font-size:18px;">修改个人密码</h1>
    <el-form :model="model" ref="updateform" label-width="120px" v-loading="loading" element-loading-text="提交中">
      <el-form-item prop="username" label="用户名">{{ model.username }}</el-form-item>
      <el-form-item prop="password" label="旧密码" :rules="{required: true, message: '请输入旧密码', trigger: 'blur'}">
        <el-input v-model="model.password" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item prop="new_password" label="新密码" :rules="{required: true, validator: checkPassword, trigger: 'blur'}">
        <el-input v-model="model.new_password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <button class="btn btn-primary" type="button" @click="updatePWD()">确定</button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Adminuser from '@/model/user/adminuser'
  /** @vue */
  export default {
    data () {
      return {
        loading: false,
        model: new Adminuser({
          username: localStorage.getItem('admin_username')
        })
      }
    },
    methods: {
      /** 验证密码 */
      checkPassword(rule, value, callback) {
        if(!value) {
          callback(new Error('请输入新密码'))
        }else if(value.indexOf(' ') !== -1){
          callback(new Error('密码请不要包含空格'))
        }else {
          callback()
        }
      },
      /** 更新密码，提交表单 */
      updatePWD () {
        let that = this
        that.$refs['updateform'].validate((valid) => {
          if (!valid)  return false
          that.loading = true
          that.model.updatePWD({
            success (res) {
              that.loading = false
              that.$message.success('修改成功,请重新登录')
              setTimeout(() => {
                location.href = `${process.env.URL.ADMIN}/#/`
              }, 2000)
            },
            error(res) {
              that.$message.error(res.msg || '修改失败，请刷新重试')
              that.loading = false
            }
          })
        })
      }
    }
  }
</script>
