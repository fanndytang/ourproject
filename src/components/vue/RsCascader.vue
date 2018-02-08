<!-- 级联选择器 -->
<template>
  <div class="cascader">
    <input type="hidden" :value="value" @input="value = event.target.value">
    <input class="sel-label" type="text" v-model="label" placeholder="搜索" @blur="closeSelect" @focus="showSelect = true">
    <Child :options="options" :prop="prop" v-show="showSelect" v-model="val">
      <template slot="child" slot-scope="p">
        <Child :options="p.options" :prop="prop" :code="p.code" :label="p.label" :level="p.level" v-model="val"></Child>
      </template>
    </Child>
  </div>
</template>

<script>
  /** 子组件 */
  let Child = {
    props: {
      value: String,
      options: Array,                             //  下拉列表数组
      prop: Object,                               //  下拉列表显示名称与选中值的key
      code: {type: String, default: ''},          //  选中值组合
      label: {type: String, default: ''},         //  选中名称组合
      level: {type: Number, default: 1}
    },
    template:
    '<ul class="select-ul">' +
      '<li class="select-li" v-for="item,i in options" :key="i">' +
        '<input type="hidden" :value="value" @input="value = event.target.value" />' +
        '<div class="label" :class="{\'selected\': value.match(new RegExp(item[prop.value])) !== null}"' +
           '@click="$emit(\'input\', `${code},${item[prop.value]}`);$parent.$emit(\'click-li\', `${label},${item[prop.label]}`);">' +
           '{{ item[prop.label] }}' +
        '</div>' +
        '<slot name="child" :options="item[prop.children]" :code="`${code},${item[prop.value]}`" :label="`${label},${item[prop.label]}`" :level="level + 1"></slot>' +
      '</li>' +
    '</ul>',
    mounted () {
      /** 传递事件到最顶级 */
      this.$on('click-li', res => {this.$parent.$emit('click-li', res)})
      /** 初始化时设置显示的label */
      this.$nextTick(() => {
        if(!!this.value && this.value.split(',').length === this.level) {
          for(let k in this.options) {
            if(this.value.match(new RegExp(this.options[k][this.prop.value])) !== null) {
              this.$parent.$emit('click-li', `${this.label},${this.options[k][this.prop.label]}`); break;
            }
          }
        }
      })
    }
  }
  /** @vue */
  export default {
    props: {
      options: Array,
      prop: Object,
      value: [String, Array]
    },
    data () {
      return {
        label: '',
        val: '',
        showSelect: false
      }
    },
    watch: {
      /** 重置时，同时清空label */
      value (val) {
        if(!val) {
          this.label = ''
          this.val = ''
        }
      }
    },
    mounted () {
      /** 初始化值 */
      this.val = (this.value && typeof this.value !== 'string') ? this.value.join(',') : this.value
      /** 监听选中值的变化 */
      this.$on('click-li', res => {
        this.label = (res || '').replace(',', '').split(',').join('/')
        this.$emit('input', this.val.replace(/^,/, ''))
        this.$emit('change', this.val.replace(/^,/, ''))
        this.showSelect = false
      })
    },
    methods: {
      /** 关闭下拉框 */
      closeSelect() {
      //  setTimeout(() => {
       //   this.showSelect = false
       // }, 2000)
      }
    },
    components: {
      Child
    }
  }
</script>
<style lang="less" type="text/less">
  .cascader {
    position: relative;
  }
  .select-ul {
    position: absolute;
    top: 40px;
    left: 0;
    height: 300px;
    min-width: 100%;
    line-height: 36px;
    background: #fff;
    padding: 0;
    margin: 0;
    list-style: none;
    box-shadow:  1px 1px 5px rgba(0, 0, 0, .4);
    .select-li {
      cursor: pointer;
      .label {
        padding: 0 10px;
        &.selected {
          color: #1d90e6;
        }
        &:hover {
          background: #dfe6ec;
        }
      }
      .select-ul {
        left: 100%;
        display: none;
        top: 0;
      }
      &:hover > .select-ul {
        display: block;
      }
    }
  }
  .sel-label {
    height: 40px;
    border: 1px solid #dcdfe6;
    padding: 0 10px;
    border-radius: 5px;
  }
</style>
