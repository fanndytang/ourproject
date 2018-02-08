<template>
  <rs-list :page_title="'换戴产品'" :column="column" :model="model">
    <template slot="search">
      <el-form-item label="商品名称" prop="title">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.title" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="model.pkeysearch.status" @change="model.search()">
          <el-option label="上架中" value="1"></el-option>
          <el-option label="下架中" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在地" prop="location" v-if="has_hall_rights">
        <select-scroll
          @change="model.search()"
          :model="hall_model"
          v-model="model.pkeysearch.location"
          :prop="{'label': 'location', 'value': 'code'}"></select-scroll>
      </el-form-item>
      <el-form-item label="换戴等级" prop="code">
        <select-scroll
          @change="model.search()"
          :model="kind_model"
          :lang="model.web_language"
          v-model="model.pkeysearch.code"
          :prop="{'label': 'name', 'value': 'code'}"></select-scroll>
      </el-form-item>
    </template>

    <template slot-scope="p" slot="table-tool">
      <span class="table-tool" v-if="parseInt(p.item.publish_status) == 1&&p.item.down_goods" @click="p.item.down()">下架</span>
    </template>
    <template slot-scope="p" slot="form-item">
      <el-form-item label="商品名称" prop="title">
        <el-input v-model="p.item.title" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="封面图" prop="cover_fid" style="width: 220%;">
        <upload-img v-model="p.item.cover_fid" :url="p.item.cover_pic"></upload-img>
      </el-form-item>
      <el-form-item label="换戴等级" prop="level_code">
        <select-scroll :lang="model.web_language" :model="kind_model" v-model="p.item.level_code" :prop="{value: 'code', label: 'name'}"></select-scroll>
      </el-form-item>
      <el-form-item label="所在地" prop="location">
        <select-scroll
          :model="hall_model"
          v-model="p.item.location"
          :form_data="p.item"
          @change="model.search()"
          :prop="{'label': 'location', 'value': 'location'}"></select-scroll>
      </el-form-item>
      <el-form-item label="状态" prop="publish_status">
        <el-radio-group v-model="p.item.publish_status">
          <el-radio :label="1">上架中</el-radio>
          <el-radio :label="2">下架中</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="品牌" prop="brand_id">
        <select-scroll :lang="model.web_language" :model="brandModel"
                       v-model="p.item.brand_id"
                       :prop="{value: 'id', label: 'name'}"></select-scroll>
      </el-form-item>
      <el-form-item class="is-required" label="原价" prop="original_price">
        <input-number v-model="p.item.original_price" :dot="2" :min="0"></input-number>
        <span class="price-tip">(数字类型且小数点后最多两位)</span>
      </el-form-item>
      <el-form-item class="is-required" label="售价" prop="price">
        <input-number v-model="p.item.price" :dot="2" :min="0"></input-number>
        <span class="price-tip">(数字类型且小数点后最多两位)</span>
      </el-form-item>
      <el-form-item label="机芯类型" prop="movement_id">
        <select-scroll :lang="model.web_language" :model="movementModel"
                       v-model="p.item.movement_id"
                       :prop="{value: 'id', label: 'name'}"></select-scroll>
      </el-form-item>
      <el-form-item label="表壳材质" prop="material_id">
        <select-scroll :lang="model.web_language" :model="materialModel"
                       v-model="p.item.movement_id" :prop="{value: 'id', label: 'name'}"></select-scroll>
      </el-form-item>
      <el-form-item label="表盘形状" prop="shape_id">
        <select-scroll :lang="model.web_language" :model="shapeModel"
                       v-model="p.item.shape_id" :prop="{value: 'id', label: 'name'}"></select-scroll>
      </el-form-item>
      <el-form-item label="复杂功能" prop="function_id">
        <select-scroll :lang="model.web_language" :model="functionsModel"
                       :multiple="true"
                       v-model="p.item.function_id" :prop="{value: 'id', label: 'name'}"></select-scroll>
      </el-form-item>
      <el-form-item label="成色" prop="fineness_id">
        <select-scroll :lang="model.web_language" :model="finenessModel"
                       v-model="p.item.fineness_id"  :prop="{value: 'id', label: 'name'}"></select-scroll>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="p.item.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
          <el-radio :label="3">中性</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="表盘直径" prop="diameter">
        <input-number v-model="p.item.diameter" :dot="0" :max="70" :px="'mm'" :pos="'right'"></input-number>
        <span class="price-tip">(整数)</span>
        <div class="el-form-item__error" v-if="sub && p.item.diameter <= 0">请输入表盘直径</div>
      </el-form-item>
      <el-form-item label="商品图片" prop="file_id" style="width: 220%;">
        <upload-img v-model="p.item.file_id" :url="p.item.file_pic" :file_list="true"></upload-img>
      </el-form-item>
      <el-form-item label="详情描述" prop="details">
        <span class="form-label-tip">(300字以内)</span>
        <el-input type="textarea" :rows="5" :maxlength="300"  v-model="p.item.details"></el-input>
      </el-form-item>
    </template>
  </rs-list>
</template>

<script>
  import VipMarket from '@/model/vip/market'
  import Dict from '@/model/dict/goods'
  import VipKind from '@/model/vip/kind'
  import Hall from '@/model/system/hall'
  /** @vue */
  export default {
    data () {
      return {
        has_hall_rights: false,
        brandModel: new Dict({model_type: 'brand'}),
        movementModel: new Dict({model_type: 'movement'}),
        materialModel: new Dict({model_type: 'material'}),
        shapeModel: new Dict({model_type: 'shape'}),
        functionsModel: new Dict({model_type: 'functions'}),
        finenessModel: new Dict({model_type: 'fineness'}),
        model: new VipMarket(),
        kind_model: new VipKind(),
        hall_model: new Hall(),
        address:'请选择',
        selectitem: '',
        column: [
          {prop: 'title', label: '商品名称'},
          {prop: 'level_name', label: '换戴等级'},
          {prop: 'hall_name', label: '体验厅所在地'},
          {prop: 'username', label: '发布用户'},
          {prop: 'publish_status_name', label: '状态'},
          {prop: 'create_time', label: '发布时间', type: 'date'},
          {prop: 'publish_time', label: '操作时间', type: 'date'},
          {prop: 'username', label: '操作用户'}
        ],
        sub: false,
      }
    },
    mounted () {
      let rights = localStorage.getItem('admin_rights_list')
      if(rights) rights = JSON.parse(rights)
      this.has_hall_rights = rights && rights.system && rights.system[`v1,system,admin,hall,get`]

      this.$on('add-tab', (res) => {
        if(!res.edit) {
          res.item.publish_status = 1
        }
      })
    },
    methods: {
      changeSelect (val, selectitem, form_data) {
        /**
         * 体验厅所在地更改时，对应的体验厅编号也更改，现为一对一情况，后期如果多对多需要用户自行选择编号
         * */
        form_data.hall_code = selectitem.code
      },
      search (val) {
        if(val) {
          this.model.search()
        }
      }
    }
  }
</script>

<style lang="less">
  .el-input-group__append {
    position: absolute;
    left: 100%;
    top: 0;
    height: 100%;
    width: 36px;
    line-height: 36px;
  }
  .uploadimg {
    display: inline-block;
    margin: 0 30px 30px 0;
  }
  .price-tip {
    position: absolute;
    left: 180px;
    top: 0;
    color: #999;
    font-size: 12px;
    white-space: nowrap;
  }
</style>
