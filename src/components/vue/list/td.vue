<template>
  <div>
    <div v-if="column.type === 'img' || typeof(column.type) === 'function' && column.type(item) === 'img'">
      <preview-img :url="td" :type="'table'"></preview-img>
    </div>
    <div v-else-if="column.type === 'a'">
      <span v-if="!item[column.a_href]">{{ td }}</span>
      <a style="max-height: 100px;" :href="item[column.a_href]" target="_blank" v-else>
     <!--   <div v-if="column.modaltext && (td).length > 10" >
          <el-tooltip v-if="column.modaltext" :content="td" placement="top">
            <el-button type="text"> {{ td | subtext }}</el-button>
          </el-tooltip>
        </div>
        <div v-else>-->
        <span :style="`${(td).length > 10 ? 'display:inline-block;max-width:200px;word-break:break-all;' : ''}`"> {{ td }}</span>
       <!-- </div>-->
      </a>
    </div>
    <div v-else-if="column.type === 'html'" v-html="td"></div>
    <div v-else-if="column.type === 'date'" style="font-size: 12px;">
      {{ td | formateDate }}
    </div>
    <div v-else-if="typeof column.transFunc === 'function'">
      {{ column.transFunc(td) }}
    </div>
    <div v-else-if="column.type === 'video' || typeof(column.type) === 'function' && column.type(item) === 'video'">
      <preview-video
        :is_table="true"
        :avatar="td"
        :url="column.deep ? item[column.video_src][column.deep] : item[column.video_src]"></preview-video>
    </div>
    <div v-else-if="column.type === 'article'">
      <div class="article-small" @click="open = true" v-html="td" style="cursor:pointer;"></div>
      <div class="fixed-pre" v-if="open">
        <span class="close" @click="open = false">&times;</span>
        <div class="content" v-html="td"></div>
      </div>
    </div>
    <div v-else>
     <!-- <div v-if="column.modaltext && (td).length > 10" >
        <el-tooltip v-if="column.modaltext" :content="td" placement="top">
          <el-button type="text"> {{ td | subtext }}</el-button>
        </el-tooltip>
      </div>
      <div v-else>-->
      <span :style="`${(td).length > 10 ? 'display:inline-block;max-width:200px;word-break:break-all;' : ''}`"> {{ td }}</span>
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  export default  {
    props: {
      item: Object,
      type: String,
      column: Object
    },
    data () {
      return {
        td: '',
        open: false
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
  .article-small {
    max-width: 50vw;
    max-height: 40px;
    overflow: hidden;

  }

  .fixed-pre {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 10001;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    .content {
      overflow: auto;
      width: 80%;
      height: 80%;
      position: absolute;
      top: 10%;
      left: 10%;
      background: #fff;
      border-radius: 5px;
      padding: 15px;
    }
    .close {
      position: absolute;
      right: 10%;
      top: 10%;
      width: 40px;
      height: 40px;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 50%;
      cursor: pointer;
      margin-top: -20px;
      margin-right: -20px;
      font-size: 28px;
      z-index: 10;
      text-align: center;
      color: #999;
    }
  }
</style>

<style lang="less" type="text/less">
  .article-small {
    p {
      margin: 5px 0;
    }
  }
  .fixed-pre {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 10001;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    .content {
      overflow: auto;
      width: 80%;
      height: 80%;
      position: absolute;
      top: 10%;
      left: 10%;
      background: #fff;
      border-radius: 5px;
      padding: 15px;
    }
    .close {
      position: absolute;
      right: 10%;
      top: 10%;
      width: 40px;
      height: 40px;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 50%;
      cursor: pointer;
      margin-top: -20px;
      margin-right: -20px;
      font-size: 28px;
      z-index: 10;
      text-align: center;
      color: #999;
    }
  }
</style>
