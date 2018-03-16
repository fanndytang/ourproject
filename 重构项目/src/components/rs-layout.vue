<!-- 通用页面布局（搜索区、表格区、新增tab、多语言、导出数据等） -->
<template>
  <div class="p-tab" ref="tabs">
    <div class="p-header clearfix">
      <ul class="t-title">
        <li :class="{'active': active === 0}" @click="active = 0">{{label}}</li>
        <li v-for="item,i in tabs" :key="i" :class="{'active': active === i+1}">
          <span class="text" @click="active = i+1;$root.form=item;">{{ item.tabTitle }}</span>
          <span class="close" @click="closeTab(i)">&times;</span>
        </li>
      </ul>

      <div class="export" v-if="active === 0" @click="$root.eventHub.$emit('rs-list-export')">
        <span class="fa fa-file-excel-o"></span><div>导出</div>
      </div>

      <rs-select class="lang" v-if="active === 0" @change="$root.eventHub.$emit('rs-list-lang')"
                 :list="[{label: '中文', value: '0'}, {label: '英文', value: '1'}]" :prop="{label: 'label', value: 'value'}"></rs-select>
    </div>

    <!-- 搜索区、表格区 -->
    <div v-show="active === 0">
      <slot></slot>
    </div>


    <!-- 表单区 -->
    <form class="tab-form" v-show="active !== 0" id="globalFormItem">
      <slot name="form-item"></slot>

      <div class="form-item btns" v-if="$root.form.formBtns">
        <button v-for="item,i in $root.form.formBtns" :class="`btn ${item.btnClass || ''}`" type="button"
                v-check="{ref: '#globalFormItem', callback: item.handle}">
          {{ item.label }}
        </button>
      </div>
    </form>

    <button class="btn btn-primary" type="button" v-if="active === 0"
            @click="$root.eventHub.$emit('rs-add-tab')">新增tab</button>
  </div>
</template>

<script>
  export default {
    props: {
      label: String                                                                      //  表格标题
    },
    data () {
      return {
        active: 0,                                                                      //  激活中的tab
        tabs: []                                                                        //  tab列表
      }
    },
    mounted () {
      /** 监听 rs-add-tab 事件，新增tab */
      this.$root.eventHub.$on('rs-add-tab', (data) => {
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
          this.$root.form = data || {}

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
        this.$root.form = !!this.tabs.length && this.tabs[this.tabs.length] ? this.tabs[this.tabs.length] : {}
        this.active = this.tabs.length
      }
    }
  }
</script>

<style lang="less" scoped>
  .p-tab {
    padding: 20px;
    background: #fff;
    .p-header {
      line-height: 32px;
      font-size: 14px;
      border-bottom: 1px solid #d1dbe5;
      margin: 0 0 20px 0;
      .t-title {
        list-style: none;
        padding: 0;
        margin: 0;
        color: #8391a5;
        display: inline-block;
        li {
          display: inline-block;
          padding: 0 12px;
          cursor: pointer;
          &:hover {
            color: #20a0ff;
          }
          .text {
            padding: 0 12px;
            margin: 0 -12px;
            display: inline-block;
          }
          .close {
            margin-right: -12px;
            padding-right: 5px;
            font-size: 19px;
            display: inline-block;
            vertical-align: middle;
          }
        }
        .active {
          color: #20a0ff;
          border-bottom: 3px solid #20a0ff;
        }
      }
      .export, .lang {
        float: right;
      }
      .export {
        text-align: center;
        font-size: 12px;
        cursor: pointer;
        line-height: 17px;
        margin: -3px 0 0 10px;
        .fa {
          font-size: 18px;
        }
      }
    }
  }
  .btns {
    padding-left: 100px;
    .btn {
      margin: 20px 10px 0 0;
    }
  }
</style>
<style lang="less">
  .tab-form {
    .form-item {
      margin-bottom: 8px;
      line-height: 30px;
      input[type=text] {
        width: 360px;
        height: 30px;
      }
      .va-error {
        left: 500px;
        top: 10px;
      }
    }
    .label {
      width: 100px;
    }
  }
</style>
