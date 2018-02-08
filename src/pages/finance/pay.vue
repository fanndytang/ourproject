<template>
  <div>
    <rs-list page_title="付款管理" :model="model" :column="column">
      <template slot="search">
        <el-form-item label="订单号" prop="bill_sn">
          <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.bill_sn"></el-input>
        </el-form-item>
        <el-form-item label="申请日期" prop="datetimerange">
          <el-date-picker @change="model.search()" v-model="model.pkeysearch.datetimerange" type="datetimerange" placeholder="选择时间范围" align="right"></el-date-picker>
        </el-form-item>
      </template>

      <template slot-scope="p" slot="table-tool">
        <span class="table-tool" v-if="p.item.status != 1 && p.item.can_pay" @click="showDialog(p.item)">已付款</span>
      </template>
    </rs-list>

    <div class="rs-dialog" v-show="showpay">
      <div class="dialog-pane" v-loading="loading" element-loading-text="提交中">
        <h1 class="dialog-title">付款</h1>
        <div class="dialog-body">
          <el-form :model="current" ref="form" label-width="100px" >
            <el-radio-group v-model="current.status" class="radios">
              <el-radio :label="0">待付款</el-radio>
              <el-radio :label="1">已付款</el-radio>
            </el-radio-group>
            <el-form-item label="备注" prop="remark">
              <span class="form-label-tip">(100字以内)</span>
              <el-input type="textarea" :maxlength="100" :rows="3" v-model="current.remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog-foot">
          <button class="btn btn-sm" type="button" @click="showpay=false">取消</button>
          <button class="btn btn-primary btn-sm" type="button" @click="pay($refs[`form`])">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Finance from '@/model/finance/pay'
  /** @vue */
  export default {
    data () {
      return {
        model: new Finance(),
        showpay: false,
        current: {},
        loading: false,
        column: [
          {prop: 'order_bill_sn', label: '订单号', type: 'a', a_href: 'order_href'},
          {prop: 'amount', label: '付款金额'},
          {prop: 'username', label: '户名'},
          {prop: 'cardnum', label: '付款账号'},
          {prop: 'bank_name', label: '付款银行'},
          {prop: 'status_name', label: '付款状态'},
          {prop: 'apply_time', label: '申请日期', type: 'date'},
          {prop: 'handler_time', label: '操作日期', type: 'date'},
          {prop: 'handler_user', label: '操作人'}
        ]
      }
    },
    methods: {
      /** 显示付款弹窗*/
      showDialog(item) {
        this.current = item
        this.showpay = true
      },
      /** 付款审核 */
      pay(form) {
        let that = this
        form.validate((valid) => {
          if (!valid)  return false
          that.loading = true
          that.current.pay({
            success (res) {
              that.$root.eventHub.$emit('form-success-tab', res)
              that.loading = false
              that.showpay = false
            },
            error(res) {
              that.loading = false
              that.showpay = false
            }
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .2);
    z-index: 1000;
  }
  .radios {
    text-align: center;
    width: 100%;
    margin-bottom: 20px;
    .el-radio {
      margin: 0 60px;
    }
  }
</style>
