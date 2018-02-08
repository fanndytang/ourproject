<!-- 版本管理 -->
<template>
  <rs-list :page_title="'版本管理'" :column="column" :model="model">
    <template slot="form-item" slot-scope="p">
      <span style="display:none;">{{ p.item.terminal = p.item.terminal || '2' }}</span>
      <span style="display:none;">{{ p.item.is_force = p.item.is_force || '1' }}</span>

      <el-form-item label="终端" prop="terminal" :rules="{required: true, message: '请选择终端', trigger: 'blur'}">
        <el-radio-group v-model="p.item.terminal">
          <el-radio :label="'1'">iOS</el-radio>
          <el-radio :label="'2'">安卓</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="强制更新" prop="is_force" :rules="{required: true, message: '请选择是否强制更新', trigger: 'blur'}">
        <el-radio-group v-model="p.item.is_force">
          <el-radio :label="'1'">是</el-radio>
          <el-radio :label="'0'">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="版本号" prop="version" :rules="{required: true, message: '请输入版本号', trigger: 'blur'}">
        <el-input v-model="p.item.version" placeholder="请输入版本号"></el-input>
      </el-form-item>
      <el-form-item label="版本描述" prop="details" :rules="{required: true, message: '请输入版本描述', trigger: 'blur'}">
        <el-input v-model="p.item.details" type="textarea" :rows="3" placeholder="请输入版本描述"></el-input>
      </el-form-item>
      <el-form-item label="上传文件" prop="fid" :rules="{required: parseInt(p.item.terminal) === 2, message: '请上传文件', trigger: 'change'}">
        <div class="upload" v-loading="loading" element-loading-text="上传中">
          <input type="file" :id="`version${p.item.id}`" @change="uploadFile($event, p.item)">
          <button type="button" class="btn btn-primary btn-sm">点击上传</button>
          <span>{{ p.item.uploadFileName }}</span>
          <span class="close-btn" v-if="p.item.uploadFileName != ''" @click="del(p.item)">&times;</span>
        </div>
        <input type="hidden" v-model="p.item.fid">
      </el-form-item>
    </template>
  </rs-list>
</template>

<script>
  import Version from '@/model/system/version'
  import Upload from '@/model/api/upload'
  /** @vue */
  export default {
    data() {
      return {
        model: new Version(),
        loading: false,
        column: [
          {prop: 'terminal_name', label: '终端'},
          {prop: 'force_name', label: '强制更新'},
          {prop: 'version', label: '版本号'},
          {prop: 'details', label: '版本描述'},
          {prop: 'name', label: '文件'},
          {prop: 'username', label: '操作人'},
          {prop: 'handler_time', label: '操作时间', type: 'date'},
        ]
      }
    },
    methods: {
      /** 上传 文件 */
      uploadFile(event, item) {
        let that = this
        let file = event.target.files[0]
        let type = file.name.substr(-4)

        if(parseInt(item.terminal) === 2) {
          if(type !== '.apk') {
            this.$message.error('文件格式不正确')
            return false
          }
        }
        let xhr = new Upload()
        xhr.setFormData({
          file: file
        })
        xhr.request.method = 'post'
        xhr.request.url = `${process.env.API.SYSTEM}/version/media/upload`
        xhr.httpSuccess = res => {
          item.uploadFileName = file.name
          that.$message.success(res.data.errmsg || '上传成功')
          that.loading = false
          item.fid = res.data.fileinfo.fid
          item.sha1 = res.data.fileinfo.sha1
          item.file_size = res.data.fileinfo.file_size
          item.md5 = res.data.fileinfo.md5
          document.getElementById(`version${item.id}`).value = ''
          item.filetype = file.name.substr(-4)
        }
        xhr.uploadError = res => {
          that.$message.error(res.msg || '上传失败')
          that.loading = false
          document.getElementById(`version${item.id}`).value = ''
        }
        xhr.httpRequest()
      },
      /** 删除文件 */
      del (item) {
        item.uploadFileName = ''
        item.fid = ''
        item.sha1 = ''
        item.file_size = ''
        item.md5 = ''
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .upload {
    position: relative;
    input[type=file] {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      width: 70px;
      opacity: 0;
      z-index: 10;
      cursor: pointer;
    }
  }
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


