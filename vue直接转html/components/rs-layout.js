/** 通用页面布局（搜索区、表格区、新增tab、多语言、导出数据等） */

var template = `
         <div style="padding: 0 20px;" class="p-tab" ref="tabs">
    <div class="p-header clearfix">
      <ul class="t-title">
        <li :class="{'active': active === 0}" @click="active = 0">{{label}}</li>
        <li v-for="item,i in tabs" :key="i" :class="{'active': active === i+1}">
          <span class="text" @click="active = i+1;tabForm=item;">{{ item.tabTitle }}</span>
          <span class="close" @click="closeTab(i)">&times;</span>
        </li>
      </ul>

      <button class="btn btn-primary btn-sm export" v-if="active === 0" @click="eventHub.$emit('rs-list-export')">
        <span class="fa fa-file-excel-o"></span><div>导出</div>
      </button>

      <rs-select class="lang" v-if="active === 0" @change="eventHub.$emit('rs-list-lang')"
                 :list="[{label: '中文', value: '0'}, {label: '英文', value: '1'}]" :prop="{label: 'label', value: 'value'}"></rs-select>
    </div>

    <!-- 搜索区、表格区 -->
    <div v-show="active === 0">
      <slot></slot>
    </div>


    <!-- 表单区 -->
    <form class="tab-form" v-show="active !== 0" id="globalFormItem">
      <slot name="form-item"></slot>

      <div class="form-item btns" v-if="tabForm.formBtns">
        <button v-for="item,i in tabForm.formBtns" :class="'btn ' + item.btnClass" type="button"
                v-check="{ref: '#globalFormItem', callback: item.handle}">
          {{ item.label }}
        </button>
      </div>
    </form>

    <button class="btn btn-primary" type="button" v-if="active === 0"
            @click="eventHub.$emit('rs-add-tab')">新增tab</button>
  </div>
        `


Vue.component('rs-layout',{
    template: template,

    props: {
        label: String                                                                      //  表格标题
    },
    data () {
        return {
            eventHub: window.$eventHub,
            tabForm: window.$tabForm,
            active: 0,                                                                      //  激活中的tab
            tabs: []                                                                        //  tab列表
        }
    },
    mounted () {
        /** 监听 rs-add-tab 事件，新增tab */
        window.$eventHub.$on('rs-add-tab', (data) => {
            if(this.$refs.tabs.style.display !== 'none') {
                data = data || {}
                data.slotName = data.slotName || 'formItem'
                data.tabTitle = data.tabTitle || '新标签'

                /** 表单提交按钮 */
                if(!data.formBtns) {
                    data.formBtns = [
                        {
                            label: '确定',
                            btnClass: 'btn-primary',
                            handle: () => {
                                console.log('确定')
                            }
                        },
                        {
                            label: '取消',
                            handle: () => {
                                console.log('取消')
                            }
                        }
                    ]
                }

                /** 更新要显示的表单元素 */
                this.tabForm = data || {}

                /** 保存新增加的tab */
                this.tabs.push(data)
                this.active = this.tabs.length
            }
        })
    },
    methods: {
        /** 关闭tab */
        closeTab(i) {
            this.tabs.splice(i, 1)
            this.tabForm = !!this.tabs.length && this.tabs[this.tabs.length] ? this.tabs[this.tabs.length] : {}
            this.active = this.tabs.length
        }
    }
})
