<template>
  <rs-list :page_title="'实名认证'" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="认证用户" prop="tel">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.tel" placeholder="请输入认证用户"></el-input>
      </el-form-item>
      <el-form-item label="审核状态" prop="status">
        <el-select v-model="model.pkeysearch.status" @change="model.search()">
          <el-option value="0" label="待审核"></el-option>
          <el-option value="1" label="审核成功"></el-option>
          <el-option value="2" label="审核失败"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请时间" prop="datetimerange">
        <el-date-picker @change="model.search()" v-model="model.pkeysearch.datetimerange" type="daterange" placeholder="选择时间范围"></el-date-picker>
      </el-form-item>
    </template>

    <template slot-scope="p" slot="table-tool">
      <span class="table-tool" v-if="p.item.can_check && p.item.has_check_rights" @click="$root.eventHub.$emit('add-tab',{item: p.item, tab_name: '审核', edit: true, slot_name: 'check'})">审核</span>
    </template>

    <template slot-scope="p" slot="check">
      <el-form :model="p.item" :ref="`check${p.index}`" label-width="100px" v-loading="loading" element-loading-text="加载中">
        <el-form-item label="ID">{{ p.item.id }}</el-form-item>
        <el-form-item label="认证姓名">{{ p.item.realname }}</el-form-item>
        <el-form-item label="认证号码">{{ p.item.id_number }}</el-form-item>
        <el-form-item label="认证照片">
          <preview-img :url="[p.item.front_pic, p.item.back_pic]"></preview-img>
        </el-form-item>
        <el-form-item label="认证类型">{{ p.item.id_kind_name }}</el-form-item>
        <el-form-item label="认证用户">{{ p.item.usertel }}</el-form-item>
        <el-form-item label="申请认证时间">{{ p.item.create_time | formateDate }}</el-form-item>
        <el-form-item label="状态" prop="audit_status_use"  v-if="p.item.can_check">
          <el-radio-group v-model="p.item.audit_status_use">
            <el-radio :label="1">审核成功</el-radio>
            <el-radio :label="2">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="结果：" prop="audit_result" :rules="{validator: checkResult, trigger: 'blur'}">
          <span class="form-label-tip">(100字以内)</span>
          <el-input v-model="p.item.audit_result" type="textarea" :maxlength="100" :rows="3" placeholder="如果审核失败，请填写失败原因"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark" v-if="p.item.can_check">
          <span class="form-label-tip">(100字以内)</span>
          <el-input v-model="p.item.remark" type="textarea" :maxlength="100" :rows="3" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item>
          <button class="btn btn-primary" type="button" @click="check(p.item, p.index)">确认</button>
        </el-form-item>
      </el-form>
    </template>
  </rs-list>
</template>

<script>
  import Certificate from '@/model/user/certificate'
  /** @vue */
  export default {
    data() {
      return {
        loading: false,
        model: new Certificate(),
        item: {},
        column: [
          {prop: 'realname', label: '认证姓名'},
          {prop: 'id_number', label: '认证号码'},
          {prop: 'front_pic', label: '认证照片正面', type: 'img'},
          {prop: 'back_pic', label: '认证照片反面', type: 'img'},
          {prop: 'id_kind_name', label: '认证类型'},
          {prop: 'usertel', label: '认证用户', type: 'a', a_href: 'user_href', width: '150px'},
          {prop: 'create_time', label: '申请认证时间', type: 'date'},
          {prop: 'audit_status_name', label: '审核状态'},
          {prop: 'audit_time', label: '操作时间', type: 'date'},
          {prop: 'audit_user', label: '操作用户'}
        ],
        tools: {}
      }
    },
    methods: {
      check(item, index) {
        let that = this
        that.item = item
        that.$refs[`check${index}`].validate((valid) => {
          if(!valid) return false
          that.loading = true
          item.check({
            success (res) {
              that.loading = false
              that.$root.eventHub.$emit('form-success-tab', {data: res, index: index})
            },
            error (res) {
              that.loading = false
            }
          })
        })
      },
      checkResult (rule, value, callback) {
        let val = parseInt(this.item.audit_status_use) === 2
        if (val && value === '') {
          callback(new Error('请输入审核失败的原因'))
        } else {
          callback()
        }
      }
    }
  }
</script>
