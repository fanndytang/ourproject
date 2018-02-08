<template>
  <rs-list :page_title="'广告位'" :model="model" :column="column">
    <template slot="search">
      <el-form-item label="标题" prop="title">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.title"  placeholder="请输入标题"></el-input>
      </el-form-item>
    </template>
    <template slot-scope="p" slot="form-item">
      <el-form-item label="广告位置" prop="position" :rules="{required: true, message: '请选择广告位置', trigger: 'blur'}">
        <el-input v-model="p.item.position" placeholder="请输入广告位置"></el-input>
        <!--<el-select v-model="p.item.position">
          <el-option v-for="item,i in p.item.position_array" :key="i" :label="item.name" :value="item.id"></el-option>
        </el-select>-->
        <div class="pos-tip">CIRCLE----PC端首页轮播，TOPPAGE----落地页顶部轮播</div>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="p.item.title" placeholder="请输入描述，少于10个字"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="p.item.description" placeholder="请输入描述，少于20个字"></el-input>
      </el-form-item>
      <el-form-item label="跳转链接" prop="url">
        <el-input v-model="p.item.url" placeholder="http://"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="file_id" :rules="{required: true, message: '请上传图片', trigger: 'blur'}">
        <upload-img v-model="p.item.file_id" :url="p.item.file_pic"></upload-img>
        图片尺寸690px*440px,图片大小5M内
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="p.item.status">
          <el-radio :label="1">展示</el-radio>
          <el-radio :label="2">不展示</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="展示端口" prop="terminal">
        <el-radio-group v-model="p.item.terminal">
          <el-radio :label="1">PC端</el-radio>
          <el-radio :label="0">移动端</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <input-number v-model.number="p.item.sort" :dot="0" :min="0" :px="''" :pos="'right'" placeholder="数字越小排序越靠前"></input-number>
      </el-form-item>
    </template>
  </rs-list>
</template>
<script>
  import AD from '@/model/system/adset'
  /** @vue */
  export default {
    data() {
      return {
        column: [
          {prop: 'title', label: '标题'},
          {prop: 'file_pic', label: '图片', type: 'img'},
          {prop: 'status_name', label: '状态'},
          {prop: 'sort', label: '排序'},
          {prop: 'terminal_name', label: '展示端口'},
          {prop: 'position_name', label: '广告位置'},
          {prop: 'create_time', label: '创建时间', type: 'date'}
        ],
        model: new AD()
      }
    },
    mounted () {
      this.$root.eventHub.$on('add-tab-success', (res) => {
        this.sub = false
        if(!res.edit) {
          res.item.terminal = 1
        }
      })
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .pos-tip {
    color: #71a5cc;
    font-size: 12px;
    line-height: 18px;
  }
</style>
