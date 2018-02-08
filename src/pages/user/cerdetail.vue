<template>
  <rs-detail :model="model" :title="'实名认证详情'" :column="column"></rs-detail>
</template>

<script>
  import Certificate from '@/model/user/certificate'
  /** @vue */
  export default {
    data () {
      return {
        model: new Certificate({
          get_detail_data: {
            uid: this.$xhr.get_query('id', 'user/cerdetail')
          }
        }),
        column: [
          {prop: 'realname', label: '认证姓名'},
          {prop: 'id_number', label: '认证号码'},
          {prop: 'front_pic', label: '认证照片正面', type: 'img'},
          {prop: 'back_pic', label: '认证照片反面', type: 'img'},
          {prop: 'id_kind_name', label: '认证类型'},
          {prop: 'tel', label: '认证用户', type: 'a', a_href: 'user_href'},
          {prop: 'create_time', label: '申请认证时间', type: 'date'},
          {prop: 'audit_status_name', label: '认证状态'},
          {prop: 'audit_time', label: '操作时间', type: 'date'},
          {prop: 'audit_user', label: '操作用户'}
        ]
      }
    }
  }
</script>
