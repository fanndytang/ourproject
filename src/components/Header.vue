<template>
  <div>
    <header class="main-header">
      <div class="icon-toggle" role="button" @click="$parent.$emit('switch-aside-menu')">
        <i class="fa fa-bars"></i>
      </div>
      <div class="right">
        <div class="userinfo item">
          <div style="position: relative;display:inline-block;">
            <img :src="userinfo.logo" @click="showdown = !showdown">
            <ul class="downmenu" :class="{'open': showdown}" v-show="has_password_right">
              <li @click="showdown=false" :class="{'open': showdown}"><a :href="updatepwdurl">修改登录密码</a></li>
            </ul>
          </div>
          <span>{{userinfo.name}}</span>
        </div>

        <a class="exit item" :href="loginout">
          <i class="fa fa-power-off"></i>
        </a>
      </div>
    </header>
  </div>
</template>

<script>
  import sha from '@/plugin/sha1'
  /** @vue */
  export default {
    data () {
      return {
        has_password_right: false,                         //  修改密码的权限
        showdown: false,
        updatepwdurl: `${process.env.URL.USER}/#/user/updatepwd`,
        userinfo: {
          name: localStorage.getItem('admin_username') || '',
          logo: require('@/assets/profile.jpg')
        },
        loginout: `${process.env.URL.ADMIN}/#/logout`
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
  *, *:after, *:before {
    box-sizing: border-box;
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
  .main-header {
    background-color: #fff;
    color: #48576a;
    display: flex;
    align-items: center;
    padding: 0 15px;
    height: 50px;
    .icon-toggle {
      width: 100px;
      cursor: pointer;
    }
    .right {
      flex: 1;
      text-align: right;
      position: relative;

      .item {
        display: inline-block;
        margin: 0 10px;
        font-size: 14px;
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
    }
  }
  .userinfo {
    cursor: pointer;
    height: 100%;
    position: relative;
    img {
      border: 1px solid #d1dbe5;
      width: 30px;
      max-height: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
</style>
