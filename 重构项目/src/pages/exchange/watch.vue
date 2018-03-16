<template>
  <div class="t-tab">
    <ul class="t-tab-title">
      <li :class="{'active': active === 1}" @click="active = 1">腕表列表</li>
      <li :class="{'active': active === 2}" @click="active = 2">测试</li>
    </ul>

    <rs-layout v-show="active === 1" label="腕表列表">
      <rs-search :model="model1">
        <div class="form-item">
          <div class="label">标题</div>
          <input type="text" v-model="model1.rsSearch.title" placeholder="请输入">
        </div>
      </rs-search>

      <rs-list :model="model1" :column="column" :tools="{pos: 0, item: {label: '审核', event: 'rs-list-watchCheck'}}"></rs-list>

      <template slot="form-item" v-if="$root.form">

        <div v-if="$root.form && $root.form.slotName === 'check'">
          <div class="form-item">
            <div class="label">审核tab</div>
            <input type="text">
          </div>
        </div>
        <div v-else>
          <div class="form-item">
            <div class="label">标题</div>
            <input type="text" placeholder="请输入" v-model="$root.form.title"
                   v-va="[{required: true, msg: '请输入标题'}, {minLength: 3}, {maxLength: 10},{min: 3},{max: 40}, {valid: valid1, msg: '这是自定义的验证11'},  {valid: valid2, msg: '这是自定义的验证22'}]">
          </div>

          <div class="form-item">
            <div class="label">描述</div>
            <input type="text" placeholder="请输入" v-model="$root.form.detail"
                   v-va:required>
          </div>

          <div class="form-item">
            <div class="label">描述</div>
            <input type="text" placeholder="请输入" v-model="$root.form.detail">
          </div>

          <div class="form-item">
            <div class="label">描述</div>
            <input type="text" placeholder="请输入" v-model="$root.form.detail">
          </div>

          <div class="form-item">
            <div class="label">描述</div>
            <input type="text" placeholder="请输入" v-model="$root.form.detail">
          </div>
        </div>
      </template>
    </rs-layout>


    <rs-layout v-show="active === 2" label="测试">
        <rs-search>
          <div class="form-item">
            <div class="label">标题</div>
            <input type="text" v-model="model2.rsSearch.title" placeholder="请输入" @keyup.enter="model2.search()">
          </div>
        </rs-search>

        <rs-list :model="model2" :tools="{pos: 0, item: {label: '审核', event: 'rs-list-watchCheck'}}"></rs-list>

        <template slot="form-item" v-if="$root.form">
          <div v-if="$root.form && $root.form.slotName === 'check'">
            <div class="form-item">
              <div class="label">审核tab</div>
            </div>
          </div>
          <div v-else>
            <div class="form-item">
              <div>非审核表单</div>
              <div class="label">标题</div>
              <input type="text" placeholder="请输入" v-model="$root.form.title">
            </div>
          </div>
        </template>
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
  import Watch from '@/model/exchange/watch'
  import Order from '@/model/exchange/order'
  export default {
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
      /** 除编辑、删除、查看 额外有个审核的按钮时 */
      this.$root.eventHub.$on('rs-list-watchCheck', (data) => {
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
        this.$root.eventHub.$emit('rs-add-tab', data)
      })


      /** 导出 */
      this.$root.eventHub.$on('rs-list-export', () => {
        console.log('test')
        this.showModal = true
      })

      this.$message.error('test')
      this.$message.success('success')

    //  console.log(this.$myMethod())
    },
    methods: {
      confirm () {
        console.log('confirm')
      },
      valid2: (val) => {
       // console.log(this.$root.form)
        return val === '1111'
      }
    }
  }
</script>
