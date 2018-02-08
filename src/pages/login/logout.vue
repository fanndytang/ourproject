<template>
  <div></div>
</template>
<script>
  import Login from '@/model/login'
  /** @vue */
  export default {
    mounted () {
      new Login().loginout()
    }
  }
</script>
