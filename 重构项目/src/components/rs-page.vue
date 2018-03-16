<!-- 分页： 只有一页时，不显示页码 -->
<template>
  <div class="rs-page" v-if="pages > 1">
    <!-- 上一页 -->
    <b :class="`item fa fa-chevron-left ${active === 1 ? 'disabled' : ''}`" @click="selectPage(active - 1)"></b>

    <!-- 页码 -->
    <b v-for="item,i in pages" :key="i" v-show="setPage(item)" @click="selectPage(item)"
       :class="`item ${item===active ? 'active' : ''}`">{{ setPage(item) }}</b>

    <!-- 下一页 -->
    <b :class="`item fa fa-chevron-right ${active === pages ? 'disabled' : ''}`" @click="selectPage(active + 1)"></b>
  </div>
</template>

<script>
  export default {
    props: {
      pages: Number,                                        //  总共有多少页
      current: Number                                       //  当前激活的页码(传入)
    },
    data () {
      return {
        active: 1                                           //  当前激活的页码
      }
    },
    watch: {
      'current' () {
        if(!isNaN(parseInt(this.current))) {
          this.active = this.current
        }
      }
    },
    mounted () {
      if(!isNaN(parseInt(this.current))) {
        this.active = this.current
      }
    },
    methods: {
      /** 设置页码显示状态 */
      setPage(val) {
        let num = 8                                          //  如果页码小于等于8时，不省略显示
        let p = this.pages
        let a = this.active

        if(p < num || val===1 || val===p) return val         //  页码小于num，不判断省略 || 第一页与最后一页始终显示

        let c1 = a<=5 && val<7                               //  active在前5页时，前6页始终显示
        let c2 = a>=p-4 && val>p-6                           //  active在后5页时，后6页始终显示
        let c3 = a>5 && a<p-4 && val>a-3 && val<a+3          //  active在前5页与后5页之间，则active左右各显示2个页码
        if(c1 || c2 || c3) { return val }

        let c4 = a<=5 && val===7                             //  active在前5页时，第7页显示省略号
        let c5 = a>=p-4 && val===p-6                         //  active在后5页时，倒数第7页显示省略号
        let c6 = a>5 && a<p-4 && (val===a-3 || val===a+3)    //  active在前5页与后5页之间，则active前3页与后3页显示省略号
        if(c4 || c5 || c6) { return '...' }

        let c7 = a<=5 && val>7                               //  active在前5页时，第7页以后的页码隐藏（除最后一页)
        let c8 = a>=p-4 && val<p-6                           //  active在后5页时，倒数第7页之前的页码隐藏（除首页）
        let c9 = a>5 && a<p-4 && (val<a-3 || val>a+3)        //  active在前5页与后5页之间，则active前3页之前的页与active后3页之后的页不显示
        if(c7 || c8 || c9) { return '' }
      },
      /** 选择页码 */
      selectPage(item) {
        if(this.active !== item && item > 0 && item <= this.pages) {
          this.active = item;
          this.$emit('change', item)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .rs-page {
    text-align: center;
    font-size: 12px;
    .item {
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      margin: 0 5px;
      &:hover, &.active {
        color: #409EFF;
      }
      &.active, &.disabled {
        cursor: default;
      }
      &.disabled {
        color: #ddd;
      }
    }
  }
</style>
