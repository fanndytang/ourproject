<template>
  <rs-list :page_title="'展厅管理'" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="展厅编号" prop="hall_code">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.hall_code"  placeholder="请输入展厅编号"></el-input>
      </el-form-item>
      <el-form-item label="展厅所在地址" prop="location">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.location"></el-input>
      </el-form-item>
    </template>
    <template slot-scope="p" slot="form-item">
      <el-form-item label="展厅编号" prop="code" :rules="{required: true, message: '请输入展厅编号', trigger: 'blur'}">
        <span class="form-label-tip">(4个字符以内)</span>
        <el-input :maxlength="4" v-model="p.item.code" :disabled="p.edit"></el-input>
      </el-form-item>
     <!-- <el-form-item label="地区">

      </el-form-item>-->
      <el-form-item label="展厅所在地址" prop="location" :rules="{required: true, message: '请输入展厅所在地址', trigger: 'blur'}">
        <el-input v-model="p.item.location"></el-input>
      </el-form-item>
      <el-form-item label="坐标" prop="coord">
        <el-input v-model="p.item.coord"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input v-model="p.item.tel"></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="manager">
        <el-input v-model="p.item.manager"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input v-model="p.item.contact"></el-input>
      </el-form-item>
      <el-form-item label="展厅门店图" prop="cover_fid">
        <upload-img v-model="p.item.cover_fid" :url="p.item.cover_pic"></upload-img>
      </el-form-item>
      <el-form-item label="展厅详情图" prop="file_fid_list" style="width: 220%">
        <upload-img v-model="p.item.file_fid_list" :url="p.item.file_pic" :file_list="true"></upload-img>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <span class="form-label-tip">（100字以内）</span>
        <el-input :rows="3" :maxlength="100" type="textarea" v-model="p.item.remark"></el-input>
      </el-form-item>
    </template>
  </rs-list>
</template>
<script>
  import Hall from '@/model/system/hall'
  /** @vue */
  export default {
    data() {
      return {
        column: [
          {prop: 'code', label: '展厅编号'},
          {prop: 'location', label: '展厅所在地址'},
          {prop: 'manager', label: '展厅负责人'},
          {prop: 'contact', label: '展厅联系人'},
          {prop: 'cover_pic', label: '展厅门店图', type: 'img'}
        ],
        model: new Hall()
      }
    }
  }
</script>
