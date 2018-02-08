<template>
  <div class="tab-box">
    <ul class="tab-box-title">
      <li v-if="has_watch_right" @click="active = 1" :class="{'active': active == 1}">挑表查账</li>
      <li v-if="has_vip_right" @click="active = 2" :class="{'active': active == 2}">会籍查账</li>
    </ul>
    <div class="tab-pane" v-if="active === 1 && has_watch_right">
      <watch></watch>
    </div>
    <div class="tab-pane" v-if="active === 2 && has_vip_right">
      <vip></vip>
    </div>
  </div>
</template>

<script>
  import watch from './audit-watch.vue'
  import vip from './audit-vip.vue'
  /** @vue */
  export default {
    data () {
      let right = (localStorage.getItem('admin_rights_list') || '').toString()
      if(right) right = JSON.parse(right)
      return {
        active: !!right.market && !!right.market['v2,market,admin,auditaccounts,get'] ? 1 : 2,
        has_watch_right: !!right.market && right.market['v2,market,admin,auditaccounts,get'],
        has_vip_right: !!right.vip && right.vip['v1,vip,admin,audit,get']
      }
    },
    components: {
      watch,
      vip
    }
  }
</script>

