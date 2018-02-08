<template>
 <div>
   <div :class="type == 'table' ? 'table_view' : 'img_view'" role="button"
        v-for="item,i in data" :key="i"
        @click="dialog_visible = true">
     <img style="cursor:pointer;" @click="showindex = i" :src="item" alt="" :style="`max-height: ${img_height ? img_height : ''};margin: ${is_table ? '10px 5px' : ''}`">
   </div>
   <rs-carousel :url="data" v-model="dialog_visible" :activeindex="showindex"></rs-carousel>
 </div>
</template>

<script>
  /** @vue */
  export default {
    props: {
      is_table: Boolean,
      img_height: String,
      type: String,
      url: [Array, String]    //  需要预览的图片路径
    },
    data () {
      return {
        showindex: 0,
        data: [],
        dialog_visible: false,
        is_source: false  // 是否已请求过大图
      }
    },
    mounted () {
      this.showindex = parseInt(this.activeindex) || this.showindex

      if(typeof this.url === 'string') {
        this.data = [this.url]
      }else {
        this.data = this.url
      }

      if(!!this.autoScroll) {
        setInterval(() => {
          this.showindex = this.showindex + 1 > this.data.length - 1 ? 0 : this.showindex + 1
        })
      }
    },
    watch: {
      url () {
        if(typeof this.url === 'string') {
          this.data = [this.url]
        }else {
          this.data = this.url
        }
      },
      dialog_visible (val) {
        if(val && !this.is_source) {
          for(let k in this.data) {
            let url = this.data[k] + '?source=1'
            this.data.splice(k, 1, url)
          }
          this.is_source = true
        }
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
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

  .table_view {
    display: inline-block;
    img {
      height: 30px;
      margin: 4px 2px;
    }
  }

  .carousel {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 10001;
    .box {
      width: 40%;
      height: 60%;
      background: #fff;
      position: absolute;
      top: 20%;
      left: 30%;
      border-radius: 5px;
      overflow: hidden;
      .item {
        width: 100%;
        height: 100%;
        padding: 30px 15px 15px 15px;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        overflow: auto;
        transition: all .4s ease-in-out;
        display: flex;
        align-items: center;
      }
      img {
        display: block;
        margin: 0 auto;
        max-width: 100%;
      }
      &:hover {
        .fa {
          display: block;
        }
      }
    }
    .fa, .close {
      position: absolute;
      color: #ddd;
      cursor: pointer;
      z-index: 10;
      font-size: 30px;
    }
    .close {
      right: 15px;
      top: 0;
    }

    .fa-chevron-circle-right, .fa-chevron-circle-left {
      top: 50%;
      margin: 0 20px;
      display: none;
    }

    .fa-chevron-circle-right {
      right: 10px;
    }
    .fa-chevron-circle-left {
      left: 0;
    }
  }
</style>
