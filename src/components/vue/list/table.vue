<template>
  <div>
    <div class="language" v-if="model.config.language">
      <el-select v-model="model.web_language" @change="getList(1)">
        <el-option label="中文简体" value="zh-cn"></el-option>
        <el-option label="中文繁体（香港）" value="zh-hk"></el-option>
        <el-option label="英文" value="en-us"></el-option>
        <el-option label="法文" value="fr-fr"></el-option>
        <el-option label="德文" value="de-de"></el-option>
      </el-select>
    </div>

    <table class="table">
      <thead>
      <tr>
        <th width="50"><el-checkbox v-model="check_all" @change="checkAll"></el-checkbox></th>
        <th width="50">ID</th>
        <th v-for="item,i in column" :key="i" :width="item.width || ''" @click="clickTh(item)" :style="item.sort ? 'cursor:pointer' : ''">
          {{ item.label }}
          <span style="float:right;line-height:33px;color:#666;" v-if="item.sort"
                :class="`fa ${model.rsListSort[item.sortKey ? item.sortKey : item.prop] === 1 ? 'fa-long-arrow-up' : 'fa-long-arrow-down'}`"></span>
        </th>
        <th v-if="!(!!model.config.notools || !model.config.edit&&!model.config.del&&!model.config.detail&&!!model.config.notools)">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="model.datalists && model.datalists.data" v-for="item,k in model.datalists.data" :key="k">
        <td><el-checkbox v-model="check_child[k]" @change="changeCheck"></el-checkbox></td>
        <td>{{ k+1 }}</td>
        <td v-for="el,i in column" :key="i">
          <my-td :item="item" :column="el" :type="'list'"></my-td>
        </td>
        <td v-if="!(!!item.config.notools || !item.config.edit&&!item.config.del&&!item.config.detail&&!!model.config.notools)">
          <slot name="table-tool" :index="k" :item="item"></slot>
          <span class="table-tool" v-if="item.config.edit" @click="editTab(item)">编辑</span>
          <span class="table-tool" v-if="item.config.del" @click="deleteOne(item, k)">删除</span>
          <a class="table-tool" v-if="item.config.detail" :href="item.list_detail_href" target="_blank">查看</a>
          <slot name="table-tool-end" :index="k" :item="item"></slot>
        </td>
      </tr>
      </tbody>
    </table>
    <table v-show="model.datalists.loading" class="p-loading"><tr><td><i class="i-load"></i>加载中</td></tr></table>
    <div class="no-data" v-if="!model.datalists.loading && model.datalists.data && model.datalists.data.length <= 0">
      暂无数据
    </div>

    <div class="public-page" v-if="model.datalists && model.datalists.pages > 1">
      <el-pagination layout="prev, pager, next" :current-page="model.datalists.current" @current-change="pageChange" :page-count="model.datalists.pages"></el-pagination>
    </div>
  </div>
</template>

<script>
  import td from './td.vue'
  export default {
    props: {
      model: Object,
      column: Array
    },
    data () {
      return {
        check_all: false,
        check_child: []
      }
    },
    mounted () {
      this.$store.state[this.model.$storeList] = {}

      /**
       * 监听是否有编辑、新增、审核、删除等动作，如果有，则重新请求数据
       * */
      this.$root.eventHub.$on('form-success-tab', (res) => {
        this.$store.state[this.model.$storeList] = {}
        this.$store.state[`${this.model.$storeList}Totals`] = {}
        this.getList(!!res && !!res.edit ? this.model.datalists.current : 1)
      })

      this.getList(1)
    },
    watch: {
      'model.datalists.data' (val) {
        this.check_child = []
        this.check_all = false
        for(let i=0,len=val.length; i<len; i++) {
          this.check_child.push(false)
        }
      },
    },
    methods: {
      /** 点击表格标题 */
      clickTh(item) {
        if(item.sort) {
          let asc = parseInt(this.model.rsListSort[item.sortKey ? item.sortKey : item.prop])
          this.$root.eventHub.$emit('rs-list-sort', {item: item})
          this.model.rsListSort[item.sortKey ? item.sortKey : item.prop] = asc === 1 ? -1 : 1
          this.$root.eventHub.$emit('form-success-tab')
        }
      },
      /**
       * 获取列表数据
       * */
      getList(p) {
        this.model.datalists.data = []
        this.model.datalists.loading = true
        this.model.datalists.current = p || 1

        this.$store.dispatch('getList', {
          lang: this.model.web_language || 'zh-cn',
          p: p || 1,
          rows: this.model.datalists.rows || 10,
          model: this.model,
          callback(res) {
            setTimeout(() => {
              this.model.datalists.data = res.data
              this.model.datalists.pages = res.pages
              this.model.datalists.totals = res.totals
              this.model.datalists.loading = false
            }, 50)
          }
        })
      },
      /**
       * 全选功能
       * */
      changeCheck(e) {
        let val = e.target.checked
        if(val) {
          let flag = true
          for(let k in this.check_child) {
            flag = flag && this.check_child[k]
          }
          this.check_all = flag
        }else {
          this.check_all = false
        }
      },
      checkAll(e) {
        let val = e.target.checked
        for(let k in this.check_child) {
          this.check_child[k] = val
        }
      },
      /**
       * 切换页码
       * */
      pageChange (val) {
        this.getList(val)
      },
      /**
       * 删除功能
       * */
      deleteOne(item) {
        let that = this
        item.afterSend = (res) => {
          let totals = that.model.datalists.totals
          let rows = 10
          res.edit = true
          if(totals%rows === 1 && that.model.datalists.current > 1) {
            -- that.model.datalists.current
          }
          that.$root.eventHub.$emit('form-success-tab', res)
        }
        item.afterError = (res) => {
          that.$message.error(res.msg || '删除失败')
        }
        item.delete_one()
      },
      /**
       * 编辑功能*/
      editTab(item) {
        let that = this
        if(!!item.config.detail) {
          item.get_detail({
            success (d) {
              that.$root.eventHub.$emit('add-tab', {tab_name: '编辑'+d.edit_name, item: d, originItem: item, edit: true})
            },
            error () {
              that.$root.eventHub.$emit('add-tab', {tab_name: '编辑'+item.edit_name, item: item, originItem: item, edit: true})
            },
            netError () {
              that.$root.eventHub.$emit('add-tab', {tab_name: '编辑'+item.edit_name, item: item, originItem: item, edit: true})
            }
          })
        }else {
          that.$root.eventHub.$emit('add-tab', {tab_name: '编辑'+item.edit_name, item: item, originItem: item, edit: true})
        }
      }
    },
    components: {
      'my-td': td
    }
  }
</script>


<style lang="less" type="text/less" scoped>
  .public-page {
    margin: 20px auto;
    text-align: center;
  }

  .no-data {
    text-align: center;
    line-height: 60px;
    font-size: 14px;
    color: #5e7382;
    border: 1px solid #dfe6ec;
    border-top: 0;
  }

  .table {
    width: 100%;
    font-size: 14px;
    border-collapse: collapse;
    th {
      text-align: left;
      white-space: nowrap;
      background: #eef1f6;
    }
    td, th {
      padding: 0 10px;
      border: 1px solid #dfe6ec;
      line-height: 32px;
    }
    tr {
      &:hover {
        background: #eef1f6;
      }
    }
  }
</style>

<style lang="less" type="text/less">
  .language {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 1000;
    .el-select {
      width: 160px;
      .el-input__inner {
        border-width: 0 0 1px 0;
        border-radius: 0;
      }
    }
  }
</style>
