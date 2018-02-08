
<template>
  <div v-loading="loading" element-loading-text="上传中"  :id="'editorbox'+id">
    <!-- 数据双向绑定 -->
    <input type="hidden" :value="value" @input="value=$event.target.value">
    <!-- 自定义图片上传 -->
    <input type="file" :id="`editor-input${id || ''}`" @change="uploadImg($event)" style="display:none;">
    <!-- 编辑器 -->
    <textarea :id="'editor'+id" type="text/plain"></textarea>
  </div>
</template>

<script>
 // import '@/assets/utf8-php/ueditor.config'
  //import '@/assets/utf8-php/ueditor.all.min'
  //import '@/assets/utf8-php/lang/zh-cn/zh-cn'
 // import '@/assets/utf8-php/ueditor.parse.min'
 import UE from 'UE'

  import sha from '@/plugin/sha1'
//  import _ from 'lodash'
  import Upload from '@/model/api/upload'
  import quillcss from '@/components/vue/editorcss'
  /** @vue */
  export default {
    props: {
      value: String,                              //  绑定的值
      sha: String,                                //  上传图片时，sha加密的字符串，默认为editor
      detail: Boolean,                            //  上传图片时，是否需要传details=1
      id: String                                  //  为保证编辑器的唯一性，传一个Id区分
    },
    data () {
      return {
        loading: false,                          //  上传图片时，loading
        editor: null                             //  编辑器
      }
    },
    mounted () {
      let that = this
      /** 初始化编辑器 */
      this.editor = UE.getEditor('editor'+this.id, {
        scaleEnabled: true,
        allowDivTransToP: false,
        initialFrameHeight:300
      })
      /** 编辑器初始化完成时，设置编辑器内容 */
      this.editor.ready(function() {
        let txt = that.value || ''
        let hasbody = txt.indexOf('head><body')
        if(hasbody !== -1) {
          txt = txt.substr(txt.indexOf('head><body')).replace(/.*<body[^>]*>/, '').replace(/<\/body.*/, '')
        }
        let hastxt = !!txt ? 1 : 0  //  是否有内容
        if(txt.indexOf('my-frame-text1') === -1) {
          txt = `<div class="ql-editor my-frame-text my-frame-text1" id="my-frame-text">${txt}</div>`
        }
        that.$emit('input', `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"><title></title>${quillcss}</head><body hastxt="${hastxt}">${txt}</body></html>`)

        that.editor.setContent(txt)
      });
      /** 自定义图片上传 */
      document.querySelector(`#editor${this.id || ''} .edui-for-simpleupload`).onclick = () => {
        if(document.all) { //IE
          document.querySelector(`#editorbox${this.id || ''} #editor-input${this.id || ''}`).click();
        } else {  // 其它浏览器
          let e = document.createEvent("MouseEvents");
          e.initEvent("click", true, true);
          document.querySelector(`#editorbox${this.id || ''} #editor-input${this.id || ''}`).dispatchEvent(e);
        }
      }
     /* $(document).on('click', '#editor' +this.id+ ' .edui-for-simpleupload', (e) => {
         $('#editorbox' +this.id + ' #editor-input'+(this.id || '')).click()
      })*/
      /** 监听编辑器内容改变事件，设置value */
      this.editor.addListener('contentChange',() => {
        let txt = that.editor.getContent()
        let hastxt = !!txt ? 1 : 0  //  是否有内容
        if(txt.indexOf('my-frame-text1') === -1) {
          txt = `<div class="ql-editor my-frame-text my-frame-text1" id="my-frame-text">${txt}</div>`
        }
        txt = `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"><title></title>${quillcss}</head><body hastxt="${hastxt}">${txt}</body></html>`
        that.$emit('input', txt)
      })
    },
    methods: {
      /** 上传图片 */
      uploadImg (event) {
        let that = this
        that.loading = true
        let xhr = new Upload()
        xhr.setFormData({
          file: event.target.files[0],
        })
        xhr.request.method = 'post'
        xhr.request.url = `${process.env.API.USER}/v1/user/upload`
        xhr.httpSuccess = (res) => {
          that.editor.execCommand('inserthtml', `<img src="${process.env.API.USER}/v1/user/getfile/${res.data.fileinfo.fid}?editor=${sha(that.sha || 'editor')}${that.detail ? '&details=1': ''}" />`, true);
          that.loading = false
        }
        xhr.uploadError = (res) => {
          that.$message.warning("图片增加失败")
          document.getElementById(`editor-input${this.id || ''}`).value = ''
         // $('#editor-input').val('')
          that.loading = false
        }
        xhr.httpRequest()
      }
    }
  }
</script>
<style lang="less">
  .edui-editor-toolbarboxinner .edui-default {
    line-height: 20px;
  }
  .edui-default .edui-toolbar .edui-for-simpleupload .edui-state-disabled .edui-icon {
    opacity: 1;
  }
  .edui-editor-bottomContainer .edui-default {
    margin-bottom: 0;
  }
  .edui-editor-iframeholder {
    width: 100% !important;
  }
</style>
