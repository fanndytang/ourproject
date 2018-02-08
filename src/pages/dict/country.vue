<template>
  <rs-list :page_title="'国家管理'" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="国家名称" prop="country">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.country"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="国家编号" prop="country_code">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.country_code"  placeholder="请输入"></el-input>
      </el-form-item>
    </template>
    <template slot-scope="p" slot="form-item">
      <el-form-item label="国家名称" prop="country"> {{ p.item.country }}</el-form-item>
      <el-form-item label="国家编号" prop="country_code"> {{ p.item.country_code }}</el-form-item>
      <el-form-item label="国家图标" prop="file_fid">
        <upload-img v-model="p.item.file_fid" :url="p.item.pic"></upload-img>
      </el-form-item>
      <el-form-item label="国家简写" prop="short_name">
        <el-input type="textarea" v-model="p.item.short_name"  placeholder="请输入"></el-input>
      </el-form-item>
    </template>
  </rs-list>
</template>

<script>
  import Country from '@/model/dict/country'
  /** @vue */
  export default {
    data() {
      return {
        has_kind_rights: false,
        column: [
          {prop: 'country', label: '国家名称'},
          {prop: 'pic', label: '国家图标', type: 'img'},
          {prop: 'country_code', label: '国家编号'},
          {prop: 'short_name', label: '国家简写'}
        ],
        model: new Country()
      }
    }
  }
</script>

