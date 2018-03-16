<template>
  <div class="p-404">
    <div class="text"><span class="title">404</span>页面找不到了~~~</div>
    <button class="btn btn-sm btn-primary" type="button" @click="back()">
      <span class="fa fa-reply"></span>返回上一页
    </button>
  </div>
</template>

<script>
  export default {
    methods: {
      back() {
        history.go(-2)
      }
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .p-404 {
    background: #fff;
    height: 100vh;
    text-align: center;
    color: #30a5ff;
  }
  .title {
    margin-top: 100px;
    font-size: 68px;
    font-weight: bold;
  }
  .text {
    padding: 100px 0;
  }
  .fa {
    margin-right: 5px;
  }
</style>
