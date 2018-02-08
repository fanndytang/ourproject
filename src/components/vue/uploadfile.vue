<template>
  <div v-loading="loading" element-loading-text="上传中" style="min-width: 800px;display:inline-block;">
    <input type="hidden" :value="value" @input="value=$event.target.value">
    <el-upload
      style="display: inline-block;"
      class="upload-demo"
      :action="uploadurl"
      :before-upload="checkFile"
      :http-request="uploadFile"
      :show-file-list="false">
      <button type="button" class="btn btn-primary btn-sm">点击上传</button>
    </el-upload>
    <span>{{ name }}</span>
    <span class="close-btn" v-if="name != ''" @click="del()">&times;</span>
  </div>
</template>

<script>
  /** @vue */
  export default {
    data() {
      return {
        name: '',
        loading: false
      }
    },
    props: {
      value: String,
      uploadurl: String,
      filename: String,
      checkFile: {
        type: Function,
        default: (file) => {

        }
      }
    },
    mounted () {
      this.name = this.filename
    },
    methods: {
      del () {
        this.name = ''
        this.$emit('input', '')
      },
      del () {
        this.name = ''
        this.$emit('input', '')
      },
      uploadFile (event) {
        let that = this
        that.loading = true
        that.$xhr.upload({
          file: event.file,
          uploadUrl: that.uploadurl,
          success (res) {
            that.name = event.file.name
            that.$message.success(res.data.errmsg || '上传成功')
            that.loading = false

            that.$emit('input', res.data.fid_360)
          },
          error () {
            that.$message.error("上传失败")
            that.loading = false
          }
        })
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .close-btn {
    width: 20px;
    height: 20px;
    display: inline-block;
    text-align: center;
    line-height: 20px;
    margin: 0 10px;
    font-size: 18px;
    color: #999;
    background: #eee;
    border-radius:  50%;
    cursor: pointer;
    vertical-align: middle;
  }
</style>
