<template>
  <div id="WatchBox" class="t-tab">
    <!--<ul class="t-tab-title">
      <li :class="{'active': active === 1}" @click="active = 1">腕表列表 <i class="fa fa-address-book"></i></li>
      <li :class="{'active': active === 2}" @click="active = 2">测试</li>
    </ul>-->

    <rs-layout label="腕表列表">
      <rs-search :model="model1">
        <div class="form-item">
          <div class="label">标题</div>
          <input type="text" v-model="model1.rsSearch.title" placeholder="请输入">
        </div>
      </rs-search>

      <rs-list :model="model1" :column="column" :tools="{pos: 0, item: {label: '审核', event: 'rs-list-watchCheck'}}"></rs-list>

    </rs-layout>

    <rs-modal v-model="showModal" title="测试弹窗" @confirm="confirm">
      这是弹窗<br />
      这是弹窗<br />
      这是弹窗<br />
      这是弹窗<br />
      这是弹窗<br />
    </rs-modal>
  </div>
</template>

<script>
  import Watch from '/model/exchange/watch.js'
  import Order from '/model/exchange/order.js'
  new Vue({
      el: '#WatchBox',
      data () {
          return {
              active: 1,
              model1: new Watch(),
              column: [
                  {prop: 'title', label: '标题'},
                  {prop: 'title', label: '标题'},
                  {prop: 'title', label: '标题'},
                  {prop: 'title', label: '标题'},
                  {prop: 'title', label: '标题'}
              ],
              model2: new Order(),
              showModal: false,

              valid1: false
          }
      },
      mounted () {
          window.$eventHub.$on('rs-get-list', () => {
              console.log('rs-get-list')
          })
          /** 除编辑、删除、查看 额外有个审核的按钮时 */
          window.$eventHub.$on('rs-list-watchCheck', (data) => {
              data.slotName = 'check'
              data.formBtns = [
                  {
                      label: '审核成功',
                      btnClass: 'btn-primary',
                      handle: () => {
                          //  this.model.check()
                      }
                  },
                  {
                      label: '审核失败',
                      handle: () => {
                          //  this.model.check()
                      }
                  }
              ]
              window.$eventHub.$emit('rs-add-tab', data)

              console.log('审核')
          })

          /** 导出 */
          window.$eventHub.$on('rs-list-export', () => {
              this.showModal = true
          })
          this.$message.error('test')
          this.$message.success('success')
      },
      methods: {
          confirm () {
              console.log('confirm')
          },
          valid2: (val) => {
              return val === '1111'
          }
      }
  })
</script>
