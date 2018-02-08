<template>
  <rs-list :page_title="'鉴定申请'" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="订单号" prop="bill_sn">
        <el-input placeholder="请输入订单号" @keyup.enter.native="model.search()" v-model="model.pkeysearch.bill_sn"></el-input>
      </el-form-item>
      <el-form-item label="鉴定类型" prop="type">
        <el-select clearable v-model="model.pkeysearch.type" placeholder="请选择鉴定类型" @change="model.search()">
          <el-option label="订单" value="1"></el-option>
          <el-option label="个人" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="鉴定方式" prop="methods">
        <el-select clearable v-model="model.pkeysearch.methods" placeholder="请选择鉴定方式" @change="model.search()">
          <el-option label="实物" value="1"></el-option>
          <el-option label="图片" value="2"></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template slot-scope="p" slot="table-tool">
      <span class="table-tool"
            v-if="p.item.report_status != 1 && !(p.item.apply_kind == 1 && p.item.report_status == 2)"
            @click="$root.eventHub.$emit('add-tab', {item: p.item, tab_name: '鉴定申请', slot_name: 'check', edit: true})">鉴定</span>
    </template>
    <template slot-scope="p" slot="check">
      <el-form :model="p.item" :ref="`form${p.index}`" label-width="100px" v-loading="loading" element-loading-text="提交中">
        <span style="display:none;">{{p.item.report_status = p.item.report_status ? p.item.report_status : 2}}</span>
        <el-form-item label="鉴定描述"> {{ p.item.remark }}</el-form-item>
        <el-form-item label="订单号">{{ p.item.certify_bill_sn }}</el-form-item>
        <el-form-item label="鉴定方式">{{ p.item.method_name }}</el-form-item>
        <el-form-item label="鉴定图片" v-if="parseInt(p.item.method) !== 1"  style="width: 250%;">
          <preview-img :url="p.item.credential_pic"></preview-img>
        </el-form-item>
        <el-form-item label="鉴定状态" prop="report_status">
          <el-radio-group v-model="p.item.report_status">
            <!--  <el-radio :label="0">待鉴定</el-radio>-->
            <el-radio :label="1">鉴定通过</el-radio>
            <el-radio :label="2">鉴定未通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="鉴定结果" prop="report_report" :rules="{required: true, message: '请输入鉴定结果', trigger: 'blur'}">
          <span class="form-label-tip">(最多100字)</span>
          <el-input type="textarea" :maxlength="100" :rows="3"
                    placeholder="请输入鉴定结果"
                    v-model="p.item.report_report"></el-input>
        </el-form-item>
        <el-form-item label="上传鉴定报告" prop="file_id" style="width: 220%;">
          <upload-img v-model="p.item.file_id" :url="p.item.pic" :file_list="true"></upload-img>
        </el-form-item>
        <el-form-item>
          <button type="button" class="btn btn-primary" @click="evaluation($refs[`form${p.index}`], p.item)">提交</button>
        </el-form-item>
      </el-form>
    </template>

    <template slot-scope="p" slot="add-check">
      <el-form :model="bill_check" :ref="`formbillcheck`" label-width="100px" v-loading="loading" element-loading-text="提交中">
        <span style="display:none;">{{bill_check.report_status = bill_check.report_status ? bill_check.report_status : 2}}</span>
        <el-form-item label="鉴定描述"> {{ bill_check.remark }}</el-form-item>
        <el-form-item label="订单号">{{ bill_check.bill_sn }}</el-form-item>
        <el-form-item label="鉴定方式">{{ bill_check.method_name_my }}</el-form-item>
        <el-form-item label="鉴定图片" v-if="parseInt(bill_check.method) !== 1"  style="width: 250%;">
          <preview-img :url="bill_check.credential_pic"></preview-img>
        </el-form-item>
        <el-form-item label="鉴定状态" prop="report_status">
          <el-radio-group v-model="bill_check.report_status">
            <!--  <el-radio :label="0">待鉴定</el-radio>-->
            <el-radio :label="1">鉴定通过</el-radio>
            <el-radio :label="2">鉴定未通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="鉴定结果" prop="report_report" :rules="{required: true, message: '请输入鉴定结果', trigger: 'blur'}">
          <span class="form-label-tip">(最多100字)</span>
          <el-input type="textarea" :maxlength="100" :rows="3"
                    placeholder="请输入鉴定结果"
                    v-model="bill_check.report_report"></el-input>
        </el-form-item>
        <el-form-item label="上传鉴定报告" prop="file_id" style="width: 220%;">
          <upload-img :file_list="true" v-model="bill_check.file_id" :url="bill_check.pic"></upload-img>
        </el-form-item>
        <el-form-item>
          <button type="button" class="btn btn-primary" @click="evaluation($refs[`formbillcheck`], p.item)">提交</button>
        </el-form-item>
      </el-form>
    </template>
  </rs-list>
</template>
<script>
  import Evaluation from '@/model/exchange/evaluation'
  /** @vue */
  export default {
    data () {
      return {
        column: [
          {prop: 'remark', label: '鉴定描述', modaltext: true},
          {prop: 'bill_sn', label: '订单号'},
          {prop: 'username', label: '鉴定用户'},
          {prop: 'method_name', label: '鉴定方式'},
          {prop: 'apply_kind_name', label: '申请类型'},
          {prop: 'report_status_name', label: '鉴定结果'},
          {prop: 'apply_time', label: '申请日期', type: 'date'},
          {prop: 'report_time', label: '操作日期', type: 'date'},
          {prop: 'report_name', label: '操作人'}
        ],
        model: new Evaluation(),
        bill_check: {},
        loading: false
      }
    },
    mounted () {
      let that = this
      let orderid = this.$xhr.get_query('orderid', 'market/evaluation')
      if(orderid) {
        that.$root.eventHub.$emit('add-tab', {
          tab_name: '鉴定申请',
          edit: true,
          slot_name: 'add-check',
          item: new Evaluation({
            certify_bill_sn: orderid
          })
        })
      }

      this.$root.eventHub.$on('add-tab-success', (res) => {
        if(orderid && res.item && res.item.certify_bill_sn === orderid) {
          res.item.get_detail_data = {bill_sn: orderid}
          res.item.get_detail((d) => {
            d.certify_bill_sn = d.bill_sn
            this.bill_check = d
          })
        }
      })
    },
    methods: {
      /**  鉴定  */
      evaluation (form, item) {
        let that = this
        form.validate((valid) => {
          if (!valid)  return false
          that.loading = true
          item.check({
            success (res) {
              that.$root.eventHub.$emit('form-success-tab', res)
              that.loading = false
            },
            error(res) {
              that.loading = false
            }
          })
        })
      }
    }
  }
</script>

