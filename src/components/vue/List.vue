<template>
  <div class="tabs">
    <ul class="tab-title" v-if="!!page_title">
      <li @click="active = 0" :class="{'active': active === 0}">{{ page_title }}列表</li>
      <li v-for="(item, i) in tabs" :key="i" :class="{'active': active === i+1}">
        <span @click="active = i+1" class="text">{{ item.tab_title }}</span>
        <span @click="removeTab(i)" class="close">&times;</span>
      </li>
    </ul>

    <!-- 导出数据组件 -->
    <div v-if="model.config.exp_data"><rs-export-file :model="model"></rs-export-file></div>

    <div class="tab-pane" v-show="active === 0">
      <!-- 导出数据入口 -->
      <div v-if="model.config.exp_data" class="export-btn" @click="$root.eventHub.$emit('show-export-file-window')">
        <span class="fa fa-file-excel-o"></span>
        <span>导出</span>
      </div>
      <!-- 搜索  -->
      <my-search v-if="model.config.search" :model="model">
        <template slot="search"><slot name="search"></slot></template>
      </my-search>
      <!-- 表格  -->
      <my-table :model="model" :column="column">
        <template slot="table-tool" slot-scope="p"><slot name="table-tool" :index="p.k" :item="p.item"></slot></template>
        <template slot="table-tool-end" slot-scope="p"><slot name="table-tool-end" :index="p.k" :item="p.item"></slot></template>
      </my-table>
      <!-- 新增 -->
      <button v-if="model.config.add" style="margin: 30px 0 0 0;" class="btn btn-primary"
              type="button" @click="addTab({tab_name: `新增${page_title}`})">新增{{ page_title }}</button>
    </div>
    <div class="tab-pane newtab-form" v-for="(item, i) in tabs" :key="i" v-if="active === i+1">
      <slot :item="item.data" :index="i" :name="item.slot_name" :edit="item.edit" v-if="!!item.slot_name"></slot>
      <div v-else>
        <my-form :item="item" :form_self_btn="form_self_btn">
          <template slot="form-item"><slot name="form-item" :item="item.data" :edit="item.edit"></slot></template>
        </my-form>
      </div>
    </div>
  </div>
</template>

<script>
  import table from './list/table.vue'
  import form from './list/form.vue'
  import search from './list/search.vue'
  /** @vue */
  export default {
    props: {
      page_title: String,
      column: Array,
      model: Object,   // 改版
      form_self_btn: Boolean  //  使用slot.form-item时，是否要自定义表单提交按钮
    },
    data() {
      return {
        tabs: [],
        active: 0,
        show_export: false     //  是否显示导出数据弹窗
      }
    },
    mounted () {
      /**
       * 监听是否需要关闭 某个tab
       * */
      this.$root.eventHub.$on('form-success-tab', (res) => {
        if(res && res.data && res.data.errmsg) {
          this.$message.success(res.data.errmsg)
        }
        this.tabs.splice(this.active - 1, 1)
        this.active = 0
      })

      /**
       * 监听是否要增加 tab
       * */
      this.$root.eventHub.$on('add-tab', (data) => {
        this.addTab(data)
      })
    },
    methods: {
      /**
       * 添加 tab
       * */
      addTab(data) {
        let model = !!data.item ? data.item : new this.model.current_model()
     //   model.web_language = this.language
        this.tabs.push({
          data: model,
          tab_title: data.tab_name,
          slot_name: data.slot_name || '',
          edit: !!data.edit
        })
        this.active = this.tabs.length
        /**
         * 发送一个事件，表示添加 tab 成功
         * */
        this.$root.eventHub.$emit('add-tab-success', {
          originItem: !!data.originItem ? data.originItem : {},
          item: model,
          edit: !!data.edit,
          slot_name: data.slot_name
        })
      },
      /**
       * 移除 tab
       * */
      removeTab(i) {
        this.tabs.splice(i, 1)
        this.active = this.tabs.length
      },
    },
    destroyed() {
      //  销毁实例时，销毁全局事件，防止冲突
      this.$root.eventHub.$off('add-tab-success')
      this.$root.eventHub.$off('form-success-tab')
      this.$root.eventHub.$off('sub-form')
    },
    components: {
      'my-table': table,
      'my-form': form,
      'my-search': search
    }
  }
</script>

<style lang="less" scoped>
  .tabs {
    padding: 20px;
    position: relative;
    font-size: 14px;
    .tab-title {
      list-style: none;
      padding: 0;
      margin: 0 0 20px 0;
      color: #8391a5;
      line-height: 32px;
      border-bottom: 1px solid #d1dbe5;
      li {
        padding: 0 12px;
        display: inline-block;
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
        }
      }
      .active {
        color: #20a0ff;
        border-bottom: 3px solid #20a0ff;
      }
    }
  }
  .export-btn {
    position: absolute;
    right: 20px;
    text-align: center;
    font-size: 12px;
    color: #666;
    cursor: pointer;
    top: 16px;
    .fa {
      display: block;
      font-size: 18px;
    }
  }
</style>
