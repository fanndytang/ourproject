<template>
  <div v-loading="loading" element-loading-text="加载中">
    <input type="hidden" :value="value" @input="value = $event.target.value">

    <div v-if="!file_list">
      <el-upload class="avatar-uploader"
                 :headers="headers"
                 :action="uploadImgUrl"
                 :before-upload="checkfile"
                 :show-file-list="false"
                 :http-request="uploadImgSingle">
        <!-- <img v-if="form_data && form_data[img_key]" :src="form_data[img_key]" class="avatar" />-->
        <img :src="previewUrl" alt="">
        <i class="el-icon-plus avatar-uploader-icon"  v-else></i>
        <div class="text" v-if="text && !(form_data && form_data[img_key])">{{ text }}</div>
      </el-upload>
    </div>

    <div v-else>
      <el-upload :action="uploadImgUrl"
                 :headers="headers"
                 :http-request="uploadImgList"
                 :file-list="form_data"
                 :show-file-list="false">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>

      <rs-draggable class="img-lists" v-if="form_data.length > 0" :list="form_data"  @update="datadragEnd">
        <div class="item" v-for="el,i in form_data" :key="i">
          <img :src="el.url" alt="">
          <div class="crop">
            <span class="fa fa-search-plus" @click="preview(i)"></span>
            <span class="fa fa-trash" @click="remove(el, i)"></span>
          </div>
        </div>
      </rs-draggable>

      <el-dialog v-model="dialogVisible" style="text-align: center;">
        <el-carousel :interval="4000" height="600px" :autoplay="false" :activeindex="initindex">
          <el-carousel-item v-for="item in previewUrl" :key="item">
            <div class="box">
              <img :src="item" alt="">
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  /** @vue */
  export default {
    props: {
      value: [String, Array],
      form_data: [Object, Array],
      img_key: String,
      file_list: Boolean,   //  是否是要上传多张图片
      id_key: String,
      text: String,
      url: [String, Array]   //  最初的图片路径
    },
    data () {
      let headers = {}

      headers['AccessToken'] = localStorage.getItem('AccessToken')
      headers['Authorization'] = localStorage.getItem('Authorization')
      return {
        val: '',
        dialogImageUrl: '',
        dialogVisible: false,
        headers: headers,
        uploadImgUrl: `${process.env.API.USER}/v1/user/upload`,
        loading: false,
        initindex: 0,
        previewUrl: []   //  预览图片路径
      }
    },
    mounted () {
      let accesstoken = localStorage.getItem('AccessToken')
      if(!accesstoken) {
        this.$xhr.get_token(() => {
          this.headers['AccessToken'] = localStorage.getItem('AccessToken')
        })
      }

      if(!!this.file_list) {
        for(let i=0,len=this.form_data.length; i<len; i++) {
          this.previewUrl.push(this.form_data[i].url + '?source=1')
        }
      }

      if(!this.file_list) {
        this.val = []
      }
    },
    methods: {
      checkfile(file) {
        let type = file.type
        if(type !== 'image/jpeg' && type !== 'image/png') {
          this.$xhr.tip.$message.error('格式错误')
          return false
        }
      },
      uploadImgSingle(event) {  //  单个文件上传
        let form_data = new FormData()
        let that = this
        let count = 1

        that.loading = true
        form_data.append('file', event.file)

        let upload = () => {
          that.$xhr.axios_xhr({
            method: 'post',
            data: form_data,
            url: that.uploadImgUrl,
            success(res) {
              let res_data = res.data

              if(that.id_key) {
                that.form_data[that.id_key] = res_data.fileinfo.fid
              }else {
                that.form_data.file_id = res_data.fileinfo.fid
              }
              that.form_data[that.img_key] = URL.createObjectURL(event.file)

              that.loading = false

              that.$emit('input', )
            },
            error() {
              count ++
              if(count > 3) {
                that.$message.warning("图片上传失败")
                that.loading = false
              }else {
                upload()
              }
            }
          })
        }

        upload()
      },
      uploadImgList (event) {  //  上传文件列表
        let form_data = new FormData()
        let that = this
        let count = 1

        that.loading = true
        form_data.append('file', event.file)

        let upload = () => {
          that.$xhr.axios_xhr({
            method: 'post',
            data: form_data,
            url: that.uploadImgUrl,
            success(res) {
              let res_data = res.data

              that.form_data.push({
                file_id: res_data.fileinfo.fid,
                url: URL.createObjectURL(event.file),
                file_fid: res_data.fileinfo.fid,
                name: '',
                uid: event.file.uid
              })

              that.previewUrl.push(URL.createObjectURL(event.file))

              that.loading = false
            },
            error() {
              count ++
              if(count > 3) {
                that.$message.warning("图片上传失败")
                that.loading = false
              }else {
                upload()
              }
            }
          })
        }

        upload()
      },

      singleSuccess (res, file) {  // 单张图片上传（封面图、LOGO等）
        if(parseInt(res.errcode) === 0) {
          if(this.id_key) {
            this.form_data[this.id_key] = res.fileinfo.fid
          }else {
            this.form_data.file_id = res.fileinfo.fid
          }
          this.form_data[this.img_key] = file.url
        }else {
          this.$xhr.tip.$message.error(res.errmsg)
        }
      },
      listSuccess (res, file, fileList) {  //  批量的图片 （商品图片等）
        console.log(file)
        if(parseInt(res.errcode) === 0) {
          this.form_data.push({
            file_id: res.fileinfo.fid,
            url: file.url,
            file_fid: res.fileinfo.fid,
            name: '',
            uid: file.uid
          })
        }else {
          this.$xhr.tip.$message.error(res.errmsg)
        }
      },
      remove(el, i) {
        this.form_data.splice(i, 1)
        this.previewUrl.splice(i, 1)
      },
      preview(i) {
        this.initindex = i+1
        this.dialogVisible = true
      },
      datadragEnd (evt) { //  拖拽完成后的回调
        console.log(this.form_data)

      }
    }
  }
</script>

<style lang="less" scoped>
  .text {
    position: absolute;
    bottom: 10px;
    left: 0;
    display: block;
    text-align: center;
    width: 100%;
    font-weight: bold;
    font-size: 18px;
    color: #ccc;
  }
</style>

<style lang="less" type="text/less" scoped>
  .img-lists {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .item {
      cursor: pointer;
      width: 180px;
      height: 180px;
      margin: 10px 20px 10px 0;
      border: 1px solid #ddd;
      text-align: center;
      position: relative;
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
        color: #fff;
        font-size: 22px;
        display: none;
        .fa {
          margin: 80px 10px 0 10px;
          cursor: pointer;
        }
      }
    }
  }
</style>
