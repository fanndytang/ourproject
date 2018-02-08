<template>
  <!-- 搜索 -->
  <el-form :inline="true" :model="model.pkeysearch" ref="search" label-width="100px" class="form-search">
    <slot name="search"></slot>

    <el-form-item>
      <button class="btn btn-primary" type="button" @click="model.search()">查询</button>
      <button class="btn" type="button" @click="model.reset();$root.eventHub.$emit('click-btn-reset');">重置</button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    props: {
      model: Object
    },
    mounted () {
      /** 页面载入时读取本地缓存 */
      let sessionkey = this.model.sessionkey_search
      if(sessionStorage.getItem(`${sessionkey}-pkeysearch`)) {
        let key = sessionStorage.getItem(`${sessionkey}-pkeysearch`).split(',')
        for(let k in key) {
          if(key[k] != '') {
            if(key[k] == 'datetimerange-s' || key[k] == 'datetimerange-e') {
            }else if(typeof this.model.pkeysearch[key[k]] === 'array' || typeof this.model.pkeysearch[key[k]] === 'object') {
              this.model.pkeysearch[key[k]] = sessionStorage.getItem(`${sessionkey}-pkeysearch-${key[k]}`).split(',')
            }else {
              let val = sessionStorage.getItem(`${sessionkey}-pkeysearch-${key[k]}`)
              if(val && val != 'undefined') {
                this.model.pkeysearch[key[k]] = val
              }
            }
          }
        }
      }

      let that = this
      /** 搜索功能 */
      this.model.search = () => {
        let key = ''
        let ignore = that.model.search_ignore || {}
        let sessionkey = that.model.sessionkey_search
        for(let k in that.model.pkeysearch) {
          if(!ignore[k]) {
            if(k == 'datetimerange') {
              key += 'datetimerange-s,datetimerange-e,'
              if(that.model.pkeysearch.datetimerange && that.model.pkeysearch.datetimerange.length) {
                sessionStorage.setItem(`${sessionkey}-pkeysearch-datetimerange-s`, that.model.setDateFormat(that.model.pkeysearch[k][0]))
                sessionStorage.setItem(`${sessionkey}-pkeysearch-datetimerange-e`, that.model.setDateFormat(that.model.pkeysearch[k][1]))
              }else {
                sessionStorage.setItem(`${sessionkey}-pkeysearch-datetimerange-s`, '')
                sessionStorage.setItem(`${sessionkey}-pkeysearch-datetimerange-e`, '')
              }
            }else {
              key += (k + ',')
              sessionStorage.setItem(`${sessionkey}-pkeysearch-${k}`, that.model.pkeysearch[k])
            }
          }
        }
        sessionStorage.setItem(`${sessionkey}-pkeysearch`, key)
        that.$root.eventHub.$emit('form-success-tab', {})
      }

      /** 重置功能 */
      this.model.reset = () => {
        that.$refs['search'].resetFields()
        let sessionkey = that.model.sessionkey_search
        for(let k in that.model.pkeysearch) {
          if(k == 'datetimerange') {
       //     that.model.pkeysearch[k] = []
            sessionStorage.removeItem(`${sessionkey}-pkeysearch-datetimerange-s`)
            sessionStorage.removeItem(`${sessionkey}-pkeysearch-datetimerange-e`)
          }else {
         //   that.model.pkeysearch[k] = ''
            sessionStorage.removeItem(`${sessionkey}-pkeysearch-${k}`)
          }
        }
        sessionStorage.removeItem(`${sessionkey}-pkeysearch`)
        that.$root.eventHub.$emit('form-success-tab', {})
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .form-search {
    .el-form-item__content {
      .el-input__inner {
        width: 130px;
      }
    }
  }
</style>
