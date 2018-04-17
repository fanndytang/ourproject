/** 弹窗 */
var template3 = '<div class="rs-modal" v-show="value">\n' +
    '    <input type="hidden" :value="value" @input="value = $event.target.value">\n' +
    '    <div class="m-content">\n' +
    '      <span class="m-close" @click="$emit(\'input\', false)">&times;</span>\n' +
    '      <div class="m-head">{{ title }}</div>\n' +
    '      <div class="m-body">\n' +
    '        <slot></slot>\n' +
    '      </div>\n' +
    '      <div class="m-foot">\n' +
    '        <button class="btn btn-primary" type="button" @click="$emit(\'confirm\')">确定</button>\n' +
    '        <button class="btn" type="button" @click="$emit(\'input\', false)">取消</button>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>'

Vue.component('rs-modal', {
  template: template3,
    props: {
        value: Boolean,
        title: String
    },
    mounted () {

    }
})
