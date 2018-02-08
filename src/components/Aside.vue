<template>
  <div class="slide-wrapper" :class="isCollapse ? 'close' : 'open'">
    <a href="#" class="logo">
      <img :src="isCollapse ? logo_mini : logo_lg" />
    </a>
    <ul class="menu" :class="isCollapse ? 'close' : 'open'">
      <li class="item" v-for="item,i in menu" :key="i" @click="handleMenu(item, i)" :class="{'open': i>=start && i<=end || item.isTitle}">
        <span class="text"
          :class="{'level1': item.isTitle, 'level2': !item.isTitle && !item.isThird, 'level3': item.isThird}"
          @click="jumpUrl(item)">
          <i v-if="item.icon" :class="`fa ${item.icon}`"></i>
          <span class="name">{{item.name}}</span>
          <i v-if="item.isTitle" class="fa icon-caret" :class="i>=start && i<=end ? 'fa-angle-down' : 'fa-angle-up'"></i>
          <i v-if="item.hasThird" class="fa icon-caret" :class="end !== i ? 'fa-angle-down' : 'fa-angle-up'"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  import menu from '@/router/menu'
  /** @vue */
  export default {
    props: {
      isCollapse: {
        default: false,
        type: Boolean
      }
    },
    data () {
      return {
        start: -1,   //  打开菜单 开始地方索引
        end: -1,     //  打开菜单 关闭地方索引
        logo_lg: require('@/assets/logo3.png'),
        logo_mini: require('@/assets/logo3.png'),
        menu: []
      }
    },
    mounted () {
      let rights = localStorage.getItem('admin_rights')
      if(!rights) return false

      for(let k in menu) {
        if((k === 'finance' || k === 'exchange' || k === 'goods') && rights.match('market') !== null || rights.match(k) !== null) {
          for(let q in menu[k]) {
            if(!menu[k][q].notmenu)  this.menu.push(menu[k][q])
          }
        }
      }
      this.$nextTick(() => {
        let that = this
        setTimeout(() => {
          let thirdTitle = 0
          //  let current = this.$router.currentRoute.fullPath
          let current = window.location.hash.replace('#', '').replace(/\?.*/, '')
          for(let k in that.menu) {
            if(that.menu[k].isTitle) thirdTitle = k
            if(that.menu[k].path === current) {
              that.start = thirdTitle
            }
            if(that.start !== -1 && that.menu[k].isTitle) {
              that.end = k-1
              break;
            }
          }
          if(that.start !== -1 && that.end === -1) that.end = that.menu.length - 1
        }, 300)
      })
    },
    methods: {
      /** 设置菜单展开收缩 */
      handleMenu(item, i) {
        let len = this.menu.length
        if(item.isTitle || item.hasThird) {
          if(i > this.end || i < this.start) { //  是展开菜单
            this.start = i
            for(i = i+1; i<len; i++) {
              if(this.menu[i].isTitle) {
                this.end = i - 1
                break;
              }
            }
            if(this.end < this.start) {
              this.end = len
            }
          }else {
            if(item.hasThird) {
              if(i < this.end) {  //  要展开菜单
                this.end = i
              }else {
                for(i = i+1; i<len; i++) {
                  if (this.menu[i].isTitle) {
                    this.end = i - 1
                    break;
                  }
                }
                if(this.end < this.start) {
                  this.end = len
                }
              }
            }else {
              this.start = -1
              this.end = -1
            }
          }
        }
      },
      /** 跳转页面 */
      jumpUrl(item) {
        let href = window.location.href
        let url = item.base_url + (item.redirect || item.path)
        if(item.isTitle && item.path === '/evaluation') {
          return false
        }else {
          window.location.href = url
        }
        if(href.match(url) !== null && !item.isTitle) {
          if(process.env.NODE_ENV === 'production') {
            window.location.reload()
          }
        }
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .logo {
    height: 50px;
    line-height: 50px;
    text-align: left;
    display: block;
    font-size: 16px;
    span {
      display: inline-block;
      vertical-align: middle;
    }
    img {
      max-height: 30px;
      vertical-align: middle;
      margin-left: 13px;
    }
  }

  .slide-wrapper {
    min-height: 100vh;
    background: #324157;

    &.close {
      //    width: 64px;
    }
    &.open {
      width: 160px;
    }
    a {
      color: #bfcbd9;
      text-decoration: none;
    }
  }

  .menu {
    &.open {
      width: 160px;
    }
    &.close {
      // width: 60px;
      .level1 .name {
        //   display: none;
      }
    }
    color: #bfcbd9;
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 14px;

    .item {
      cursor: pointer;
      height: 0;
      overflow: hidden;
      transition: all .4s ease-in-out;
      &.open {
        height: 40px;
      }
    }
    .text {
      line-height: 40px;
      display: block;
      &:hover {
        background: #48576a;
      }
      &.router-link-active {
        color: #20a0ff;
      }
      &.level1 {
        padding-left: 15px;
      }
      &.level2 {
        background: #1f2d3d;
        padding-left: 30px;
        &:hover {
          background: #48576a;
        }
      }
      &.level3 {
        background: #1f2d3d;
        padding-left: 45px;
        &:hover {
          background: #48576a;
        }
      }
      .icon-caret {
        float: right;
        line-height: 40px;
        margin-right: 20px;
        font-size: 20px;
      }
    }
  }
</style>
