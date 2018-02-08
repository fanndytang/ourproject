<template>
  <div>
    <div id="app" v-if="!isLogin">
     <!-- <asid class="aside" :isCollapse = isCollapse></asid>-->
      <div class="content-wrapper">
      <!--  <top class="top"></top>-->
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
  <!--    <audio id="audio-fri" :src="require('@/assets/social_warning.mp3')"></audio>-->
    </div>

    <div id="login" v-if="isLogin">
     <!-- <router-view></router-view>-->
    </div>
  </div>
</template>

<script>
  /*import asid from '@/components/Aside'
  import top from '@/components/Header'
  import Token from '@/model/api/token'
  import Listen from '@/model/friends/listen'*/

  /** @vue */
  export default {
    data () {
      return {
        /** 是否是登录页面 */
        isLogin: false,
        /** 是否收缩菜单 */
        isCollapse: false
      }
    },
    watch: {
      /** 监测路由变化，判断是否是登录页面，且小屏幕时默认隐藏菜单 */
      '$route'(val) {
       /* document.title = val.name || 'SWISS TIME'
        this.isLogin = val.path.match('login') !== null
        if(window.innerWidth <= 1000) {
          this.isCollapse = true
        }*/
      }
    },
    created() {
     /* /!** 设置title *!/
      document.title = this.$route.name || 'SWISS TIME'
      /!** 判断是否在登录页面 *!/
      this.isLogin = location.href.match('login') !== null
      /!** 没有登录，则跳转到登录页面 *!/
      if(!localStorage.getItem('Authorization')){
        location.href = `${process.env.URL.ADMIN}/#/login`
      }
      /!** 没有token,要先请求token *!/
      if(!localStorage.getItem('AccessToken')) {
      //  new Token().httpRequest()
      }*/
    },
    mounted () {
      console.log(this.$router)
 /*     let that = this
      /!** 监测展开、收缩菜单事件，切换 isCollapse 状态 *!/
      that.$on('switch-aside-menu', () => {
        that.isCollapse = !that.isCollapse
      })
      /!** 页面载入时，如果是小屏幕，则默认隐藏菜单 *!/
      if(window.innerWidth <= 1000) {
        this.isCollapse = true
      }
      /!** 监测圈子是否有更新（未审核），每2分钟发送一次请求，如果有未审核动态，则给音乐提示 *!/
      let listenEvent = new Listen()
      if(listenEvent.has_listen_rights && !this.isLogin) {
        let total = 2 * 60  //  总时长两分钟
        let time = localStorage.getItem('friend-audio')    //  本地存储一个时间，避免刷新页面或跳转其它页面时，丢失当前时长记录
        time = !!time ? parseInt(time) : 0
        setInterval(() => {
          time ++
          if(time >= total) {
            time = 0
            listenEvent.check({
              success (res) {
                if(res.data && res.data.data && (parseInt(res.data.data) > 0)) {
                  document.getElementById('audio-fri').play()
                }
              },
              error (res) {}
            })
          }
          localStorage.setItem('friend-audio', time)
        }, 1000)
      }

      /!** 监测是否两小时内无操作，无操作则退回登录页面 *!/
      if(!this.isLogin) {
        let time = 0
        let total = 2 * 60 * 60   //  两个小时、折算成秒
        document.body.onclick = () => {
          time = 0
        }
        let inter = setInterval(() => {
          time ++
          if(time >= total) {
            time = 0
            clearInterval(inter)
            localStorage.setItem('timeout', true)
            that.$message.error('您已被退出')
            location.href = `${process.env.URL.ADMIN}/#/login`
          }
        }, 1000)
      }else {
        document.body.onmouseenter = () => {
          if(localStorage.getItem('timeout')) { // 如果是因为超时操作而被退出
            that.$message.error('您已被退出')
            localStorage.removeItem('timeout')
          }
        }
      }*/
    },
    components: {
    //  asid,
     // top
    }
  }
</script>

<style lang="less" type="text/less">
  body {
    margin: 0;
    padding: 0;
  }
  *, *:after, *:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>

<style lang="less" type="text/less" scoped>
  #login {
    min-height: 100vh;
    background: #f2f2f2;
  }
  #app {
    display: flex;
    min-height: 100vh;
    .content-wrapper {
      flex: 1;
      min-height: 100vh;
      background-color: #ecf0f5;
    }
    .content {
      background-color: #fff;
      margin: 20px;
    }
  }
</style>
