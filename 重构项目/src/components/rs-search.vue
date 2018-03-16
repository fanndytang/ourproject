<!-- 列表搜索  监听 rs-list-search 事件，开始搜索 -->
<template>
  <form>
    <div class="slot">
      <slot></slot>
    </div>

    <button class="btn btn-primary btn-sm" type="button" @click="search()">查询</button>
    <button class="btn btn-sm" type="reset" @click="reset()">重置</button>
  </form>
</template>

<script>
  export default {
    props: {
      model: Object
    },
    watch: {
      /** 监听筛选词的变化，更新列表 */
      'model.rsSearch': {
        handler (val, oldVal) {
          this.search()
        },
        deep: true
      }
    },
    methods: {
      /** 查询时，存储筛选值 */
      search() {
        for(let k in this.model.rsSearch) {
          sessionStorage.setItem(`${this.model.$unique}-rsSearch-${k}`, this.model.rsSearch[k])
        }
        this.$root.eventHub.$emit('rs-get-list', this.model)
      },
      /** 重置时，移除筛选值 */
      reset() {
        for(let k in this.model.rsSearch) {
          sessionStorage.removeItem(`${this.model.$unique}-rsSearch-${k}`)
        }
        this.$root.eventHub.$emit('rs-get-list', this.model)
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .slot {
    display: inline-block;
    margin-right: 10px;
  }
</style>
