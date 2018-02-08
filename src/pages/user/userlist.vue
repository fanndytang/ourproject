<template>
  <div class="tab-box">
    <ul class="tab-box-title">
      <li v-if="has_web_right" @click="active = 1" :class="{'active': active == 1}">前端用户</li>
      <li v-if="has_system_right" @click="active = 2" :class="{'active': active == 2}">后端用户</li>
    </ul>

    <div class="tab-pane" v-if="active == 1 && has_web_right">
      <user></user>
    </div>
    <div class="tab-pane"  v-if="active == 2 && has_system_right">
      <admin></admin>
    </div>
  </div>
</template>

<script>
  import user from './user.vue'
  import admin from './admin.vue'
  /** @vue */
  export default {
    data() {
      let right = (localStorage.getItem('admin_rights_list') || '').toString()
      if(right) right = JSON.parse(right)
      return {
        active: !!right.user && !!right.user['v1,user,admin,userlist,get'] ? 1 : 2,
        has_web_right: !!right.user && right.user['v1,user,admin,userlist,get'],
        has_system_right: !!right.user && right.user['v1,user,admin,userlist,get']   //  是否有系统设置权限(可以查看后台用户）
      }
    },
    components: {
      user,
      admin
    }
  }
</script>
