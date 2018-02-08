<template>
  <div>
    <rs-list page_title="会籍订单" :column="column" :model="model">
      <template slot="search">
        <el-form-item label="订单号" prop="bill_sn">
          <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.bill_sn" placeholder="请输入订单号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-select v-model="model.pkeysearch.status" @change="model.search()">
            <el-option label="待付款" value="10"></el-option>
            <el-option label="财务查账中" value="11"></el-option>
            <el-option label="已付款" value="20"></el-option>
            <el-option label="已加入" value="30"></el-option>
            <el-option label="已失效" value="40"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单用户" prop="tel">
          <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.tel" placeholder="请输入下单用户"></el-input>
        </el-form-item>
        <el-form-item label="下单日期" prop="datetimerange">
          <el-date-picker
            @change="model.search()"
            v-model="model.pkeysearch.datetimerange"
            type="daterange"
            placeholder="选择时间范围"
            align="right">
          </el-date-picker>
        </el-form-item>
      </template>

      <template slot-scope="p" slot="table-tool">
        <span class="table-tool" @click="cancel_order(p.item)" v-if="p.item.order_stage === 10 && p.item.can_closeorder">取消订单</span>
      </template>
    </rs-list>

    <div class="rs-dialog" v-show="showdialog">
      <div class="dialog-pane" v-loading="loading" element-loading-text="提交中">
        <h1 class="dialog-title">取消订单</h1>
        <div class="dialog-body">
          取消后订单失效，确认取消吗？
        </div>
        <div class="dialog-foot">
          <button class="btn btn-sm" type="button" @click="showdialog = false">取消</button>
          <button class="btn btn-primary btn-sm" type="button" @click="cancel()">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VipOrder from '@/model/vip/order'
  /** @vue */
  export default {
    data () {
      return {
        model: new VipOrder(),
        currentItem: {},
        loading: false,
        showdialog: false,
        column: [
          {prop: 'bill_sn', label: '订单号'},
          {prop: 'level_name', label: '订单标题'},
          {prop: 'order_stage_name', label: '订单状态'},
          {prop: 'tel', label: '下单用户'},
          {prop: 'money', label: '价格'},
          {prop: 'order_time', label: '下单时间', type: 'date'},
          {prop: 'pay_time', label: '支付时间', type: 'date'},
          {prop: 'pay_method_name', label: '支付方式'}
        ]
      }
    },
    methods: {
      cancel_order(item) {
        this.showdialog = true
        this.currentItem = item
      },
      cancel () {
        let that = this
        this.loading = true
        this.currentItem.cancel_order({
          success (res) {
            that.$root.eventHub.$emit('form-success-tab', res)
            that.loading = false
            that.showdialog = false
          },
          error(res) {
            that.loading = false
          }
        })
      }
    }
  }
</script>
