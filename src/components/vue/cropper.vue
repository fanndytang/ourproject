<!-- 图片裁剪 -->
<template>
  <div v-loading.fullscreen="loading"  element-loading-text="上传图片中">

    <input type="hidden" :value="value" @input="value=$event.target.value">
    <div class="upload-trigger" style="margin-left: 0;">
      <button class="btn btn-sm btn-primary" type="button">上传图片</button>
      <input type="file" @change="checkImg($event)">
    </div>

    <!-- 缩略图预览区域一， 可以拖动排序 -->
    <rs-draggable style="min-width:1140px;" class="img-lists lg" v-if="list.length > 0" :list="list" @update="dragEnd">
      <div class="item" v-for="el,i in list" :key="i">
        <img :src="el.url" alt="">
        <div class="crop">
          <span class="fa fa-trash" @click="remove(el, i)"></span>
          <span class="fa fa-search-plus" @click="preview(i)"></span>
        </div>
      </div>
    </rs-draggable>

    <!-- 裁剪区域  -->
    <div class="cropper-wrapper" v-show="show_cropper">
      <div class="cropper">
        <span class="btn-close" @click="show_cropper = false">&times;</span>
        <!--  工具栏 -->
        <div class="tools">
          <button class="btn btn-sm btn-primary" type="button" @click="rotateLeft()">
            <span class="text">向左旋转</span>
            <span class="fa fa-rotate-left"></span>
          </button>
          <button class="btn btn-sm btn-primary" type="button" @click="rotateRight()">
            <span class="text">向右旋转</span>
            <span class="fa fa-rotate-right"></span>
          </button>
          <button class="btn btn-sm btn-primary" type="button" @click="rotateClear()">清除旋转</button>

          <div class="upload-trigger">
            <button class="btn btn-sm btn-primary" type="button" :class="list && list.length >= 9 ? 'disabled' : ''">选择图片</button>
            <input :disabled="list && list.length >= 9" type="file" @change="checkImg($event)">
          </div>


          <button :disabled="!imgs" :class="!imgs ? 'disabled' : ''" class="btn btn-primary" type="button" @click="uploadImg()" style="float: right;">上传图片</button>
        </div>




        <!--  图片裁剪及预览区 -->
        <div class="box" ref="cropbox">
          <!-- 裁剪区 -->
          <div class="crop" ref="cropper">
            <!--  原图 做背景 -->
            <div class="origin_img">
              <img  :src="imgs"
                    :style="`transform: scale(${scale}, ${scale}) translate(${translateX/scale}px, ${translateY/scale}px) rotate(${rotate*90}deg)`">
            </div>

            <!--  显示裁剪部分 -->
            <div class="view_modal" @mouseover="scaleImg" @mouseout="cancleScale" @mousedown="moveDown" @mousemove="moveDrag" @mouseleave="moveUp" @mouseup="moveUp"></div>

            <div class="view_img" :style="`width:${dw}px;height:${dh}px;transform: translate(${dx}px, ${dy}px);`">
              <div class="imgs">
                <img :src="imgs" :style="`transform: scale(${scale}, ${scale}) translate(${(translateX - dx)/scale}px, ${(translateY - dy)/scale}px) rotate(${rotate*90}deg)`">
              </div>

              <!--  裁剪尺寸信息 -->
              <span class="info"></span>

              <!--  拖拽框 -->
              <div class="drag"
                   @mousedown="cropMove"
                   @mousemove="moveCrop"
                   @mouseleave="leaveCrop"
                   @mouseup="leaveCrop"
                   @mouseover="scaleImg"
                   @mouseout="cancleScale"></div>

              <!--  拖拽点 : 四条边线(上、右、下、左) -->
              <span class="line line-t" @mousedown="changeCropSize($event, false, true, 0, 1)"></span>
              <span class="line line-r" @mousedown="changeCropSize($event, true, false, 2, 0)"></span>
              <span class="line line-b" @mousedown="changeCropSize($event, false, true, 0, 2)"></span>
              <span class="line line-l" @mousedown="changeCropSize($event, true, false, 1, 0)"></span>

              <!--  拖拽点 : 八个控制点(上、右、下、左、中)  -->
              <span class="point point-al" @mousedown="changeCropSize($event, true, true, 1, 1)"></span>
              <span class="point point-ac" @mousedown="changeCropSize($event, false, true, 0, 1)"></span>
              <span class="point point-ar" @mousedown="changeCropSize($event, true, true, 2, 1)"></span>
              <span class="point point-rc" @mousedown="changeCropSize($event, true, false, 2, 0)"></span>
              <span class="point point-br" @mousedown="changeCropSize($event, true, true, 2, 2)"></span>
              <span class="point point-bc" @mousedown="changeCropSize($event, false, true, 0, 2)"></span>
              <span class="point point-bl" @mousedown="changeCropSize($event, true, true, 1, 2)"></span>
              <span class="point point-lc" @mousedown="changeCropSize($event, true, false, 1, 0)"></span>
            </div>
          </div>

          <!-- 预览区 -->
          <div class="preview" ref="preview">
            <div class="preview-c">
              <img style="max-height: 250px;max-width: 300px;" :src="preview_url">
            </div>

            <div class="preview-o">
              <h3>已上传图片({{ list.length }}张)，最多9张 <span style="float: right;font-size:12px;">可拖动排序</span></h3>

              <rs-draggable class="img-lists" v-if="list.length > 0" :list="list" @update="dragEnd">
                <div class="item" v-for="el,i in list" :key="i">
                  <img :src="el.url" alt="">
                  <span class="remove" @click="remove(el, i)">&times;</span>
                  <div class="crop">
                    <span class="fa fa-search-plus" @click="preview(i)"></span>
                  </div>
                </div>
              </rs-draggable>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  大图轮播预览区 -->
    <rs-carousel :url="previewUrl" v-model="dialogVisible" :activeindex="showindex"></rs-carousel>
  </div>
</template>

<script>
  import Upload from '@/model/api/upload'
  /** @vue */
  export default {
    data () {
      return {
        no_img: require('@/assets/noimg.png'),          //  没有图片时的占位图
        list: [],                                       //  所有的元素
        showindex: 0,                                   //  预览时，要显示的图片索引
        imgs: '',                                       //  当前操作的图片
        dialogVisible: false,                           //  是否显示预览图片
        previewUrl: [],                                 //  已上传的图片预览
        show_cropper: false,                            //  是否显示裁剪插件
        move_img: false,                                //  正在移动图片
        move_drag: false,                               //  正在移动拖拽框
        preview_url: '',                                //  插件预览
        width: 0,                                       //  截图窗口总宽度与高度
        height: 0,
        cx: 0,                                          //  在图片内按下鼠标，按下的位置
        cy: 0,
        dw: 300,                                        //  截图框初始大小
        dh: 300,
        dx: 0,                                          //  截图框左、上偏移量
        dy: 0,
        translateX: 0,                                  //  图片偏移量 -- x
        translateY: 0,                                  //  图片统移量 -- y
        trueWidth: 1024,                                // 图片真实宽度
        trueHeight: 666,                                // 图片真实高度
        scale: 1,                                       // 图片缩放比例
        rotate: 0,                                      // 图片旋转
        cropOldW: 0,                                    // 改变截图框大小时，截图框的原始尺寸
        cropOldH: 0,
        canChangeX: false,                              // 判断是否能够改变截图框大小
        canChangeY: false,
        changeCropTypeX: 1,                            // 改变的基准点
        changeCropTypeY: 1,
        cropChangeX: 0,                                // 裁剪框的坐标轴
        cropChangeY: 0,
        support: '',                                   // 支持的滚动事件
        loading: false
      }
    },
    props: {
      value: String,
      url: [String, Array],
      file_list: Boolean,                             //  是否是上传多张图片
      outputSize: {                                   // 输出图片压缩比
        type: Number,
        default: 1
      },
      outputType: {
        type: String,
        default: 'jpeg'
      },
      info: {
        type: Boolean,
        default: true
      },
      autoCropWidth: {                               // 截图框初始宽度
        type: Number,
        default: 0
      },
      autoCropHeight: {                             // 截图框初始高度
        type: Number,
        default: 0
      },
      fixed: {                                     // 是否开启固定宽高比
        type: Boolean,
        default: true
      },
      fixedNumber: {                               // 宽高比 w/h
        type: Array,
        default: () => {
          return [1, 1]
        }
      },
      fixedBox: {                                  // 固定大小 禁止改变截图框大小
        type: Boolean,
        default: false
      },
      full: {                                      // 输出截图是否缩放
        type: Boolean,
        default: false
      }
    },
    computed: {
      cropInfo () {
        return this.dy > 20 ? '-20px' : '0px'
      }
    },
    watch: {
      dw () {
        this.dw = ~~(this.dw)
        this.showPreview()
      },
      dh () {
        this.dh = ~~(this.dh)
        this.showPreview()
      },
      dx () {
        this.showPreview()
      },
      dy () {
        this.showPreview()
      },
      scale () {
        this.showPreview()
      },
      translateX () {
        this.showPreview()
      },
      translateY () {
        this.showPreview()
      },
      rotate () {
        this.showPreview()
      },
      value (val) {
        if(!val) {
          this.list = []
          this.previewUrl = []
        }
      }
    },
    mounted () {
      let url = []
      if(typeof this.url === 'string' && this.url !== '') {
        url = this.url.split(',')
      }else {
        url = this.url
      }
      for(let k in url) {
        this.previewUrl.push(url[k] + '?source=1')
      }
      if(!!this.value) {
        let val = this.value.split(',')
        let t = this.value.split(',').reverse()
        for(let k in t) {
          if(parseInt(t[k]) === -1 || !t[k]) {
            val.splice(val.length - 1)
          }else {
            break;
          }
        }

        for(let k in val) {
          this.list.push({
            fid: val[k],
            url: parseInt(val[k]) === -1 || !val[k] ? this.no_img : url[k]
          })
        }
      }
    },
    methods: {
      /**
       * 拖拽图片
       * */
      dragEnd() {
        let len = this.list.length
        if(len > 0) {
          let val = this.list[0].fid
          let preurl = this.list[0].url
          for(let i=1; i<len; i++) {
            val += ',' + this.list[i].fid
            preurl += ',' + this.list[i].url
          }
          this.$emit('input', val)
          this.previewUrl = preurl
        }
      },
      /**
       *删除图片
       * */
      remove(el, i) {
        let val = this.value.split(',')
        val.splice(i, 1)
        this.$emit('input', val.join(','))
        this.list.splice(i, 1)
        this.previewUrl.splice(i, 1)
      },
      /**
       * 预览所有已上传图片
       * */
      preview(i) {
        this.showindex = i
        this.dialogVisible = true
      },

      /**
       * 生成图片显示路径并显示裁剪框
       * */
      checkImg(e) {
        if(e.target && e.target.files && e.target.files[0]) {
          let type = e.target.files[0].type

          if(type !== 'image/jpeg' && type !== 'image/png') {
            this.$xhr.tip.$message.error('格式错误')
            return false
          }

          this.imgs = URL.createObjectURL(e.target.files[0])

          this.rotate = 0

          let img = new Image

          this.show_cropper = true

          img.onload = () => {

            /**
             * 总容器尺寸
             * */
            this.width = ~~(window.getComputedStyle(this.$refs.cropper).width.replace('px', ''))
            this.height = ~~(window.getComputedStyle(this.$refs.cropper).height.replace('px', ''))

            /**
             * 图片实际尺寸
             * */
            this.trueWidth = img.width
            this.trueHeight = img.height


            /**
             * 设置截图框尺寸
             * */
            let dw = this.autoCropWidth ? this.autoCropWidth : 300
            let dh = 0

            let r = this.fixedNumber[1] / this.fixedNumber[0]

            if(this.fixed) {
              dh = r * dw
            }else {
              dh = this.autoCropHeight ? this.autoCropHeight : dw * r
            }

            if(dw > this.width) {
              dw  = this.width * 95/100
              dh = r * dw
            }
            if(dh > this.height) {
              dh = this.height * 95/100
              dw = dh / r
            }

            this.dw = dw
            this.dh = dh



            /**
             * 保证初始时，可以显示图片全貌，且不可小于裁剪框大小，根据情况设置缩放比
             * */
            let scale = 1
            if(this.trueWidth > this.width) {
              scale = this.width / this.trueWidth
            }
            if(this.trueHeight * this.scale > this.height) {
              scale = this.height / this.trueHeight
            }

            /**
             * 图片最小不可缩放到比当前裁剪框小
             * */
            if(!(scale * this.trueWidth < this.dw || scale * this.trueHeight < this.dh)) {
              this.scale = scale
            }else {
              let s = this.dw / this.trueWidth
              if(s * this.trueHeight < this.dh) {
                s = this.dh / this.trueHeight
              }
              this.scale = s
            }


            /**
             * 创建截图框，设置左、上偏移量
             * */
            this.$nextTick(() => {
              this.dx = (this.width - this.dw) / 2
              this.dy = (this.height - this.dh) / 2

              this.translateX = -(this.trueWidth - this.trueWidth * this.scale) / 2 + (this.width - this.trueWidth * this.scale) / 2
              this.translateY = -(this.trueHeight - this.trueHeight * this.scale) / 2 + (this.height - this.trueHeight * this.scale) / 2
            })
          }

          img.src = this.imgs
        }
      },

      /**
       * 拖拽图片
       * */
      moveDown(e) {
        this.move_img = true
        this.cx = e.clientX - this.translateX
        this.cy = e.clientY - this.translateY
      },
      moveDrag (e) {
        e.preventDefault()
        if(this.move_img) {
          let nx = e.clientX
          let ny = e.clientY

          this.$nextTick(() => {
            let fw = ~~(nx - this.cx)
            let fh = ~~(ny - this.cy)

            this.translateX = fw
            this.translateY = fh
          })
        }
      },
      moveUp (e) {
        this.move_img = false
      },

      /**
       * 拖拽裁剪框
       * */
      cropMove (e) {
        e.preventDefault()
        this.move_drag = true
        this.cx = e.clientX - this.dx
        this.cy = e.clientY - this.dy
      },
      moveCrop (e) {
        e.preventDefault()
        if(this.move_drag) {
          let nowX = e.clientX
          let nowY = e.clientY
          this.$nextTick(() => {
            let fw = ~~(nowX - this.cx)
            let fh = ~~(nowY - this.cy)
            if (fw <= 1) {
              this.dx = 1
            } else if (~~(fw + this.dw) > this.width) {
              this.dx = this.width - this.dw - 1
            } else {
              this.dx = fw
            }

            if (fh <= 1) {
              this.dy = 1
            } else if (~~(fh + this.dh) > this.height) {
              this.dy = this.height - this.dh - 1
            } else {
              this.dy = fh
            }
          })
        }
      },
      leaveCrop (e) {
        e.preventDefault()
        this.move_drag = false
      },

      /**
       * 改变截图框大小
       * params: 事件，可改变宽度，可改变高度，
       * */
      changeCropSize (e, w, h, typeW, typeH) {
        e.preventDefault()
        window.addEventListener('mousemove', this.changeCropNow)
        window.addEventListener('mouseup', this.changeCropEnd)
        this.canChangeX = w
        this.canChangeY = h
        this.changeCropTypeX = typeW
        this.changeCropTypeY = typeH
        this.cx = e.clientX
        this.cy = e.clientY
        this.cropOldW = this.dw
        this.cropOldH = this.dh
        this.cropChangeX = this.dx
        this.cropChangeY = this.dy
        if (this.fixed) {
          if (this.canChangeX && this.canChangeY) {
            this.canChangeY = 0
          }
        }
      },
      changeCropNow (e) {
        e.preventDefault()
        let nowX = e.clientX ? e.clientX : 0
        let nowY = e.clientY ? e.clientY : 0
        this.$nextTick(() => {
          let fw = ~~(nowX - this.cx)
          let fh = ~~(nowY - this.cy)
          if (this.canChangeX) {
            if (this.changeCropTypeX === 1) {
              if (this.cropOldW - fw > 0) {
                this.dw = this.width - this.cropChangeX - fw <= this.width ? this.cropOldW - fw : this.cropOldW + this.cropChangeX
                this.dx = this.width - this.cropChangeX - fw <= this.width ? this.cropChangeX + fw : 0
              } else {
                this.dw = Math.abs(fw) + this.cropChangeX <= this.width ? Math.abs(fw) - this.cropOldW : this.width - this.cropOldW - this.cropChangeX
                this.dx = this.cropChangeX + this.cropOldW
              }
            } else if (this.changeCropTypeX === 2) {
              if (this.cropOldW + fw > 0) {
                this.dw = this.cropOldW + fw + this.dx <= this.width ? this.cropOldW + fw : this.width - this.dy
                this.dx = this.cropChangeX
              } else {
                this.dw = (this.width - this.cropChangeX + Math.abs(fw + this.cropOldW)) <= this.width ? Math.abs(fw + this.cropOldW) : this.cropChangeX
                this.dx = (this.width - this.cropChangeX + Math.abs(fw + this.cropOldW)) <= this.width ? this.cropChangeX - Math.abs(fw + this.cropOldW) : 0
              }
            }
          }

          if (this.canChangeY) {
            if (this.changeCropTypeY === 1) {
              if (this.cropOldH - fh > 0) {
                this.dh = this.height - this.cropChangeY - fh <= this.height ? this.cropOldH - fh : this.cropOldH + this.cropChangeY
                this.dy = this.height - this.cropChangeY - fh <= this.height ? this.cropChangeY + fh : 0
              } else {
                this.dh = Math.abs(fh) + this.cropChangeY <= this.height ? Math.abs(fh) - this.cropOldH : this.height - this.cropOldH - this.cropChangeY
                this.dy = this.cropChangeY + this.cropOldH
              }
            } else if (this.changeCropTypeY === 2) {
              if (this.cropOldH + fh > 0) {
                this.dh = this.cropOldH + fh + this.dy <= this.height ? this.cropOldH + fh : this.height - this.dy
                this.dy = this.cropChangeY
              } else {
                this.dh = (this.height - this.cropChangeY + Math.abs(fh + this.cropOldH)) <= this.height ? Math.abs(fh + this.cropOldH) : this.cropChangeY
                this.dy = (this.height - this.cropChangeY + Math.abs(fh + this.cropOldH)) <= this.height ? this.cropChangeY - Math.abs(fh + this.cropOldH) : 0
              }
            }
          }

          if (this.canChangeX && this.fixed) {
            let fixedHeight = ~~(this.dw / this.fixedNumber[0] * this.fixedNumber[1])
            if (fixedHeight + this.dy > this.height) {
              this.dh = this.height - this.dy
              this.dw = ~~(this.dh / this.fixedNumber[1] * this.fixedNumber[0])
            } else {
              this.dh = fixedHeight
            }
          }

          if (this.canChangeY && this.fixed) {
            let fixedWidth = ~~(this.dh / this.fixedNumber[1] * this.fixedNumber[0])
            if (fixedWidth + this.dx > this.width) {
              this.dw = this.width - this.dx
              this.dh = ~~(this.dw / this.fixedNumber[0] * this.fixedNumber[1])
            } else {
              this.dw = fixedWidth
            }
          }
        })
      },
      changeCropEnd (e) {
        window.removeEventListener('mousemove', this.changeCropNow)
        window.removeEventListener('mouseup', this.changeCropEnd)
      },

      /**
       * 缩放图片
       * */
      scaleImg () {
        this.support = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll"
        window.addEventListener(this.support, this.ratioImg)
      },
      ratioImg(e) {
        e.preventDefault()
        let ratio = 0.2  //  图片缩放系数
        let change = e.deltaY || e.wheelDelta
        ratio = ratio / this.trueWidth > ratio / this.trueHeight ? ratio / this.trueHeight : ratio / this.trueWidth


        let num = ratio * change
        let scale = this.scale
        num < 0 ? scale += Math.abs(num) : scale > Math.abs(num) ? scale -= Math.abs(num) : scale

        /**
         * 图片最小不可缩放到比当前裁剪框小
         * */
        if(!(scale * this.trueWidth < this.dw || scale * this.trueHeight < this.dh)) {
          this.scale = scale
        }else {
          let s = this.dw / this.trueWidth
          if(s * this.trueHeight < this.dh) {
            s = this.dh / this.trueHeight
          }
          this.scale = s
        }
      },
      cancleScale () {
        window.removeEventListener(this.support, this.ratioImg)
      },


      /**
       * 获取裁剪后的图片编码（base64)
       * */
      getBase64 (call) {
        let canvas = document.createElement('canvas')
        let img = new Image
        let rotate = this.rotate
        let trueWidth = this.trueWidth
        let trueHeight = this.trueHeight
        let cropOffsertX = this.dx
        let cropOffsertY = this.dy

        img.onload = () => {
          if (~~(this.dw) !== 0) {
            let ctx = canvas.getContext('2d')
            let width = this.dw
            let height = this.dh
            let imgW = trueWidth * this.scale
            let imgH = trueHeight * this.scale
            // 图片x轴偏移
            let dx = (this.translateX - cropOffsertX) + this.trueWidth * (1 - this.scale) / 2
            // 图片y轴偏移
            let dy = (this.translateY - cropOffsertY) + this.trueHeight * (1 - this.scale) / 2
            //保存状态
            canvas.width = width
            canvas.height = height
            ctx.save()
            switch (rotate) {
              case 0:
                if (!this.full) {
                  ctx.drawImage(img, dx, dy, imgW, imgH)
                } else {
                  // 输出原图比例截图
                  canvas.width = width / this.scale
                  canvas.height = height / this.scale
                  ctx.drawImage(img, dx / this.scale, dy / this.scale, imgW / this.scale, imgH / this.scale)
                }
                break
              case 1:
              case -3:
                if (!this.full) {
                  // 换算图片旋转后的坐标弥补
                  dx = dx + (imgW - imgH) / 2
                  dy = dy + (imgH - imgW) / 2
                  ctx.rotate(rotate * 90  * Math.PI / 180)
                  ctx.drawImage(img, dy, -dx - imgH, imgW, imgH)
                } else {
                  canvas.width = width / this.scale
                  canvas.height = height / this.scale
                  // 换算图片旋转后的坐标弥补
                  dx = dx / this.scale + (imgW / this.scale - imgH / this.scale) / 2
                  dy = dy / this.scale + (imgH / this.scale - imgW / this.scale) / 2
                  ctx.rotate(rotate * 90  * Math.PI / 180)
                  ctx.drawImage(img, dy, (-dx - imgH / this.scale), imgW / this.scale, imgH / this.scale)
                }
                break
              case 2:
              case -2:
                if (!this.full) {
                  ctx.rotate(rotate * 90  * Math.PI / 180)
                  ctx.drawImage(img, -dx - imgW, -dy - imgH, imgW, imgH)
                } else {
                  canvas.width = width / this.scale
                  canvas.height = height / this.scale
                  ctx.rotate(rotate * 90  * Math.PI / 180)
                  dx = dx / this.scale
                  dy = dy / this.scale
                  ctx.drawImage(img, -dx - imgW / this.scale, -dy - imgH / this.scale, imgW / this.scale, imgH / this.scale)
                }
                break
              case 3:
              case -1:
                if (!this.full) {
                  // 换算图片旋转后的坐标弥补
                  dx = dx + (imgW - imgH) / 2
                  dy = dy + (imgH - imgW) / 2
                  ctx.rotate(rotate * 90  * Math.PI / 180)
                  ctx.drawImage(img, -dy - imgW, dx, imgW, imgH)
                } else {
                  canvas.width = width / this.scale
                  canvas.height = height / this.scale
                  // 换算图片旋转后的坐标弥补
                  dx = dx / this.scale + (imgW / this.scale - imgH / this.scale) / 2
                  dy = dy / this.scale + (imgH / this.scale - imgW / this.scale) / 2
                  ctx.rotate(rotate * 90  * Math.PI / 180)
                  ctx.drawImage(img, -dy - imgW / this.scale, dx, imgW / this.scale, imgH / this.scale)
                }
                break
              default:
                if (!this.full) {
                  ctx.drawImage(img, dx, dy, imgW, imgH)
                } else {
                  // 输出原图比例截图
                  canvas.width = width / this.scale
                  canvas.height = height / this.scale
                  ctx.drawImage(img, dx / this.scale, dy / this.scale, imgW / this.scale, imgH / this.scale)
                }
            }
            ctx.restore()
          } else {
            let width = trueWidth * this.scale
            let height = trueHeight * this.scale
            let ctx = canvas.getContext('2d')
            ctx.save()
            switch (rotate) {
              case 0:
                canvas.width = width
                canvas.height = height
                ctx.drawImage(img, 0, 0, width, height)
                break
              case 1:
              case -3:
                // 旋转90度 或者-270度 宽度和高度对调
                canvas.width = height
                canvas.height = width
                ctx.rotate(rotate * 90  * Math.PI / 180)
                ctx.drawImage(img, 0, -height, width, height)
                break
              case 2:
              case -2:
                canvas.width = width
                canvas.height = height
                ctx.rotate(rotate * 90  * Math.PI / 180)
                ctx.drawImage(img, -width, -height, width, height)
                break
              case 3:
              case -1:
                canvas.width = height
                canvas.height = width
                ctx.rotate(rotate * 90  * Math.PI / 180)
                ctx.drawImage(img, -width, 0, width, height)
                break
              default:
                canvas.width = width
                canvas.height = height
                ctx.drawImage(img, 0, 0, width, height)
            }
            ctx.restore()
          }

          let data = canvas.toDataURL('image/' + this.outputType, this.outputSize)
          if(call) {
            call(data)
          }
        }

        // 判断图片是否是base64
        let s = this.imgs.substr(0, 4)
        if (s !== 'data') {
          img.crossOrigin = 'anonymous'
        }
        img.src = this.imgs
      },

      /**
       * 转化base64 为blob对象
       * */
      getBlob (call) {
        this.getBase64((data) => {
          let arr = data.split(',')
          let mime = arr[0].match(/:(.*?);/)[1]
          let bstr = atob(arr[1])
          let n = bstr.length
          let u8arr = new Uint8Array(n)
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
          }

          let blob = new Blob([u8arr], {type: mime})

          if(call) {
            call(blob, data)
          }
        })
      },

      /**
       * 上传图片
       * */
      uploadImg() {
        let that = this
        that.loading = true
        that.getBlob((blob, base64) => {
          let xhr = new Upload()
          xhr.setFormData({
            file: blob
          })
          xhr.request.method = 'post'
          xhr.request.url = `${process.env.API.USER}/v1/user/upload`
          xhr.httpSuccess = res => {
            let res_data = res.data
            let val = that.value

            if(!!that.file_list) {
              that.list.push({
                fid: res_data.fileinfo.fid,
                url: base64
              })
              val += ((!!val ? ',' : '') + res_data.fileinfo.fid)
              that.previewUrl.push(base64)
            }else {
              val = res_data.fileinfo.fid
              that.previewUrl = [base64]
            }

            that.$emit('input', val)
            that.loading = false
            that.imgs = ''
            that.$message.success('图片上传成功')
          }
          xhr.uploadError = res => {
            that.$message.error(res.msg || '图片上传失败')
            that.loading = false
          }
          xhr.httpRequest()
        })
      },

      // 自动预览函数
      showPreview() {
        let that = this
        setTimeout(() => {
          that.getBlob((data) => {
            that.preview_url = URL.createObjectURL(data)
          })
        }, 100)
      },


      // 向左边旋转
      rotateLeft () {
        this.rotate = this.rotate <= -3 ? 0 : this.rotate - 1
      },

      // 向右边旋转
      rotateRight () {
        this.rotate = this.rotate >= 3 ? 0 : this.rotate + 1
      },

      // 清除旋转
      rotateClear () {
        this.rotate = 0
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .btn {
    padding: 10px 20px;
    color: #fff;
  }
  .btn.disabled {
    cursor: not-allowed;
    background: #999;
  }
  .btn-primary {
    background: #20a0ff;
    border: none;
  }
  .btn-sm {
    padding: 5px 10px;
  }

  .upload-trigger {
    display: inline-block;
    position: relative;
    margin: 0 20px;
    input[type=file] {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      height: 100%;
      width: 100%;
      opacity: 0;
      cursor: pointer;
      &:focus {
        outline: 0;
      }
    }
  }

  .btn-close {
    border: 2px solid #eee;
    background: #fff;
    position: absolute;
    right: -15px;
    top: -15px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    font-size: 30px;
    color: #aaa;
    line-height: 24px;
    cursor: pointer;
  }


  .cropper-wrapper {
    position: fixed;
    background: rgba(0, 0, 0, .5);
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .cropper {
    position: absolute;
    width: 80%;
    height: 80%;
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: crosshair;

    display: flex;
    flex-direction: column;
  }

  .tools, .footer {
    height: 50px;
    padding: 10px 20px;
    text-align: center;
  }
  .tools .btn-sm .fa {
    display: none;
  }
  .box {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    flex: 1;
    display: flex;
    align-items: center;
  }

  .crop {
    flex: 3;
    border-right: 1px solid #eee;
    height: 100%;
    overflow: hidden;

    position: relative;

    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
  }

  .view_img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 40;
    border: 2px solid rgba(51, 153, 255, .5);
    .imgs {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }

  .view_modal {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 30;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    cursor: move;
  }

  .preview {
    flex: 1;
    padding: 20px;
    height: 100%;

    display: flex;
    flex-direction: column;
    .preview-c, .preview-o {
      flex: 1;
      width: 100%;
      overflow: hidden;
    }
  }

  .drag {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    cursor: move;
  }

  .line {
    position: absolute;
    opacity: .1;
    display: block;
    &.line-t {
      top: -3px;
      left: 0;
      height: 5px;
      width: 100%;
      cursor: n-resize;
    }
    &.line-r {
      right: -3px;
      top: 0;
      height: 100%;
      width: 5px;
      cursor: e-resize;
    }
    &.line-b {
      bottom: -3px;
      width: 100%;
      left: 0;
      height: 5px;
      cursor: n-resize;
    }
    &.line-l {
      left: -3px;
      top: 0;
      width: 5px;
      height: 100%;
      cursor: e-resize;
    }
  }

  .point {
    position: absolute;
    width: 8px;
    height: 8px;
    opacity: .75;
    background-color: #39f;
    border-radius: 100%;
    display: block;
    &.point-al {
      left: -4px;
      top: -4px;
      cursor: nw-resize;
    }
    &.point-ac {
      top: -4px;
      left: 50%;
      margin-left: -4px;
      cursor: n-resize;
    }
    &.point-ar {
      right: -4px;
      top: -4px;
      cursor: ne-resize;
    }
    &.point-rc {
      top: 50%;
      margin-top: -4px;
      right: -4px;
      cursor: e-resize;
    }
    &.point-br {
      bottom: -4px;
      right: -4px;
      cursor: nw-resize;
    }
    &.point-bc {
      bottom: -4px;
      left: 50%;
      margin-left: -4px;
      cursor: n-resize;
    }
    &.point-bl {
      left: -4px;
      bottom: -4px;
      cursor: ne-resize;
    }
    &.point-lc {
      top: 50%;
      margin-top: -4px;
      left: -4px;
      cursor: e-resize;
    }
  }


  .preview-o {
    h3 {
      font-size: 14px;
      color: #999;
      font-weight: normal;
      border-bottom: 1px solid #eee;
    }
  }


  .img-lists {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .item {
      cursor: pointer;
      width: 60px;
      height: 60px;
      margin: 10px 10px 10px 0;
      border: 1px solid #ddd;
      text-align: center;
      position: relative;

      .remove {
        position: absolute;
        right: -10px;
        top: -10px;
        border: 1px solid #ddd;
        font-size: 20px;
        color: #999;
        line-height: 14px;
        width: 20px;
        height: 20px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        text-align: center;
        background: #fff;
        cursor: pointer;
        z-index: 3;
      }
      &:hover {
        .crop {
          display: block;
        }
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
      .crop {
        position: absolute;
        z-index: 2;
        background: rgba(0, 0, 0, .5);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        color: #eee;
        font-size: 22px;
        display: none;
        text-align: center;
        .fa {
          margin-top: 20px;
          cursor: pointer;
        }
      }
    }


    &.lg {
      .item {
        width: 180px;
        height: 180px;
        .crop .fa {
          margin: 80px 10px 0 10px;
        }
      }
    }
  }

  @media (max-width: 1000px) {
    .btn-sm {
      padding: 5px;
    }
    .upload-trigger {
      margin: 0 5px;
    }
    .box {
      flex-direction: column;
      .crop {
        flex: 1;
        width: 100%;
        height: auto;
      }
    }
    .tools {
      height: 100px;
      padding: 10px 5px;
      .btn-sm {
        .fa {
          display: block;
        }
        .text {
          display: none;
        }
      }
    }
    .img-lists {
      overflow: auto;
    }
  }
</style>
