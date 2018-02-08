<template>
  <rs-list :page_title="'出库信息'" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="出库产品" prop="title">
        <el-input placeholder="请输入鉴定商品" @keyup.enter.native="model.search()" v-model="model.pkeysearch.title"></el-input>
      </el-form-item>
      <el-form-item label="品牌" prop="brand_id" v-if="has_brand_rights">
        <select-scroll
          v-model=model.pkeysearch.brand_id
          :model="brand_model"
          @change="model.search()"
          :search="{value: `${model.sessionkey_search}-pkeysearch-brand_id`, label: `${model.sessionkey_search}-pkeysearch-brand_name`}"
          :prop="{value: 'id', label: 'name'}"></select-scroll>
      </el-form-item>
      <el-form-item label="出库类型" prop="type">
        <el-select clearable v-model="model.pkeysearch.type" placeholder="请选择入库类型" @change="model.search()">
          <el-option label="订单" value="1"></el-option>
          <el-option label="产品" value="2"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="订单号" prop="bill_sn">
         <el-input placeholder="请输入订单号" v-model="p.keyword.bill_sn"></el-input>
       </el-form-item>-->
    </template>
    <template slot-scope="p" slot="form-item">
      <el-form-item label="商品名称" prop="goods_name" :rules="{required: true, message: '请填写商品名称', trigger: 'blur'}">
        <el-input v-model="p.item.goods_name" placeholder="请填写商品名称"></el-input>
      </el-form-item>
      <el-form-item  label="商品编号" prop="goods_sn" :rules="{required: true, message: '请填写商品编号', trigger: 'blur'}">
        <el-input v-model="p.item.goods_sn" placeholder="请填写商品编号"></el-input>
      </el-form-item>
      <el-form-item  label="商品数量" prop="goods_number" :rules="{required: true, validator: checkNum, message: '请填写商品数量', trigger: 'blur'}">
        <input-number v-model.number="p.item.goods_number" px="$" :dot="0" :min="1" :px="' '"></input-number>
      </el-form-item>
      <el-form-item  label="品牌" prop="brand_id" :rules="{required: true, message: '请选择品牌', trigger: 'blur'}">
        <select-scroll v-model="p.item.brand_id" :model="brand_model" :prop="{label: 'name', value: 'id'}"></select-scroll>
      </el-form-item>
      <el-form-item  label="出库类型" prop="source">
        <el-radio-group v-model="p.item.source" @change="type = p.item.source !== 'platform'">
          <el-radio :label="'order'">订单出库</el-radio>
          <el-radio :label="'platform'">其它</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="关联订单" prop="bill_sn" v-if="p.item.source !== 'platform'" :rules="{required: type, message: '请输入关联订单', trigger: 'blur'}">
        <el-input v-model="p.item.bill_sn" placeholder="请填写关联的订单号"></el-input>
      </el-form-item>
      <el-form-item  label="上传图片" prop="fid" style="width: 200%;" :rules="{required: true, message: '请上传图片', trigger: 'blur'}">
        <upload-img :file_list="true" v-model="p.item.fid" :url="p.item.pic"></upload-img>
      </el-form-item>
      <el-form-item  label="出库仓库" prop="warehouse_id" :rules="{required: true, message: '请选择出库仓库', trigger: 'blur'}">
        <select-scroll :model="ware_model" v-model="p.item.warehouse_id" :prop="{label: 'name', value: 'id'}"></select-scroll>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <span class="form-label-tip">(100字以内)</span>
        <el-input v-model="p.item.remark" :maxlength="100" type="textarea" placeholder="请输入备注"></el-input>
      </el-form-item>
    </template>
  </rs-list>
</template>

<script>
  import Goods from '@/model/exchange/popstorage'
  import Ware from '@/model/system/ware'
  import Brand from '@/model/dict/goods'
  /** @vue */
  export default {
    data () {
      return {
        has_brand_rights: false,                            //  获取品牌列表的权限
        model: new Goods({'model_type' : 'pop'}),
        column: [
          {prop: 'goods_name', label: '出库产品', type: 'a', a_href: ''},
          {prop: 'brand_name', label: '品牌'},
          {prop: 'kind_name', label: '出库类型'},
          {prop: 'order_bill_sn', label: '关联订单'},
          {prop: 'pic', label: '实物图', type: 'img', max_height: '30px'},
          {prop: 'name', label: '入库时间'},
          {prop: 'warehouse_name', label: '入库仓库'},
          {prop: 'handler_time', label: '操作日期', type: 'date'},
          {prop: 'handler_name', label: '操作人'},
        ],
        ware_model: new Ware(),
        brand_model: new Brand({'model_type': 'brand'}),
        type: false
      }
    },
    mounted () {
      let rights = localStorage.getItem('admin_rights_list')
      if(rights) rights = JSON.parse(rights)
      this.has_brand_rights = rights && rights.dict && rights.dict[`v1,dict,admin,brand,get`]


      let orderid = this.$xhr.get_query('orderid', 'market/popstorage')
      if(!!orderid) {
        this.type = true
        this.$root.eventHub.$emit('add-tab', {
          edit: false,
          tab_name: '新增出库信息',
          item: new Goods({
            model_type: 'pop',
            'bill_sn': orderid,
            'source': 'order'  //  订单出库
          })
        })
      }
    },
    methods: {
      checkNum (rule, value, callback) {
        let val = parseFloat(value)
        if(!val) {
          callback(new Error(rule.message))
        }else if(val < 0) {
          callback(new Error('请输入大于0的数字'))
        }else {
          callback()
        }
      }
    }
  }
</script>
