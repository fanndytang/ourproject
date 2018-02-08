<template>
  <rs-list page_title="会籍查账" :model="model_vip" :form_self_btn="true" :column="column_vip">
    <template slot="search">
      <el-form-item label="订单号" prop="bill_sn">
        <el-input @keyup.enter.native="model_vip.search()" v-model="model_vip.pkeysearch.bill_sn" placeholder="请输入订单号"></el-input>
      </el-form-item>
      <el-form-item label="下单日期" prop="datetimerange">
        <el-date-picker @change="model_vip.search()" v-model="model_vip.pkeysearch.datetimerange" type="datetimerange" placeholder="选择时间范围" align="right"></el-date-picker>
      </el-form-item>
      <el-form-item label="用户信息" prop="user">
        <el-input @keyup.enter.native="model_vip.search()" v-model="model_vip.pkeysearch.user" placeholder="请输入用户信息"></el-input>
      </el-form-item>
    </template>
    <template slot-scope="p" slot="table-tool">
          <span class="table-tool"
                v-if="p.item.audit_status != 1&&p.item.can_check"
                @click="$root.eventHub.$emit('add-tab', {tab_name: '审核查账订单' + p.item.bill_sn, slot_name: 'check', edit: true, item: p.item})">查账审核</span>
    </template>
    <template slot-scope="p" slot="check">
      <el-form :model="p.item" :ref="`formBank${p.index}`" label-width="100px" v-loading="loading" element-loading-text="提交中">
        <span style="display:none;">{{ p.item.status =  p.item.status ? p.item.status : 2 }}</span>
        <el-form-item label="订单号">{{ p.item.order_bill_sn }}</el-form-item>
        <el-form-item label="订单金额">{{ p.item.money }}</el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="p.item.status">
            <el-radio :label="1">已到帐</el-radio>
            <el-radio :label="2">未到账</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户信息">{{ p.item.tel }}</el-form-item>
        <el-form-item label="转账凭证" style="width:220%">
          <span v-if="p.item.pay_pic.length <= 0">暂无</span>
          <preview-img :url="p.item.pay_pic"></preview-img>
        </el-form-item>
        <el-form-item label="备注" prop="remark" :rules="{validator: formCheck, trigger: 'blur'}">
          <span class="form-label-tip">(100字以内)</span>
          <el-input type="textarea" :maxlength="100" placeholder="若未到账请备注" :rows="3" v-model="p.item.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <button type="button" class="btn btn-primary" @click="check_vip(`formBank${p.index}`, p.item)">提交</button>
        </el-form-item>
      </el-form>
    </template>
  </rs-list>
</template>

<script>
  import Audit_vip from '@/model/finance/vip_audit'
  /** @vue */
  export default {
    data () {
      return {
        model_vip: new Audit_vip(),
        loading: false,
        column_vip: [
          {prop: 'order_bill_sn', label: '订单编号', type: 'a', a_href: 'order_href'},
          {prop: 'money', label: '订单金额'},
          {prop: 'order_time', label: '下单日期', type: 'date'},
          {prop: 'tel', label: '用户信息'},
          {prop: 'pay_pic', label: '转账凭证', type: 'img', imgarr: true, max_height: '30px'},
          {prop: 'audit_status_name', label: '状态'},
          {prop: 'handler_name', label: '操作人'},
          {prop: 'audit_time', label: '操作时间', type: 'date'},
        ],
        is_failed: false
      }
    },
    methods: {
      formCheck (rule, value, callback) {
        return !value && this.is_failed ? callback(new Error('请输入审核失败原因')) : callback()
      },
      /** 会籍查账 */
      check_vip (form_name, item) {
        let that = this
        this.is_failed = parseInt(item.status) === 2
        this.$refs[form_name].validate((valid) => {
          if(!valid) return false
          that.loading = true
          item.check_vip({
            success (res) {
              that.$root.eventHub.$emit('form-success-tab', res)
              that.loading = false
            },
            error (res) {
              that.loading = false
            }
          })
        })
      },
    }
  }
</script>

