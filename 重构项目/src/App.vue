<template>
  <div id="app">
    <rs-aside class="aside" v-if="!onlyContent"></rs-aside>
    <div class="right">
      <rs-header v-if="!onlyContent"></rs-header>
      <router-view class="content" :style="contentStyle" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      onlyContent: false,
      contentStyle: ''
    }
  },
  mounted () {
    this.init(this.$route)
  },
  watch: {
    '$route'(val) {
      this.init(val)
    }
  },
  methods: {
    init (route) {
      /** 设置title，判断是否是登录页面，且小屏幕时默认隐藏菜单 */
      document.title = route.name || '瑞时会全球购'
      let href_use = route.path.replace(/\?.*/, '')
      this.onlyContent = href_use.match('login') !== null || href_use.match('404') !== null
      /** js 辅助调整content 高度 */
      this.setHeight()
    },
    setHeight() {
      /** js 辅助调整content 高度 */
      if(this.onlyContent) {
        this.contentStyle = 'margin: 0;height:100vh;width:100vw;'
      }else {
        this.contentStyle = `height: ${(window.innerHeight - 60)+'px' || 'auto'}`
      }
    }
  }
}
</script>

<style lang="less" scoped>
  #app {
    color: #2c3e50;
    background-color: #ecf0f5;
    height: 100vh;
    width: 100vw;
    display: flex;
    overflow: hidden;
    .right {
      flex: 1;
    }
    .content {
      margin: 10px;
      overflow: auto;
      background: #fff;
      height: calc(100vh - 60px);
    }
  }
</style>
