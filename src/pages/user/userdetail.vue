<template>
  <rs-detail :model="model" :title="'用户详情'" :column="column"></rs-detail>
</template>

<script>
  import User from '@/model/user/user'
  /** @vue */
  export default {
    data () {
      return {
        model: new User({
          get_detail_data: {
            uid: this.$xhr.get_query('id', 'user/use/detail')
          }
        }),
        column: [
          {prop: 'avatar_pic', label: '用户头像', type: 'img', max_height: '50px'},
          {prop: 'username', label: '用户名'},
          {prop: 'tel', label: '手机号'},
          {prop: 'sex_name', label: '性别'},
          {prop: 'birthday', label: '出生日期', type: 'date'},
          {prop: 'reg_time', label: '注册时间', type: 'date'},
          {prop: 'is_auth_name', label: '是否认证'},
          {prop: 'auth_time', label: '认证时间', type: 'date'},
          {prop: 'terminal_name', label: '注册终端'},
          {prop: 'focus_num', label: '关注总数', type: 'a', a_href: 'focus_href'},
          {prop: 'fans_num', label: '粉丝总数', type: 'a', a_href: 'fans_href'},
          {prop: 'black_num', label: '黑名单总数'},
          {prop: 'blacked_num', label: '被拉黑总数'},
          {prop: 'visited_num', label: '访客总量'},
          {prop: 'user_group_name', label: '用户组'}
        ]
      }
    }
  }
</script>
