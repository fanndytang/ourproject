<template>
  <rs-detail :model="model" :title="'卖表详情'" :column="column">
    <template slot="compare_price_cn" slot-scope="p">
      <div class="item" v-for="item,i in p.item" :key="i">{{ item.tag }}：{{item.unit}} {{ item.price }}</div>
      <div v-show="p && p.item && p.item.length <= 0">无</div>
    </template>
    <template slot="compare_price_hk" slot-scope="p">
      <div class="item" v-for="item,i in p.item" :key="i">{{ item.tag }}： {{item.unit}}{{ item.price }}</div>
      <div v-show="p && p.item && p.item.length <= 0">无</div>
    </template>
    <template slot="graphic_details">
      <button class="btn btn-primary btn-sm" type="button" @click="openDialog('pc_graphic_details')">PC端商品详情</button>
      <button class="btn btn-primary btn-sm" type="button" @click="openDialog('pc_history')">PC端腕表溯源</button>
      <button class="btn btn-primary btn-sm" type="button" @click="openDialog('app_graphic_details')">移动端商品详情</button>
      <button class="btn btn-primary btn-sm" type="button" @click="openDialog('app_history')">移动端腕表溯源</button>

      <div class="fixed-pre" v-if="open">
        <span class="close" @click="open = false">&times;</span>
        <div class="content" v-html="result"></div>
      </div>
    </template>
  </rs-detail>
</template>

<script>
  import Sell from '@/model/exchange/watch-sell'
  /** @vue */
  export default {
    data () {
      return {
        open: false,
        result: '',
        detail: {},
        model: new Sell({
          get_detail_data: {
            gid: this.$xhr.get_query('id', 'market/sell/detail'),
            lang: this.$xhr.get_query('lang', 'market/sell/detail')
          }
        }),
        column: [
          {prop: 'title', label: '商品名称'},
          {prop: 'area', label: '所在地'},
          {prop: 'cover_pic', label: '封面图', type: 'img'},
          {prop: 'brand_name', label: '品牌'},
          {prop: 'brand_pic_show', label: '品牌logo', type: 'img'},
          {prop: 'is_platform_name', label: '是否平台发布'},
          {prop: 'publish_s_name', label: '状态'},
          {prop: 'collection_num', label: '收藏数量'},
          {prop: 'pv_show', label: '浏览量'},
          {prop: 'original_price_show', label: '原价'},
          {prop: 'price_show', label: '售价'},
          {prop: 'rmb_price', label: '人民币参考价'},
          {prop: 'movement_name', label: '机芯类型'},
          {prop: 'material_name', label: '表壳材质'},
          {prop: 'shape_name', label: '表盘形状'},
          {prop: 'function_name', label: '复杂功能'},
          {prop: 'fineness_name', label: '成色'},
          {prop: 'gender_name', label: '性别'},
          {prop: 'diameter_name', label: '表盘直径'},
          {prop: 'file_pic', label: '商品图片', type: 'img'},
          {prop: 'file_fid_360_show', label: '360图片'},
          {prop: 'compare_price_cn', label: '大陆比价信息', type: 'slot'},
          {prop: 'compare_price_hk', label: '香港比价信息', type: 'slot'},
          {prop: 'graphic_details', label: '商品详情&腕表溯源', type: 'slot'},
          {prop: 'publish_user', label: '发布用户'},
          {prop: 'create_time', label: '发布时间', type: 'date'},
          {prop: 'h_name', label: '操作用户'},
          {prop: 'publish_time', label: '操作时间', type: 'date'}
        ]
      }
    },
    mounted () {
      let that = this
      that.$on('get-detail', (res) => {
        res.getPrice()
        that.detail = res
      })
    },
    methods: {
      openDialog(type) {
        this.result = this.detail[type]
        this.open = true
      }
    }
  }
</script>


<style lang="less" type="text/less" scoped>
  .item {
    line-height: 24px;
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
