<template>
  <div>
    <rs-list :page_title="'卖表管理'" :model="model" :column="column" :form_self_btn="true">
      <template slot="search">
        <el-form-item label="标题" prop="title" style="margin-left:-60px;">
          <el-input placeholder="请输入标题" @keyup.enter.native="model.search()" v-model="model.pkeysearch.title"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand_id" v-if="has_brand_rights" style="margin-left:-60px;">
          <select-scroll v-model="model.pkeysearch.brand_id" :model="brandModel" :rows="80" :prop="{value: 'id', label: 'name'}"
                         :search="{value: `${model.sessionkey_search}-pkeysearch-brand_id`, label: `${model.sessionkey_search}-pkeysearch-brand_name`, query: 'name'}"
                         @change="model.search()"></select-scroll>
        </el-form-item>
        <el-form-item label="发布用户" prop="tel" style="margin-left:-30px;">
          <el-input placeholder="请输入发布用户" @keyup.enter.native="model.search()" v-model="model.pkeysearch.tel"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status" style="margin-left:-60px;">
          <el-select clearable v-model="model.pkeysearch.status" placeholder="请选择状态" @change="model.search()">
            <el-option label="审核中" value="10"></el-option>
            <el-option label="审核失败" value="20"></el-option>
            <el-option label="售卖中" value="30"></el-option>
            <el-option label="已下单" value="31"></el-option>
            <el-option label="买方已提交转账证明" value="32"></el-option>
            <el-option label="待鉴定" value="40"></el-option>
            <el-option label="鉴定失败" value="50"></el-option>
            <el-option label="出售成功" value="60"></el-option>
            <el-option label="已被用户换戴" value="61"></el-option>
            <el-option label="待收款" value="70"></el-option>
            <el-option label="已收款" value="80"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间" prop="datetimerange" style="margin-left:-30px;">
          <el-date-picker @change="model.search()" v-model="model.pkeysearch.datetimerange" type="daterange" placeholder="选择时间范围"></el-date-picker>
        </el-form-item>
        <el-form-item label="操作用户" prop="handler_uid" v-if="has_user_rights" style="margin-left:-30px;">
          <select-scroll
            v-model="model.pkeysearch.handler_uid"
            :prop="{label: 'username', value: 'user_uid'}"
            :model="adminModel"
            :search="{value: `${model.sessionkey_search}-pkeysearch-handler_uid`, label: `${model.sessionkey_search}-pkeysearch-handler_name`}"
            @change="model.search()"></select-scroll>
        </el-form-item>
        <el-form-item label="型号" prop="model_num" style="margin-left:-60px;">
          <el-input v-model="model.pkeysearch.model_num" placeholder="请输入" @keyup.enter.native="model.search()"></el-input>
        </el-form-item>
        <el-form-item label="机身码" prop="product_num" style="margin-left:-50px;">
          <el-input v-model="model.pkeysearch.product_num" placeholder="请输入" @keyup.enter.native="model.search()"></el-input>
        </el-form-item>
        <el-form-item label="显示状态" prop="publish_status" style="margin-left:-30px;">
          <el-select clearable v-model="model.pkeysearch.publish_status" placeholder="请选择状态" @change="model.search()">
            <el-option label="上架中" value="1"></el-option>
            <el-option label="下架中" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="腕表来源" prop="consignment_status" style="margin-left:-30px;">
          <el-select clearable v-model="model.pkeysearch.consignment_status" placeholder="请选择腕表来源" @change="model.search()">
            <el-option label="全部" value=""></el-option>
            <el-option label="公司内部" value="0"></el-option>
            <el-option label="外部寄售" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐状态" prop="recommend" style="margin-left:-30px;">
          <el-select clearable v-model="model.pkeysearch.recommend" placeholder="请选择推荐状态" @change="model.search()">
            <el-option label="全部" value=""></el-option>
            <el-option label="推荐中" value="1"></el-option>
            <el-option label="未推荐" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支持360看图" prop="is_360">
          <el-select clearable v-model="model.pkeysearch.is_360" placeholder="请选择" @change="model.search()">
            <el-option label="全部" value="0"></el-option>
            <el-option label="支持" value="1"></el-option>
            <el-option label="不支持" value="-1"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template slot-scope="p" slot="table-tool">
      <span class="table-tool" v-if="parseInt(p.item.exchange_stage) === 10 || parseInt(p.item.exchange_stage) === 20 && p.item.can_check"
            @click="$root.eventHub.$emit('add-tab', {item: p.item, tab_name: '卖表审核', edit: true, slot_name: 'check'})">审核</span>
      </template>
      <template slot="table-tool-end" slot-scope="p">
        <span class="table-tool" v-if="p.item.can_uprecommend" @click="currentItem=p.item; showdialog=true;recommend_flag='up';">推荐首页</span>
        <span class="table-tool" v-if="p.item.can_downrecommend" @click="currentItem=p.item; showdialog=true;recommend_flag='down';">撤销推荐</span>
      </template>
      <template slot-scope="p" slot="form-item">
        <form-item :p="p" :model="model"></form-item>
      </template>
      <template slot-scope="p" slot="check">
        <el-form :model="p.item" :ref="`form2${p.index}`" label-width="100px" class="watch-check">
          <el-form-item label="商品名称" prop="title">{{ p.item.title }}</el-form-item>
          <el-form-item label="是否平台发布" prop="is_platform" v-if="!p.edit">{{ p.item.is_platform === 1 ? '是' : '否' }}</el-form-item>
          <el-form-item label="状态" prop="publish_status">{{ p.item.publish_status === 1 ? '上架中' : '下架中' }}</el-form-item>
          <el-form-item label="品牌" prop="brand_id">{{ p.item.brand_name }}</el-form-item>
          <el-form-item label="原价" prop="original_price">{{ p.item.original_price_show }}</el-form-item>
          <el-form-item label="售价" prop="price">{{ p.item.price_show }}</el-form-item>
          <el-form-item label="机芯类型" prop="movement_id">{{ p.item.movement_name || '无' }}</el-form-item>
          <el-form-item label="表壳材质" prop="material_id">{{ p.item.material_name || '无' }}</el-form-item>
          <el-form-item label="表盘形状" prop="shape_id">{{ p.item.shape_name || '无' }}</el-form-item>
          <el-form-item label="复杂功能" prop="function_id">{{ p.item.function_name || '无' }}</el-form-item>
          <el-form-item label="成色" prop="fineness_id">{{ p.item.fineness_name || '无' }}</el-form-item>
          <el-form-item label="性别" prop="gender">{{ p.item.gender_name || '无' }}</el-form-item>
          <el-form-item label="表盘直径" prop="diameter">{{ p.item.diameter }}mm</el-form-item>
          <el-form-item label="商品图片" prop="file_id" style="width: 220%;">
            <preview-img :url="p.item.file_pic"></preview-img>
          </el-form-item>
          <!-- <el-form-item label="详情描述" prop="details">{{ p.item.details }}</el-form-item>-->
          <hr style="width: 220%;">
          <el-form-item label="失败原因" prop="remark" :rules="{validator: checkResult, trigger: 'blur'}">
            <span class="form-label-tip">(最多100字)</span>
            <el-input v-model="p.item.remark" :maxlength="100" type="textarea" :rows="3" placeholder="如果审核失败，请输入审核失败原因"></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 10px;">
            <button type="button" class="btn btn-primary" @click="p.item.status = 1; check($refs[`form2${p.index}`], p.item)">审核成功</button>
            <button type="button" class="btn" @click="p.item.status = 2; check($refs[`form2${p.index}`], p.item)">审核失败</button>
          </el-form-item>
        </el-form>
      </template>
    </rs-list>
    <div class="rs-dialog" v-show="showdialog">
      <div class="dialog-pane" v-loading="loading" element-loading-text="提交中">
        <h1 class="dialog-title">提示</h1>
        <div class="dialog-body">
          确定要{{recommend_flag === 'up' ? '' : '撤销'}}推荐<span style="color: teal;margin-top: 10px;">{{currentItem.title}}</span>到首页吗？
        </div>
        <div class="dialog-foot">
          <button class="btn btn-sm" type="button" @click="showdialog=false">取消</button>
          <button class="btn btn-primary btn-sm" type="button" @click="Recommend()">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Watch from '@/model/exchange/watch-sell'
  import Dict from '@/model/dict/goods'
  import User from '@/model/user/adminuser'
  import formitem from './watch/form-item.vue'

  /** @vue */
  export default {
    data () {
      return {
        showdialog: false,
        loading: false,
        currentItem: {},
        recommend_flag: '',     //  up 推荐  down 撤销推荐
        column: [
          {prop: 'title_td', label: '标题', type: 'html'},
          {prop: 'brand_name', label: '品牌'},
          {prop: 'cover_pic', label: '封面图', type: 'img'},
          {prop: 'publish_username', label: '发布用户'},
          {prop: 'exchange_stage_name', label: '状态'},
          {prop: 'create_time', label: '发布时间', type: 'date'},
          {prop: 'publish_time', label: '操作时间', type: 'date', sort: true},
          {prop: 'handler_username', label: '操作用户'}
        ],
        model: new Watch(),
        has_brand_rights: false,                            //  获取品牌列表的权限
        has_user_rights: false,                             //  获取后台用户列表的权限
        brandModel: new Dict({model_type: 'brand'}),
        adminModel: new User({model_type: 'admin'}),
        item: {}
      }
    },
    mounted () {
      let rights = localStorage.getItem('admin_rights_list')
      if(rights) rights = JSON.parse(rights)
      this.has_brand_rights = rights && rights.dict && rights.dict[`v1,dict,admin,brand,get`]
      this.has_user_rights = rights && rights.user && rights.user[`v1,user,admin,userlist,get`]

      if(this.model.pkeysearch.acid) {
        this.model.reset()
      }
    },
    methods: {
      /** 审核 */
      check(form, item) {
        let that = this
        that.item = item
        form.validate((valid) => {
          if(!valid) return false
          item.check({
            success (res) {
              that.$message.success(res.data.errmsg || '请求成功')
              that.loading = false
              that.$root.eventHub.$emit('form-success-tab', res)
            },
            error(res) {
              that.$message.error(res.msg || '请求失败')
              that.loading = false
            }
          })
        })
      },
      checkResult (rule, value, callback) {
        let val = parseInt(this.item.status) === 2
        if (val && value === '') {
          callback(new Error('请输入审核失败的原因'))
        } else {
          callback()
        }
      },
      /** 推荐 */
      Recommend() {
        let that = this
        that.loading = true
        that.currentItem.recommend = that.recommend_flag === 'up' ? 1 : 0
        that.currentItem.recommendGood({
          success: (res) => {
            that.showdialog = false
            that.$message.success(res.data.errmsg || '请求成功')
            that.loading = false
            that.$root.eventHub.$emit('form-success-tab', res)
          },
          error: (res) => {
            that.showdialog = false
            that.$message.error(res.msg || '请求失败')
            that.loading = false
          }
        })
      }
    },
    components: {
      'form-item': formitem
    }
  }
</script>

<style lang="less" type="text/less">
  .watch-check {
    .el-form-item {
      margin-bottom: 0 !important;
    }
    .el-form-item__content {
      line-height: 28px;
    }
    .el-form-item__label {
      line-height: 28px;
    }
  }
  .title-recommend {
    display: inline-block;
    float: right;
    font-size: 12px;
    background: #dd4b39;
    color: #fff;
    padding: 0 5px;
    line-height: 20px;
    border-radius: 5px;
    margin-top: 6px;
  }
  .title-text {
    display:inline-block;
    max-width:150px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    vertical-align: middle;
  }
</style>

