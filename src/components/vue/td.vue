<template>
  <div>
    <div v-if="column.type === 'img'">
      <preview-img :url="td" :type="'table'"></preview-img>
    </div>
    <div v-else-if="column.type === 'a'">
      <span v-if="!item[column.a_href]">{{ td }}</span>
      <a style="max-height: 100px;" :href="item[column.a_href]" target="_blank" v-else>
        <!--<div v-if="column.modaltext && (td).length > 10" >
          <el-tooltip v-if="column.modaltext" :content="td" placement="top">
            <el-button type="text"> {{ td | subtext }}</el-button>
          </el-tooltip>
        </div>
        <div v-else>-->
          {{ td }}
       <!-- </div>-->
      </a>
    </div>
    <div v-else-if="column.type === 'date'" style="font-size: 12px;">
      {{ td | formateDate }}
    </div>
    <div v-else-if="typeof column.transFunc === 'function'">
      {{ column.transFunc(td) }}
    </div>
    <div v-else>
    <!--  <div v-if="column.modaltext && (td).length > 10" >
        <el-tooltip v-if="column.modaltext" :content="td" placement="top">
          <el-button type="text"> {{ td | subtext }}</el-button>
        </el-tooltip>
      </div>
      <div v-else>-->
        {{ td }}
     <!-- </div>-->
    </div>
  </div>
</template>

<script>
  /** @vue */
  export default  {
    props: {
      item: Object,
      type: String,
      column: Object
    },
    data () {
      return {
        td: ''
      }
    },
    filters: {
      subtext (val) {
        if(val.length > 10) {
          return val.toString().substr(0, 10) + '...'
        }else {
          return val
        }
      }
    },
    mounted () {
      this.td = this.column.deep ? this.item[this.column.prop][this.column.deep] : this.item[this.column.prop]
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  a {
    color: #1d90e6;
    text-decoration: none;
  }
</style>
