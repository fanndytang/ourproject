<!-- 左侧菜单 -->
<template>
  <aside class="slide-wrapper" :class="isCollapse ? 'close' : 'open'">
    <a href="#" class="logo">
       <img :src="isCollapse ? logo_mini : logo_lg" />
    </a>

    <rs-tree class="menu" :list="menu" :prop="{label: 'name', child: 'child'}" :visible="isCollapse" :active="active"></rs-tree>
  </aside>
</template>

<script>
  import menu from '@/router/menu'

  /** @vue */
  export default {
    data () {
      return {
        logo_lg: '',
        logo_mini: '',
        active: [],
        menu: menu,
        isCollapse: false                                   //  展开或收缩左侧菜单
      }
    },
    mounted () {
      /** 监听左侧栏展开或收缩事件 */
      this.$root.eventHub.$on('switch-aside', () => {
        this.isCollapse = !this.isCollapse
      })
      /** 监听菜单点击事件 */
      this.$on('click-tree-menu', (res) => {
        if(res.data.path) this.$router.push(res.data.path)
      })

      /** 页面载入，查询当前应当激活的菜单 */
      this.$nextTick(() => {
        setTimeout(() => {
          this.init()
        }, 2000)
      })
    },
    methods: {
      /** 设置激活菜单 */
      init () {
        let route = this.$router.currentRoute
        let path = route.fullPath

        let setOne = (list, level) => {
          for(let k in list) {
            if(list[k].path === path) {
              this.active.splice(level, 1, k)
              break;
            }else if(list[k].child && list[k].child.length) {
              this.active.splice(level, 1, k)
              setOne(list[k].child, level+1)
            }
          }
        }

        setOne(this.menu, 0)
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .slide-wrapper {
    min-height: 100vh;
    background: #324157;
    &, ul {
      transition: all .4s ease-in-out;
    }
    &.open {
      width: 140px;
    }
    &.close {    //  菜单最小化状态下，鼠标滑过li就显示子菜单
      width: 40px;
      .menu {
        ul {
          position: absolute;
          top: 0;
          left: 100%;
          background: #fff;
          box-shadow: 1px 3px 10px rgba(0, 0, 0, .1);
          color: #2c3e50;
          z-index: 100;
          min-width: 140px;
          display: none;
          li:hover > .label {
            background: #f1f1f1;
          }
        }
        > li > .label > .text {
          display: none;
        }
        li:hover > ul {
          display: block;
        }
      }
    }
    .menu {
      font-size: 14px;
      line-height: 32px;
      &, a, li {
        color: #bfcbd9;
        text-decoration: none;
      }
      li {
        position: relative;
        white-space: nowrap;
        cursor: pointer;
        &.open > .label {
          color: #20a0ff;
        }
      }
      .label {
        padding: 0 10px;
        &:hover {
          background: #48576a;
        }
      }
    }
    .logo {
      height: 40px;
      line-height: 40px;
      text-align: left;
      display: block;
      font-size: 16px;
      img {
        max-height: 30px;
        vertical-align: middle;
        margin-left: 13px;
      }
    }
  }
</style>
