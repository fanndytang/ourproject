<template>
  <div :id="`select-${search ? search.value : ''}`">
    <input type="hidden" :value="value" @input="value = $event.target.value">
    <el-select placeholder="请选择"
      clearable
      filterable
      :remote="!!(remoteInit && remoteInit.query)"
      default-first-option
      :remote-method="remoteMethod"
      :loading="loading"
      :multiple="multiple"
      @change="change"
      @visible-change="changeVisible"
      v-model="val">
      <el-option
        v-for="item,i in model.datalists.data"
        :key="i"
        v-if="item && item[prop.value]"
        :label="item[prop.label]"
        :value="item[prop.value]"></el-option>
      <div class="getmore" @click="getMore" v-if="model.datalists.current < model.datalists.pages">
        <span v-show="model.datalists.loading">正在加载<i class="el-icon-loading"></i></span>
        <span v-show="!model.datalists.loading">获取更多</span>
      </div>
    </el-select>
  </div>
</template>

<script>
  /** @vue */
  export default {
    props: {
      model: Object,        //  实例化对象
      prop: Object,         //  下拉时，对应的健值对
      search: Object,       //  搜索时，有些数据有分页，且搜索后要记录内容，通过此属性可实现
      value: [String,Number],        //  v-model 绑定的值
      multiple: Boolean,    //  是否可多选
      change: {             //  值发生改变成要执行的操作
        type: Function,
        default: () => {}
      },
      rows: {                //  每页多少条
        type: [String, Number],
        default: 10
      },
      lang: String,          //  当前语言
      remoteInit: Object      // 远程搜索用到，类似于search {value, label}
    },
    data () {
      return {
        val: '',
        loading: false,
        remoteSearch: false   // 是否远程搜索过
      }
    },
    watch: {
      lang (val) {
        if(val && typeof val === 'string' && val.split(',').length === 1) {
          this.model.datalists.data = []
          this.model.datalists.current = 1
          this.val = this.multiple ? [] : ''

          this.model.web_language = val
          this.getList(1)
        }
      },
      value(val) {
        if(!val) {
          this.val = this.multiple ? [] : ''
        }
      },
      val (val) {
        if(!!val && typeof val !== 'string') {
          val = val.join(',')
        }
        this.$emit('input', val)
        this.$emit('change', val)
        //  保存当前改变的值
        if(this.search && this.search.value) {
          setTimeout(() => {
            if(this.multiple) {
              //  let label = $(`#select-${this.search.value}`).find('input[type=text]').val()
              //  sessionStorage.setItem(this.search.label, label)
            }else {
            ///  let label = $(`#select-${this.search.value}`).find('input[type=text]').val()
              let label = document.querySelector(`#select-${this.search.value} input[type=text]`).value
              sessionStorage.setItem(this.search.label, label)
            }
          }, 200)
        }
      }
    },
    mounted () {
      let that = this
      that.model.web_language = this.lang || this.model.web_language || 'zh-cn'
      if(that.multiple) {
        that.val = that.value && typeof that.value === 'string' ? that.value.split(',') : that.value || []
      }else {
        that.val = (that.value).toString()
      }
      if(this.search && this.remoteInit) {
        let v = this.remoteInit.value
        let l = this.remoteInit.label
        sessionStorage.removeItem(this.search.value)
        sessionStorage.removeItem(this.search.label)
        if(v) {
          if(this.multiple) { v = typeof v !== 'string' ? v.join(',') : v}
          sessionStorage.setItem(this.search.value, v)
        }
        if(l) {
          if(this.multiple) {l =  typeof l !== 'string' ? l.join(',') : l}
          sessionStorage.setItem(this.search.label, l)
        }
      }
      that.getList(1, that.searchBrand)
    },
    methods: {
      getList (p, callback) {
        let that = this
        that.$store.dispatch(`getList`, {
          lang: that.lang || that.model.web_language || 'zh-cn',
          p: p || 1,
          rows: that.rows || 10,
          model: that.model,
          callback (res) {
            that.model.datalists.data = that.$store.state[that.model.$storeList][that.lang || that.model.web_language || 'zh-cn']
            if(that.search && that.search.value && callback) {
              callback(that.model.datalists)
            }
            that.model.datalists.pages = res.pages
            that.model.datalists.loading = false
            that.loading = false
          }
        })
      },
      searchBrand (list) {
        let start = list.current - 1
        let data = list.data
        let flag = false
        let len = list.data.length || this.rows
        let value = sessionStorage.getItem(this.search.value) || ''
        if(this.multiple) {
          let c = {}
          value = typeof value === 'string' ? value.split(',') : value
          for(let k in value) {
            c[value[k]] = 1
          }
          value = c
        }
        for(let i=start; i<len; i++) {
          if(data[i]) {
            if(this.multiple) {
              if(value[data[i][this.prop.value].toString()]) {
                value[data[i][this.prop.value].toString()] = 'has_value'
               // break;
              }
            }else {
              if(data[i][this.prop.value].toString() === value.toString()) {
                flag = true
                break;
              }
            }
          }
        }
        let res = this.value || sessionStorage.getItem(this.search.value) || ''

        if(this.multiple) {
          let label = sessionStorage.getItem(this.search.label) || ''
          label = label && typeof label === 'string' ? label.split(',') : []
          res = res ? (typeof res === 'string' ? res.split(',') : res) : []
          for(let k=0,klen=res.length; k<klen; k++) {
            if(value[res[k]] !== 'has_value') {
              list.searchflag = true
              let d = {}
              d[this.prop.value] = res[k]
              d[this.prop.label] = label[k] || ''
              list.data.push(d)
              list.searchindex = list.data.length
            }
          }
        }else {
          list.searchflag = !flag && !!value
          if(!flag && !!value) {
            let d = {}
            d[this.prop.value] = value
            d[this.prop.label] = sessionStorage.getItem(this.search.label) || ''
            list.data.push(d)
            list.searchindex = list.data.length
          }
        }
        this.val = res
      },
      getNext(list) {
        let value = sessionStorage.getItem(this.search.value) || ''
        if(!!list.searchflag) {
          let len = list.data.length || this.rows
          let start =( list.current - 1) * this.rows - 1
          let data = list.data
          let flag = false

          if(this.multiple) {
            let c = {}
            value = typeof value === 'string' ? value.split(',') : value
            for(let k in value) {
              c[value[k]] = 1
            }
            value = c
          }

          for(let i=start; i<len; i++) {
            if(data[i] && data[i].current_model) {
              if(this.multiple) {
                if(value[data[i][this.prop.value].toString()]) {
                  for(let q in list.data) {
                    if(list.data[q][this.prop.value].toString() === data[i][this.prop.value].toString() && !list.data[q].current_model) {
                      list.data.splice(q, 1)
                      break;
                    }
                  }
                }
              }else {
                if(data[i][this.prop.value].toString() === value.toString()) {
                  list.data.splice(list.searchindex-1, 1)
                  flag = true
                  break;
                }
              }
            }
          }

          if(this.multiple) {

          }else {
            list.searchflag = !flag && !!value
          }
        }
      },
      getMore () {
        let that = this
        that.getList(++that.model.datalists.current, that.getNext)
      },
      /** 远程搜索 */
      remoteMethod(query) {
        let that = this
        that.model.pkeysearch[that.remoteInit.query] = query
        that.$store.state[that.model.$storeList] = {}
        that.$store.state[`${this.model.$storeList}Totals`] = {}
        that.model.datalists.current = 1
        that.remoteSearch = true
        if (query !== '') {
          that.loading = true
          that.getList()
        } else {
          that.model.datalists.data = []
          that.model.datalists.pages = 0
          that.model.datalists.loading = false
        }
      },
      /** 下拉框隐藏或出现时触发事件 */
      changeVisible(flag) {
        if(!flag) { //  隐藏时，重新获取一次列表
          if(this.remoteSearch) {
            this.model.pkeysearch[this.remoteInit.query] = ''
            this.$store.state[this.model.$storeList] = {}
            this.$store.state[`${this.model.$storeList}Totals`] = {}
            this.model.datalists.current = 1
            this.remoteSearch = false
          }
          setTimeout(() => {
            if(this.search && this.search.value) {
          //   let label = $(`#select-${this.search.value}`).find('input[type=text]').val()
              let label = document.querySelector(`#select-${this.search.value} input[type=text]`).value
              sessionStorage.setItem(this.search.label, label)
              sessionStorage.setItem(this.search.value, this.value)
            }
            this.getList(1, this.searchBrand)
          }, 200)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .getmore {
    text-align:center;
    color: #999;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      background: #e4e8f1;
    }
  }
</style>
