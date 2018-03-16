var template = '<div class="rs-select form-item">\n' +
    '    <input type="hidden" @input="value = $event.target.value" :value="value">\n' +
    '    <input type="text" v-model="label" @focus="showList = true" @blur="showList = false" placeholder="请选择">\n' +
    '    <ul class="down" v-show="showList">\n' +
    '      <li v-for="item,i in selectList" :key="i" @mousedown="selectItem(item)">{{item[prop.label]}}</li>\n' +
    '    </ul>\n' +
    '  </div>'

Vue.component('rs-select', {
  template: template,
    props: {
        value: String,                                //  选中的值
        list: Array,                                  //  直接传入可选择的列表，list 与 model 互斥
        model: Object,                                //  传model,则表示是自定义对象，且可以使用getList 一系列方法
        prop: Object                                  //  label, value
    },
    data () {
        return {
            showList: false,                            //  是否显示下拉列表
            label: '',                                  //  当前选择的标签名
            selectList: []                              //  可以选择的下拉列表
        }
    },
    mounted () {
        if(typeof this.list !== 'undefined') {
            this.selectList = this.list
        }else if(typeof this.model !== 'undefined') {

        }
    },
    methods: {
        /** 选择某个值 */
        selectItem(item) {
            this.label = item[this.prop.label]
            this.$emit('input', item[this.prop.value])
            this.$emit('change', item[this.prop.value])
        }
    }
})

