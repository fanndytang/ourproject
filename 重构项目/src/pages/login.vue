<template>
  <div class="box">
    <div class="logo"><img :src="logo" alt="瑞时会全球购"></div>

    <form class="form" id="AdminLogin">
      <h1 class="title">登  录</h1>

      <div class="form-item">
        <input type="text" v-model="login.username" v-on:keyup.enter="loginIn()" placeholder="请输入用户名">
      </div>

      <div class="form-item">
        <input type="password" v-model="login.password" v-on:keyup.enter="loginIn()" placeholder="请输入密码">
      </div>

      <div class="btns">
        <button class="btn btn-login" type="button" @click="loginIn()">登  录</button>
      </div>
    </form>

    <div class="copyright">© Copyright 2018 瑞时会全球购 版权所有 All Rights Reserved.</div>
  </div>
</template>

<script>
  import Login from '@/model/login'
  /** @vue */
  export default {
    data () {
      return {
        logo: '',
        login: new Login()
      }
    },
    methods: {
      loginIn () {
        let that = this
        this.login.loginIn({
          success (msg) {
            that.$message.success(msg)
            that.$router.push('/exchange/watch/list')
          }
        })
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>

  *, *:after, *:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .logo {
    padding: 130px 0 40px 0;
    text-align: center;
    img {
      max-width: 200px;
    }
  }

  .form {
    width: 440px;
    margin: 20px auto;
    padding: 10px 30px 30px;
    font-size: 12px;
    background: #fff;
    color: #666;
  }

  .title {
    color: #30a5ff;
    text-align: center;
    font-size: 28px;
    margin-bottom: 25px;
    font-weight: normal;
  }

  .form-item {
    margin-bottom: 25px;
    border: 1px solid #ccc;
    input {
      line-height: 40px;
      height: 40px;
      font-size: 12px;
      border: 0;
      padding: 0 12px;
      width: 100%;
    }
  }

  .has-code {
    display: flex;
    align-items: center;
    input {
      flex: 1;
    }
    img {
      max-height: 38px;
      max-width: 100px;
    }
  }

  .btn-login {
    border: 0;
    height: 40px;
    background-color: #30a5ff;
    color: #fff;
    width: 100%;
  }

  .copyright {
    text-align: center;
    color: #7a8ca5;
    margin-top: 150px;
    padding-bottom: 20px;
    font-size: 14px;
  }

  @media (max-width: 1000px) {
    .form {
      width: 80%;
    }
    .logo {
      padding: 20px 0;
      img {
        max-width: 120px;
      }
    }
  }
</style>
