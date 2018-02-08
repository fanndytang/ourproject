import SelectScroll from '@/components/vue/SelectScroll'
import PreviewImg from '@/components/vue/PreviewImg'
import UploadImg from '@/components/vue/UploadImg'
import List from '@/components/vue/List'
import Detail from '@/components/vue/Detail'
import Draggable from 'vuedraggable'
import carousel from '@/components/vue/carousel'
import Rscascader from '@/components/vue/RsCascader'
import Editor from '@/components/vue/Editor'
import PreviewVideo from '@/components/vue/PreviewVideo'
//import uploadfile from '@/components/vue/uploadfile'
import inputnumber from '@/components/vue/input-number'
import cropper from '@/components/vue/cropper'
import uploadfile from '@/components/vue/uploadfile'
import exportfile from '@/components/vue/exportfile'


// 导出组件
export default {
  install: function(Vue){
    Vue.component('select-scroll',SelectScroll)
    Vue.component('upload-img', UploadImg)
    Vue.component('preview-img', PreviewImg)
    Vue.component('rs-list', List)
    Vue.component('rs-detail', Detail)
    Vue.component('rs-draggable', Draggable)
    Vue.component('rs-carousel', carousel)
    Vue.component('rs-cascader', Rscascader)
    Vue.component('rs-editor', Editor)
    Vue.component('preview-video', PreviewVideo)
    Vue.component('rs-uploadfile', uploadfile)
    Vue.component('input-number', inputnumber)
    Vue.component('rs-cropper', cropper)
    Vue.component('rs-export-file', exportfile)
  }
}
