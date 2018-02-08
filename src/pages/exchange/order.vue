<template>
  <div>
    <rs-list :page_title="'订单管理'" :model="model" :column="column">
      <template slot="search">
        <el-form-item label="订单编号" prop="bill_sn">
          <el-input placeholder="请输入订单编号" @keyup.enter.native="model.search()" v-model="model.pkeysearch.bill_sn"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select clearable v-model="model.pkeysearch.status" placeholder="请选择状态" @change="model.search()">
            <el-option label="待付款" value="10"></el-option>
            <el-option label="财务查帐中" value="20"></el-option>
            <el-option label="买家付款已到账" value="30"></el-option>
            <el-option label="已通知卖方发货" value="40"></el-option>
            <el-option label="已入库待鉴定" value="50"></el-option>
            <el-option label="鉴定通过" value="60"></el-option>
            <el-option label="配送中" value="70"></el-option>
            <el-option label="已收货待评价" value="80"></el-option>
            <el-option label="已失效" value="90"></el-option>
            <el-option label="已删除" value="100"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间" prop="datetimerange">
          <el-date-picker @change="model.search()" v-model="model.pkeysearch.datetimerange" type="daterange" placeholder="选择时间范围"></el-date-picker>
        </el-form-item>
        <!--  <el-form-item label="下单用户" prop="tel">
            <el-input placeholder="请输入下单用户" @keyup.enter.native="p.model.search(p.list)" v-model="p.keyword.tel"></el-input>
          </el-form-item>-->
        <el-form-item label="配送方式" prop="methods">
          <el-select clearable v-model="model.pkeysearch.methods" placeholder="请选择配送方式" @change="model.search()">
            <el-option label="线下支付" value="1"></el-option>
            <el-option label="快递" value="2"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template slot-scope="p" slot="table-tool">
        <!--    <span v-if="p.item.order_stage === 90" style="font-size:12px;margin-right: 5px;">已失效</span>-->
        <span class="table-tool" v-if="p.item.order_stage === 10" @click="cancelOrder(p.item)">取消订单</span>
        <span class="table-tool" v-if="p.item.order_stage === 30" @click="getMessage(p.item)">通知卖方发货</span>
        <a class="table-tool" :href="p.item.put_href" v-if="p.item.order_stage === 40" style="font-size:12px;">收货入库</a>
        <a class="table-tool" :href="p.item.check_href" v-if="p.item.order_stage === 50" style="font-size:12px;">鉴定</a>
        <a class="table-tool" :href="p.item.pop_href" v-if="p.item.order_stage === 60" style="font-size:12px;">发货</a>
        <span class="table-tool" v-if="p.item.order_stage === 70" @click="getGoods(p.item)">买家已收货</span>
      </template>
      <template slot-scope="p" slot="get_good">
        <el-form :model="p.item" :ref="`form${p.index}`" label-width="100px" v-loading="loading" element-loading-text="提交中">
          <el-form-item label="ID">{{ p.item.id }}</el-form-item>
          <el-form-item label="收货凭证" prop="fid">
            <upload-img v-model="p.item.fid" :file_list="true"></upload-img>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <span class="form-label-tip">(100字以内)</span>
            <el-input v-model="p.item.remark" :maxlength="100" type="textarea" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <button type="button" class="btn btn-primary" @click="getGoodOver($refs[`form${p.index}`], p.item)">提交</button>
          </el-form-item>
        </el-form>
      </template>
    </rs-list>

    <div class="rs-dialog" v-show="showdialog">
      <div class="dialog-pane" v-loading="loading" element-loading-text="提交中">
        <h1 class="dialog-title">{{ message.title }}</h1>
        <div class="dialog-body">{{ message.content }}</div>
        <div class="dialog-foot">
          <button class="btn btn-sm" type="button" @click="showdialog=false">取消</button>
          <button class="btn btn-primary btn-sm" type="button" @click="sendGood()">确定</button>
        </div>
      </div>
    </div>

    <div class="rs-dialog" v-show="showOrderDialog">
      <div class="dialog-pane" v-loading="loading" element-loading-text="提交中">
        <h1 class="dialog-title">取消订单</h1>
        <div class="dialog-body">取消后订单失效，确认取消吗？</div>
        <div class="dialog-foot">
          <button class="btn btn-sm" type="button" @click="showOrderDialog=false">取消</button>
          <button class="btn btn-primary btn-sm" type="button" @click="cancelOrderTool()">确定</button>
        </div>
      </div>
    </div>

    <div class="rs-dialog" v-show="showGetGoodDialog">
      <div class="dialog-pane" v-loading="loading" element-loading-text="提交中">
        <h1 class="dialog-title">确认收货</h1>
        <div class="dialog-body">此动作为用户操作，请谨慎操作，确认已收到货吗？</div>
        <div class="dialog-foot">
          <button class="btn btn-sm" type="button" @click="showGetGoodDialog=false">取消</button>
          <button class="btn btn-primary btn-sm" type="button" @click="getGoodsResult()">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Order from '@/model/exchange/order'
  import User from '@/model/user/adminuser'
  /** @vue */
  export default {
    data () {
      return {
        column: [
          {prop: 'bill_sn', label: '订单编号'},
          {prop: 'title', label: '商品名称', type: 'a', a_url: 'id', a_path: `${process.env.URL.EXCHANGE}/#/selldetail?id=`},
          {prop: 'tel', label: '下单用户', type: 'a', a_url: 'id', a_path: `${process.env.URL.USER}/#/userdetail?id=`},
          {prop: 'price', label: '订单金额'},
          {prop: 'order_stage_name', label: '状态'},
          {prop: 'delivery_method_name', label: '配送方式'},
          {prop: 'pay_method_name', label: '支付方式'},
          {prop: 'order_time', label: '下单时间', type: 'date'}
        ],
        user_model: User,
        model: new Order(),
        message: {},
        showdialog: false,
        currentItem: {},
        loading: false,

        orderCurrentItem: {},
        showOrderDialog: false,

        showGetGoodDialog: false,
        GoodsCurrentItem: {}
      }
    },
    methods: {
      /** 取消订单 */
      cancelOrder(item) {
        this.orderCurrentItem = item
        this.showOrderDialog = true
      },
      cancelOrderTool () {
        let that = this
        this.loading = true
        this.orderCurrentItem.cancelOrder({
          success (res) {
            that.$message.success(res.data.errmsg || '订单取消成功')
            that.showOrderDialog = false
            that.loading = false
            that.$root.eventHub.$emit('form-success-tab', res)
          },
          error (res) {
            that.$message.error(res.msg || '订单取消失败')
            that.showOrderDialog = false
            that.loading = false
          }
        })
      },
      /**  发货 */
      sendGood() {
        let that = this
        this.loading = true
        this.currentItem.sendGood({
          success (res) {
            that.$message.success(res.data.errmsg || '通知卖方发货成功')
            that.showdialog = false
            that.loading = false
            that.$root.eventHub.$emit('form-success-tab', res)
          },
          error (res) {
            that.$message.error(res.msg || '通知卖方发货失败')
            that.showdialog = false
            that.loading = false
          }
        })
      },
      /**  获取发货信息 */
      getMessage(item) {
        let that = this
        that.currentItem = item
        item.getMessage({
          success (res) {
            that.message = res.data.manage
            that.showdialog = true
          }
        })
      },
      /** 买家已收货 */
      getGoods (item) {
        this.GoodsCurrentItem = item
        this.showGetGoodDialog = true
      },
      getGoodsResult() {
        this.showGetGoodDialog = false
        this.$root.eventHub.$emit('add-tab', {
          item: this.GoodsCurrentItem,
          tab_name: '买家已收货',
          edit: true,
          slot_name: 'get_good'
        })
      },
      getGoodOver(form, item) {
        let that = this
        form.validate((valid) => {
          if (!valid)  return false
          that.loading = true
          item.getGood({
            success (res) {
              that.$message.success(res.data.errmsg || '确认收货成功')
              that.loading = false
              that.$root.eventHub.$emit('form-success-tab', res)
            },
            error (res) {
              that.$message.error(res.msg || '确认收货失败')
              that.loading = false
            }
          })
        })
      }
    }
  }
</script>

