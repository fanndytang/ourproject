<template>
  <rs-list :page_title="'会籍等级'" :column="column" :model="model">
    <template slot="search">
      <el-form-item label="会籍名称" prop="name">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.name" placeholder="请输入会籍名称"></el-input>
      </el-form-item>
      <el-form-item label="会籍等级" prop="code">
        <el-select v-model="model.pkeysearch.code" @change="model.search()">
          <el-option v-for="item,i in search_level" :key="i" :label="item | setLabel" :value="item"></el-option>
        </el-select>
      </el-form-item>
    </template>

    <template slot-scope="p" slot="form-item">
      <el-form-item label="会籍等级" prop="code" :rules="{required: true, message: '请选择会籍等级', trigger: 'blur'}">
        <span v-if="!!p.edit"> {{ p.item.code | setLabel }}</span>
        <el-select v-model="p.item.code" v-if="!p.edit">
          <el-option v-for="item,i in level" :key="i" :label="item | setLabel" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会籍名称" prop="name" :rules="{required: true, message: '请输入会籍名称', trigger: 'blur'}">
        <el-input v-model="p.item.name" placeholder="请输入会籍名称"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="money" :rules="{required: true, validator: checkNum, message: '请输入会籍价格', trigger: 'blur'}">
        <input-number v-model="p.item.money" :dot="2"></input-number>
        <span class="price-tip">(数字类型且小数点后最多两位)</span>
      </el-form-item>
      <el-form-item label="封面图" prop="icon_fid" :rules="{required: true, message: '请上传封面图', trigger: 'blur'}">
        <upload-img v-model="p.item.icon_fid" :url="p.item.icon_pic"></upload-img>
      </el-form-item>
      <el-form-item label="背景图" prop="logo_fid" :rules="{required: parseInt(p.item.is_pc) === 0, message: '请上传背景图', trigger: 'blur'}">
        <upload-img v-model="p.item.logo_fid" :url="p.item.logo_pic"></upload-img>
      </el-form-item>
      <el-form-item label="pc会籍描述" prop="pc_description" class="rs-editor" :rules="{required: parseInt(p.item.is_pc) === 1, message: '请输入会籍描述', trigger: 'blur'}" v-show="parseInt(p.item.is_pc) === 1">
        <rs-editor v-model="p.item.pc_description" :id="`vipkind_pcdescription${Math.ceil(Math.random()*10000)}`"></rs-editor>
      </el-form-item>
      <el-form-item label="app会籍描述" prop="description" class="rs-editor" :rules="{required: parseInt(p.item.is_pc) === 0, message: '请输入会籍描述', trigger: 'blur'}" v-show="parseInt(p.item.is_pc) === 0">
        <rs-editor v-model="p.item.description" :id="`vipkind_appdescription${Math.ceil(Math.random()*10000)}`"></rs-editor>
      </el-form-item>
      <el-form-item label="pc备注" prop="pc_remark" class="rs-editor" v-show="parseInt(p.item.is_pc) === 1">
        <rs-editor v-model="p.item.pc_remark" :id="`vipkind_pcremark${Math.ceil(Math.random()*10000)}`"></rs-editor>
      </el-form-item>
      <el-form-item label="app备注" prop="remark" v-show="parseInt(p.item.is_pc) === 0">
        <el-input v-model="p.item.remark" type="textarea" :rows="4"></el-input>
      <!--  <rs-editor v-model="p.item.remark" :id="`vipkind_appremark${Math.ceil(Math.random()*10000)}`"></rs-editor>-->
      </el-form-item>
      <el-form-item label="版本" prop="is_pc" :rules="{required: true, message: '请选择版本', trigger: 'blur'}">
        <el-select v-model="p.item.is_pc" v-if="!p.edit">
          <el-option label="移动端" :value="0"></el-option>
          <el-option label="pc端" :value="1"></el-option>
        </el-select>
        <span v-else>{{ p.item.version_name }}</span>
      </el-form-item>
    </template>
  </rs-list>
</template>

<script>
  import VipKind from '@/model/vip/kind'
  /** @vue */
  export default {
    data () {
      return {
        model: new VipKind(),
        column: [
          {prop: 'version_name', label: '版本'},
          {prop: 'name', label: '会籍名称'},
          {prop: 'code_name', label: '会籍等级'},
          {prop: 'icon_pic', label: '封面图', type: 'img'},
          {prop: 'logo_pic', label: '背景图', type: 'img'},
          {prop: 'money_name', label: '价格'},
          {prop: 'create_time', label: '创建时间', type: 'date'},
        ],
        search_level: ['lev1', 'lev2', 'lev3', 'lev4', 'lev5', 'lev6'],
        level: ['lev1', 'lev2', 'lev3', 'lev4', 'lev5', 'lev6']
      }
    },
    filters: {
      setLabel (val) {
        let t = {
          lev1: '一',
          lev2: '二',
          lev3: '三',
          lev4: '四',
          lev5: '五',
          lev6: '六',
          lev7: '七',
          lev8: '八',
          lev9: '九'
        }

        return t[val] + '级'
      }
    },
    methods: {
      /** 检查数字有效性 */
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

<style lang="less">
  .el-input-group__append {
    position: absolute !important;
    left: 100%;
    top: 0;
    height: 100%;
    width: 36px !important;
    line-height: 36px;
  }
  .price-tip {
    position: absolute;
    left: 180px;
    top: 0;
    color: #999;
    font-size: 12px;
    white-space: nowrap;
  }
</style>
