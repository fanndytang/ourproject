<!--  视频预览  -->
<template>
  <div style="position: relative;">
    <div role="button" :class="is_table ? '' : 'img_view'"
         v-for="item,i in avatar_pic" :key="i"
         @click="dialog_visible = true">
      <span class="avatar"><i class="fa fa-play-circle"></i></span>
      <img :src="item" alt="" :style="is_table ? `width: 90px;height:90px;margin: 10px 0;display:block;` : ''">
    </div>

    <rs-carousel :url="data" v-model="dialog_visible" :activeindex="showindex" slotname="video-slot">
      <template slot="video-slot" slot-scope="p">
        <video controls webkit-playsinline>
          <source :src="p.url" type="video/mp4">
        </video>
      </template>
    </rs-carousel>
  </div>
</template>

<script>
  /** @vue */
  export default {
    props: {
      is_table: Boolean,
      img_height: String,
      avatar: [Array, String],
      url: [Array, String]    //  需要预览的图片路径
    },
    data () {
      return {
        data: [],
        avatar_pic: [],
        dialog_visible: false,
        showindex: 0
      }
    },
    mounted () {
      let data = []
      if(typeof this.url === 'string') {
        data = [this.url]
      }else {
        data = this.url || []
      }
      if(typeof this.avatar === 'string') {
        this.avatar_pic = [this.avatar]
      }else {
        this.avatar_pic = this.avatar || []
      }
     this.data = data
    },
    watch: {
      avatar (val) {
        if(typeof val === 'string') {
          this.avatar_pic = [val]
        }else {
          this.avatar_pic = val || []
        }
      }
    }
  }
</script>

<style lang="less">
  .el-carousel__item {
    overflow: auto !important;
    text-align: center;
    video {
      height: 95%;
    }
    img {
      max-width: 100%;
      display:block;
      margin:0 auto;
    }
    opacity: .2;
    &.is-active {
      opacity: 1;
    }
  }
</style>

<style lang="less" scoped>
  .img_view {
    width: 150px;
    height: 150px;
    display: inline-block;
    margin-right: 10px;
    overflow: hidden;
    position: relative;

    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: fill;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%)
    }
  }

 .avatar {
   cursor: pointer;
   position: absolute;
   width: 90px;
   height: 90px;
   background: rgba(0, 0, 0, .5);
   z-index: 1;
   text-align: center;
   padding-top: 25px;
 //  top: 10px;
   .fa {
     color: #fff;
     font-size: 38px;
   }
 }
</style>
