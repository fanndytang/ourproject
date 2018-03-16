<!-- 页面主表格 -->
<template>
  <div>
    <!-- 表格 -->
    <div class="table" v-loading="{load: loading, msg: '请稍候'}">
      <table><tr>
          <th>ID</th>
          <th v-for="col,q in column" :key="q">{{col.label}}</th>
          <th>操作</th>
      </tr></table>
      <div class="table-body">
        <table>
          <tr v-for="item,i in list.data" :key="i">
            <td>{{ i+1 }}</td>
            <td v-for="col,q in column" :key="q">
              {{ item[col.prop] }}
            </td>
            <td>
              <button class="btn btn-text btn-sm" v-for="t,k in tableTools" :key="k" type="button"
                      @click="$root.eventHub.$emit(t.event, {data: item, index: k})">{{ t.label }}</button>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <!-- 分页 -->
    <rs-page @change="changePage" :pages="100" :current="10"></rs-page>
  </div>
</template>

<script>
  import RsList from '@/model/RsList'
  export default {
    props: {
      model: Object,                                                              //  当前页面使用的模型实例对象
      tools: Object,                                                              //  除增、删、改、查 额外的按钮
      column: Array                                                               //  表格显示的列
    },
    data () {
      return {
        list: {},
        loading: false,
        tableTools: [                                                             //  列表操作栏基本按钮（方便调整顺序）
          {label: '编辑', event: 'rs-list-edit'},
          {label: '删除', event: 'rs-list-del'},
          {label: '查看', event: 'rs-list-detail'}
        ]
      }
    },
    mounted () {
      /** 初始化表格对象 */
      this.list = new RsList({model: this.model})

      /** 检查是否有除 编辑、删除、查看 额外的按钮 */
      if(!!this.tools) {
        if(Object.prototype.toString.call(this.tools) === "[object array]") {
          for(let k in this.tools) {
            this.tableTools.splice(this.tools[k].pos, 0, this.tools[k].item)
          }
        }else {
          this.tableTools.splice(this.tools.pos, 0, this.tools.item)
        }
      }

      setTimeout(() => {
        this.loading = false
      }, 3000)

      /** 固定表头 js辅助 */
      let setTable = () => {
        let $table = document.querySelector('.table-body')
        $table.style.marginRight = $table.querySelector('table').clientHeight > 450 ? '-17px' : '0'
      }
      window.onresize = setTable
      this.$nextTick(() => {
        setTable()
      })

      /** 页面载入获取列表 */
      this.getList()

      /** 事件处理 */
      this.eventHandle()
    },
    methods: {
      /** 更新表格数据 */
      getList() {
        this.list.getList()
      },
      /** 事件操作汇总 */
      eventHandle() {
        let eventHandle = {
          "rs-get-list": () => {                                     //  获取列表
            this.getList()
          },
          "rs-list-edit": (data) => {                                //  编辑某一项数据
            data = data || {data: {}, index: ''}
            if(data.data.$unique === this.model.$unique) {
              //  操作data.data ，根据需要切换成详情页面数据
              this.$root.eventHub.$emit('rs-add-tab', data.data)
            }
          },
          "rs-list-del": (data) => {                                //  删除列表某一行
            data = data || {data: {}, index: ''}
            if(data.data.$unique === this.model.$unique) {
              //  调用删除方法，重新请求数据
              this.model.deleteOne()
            }
          }
        }

        for(let k in eventHandle) {
          this.$root.eventHub.$on(k, eventHandle[k])
        }
      },
      /** 页码改变 */
      changePage (val) {
        console.log(val)
      }
    }
  }
</script>

<style lang="less" scoped>
  .table {
    margin: 20px 0;
    font-size: 14px;
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    td, th {
      padding: 0 10px;
      border: 1px solid #dfe6ec;
      line-height: 32px;
      &:first-child {
        width: 40px;
        text-align: center;
      }
    }
    th {
      text-align: left;
      white-space: nowrap;
      background: #eef1f6;
      border-bottom: none;
    }
    tr {
      &:hover {
        background: #eef1f6;
      }
    }
    .table-body {
      max-height: 450px;
      overflow: auto;
    }
  }
</style>
