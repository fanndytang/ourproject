<template>
  <el-form :model="item.data" ref="form" label-width="120px" :style="!!form_self_btn ? 'padding-bottom: 60px;position:relative;' : ''" v-loading="loading" element-loading-text="提交中">
    <slot :item="item.data" :edit="item.edit" name="form-item"></slot>
    <el-form-item label="所属语言" prop="lang" v-if="item.data.config.language && item.edit && !item.data.edit_lang_one" style="width: 700px;">
      <el-select v-model="lang" multiple>
        <el-option label="中文简体" value="zh-cn"></el-option>
        <el-option label="中文繁体（香港）" value="zh-hk"></el-option>
        <el-option label="英文" value="en-us"></el-option>
        <el-option label="法文" value="fr-fr"></el-option>
        <el-option label="德文" value="de-de"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="!form_self_btn">
      <button class="btn btn-primary" type="button" @click="subForm()">提交</button>
    </el-form-item>
  </el-form>
</template>

<script>
  /**
   * @vue
   * */
  export default {
    props: {
      item: Object,
      form_self_btn: Boolean   //  调用的页面是否需要自定义提交按钮
    },
    data () {
      return {
        loading: false,
        lang: []   //  web_language 的转接
      }
    },
    watch: {
      /**
       * lang 需要为数组，此处转换一下
       * */
      lang (val) {
        if(typeof this.item.data.web_language !== 'string') {
          this.item.data.web_language = val.join(',')
        }else {
          this.item.data.web_language = val
        }
      }
    },
    mounted () {
      /**
       * lang 需要为数组，此处转换一下
       * */
      if(this.item.data.web_language) {
        if(typeof this.item.data.web_language === 'string') {
          this.lang = this.item.data.web_language.split(',')
        }else {
          this.lang = this.item.data.web_language
        }
      }

      this.$root.eventHub.$on('sub-form', (res) => {
        this.subForm(res)
      })
    },
    methods: {
      /**
       * 提交表单
       * */
      subForm(res) {
        let that = this
        let item = res || that.item
        let form = that.$refs['form']
        if(!!form) {
          that.$refs['form'].validate((valid) => {
            if(res && res.errmsg) {
              that.$message.error(res.errmsg)
            }
            if (!valid)  return false
            that.loading = true
            item.data.afterSend = (res) => {
              res.edit = item.edit
              that.$root.eventHub.$emit('form-success-tab', res)
              that.loading = false
            }
            item.data.afterError = res => {
              that.$message.error(res.msg || '请求失败')
              that.loading = false
            }
            item.edit ?  item.data.update() :  item.data.add()
          })
        }
      }
    }
  }
</script>
