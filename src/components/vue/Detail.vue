<template>
  <div class="nav-tabs-custom" style="padding: 20px;"  v-loading="loading" element-loading-text="加载中">
    <h2 class="title">{{ title }}</h2>

    <div class="table-box">
      <table class="table table-bordered" v-if="detail">
        <tbody>
        <tr v-for="el,index in column">
          <th width="200"><div class="th-label">{{ el.label }}</div></th>
          <td>
            <div v-if="el.type === 'img' || typeof(el.type) === 'function' && el.type(detail) === 'img'">
              <preview-img
                :url="setValue(el)"></preview-img>
            </div>
            <div v-else-if="el.type === 'a'">
              <span v-if="!detail[el.a_href]">{{ setValue(el) }}</span>
              <a style="max-height: 100px;" :href="detail[el.a_href]" target="_blank" v-else>
                {{ setValue(el) }}
              </a>
            </div>
            <div v-else-if="el.type === 'date'">{{ setValue(el) | formateDate }}</div>
            <div v-else-if="typeof el.transFunc === 'function'">{{ el.transFunc(setValue(el)) }}</div>
            <div v-else-if="el.type === 'html'" v-html="setValue(el)" class="detail-html"></div>
            <div v-else-if="el.type === 'slot'"><slot :name="el.prop" :item="setValue(el)"></slot></div>
            <div v-else-if="el.type === 'video' || typeof(el.type) === 'function' && el.type(detail) === 'video'">
              <video controls webkit-playsinline style="max-height: 500px;">
                <source :src="setValue(el) + '?client_type=3'" type="video/mp4">
              </video>
            </div>
            <div v-else>{{ setValue(el) }}</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="no-data" v-if="!detail && !loading">
      <i class="fa fa-file-text"></i>
      <span>暂无数据</span>
    </div>
  </div>
</template>

<script>
  /** @vue */
  export default {
    props: {
      title: {
        type: String,
        default: '详情'
      },
      column: Array,
      model: Object
    },
    data() {
      return {
        detail: '',
        loading: false
      }
    },
    mounted () {
      let that = this
      this.loading = true
      that.model.get_detail({
        success (d) {
          that.loading = false
          that.detail = d
          that.$parent.$emit('get-detail', d)
        },
        error () {
          that.loading = false
        },
        netError () {
          that.loading = false
        }
      })
    },
    filters: {
      formateDate (val) {
        if(!val || isNaN(val)) {
          return '无'
        }
        let date = new Date(val*1000)
        let year = date.getFullYear()
        let month = ('00' + (parseInt(date.getMonth()) + 1)).substr(-2)
        let day = ('00' + date.getDate()).substr(-2)
        let hour = ('00' + date.getHours()).substr(-2)
        let minute = ('00' + date.getMinutes()).substr(-2)
        let second = ('00' + date.getSeconds()).substr(-2)

        return year + '-' + month + '-' + day + '  ' + hour + ':' + minute + ':' + second
      }
    },
    methods: {
      setValue (el) {
        return (el.deep ? this.detail[el.prop][el.deep] : this.detail[el.prop]) || '无'
      }
    }
  }
</script>

<style lang="less" scoped>
  .no-data {
    font-size: 30px;
    line-height: 80px;
    font-weight: 700;
    color: #324157;
    height: 100px;
    text-align: center;
    padding-top: 10px;
  }
  .th-label {
    white-space: nowrap;
  }
  table {
    width: 100%;
    border-collapse:collapse;
    tr th, tr td {
      border: 1px solid #eee;
      padding: 5px;
      font-weight: normal;
      font-size: 14px;
      img {
        max-width: 100%;
      }
      a {
        color: #1d90e6;
        text-decoration: none;
      }
    }

    tr th {
      text-align: right;
      padding-right: 30px;
      color: #666;
    }

    tr td {
      padding-left: 30px;
    }
  }
</style>
<style lang="less">
  .detail-html img {
    max-width: 100%;
  }
</style>
