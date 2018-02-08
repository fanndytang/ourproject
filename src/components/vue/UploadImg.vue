<template>
  <div v-loading="loading" element-loading-text="加载中">
    <input type="hidden" :value="value" @input="value = $event.target.value">

    <el-upload :class="{'avatar-uploader' : !file_list}"
               :style="`${width ? 'width:'+width+'px;' : (!!file_list ? 'width: auto;' : 'width:178px;')};${height ? 'height:'+height+'px;' : (!!file_list ? 'height:auto;' : 'height:178px;')}`"
               :action="uploadImgUrl"
               :before-upload="checkFile"
               :show-file-list="false"
               :http-request="uploadImg">
      <div v-if="!file_list">
        <img v-if="previewUrl" :src="previewUrl" class="avatar" :style="`${width ? 'width:'+width+'px' : 'width:178px'};${height ? 'height:'+height+'px' : 'height:178px'}`" />
        <i class="el-icon-plus avatar-uploader-icon"  v-else></i>
      </div>
      <button type="button" class="btn btn-primary btn-sm" v-else>点击上传</button>
    </el-upload>

    <div v-if="!!file_list">
      <rs-draggable class="img-lists" v-if="list.length > 0" :list="list"  @update="datadragEnd">
        <div class="item" v-for="el,i in list" :key="i">
          <img :src="el.url" alt="">
          <div class="crop">
            <span class="fa fa-search-plus" @click="preview(i)"></span>
            <span class="fa fa-trash" @click="remove(i)"></span>
          </div>
        </div>
      </rs-draggable>
      <rs-carousel :url="previewUrl" v-model="dialogVisible" :activeindex="initindex"></rs-carousel>
    </div>
  </div>
</template>

<script>
  import Upload from '@/model/api/upload'
  /** @vue */
  export default {
    props: {
      value: String,
      file_list: Boolean,   //  是否是要上传多张图片
      url: [String, Array],   //  最初的图片路径
      width: [String, Number],  //  图片尺寸 - width
      height: [String, Number]  //  图片尺寸 - height
    },
    data () {
      return {
        list: [],
        dialogVisible: false,
        uploadImgUrl: `${process.env.API.USER}/v1/user/upload`,
        loading: false,
        initindex: 0,
        previewUrl: []   //  预览图片路径
      }
    },
    mounted () {
      if(!!this.file_list) {
        let val = this.value ? this.value.split(',') : []
        for(let i=0,len=this.url.length; i<len; i++) {
          this.previewUrl.push(this.url[i] + '?source=1')
          this.list.push({
            fid: val[i],
            url: this.url[i] + '?source=1'
          })
        }
      }else {
        this.previewUrl = this.url ? this.url + '?source=1' : ''
      }
    },
    watch: {
      value(val) {
        if(!val && !!this.file_list) {
          this.list = []
        }
      }
    },
    methods: {
      checkFile(file) {
        let type = file.type
        if(type !== 'image/jpeg' && type !== 'image/png') {
          this.$message.error('格式错误')
          return false
        }
      },
      uploadImg(event) {  //  文件上传
        let that = this
        that.loading = true
        let xhr = new Upload()
        xhr.setFormData({
          file: event.file,
        })
        xhr.request.method = 'post'
        xhr.request.url = that.uploadImgUrl
        xhr.httpSuccess = (res) => {
          let fid = res.data.fileinfo.fid
          let url = URL.createObjectURL(event.file)
          let val = fid

          if(!!that.file_list) {
            val = (!!that.value ? (that.value + ',') : '') + fid
            that.previewUrl.push(url)
            that.list.push({
              fid: fid,
              url: url
            })
          }else {
            that.previewUrl = URL.createObjectURL(event.file)
          }

          that.loading = false
          that.$emit('input', val)
        }
        xhr.uploadError = (res) => {
          that.$message.error(res.msg || '图片上传失败')
          that.loading = false
        }
        xhr.httpRequest()
      },
      remove(i) {
        if(!!this.value) {
          let val = this.value.split(',')
          val.splice(i, 1)
          this.$emit('input', val.join(','))
          this.list.splice(i, 1)
          this.previewUrl.splice(i, 1)
        }
      },
      preview(i) {
        this.initindex = i
        this.dialogVisible = true
      },
      datadragEnd (evt) { //  拖拽完成后的回调
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
      }
    }
  }
</script>


<style lang="less" type="text/less">
  .avatar-uploader {
    .el-upload {
      display: block;
      height: 100%;
      width: 100%;
      > div {
        height: 100%;
        display: table;
        width: 100%;
      }
      .el-icon-plus {
        width: 100%;
        height: 100%;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
      }
    }
  }
</style>
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
