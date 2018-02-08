<template>
  <div>
    <rs-list :page_title="'关于我们'" :model="model" :column="column">
      <template slot-scope="p" slot="form-item">
        <!--  <el-form-item label="公司地址坐标" prop="coord">
               <el-input v-model="p.item.coord"  placeholder="请输入公司地址坐标"></el-input>
             </el-form-item>-->
        <!-- <el-form-item label="公司名称" prop="title">
           <el-input v-model="p.item.title"  placeholder="请输入公司名称"></el-input>
         </el-form-item>
         <el-form-item label="封面图" prop="file_id">
           <upload-img v-model="p.item.file_id" :url="p.item.cover_pic" :form_data="p.item" :img_key="'cover_pic'"></upload-img>
         </el-form-item>
         <el-form-item label="联系电话" prop="tel">
           <el-input v-model="p.item.tel"  placeholder="请输入公司联系电话"></el-input>
         </el-form-item>
         <el-form-item label="公司地址" prop="address">
           <el-input type="textarea" :rows="3" v-model="p.item.address"  placeholder="请输入公司公司地址"></el-input>
         </el-form-item>-->
        <el-form-item label="公司介绍" prop="content" class="rs-editor" :rules="{required: true, validator: checkContent, trigger: 'blur'}">
        <!--  <div v-html="p.item.content"></div>-->
          <rs-editor v-model="p.item.content" :sha="'aboutus'" :id="`aboutus${Math.ceil(Math.random()*10000)}`"></rs-editor>
          <!--  <el-input type="textarea" :rows="20" v-model="p.item.content" placeholder="请输入简介"></el-input>-->
        </el-form-item>
      </template>
    </rs-list>


  </div>
</template>

<script>
  import AboutUs from '@/model/system/aboutus'
  /** @vue */
  export default {
    data () {
      return {
        model: new AboutUs(),
        column: [
          {prop: 'content_show', label: '内容', type: 'article', width: '80%'}
        /*  {prop: 'title', label: '名称'},
          {prop: 'cover_pic', label: '封面图', type: 'img'},
          {prop: 'tel', label: '电话'},
          {prop: 'address', label: '地址'}*/
        ],
      }
    },
    methods: {
      /**
       * 检查文章内容
       * */
      checkContent(rule, value, callback) {
        let flag = value.indexOf('id="my-frame-text"></div>')
        if (value === '' || flag !== -1) {
          callback(new Error('请输入文章内容'))
        } else {
          callback()
        }
      },
    }
  }
</script>
