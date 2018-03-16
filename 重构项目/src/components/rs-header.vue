<!-- 公共头部 -->
<template>
  <header class="main-header">
    <span class="switch item fa fa-bars" @click="$root.eventHub.$emit('switch-aside')"></span>

    <div class="right">
      <img class="userLogo" :src="userLogo" @click="showdown = !showdown">
      <span class="item">{{ username }}</span>
      <a class="exit item" :href="loginout"><i class="fa fa-power-off"></i></a>
      <ul v-show="has_password_right" class="downmenu" :class="`downmenu ${showdown ? 'open' : ''}`">
        <li @click="showdown=false" :class="{'open': showdown}"><a :href="updatepwdurl">修改登录密码</a></li>
      </ul>
    </div>
  </header>
</template>

<script>
  /** @vue */
  export default {
    data () {
      return {
        has_password_right: false,                         //  修改密码的权限
        showdown: false,
        username: localStorage.getItem('admin_username') || '',
        userLogo: `http://192.168.10.105:8083/static/img/profile.jpg`,
        updatepwdurl: '',
        loginout: ''
      }
    },
    mounted () {
      /** 判断是否有修改个人密码的权限 */
      let rights = localStorage.getItem('admin_rights_list')
      if(rights) rights = JSON.parse(rights)
      this.has_password_right = rights && rights.user && rights.user[`v1,user,admin,updatepwd,put`]
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .main-header {
    height: 40px;
    background: #fff;
    position: relative;
    .switch {
      width: 40px;
      text-align: center;
      cursor: pointer;
    }
    .right {
      float: right;
    }
    .item {
      display: inline-block;
      margin: 0 10px;
      font-size: 14px;
      line-height: 40px;
    }
    .exit {
      background: #1d90e6;
      height: 30px;
      width: 30px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      border-radius: 5px;
    }
    .userLogo {
      border: 1px solid #d1dbe5;
      width: 30px;
      max-height: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .downmenu {
      position: absolute;
      padding: 0;
      background: #fff;
      list-style: none;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 1px 2px 10px rgba(0, 0, 0, .2);
      border-radius: 2px;
      &:before {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: -4px;
        left: 50%;
        border-style: solid;
        border-width: 0 4px 4px;
        border-color: transparent transparent #fff;
        display: none;
      }
      &.open:before {
        display: block;
      }
      li {
        padding: 0 10px;
        line-height: 30px;
        white-space: nowrap;
        cursor: pointer;
        transition: all ease-in-out .15s;
        height: 0;
        opacity: 0;
        overflow: hidden;
        &.open {
          opacity: 1;
          height: 30px;
        }
      }
      a {
        text-decoration: none;
        color: #333;
      }
    }
  }
</style>

