<template>
  <div>
    <input type="hidden" :value="value" @input="value = $event.target.value">
    <div class="carousel" v-show="value">
      <div class="box">
        <div class="close" @click="$emit('input', false)">&times;</div>
        <div v-if="data && data.length > 1">
          <span class="fa fa-chevron-circle-right" @click="slideLeft()"></span>
          <span class="fa fa-chevron-circle-left" @click="slideRight()"></span>
        </div>
        <div class="item" v-for="item,i in data" :key="i" :style="`transform: translate(${(showindex - i) * 100}%, 0)`">
          <div style="display: table;height: 100%;width:100%;">
            <span style="display: table-cell; vertical-align: middle;text-align:center;">
              <div v-if="!!slotname">
                 <slot :name="slotname" :url="item"></slot>
              </div>
              <img v-if="!slotname" :src="item" alt="">
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /** @vue */
  export default {
    props: {
      value: Boolean,                                         //  绑定 v-model ， 控制预览容器显示与隐藏
      activeindex: [Number, String],                          //  设置当前要显示的元素在所有元素中的索引值
      url: [Array, String],                                   //  需要预览的图片或视频的路径（string类型，规定只有一个元素）
      autoScroll: {                                           //  是否需要自动滚动
        type: Boolean,
        default: true
      },
      slotname: String                                       //  如果当前预览内容的模板不符合要求，可自定义
    },
    data () {
      return {
        showindex: 0,                                        //  当前显示元素在所有元素中的索引值（无法直接修改activeindex)
        data: [],                                            //  所有元素（处理 url 后的数据）
        interl: '',                                          //  需要自动滚动时使用
        timeout: ''                                          //  配合 interl 使用
      }
    },
    methods: {
      /** 向左滑动 */
      slideLeft() {
        let that = this
        /** 如果有自动滚动，需要清除计时变量，以防止冲突 */
        if(that.interl !== '') {
          if(that.timeout !== '') {
            clearTimeout(that.timeout)
          }
          if(that.interl !== '') {
            clearInterval(that.interl)
          }
          that.timeout = setTimeout(() => {
            if(!!that.autoScroll) {
              that.interl = setInterval(() => {
                that.showindex = that.showindex + 1 > that.data.length - 1 ? 0 : that.showindex + 1
              }, 10000)
            }
          }, 10000)
        }

        this.showindex = (this.showindex + 1 > this.data.length-1 ? 0 : this.showindex + 1)
      },
      /** 向右滑动 */
      slideRight() {
        let that = this
        /** 如果有自动滚动，需要清除计时变量，以防止冲突 */
        if(that.interl !== '') {
          if(that.timeout !== '') {
            clearTimeout(that.timeout)
          }
          if(that.interl !== '') {
            clearInterval(that.interl)
          }
          that.timeout = setTimeout(() => {
            if(!!that.autoScroll) {
              that.interl = setInterval(() => {
                that.showindex = that.showindex + 1 > that.data.length - 1 ? 0 : that.showindex + 1
              }, 10000)
            }
          }, 10000)
        }

        this.showindex = (this.showindex - 1 < 0 ? this.data.length - 1 : this.showindex - 1)
      }
    },
    mounted () {
      /** 组件载入时，设置初始显示索引 */
      this.showindex = parseInt(this.activeindex) || this.showindex
      /** 处理url, 如果为string类型，则转换为数组 */
      if(typeof this.url === 'string') {
        this.data = [this.url]
      }else {
        this.data = this.url
      }
      /** 自动滚动 */
      if(!!this.autoScroll) {
        this.interl = setInterval(() => {
          this.showindex = this.showindex + 1 > this.data.length - 1 ? 0 : this.showindex + 1
        }, 10000)
      }
    },
    watch: {
      /** 监测 url 变化，同步修改 data */
      url () {
        if(typeof this.url === 'string') {
          this.data = [this.url]
        }else {
          this.data = this.url
        }
      },
      /** 监测 activeindex, 同步修改 showindex */
      activeindex (val) {
        this.showindex = parseInt(val)
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
    img {
      height: 30px;
      margin: 4px;
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
      video {
        height: 50vh;
      }
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
      }
      img {
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

  @media (max-width: 1000px) {
    .carousel .box {
      width: 98%;
      left: 1%;
    }
  }
</style>
