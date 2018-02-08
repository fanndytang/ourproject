<template>
  <div class="section">
    <ul class="section-title">
      <li :class="{'active': sec_active === 0}" @click="sec_active = 0">基本信息</li>
      <li :class="{'active': sec_active === 1}" @click="sec_active = 1">商品详情</li>
      <li :class="{'active': sec_active === 2}" @click="sec_active = 2">比价信息</li>
    </ul>
    <div class="section-pane" v-show="sec_active === 0">
      <el-form-item label="商品名称" prop="title" :rules="{required: true, message: '请输入商品名称', trigger: 'blur'}">
        <el-input v-model="p.item.title" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="封面图" prop="cover_fid" :rules="{required: true, message: '请上传封面图', trigger: 'blur'}">
        <upload-img v-model="p.item.cover_fid" :url="p.item.cover_pic"></upload-img>
      </el-form-item>
      <el-form-item label="所在地" prop="country_id">
        <select-scroll v-model="p.item.country_id" :model="countryModel" :rows="250" :prop="{value: 'id', label: 'country'}"
                     style="width: 46%;float:left;"></select-scroll>
        <el-input v-model="p.item.location" placeholder="请填写省市区" style="width:46%;margin-left:4%;"></el-input>
      </el-form-item>
      <el-form-item label="是否平台发布" prop="is_platform">
        <el-radio-group v-model="p.item.is_platform">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="腕表来源" prop="consignment_status">
        <el-radio-group v-model="p.item.consignment_status">
          <el-radio :label="0">公司内部</el-radio>
          <el-radio :label="1">外部寄售</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <div v-show="true">
         <el-form-item label="寄售人">
           <el-input placeholder="请输入"></el-input>
         </el-form-item>
         <el-form-item label="联系方式">
           <el-input placeholder="请输入"></el-input>
         </el-form-item>
       </div>-->
      <el-form-item label="状态" prop="publish_status">
        <el-radio-group v-model="p.item.publish_status" :disabled="p.item.exchange_stage >= 31 && p.item.exchange_stage < 60">
          <el-radio :label="1">上架中</el-radio>
          <el-radio :label="2">下架中</el-radio>
        </el-radio-group>
        <span class="order-tip" v-if="p.item.exchange_stage >= 31 && p.item.exchange_stage < 60">(有订单进行中，不可下架)</span>
      </el-form-item>
      <el-form-item label="品牌" prop="brand_id" :rules="{required: true,  message: '请选择品牌', trigger: 'blur'}">
        <select-scroll v-model="p.item.brand_id"
          :search="{value: `${p.item.sessionkey_search}-form-brand_id`, label: `${p.item.sessionkey_search}-form-brand_name`}"
          :remoteInit="{query: 'name', label: p.item.brand_name, value: p.item.brand_id}"
          :model="brandModel" :rows="40" :prop="{value: 'id', label: 'name'}"></select-scroll>
      </el-form-item>
      <el-form-item label="型号" prop="model_num">
        <el-input v-model="p.item.model_num" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="机身码" prop="product_num">
        <el-input v-model="p.item.product_num" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="原价" prop="original_price" :rules="{required: true, validator: checkNum, message: '请输入原价', trigger: 'change'}">
        <input-number v-model.number="p.item.original_price" :px="'$'" :dot="2"></input-number>
        <span class="price-tip">(数字类型且小数点后最多两位)</span>
      </el-form-item>
      <el-form-item label="售价" prop="price" :rules="{required: true,  validator: checkNum, message: '请输入售价', trigger: 'change'}">
        <input-number v-model.number="p.item.price" @change="p.item.getPrice()" :px="'$'" :dot="2"></input-number>
        <span class="price-tip" style="line-height:  30px;">(数字类型且小数点后最多两位)</span>
        <span style="position: absolute;left: 100%;line-height:  30px;margin-left:90px; top: 0; white-space: nowrap;font-size: 12px;color: #999;">人民币参考价：{{p.item.rmb_price}}</span>
      </el-form-item>
      <el-form-item label="机芯类型" prop="movement_id">
        <select-scroll v-model="p.item.movement_id"
                       :model="movementModel" :rows="80" :prop="{value: 'pid', label: 'name'}"></select-scroll>
      </el-form-item>
      <el-form-item label="表壳材质" prop="material_id">
        <select-scroll v-model="p.item.material_id"
                       :model="materialModel" :rows="80" :prop="{value: 'pid', label: 'name'}"></select-scroll>
      </el-form-item>
      <el-form-item label="表盘形状" prop="shape_id">
        <select-scroll v-model="p.item.shape_id"
                       :model="shapeModel" :rows="80" :prop="{value: 'pid', label: 'name'}"></select-scroll>
      </el-form-item>
      <el-form-item label="复杂功能" prop="function_id">
        <select-scroll v-model="p.item.function_id"
                       :model="functionsModel" :rows="80" :prop="{value: 'pid', label: 'name'}" :multiple="true"></select-scroll>
      </el-form-item>
      <el-form-item label="成色" prop="fineness_id" :rules="{required: true, message: '请选择成色', trigger: 'blur'}">
        <select-scroll v-model="p.item.fineness_id"
                       :model="finenessModel" :rows="80" :prop="{value: 'pid', label: 'name'}"></select-scroll>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="p.item.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
          <el-radio :label="3">中性</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="表盘直径" prop="diameter" :rules="{required: true, validator: checkNum, message: '请输入表盘直径', trigger: 'change'}">
        <input-number v-model.number="p.item.diameter" :dot="1" :min="0" :max="70" :px="'mm'" :pos="'right'"></input-number>
        <span class="price-tip">(数字类型且小数点后最多一位)</span>
      </el-form-item>
      <el-form-item label="商品图片" prop="file_id"  :rules="{required: true, message: '请上传商品图片', trigger: 'change'}">
        <rs-cropper v-model="p.item.file_id" :url="p.item.file_pic" :file_list="true" :autoCropWidth="500"></rs-cropper>
      </el-form-item>
      <el-form-item label="360文件上传" prop="file_fid_360" style="margin-bottom: 30px !important;">
        <span class="form-label-tip" style="line-height:16px;margin-top:4px;">(ZIP文件，文件名要求数字或字母)</span>
        <div class="upload" v-loading="loading" element-loading-text="上传中">
          <input type="file" :id="`sell-watch${p.item.gid}`" @change="uploadFile($event, p.item)">
          <button type="button" class="btn btn-primary btn-sm">点击上传</button>
          <span>{{ p.item.uploadFileName }}</span>
          <span class="close-btn" v-if="p.item.uploadFileName != ''" @click="del(p.item)">&times;</span>
        </div>
        <input type="hidden" v-model="p.item.file_fid_360">
      </el-form-item>
      <el-form-item label="浏览量" prop="pv">
        <el-input v-model="p.item.pv" :maxlength="9" placeholder="请输入"></el-input>
        <span class="form-label-tip">(9位数字以内)</span>
      </el-form-item>
    </div>
    <div class="section-pane" v-show="sec_active === 1">
      <el-form-item label="终端" prop="is_platform">
        <el-radio-group v-model="details_type">
          <el-radio :label="0">PC端</el-radio>
          <el-radio :label="1">移动端</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-show="details_type === 0">
        <el-form-item label="商品详情" prop="pc_graphic_details" class="rs-editor" :rules="{required: true, validator: checkContent, trigger: 'blur'}">
          <span class="form-label-tip" style="line-height:16px;margin-top:8px;width:120px;">
            图片尺寸：<br />1160px*不限高度<br /><br />
            <span style="text-align:left;">文章段落限制：<br />每段最多2000字，超过将无法保证翻译质量</span>
          </span>
          <rs-editor v-model="p.item.pc_graphic_details" :id="`pc_graphic_details${Math.ceil(Math.random()*10000)}`"></rs-editor>
        </el-form-item>
        <el-form-item label="腕表溯源" prop="pc_history" class="rs-editor" :rules="{required: true, validator: checkContent, trigger: 'blur'}">
          <span class="form-label-tip" style="line-height:16px;margin-top:8px;width:120px;">
             图片尺寸：<br />1160px*不限高度<br /><br />
            <span style="text-align:left;">文章段落限制：<br />每段最多2000字，超过将无法保证翻译质量</span>
          </span>
          <rs-editor v-model="p.item.pc_history" :id="`pc_history${Math.ceil(Math.random()*10000)}`"></rs-editor>
        </el-form-item>
      </div>
      <div v-show="details_type === 1">
        <el-form-item label="商品详情" prop="app_graphic_details" class="rs-editor">
          <span class="form-label-tip" style="line-height:16px;margin-top:8px;width:120px;">
            图片尺寸：<br />750px*不限高度<br /><br />
            <span style="text-align:left;">文章段落限制：<br />每段最多2000字，超过将无法保证翻译质量</span>
          </span>
          <rs-editor v-model="p.item.app_graphic_details" :id="`app_graphic_details${Math.ceil(Math.random()*10000)}`"></rs-editor>
        </el-form-item>
        <el-form-item label="腕表溯源" prop="app_history" class="rs-editor">
          <span class="form-label-tip" style="line-height:16px;margin-top:8px;width:120px;">
            图片尺寸：<br />750px*不限高度<br /><br />
            <span style="text-align:left;">文章段落限制：<br />每段最多2000字，超过将无法保证翻译质量</span>
          </span>
          <rs-editor v-model="p.item.app_history" :id="`app_history${Math.ceil(Math.random()*10000)}`"></rs-editor>
        </el-form-item>
      </div>
    </div>
    <div class="section-pane" v-show="sec_active === 2">
      <h3 class="price-title">价格来源(大陆)</h3>
      <div class="sec-pane" style="margin-left: 120px;" >
        <div class="price-item" v-for="el, i in p.item.compare_price_cn">
         <!-- <el-input class="tag" v-model="el.tag" @focus="removeTag(i, p.item, 'cn')" @blur="checkTag(i, p.item, 'cn')" placeholder="请输入"></el-input>-->
          <span class="tag">{{el.tag}}</span>
          <input-number class="value" v-model.number="el.price" :px="el.unit" :dot="2"></input-number>
         <!-- <div class="icon">
            <span class="plus" @click="plusPrice(i, p.item, 'cn')">+</span>
            <span class="minus" v-show="i > 0" @click="minusPrice(i, p.item, 'cn')">-</span>
          </div>
          <span class="error-tip" v-show="el.error">请勿添加重复数据</span>-->
        </div>
      </div>
      <h3 class="price-title">价格来源(香港)</h3>
      <div class="sec-pane" style="margin-left: 120px;" >
        <div class="price-item" v-for="el, i in p.item.compare_price_hk">
        <!--  <el-input class="tag" v-model="el.tag" @focus="removeTag(i, p.item, 'hk')" @blur="checkTag(i, p.item, 'hk')" placeholder="请输入"></el-input>-->
          <span class="tag">{{ el.tag }}</span>
          <input-number class="value" v-model.number="el.price" :px="el.unit" :dot="2"></input-number>
          <!--<div class="icon">
            <span class="plus" @click="plusPrice(i, p.item, 'hk')">+</span>
            <span class="minus" v-show="i > 0" @click="minusPrice(i, p.item, 'hk')">-</span>
          </div>
          <span class="error-tip" v-show="el.error">请勿添加重复数据</span>-->
        </div>
      </div>
    </div>

    <el-form-item style="margin-top: 40px;">
      <button class="btn btn-primary" type="button" @click="subForm()">提交</button>
    </el-form-item>
  </div>
</template>

<script>
  import Watch from '@/model/exchange/watch-sell'
  import Dict from '@/model/dict/goods'
  import Upload from '@/model/api/upload'
  import Country from '@/model/dict/country'
  /** @vue */
  export default {
    props: {
      p: Object,
      model: Object
    },
    data () {
      return {
        price_location: 0,
        details_type: 0,
        sec_active: 0,                                      //  基本信息、商品详情、比价信息选中项
        has_brand_rights: false,                            //  获取品牌列表的权限
        has_user_rights: false,                             //  获取后台用户列表的权限
        brandModel: new Dict({model_type: 'brand'}),
        movementModel: new Dict({model_type: 'movement'}),
        materialModel: new Dict({model_type: 'material'}),
        shapeModel: new Dict({model_type: 'shape'}),
        functionsModel: new Dict({model_type: 'functions'}),
        finenessModel: new Dict({model_type: 'fineness'}),
        countryModel: new Country(),
        loading: false,
        item: {}
      }
    },
    mounted () {
      let rights = localStorage.getItem('admin_rights_list')
      if(rights) rights = JSON.parse(rights)
      this.has_brand_rights = rights && rights.dict && rights.dict[`v1,dict,admin,brand,get`]
    },
    methods: {
      /** 检查富文本内容 */
      checkContent(rule, value, callback) {
        let flag = value.indexOf('id="my-frame-text"></div>')
        if (value === '' || flag !== -1) {
          callback(new Error('请输入内容'))
        } else {
          callback()
        }
      },
      /**
       * 价格来源：输入框聚焦时，先清除之前已保存的标题*/
      removeTag(i, item, type) {
        if(!!item[`compare_price_${type}`][i].tag) {
          if(item[`compare_price_${type}_title`][item[`compare_price_${type}`][i].tag] <= 1) {
            delete item[`compare_price_${type}_title`][item[`compare_price_${type}`][i].tag]
          }else {
            item[`compare_price_${type}_title`][item[`compare_price_${type}`][i].tag] = item[`compare_price_${type}_title`][item[`compare_price_${type}`][i].tag] - 1
          }
        }
      },
      /**
       * 价格来源：输入框失焦时，判断是否有重复值 */
      checkTag(i, item, type) {
        let prices = item[`compare_price_${type}`]
        let val = prices[i] && prices[i].tag ? prices[i].tag : ''
        if(!!val) {
          item[`compare_price_${type}_title`][val] = isNaN(item[`compare_price_${type}_title`][val]) ? 1 : item[`compare_price_${type}_title`][val] + 1
        }
        let t = item[`compare_price_${type}_title`] || {}
        for(let k=0,len=item[`compare_price_${type}`].length; k<len; k++) {
          item[`compare_price_${type}`].splice(k, 1, {
            tag: item[`compare_price_${type}`][k].tag,
            price: item[`compare_price_${type}`][k].price,
            error: !!t[item[`compare_price_${type}`][k].tag] && t[item[`compare_price_${type}`][k].tag] > 1
          })
        }
      },
      /**
       * 价格来源：增加一条数据*/
      plusPrice (i, item, type) {
        console.log(`compare_price_${type}`)
        item[`compare_price_${type}`].splice(i+1, 0, {tag: '', price: 0})
      },
      /**
       * 价格来源：删除一条数据*/
      minusPrice (i, item, type) {
        this.removeTag(i, item, type)
        item[`compare_price_${type}`].splice(i, 1)
        this.checkTag(i, item, type)
      },
      /** 上传 360 */
      uploadFile(event, item) {
        let that = this
        let file = event.target.files[0]
        if(file.name.toString().toLocaleLowerCase().indexOf('zip') == -1) {
          this.$message.error('格式错误')
          return false
        }
        let xhr = new Upload()
        xhr.setFormData({
          file: file
        })
        xhr.request.method = 'post'
        xhr.request.url = `${process.env.API.EXCHANGE}/v1/media/upload`
        xhr.httpSuccess = res => {
          item.uploadFileName = file.name
          that.$message.success(res.data.errmsg || '上传成功')
          that.loading = false
          item.file_fid_360 = res.data.fid_360
          document.getElementById(`sell-watch${item.gid}`).value = ''
        }
        xhr.uploadError = res => {
          that.$message.error('上传失败')
          that.loading = false
          document.getElementById(`sell-watch${item.gid}`).value = ''
        }
        xhr.httpRequest()
      },
      /** 删除360 图片 */
      del (item) {
        item.uploadFileName = ''
        item.file_fid_360 = ''
      },
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
      },
      /** 提交表单 */
      subForm() {
        let that = this
        let m = that.p.item
        let msg = ''
        if(!m.title) {
          msg = '请输入商品名称';  that.sec_active = 0;
        }else if(!m.cover_fid) {
          msg = '请上传封面图';  that.sec_active = 0;
        }else if(!m.brand_id) {
          msg = '请选择品牌';  that.sec_active = 0;
        }else if(!m.original_price) {
          msg = '请输入商品原价';  that.sec_active = 0;
        }else if(!m.price) {
          msg = '请输入商品售价';  that.sec_active = 0;
        }else if(!m.fineness_id) {
          msg = '请选择成色';  that.sec_active = 0;
        }else if(!m.diameter) {
          msg = '请输入表盘直径';  that.sec_active = 0;
        }else if(parseInt(m.diameter) > 70) {
          msg = '表盘直径最大为70mm';  that.sec_active = 0;
        }else if(!m.file_id) {
          msg = '请上传商品图片';  that.sec_active = 0;
        }else if(m.file_id.split(',').length < 3) {
          msg = '商品图片不可少于3张';  that.sec_active = 0;
        }else if(m.file_id.split(',').length > 10) {
          msg = '商品图片不可多于9张';  that.sec_active = 0;
        }else if(!m.pc_graphic_details || m.pc_graphic_details && m.pc_graphic_details.indexOf('hastxt="0"') !== -1) {
          msg = '请输入PC端商品详情';
          that.sec_active = 1
          that.details_type = 0
        }else if(!m.pc_history || m.pc_history && m.pc_history.indexOf('hastxt="0"') !== -1) {
          msg = '请输入PC端腕表溯源'
          that.sec_active = 1
          that.details_type = 0
        }

        /*let type = ['hk', 'cn']
        for(let t in type) {
          for(let k in m[`compare_price_${type[t]}_title`]) {
            if(m[`compare_price_${type[t]}_title`][k] > 1) {
              msg = '请勿填写重复的比价信息'
              that.sec_active = 2
              break;
            }
          }
        }*/

        m.validForm = () => {
          if(msg) {
            typeof m.afterError === 'function' ? m.afterError({msg: msg}) : ''
            return false
          }else {
            return true
          }
        }

        this.$root.eventHub.$emit('sub-form', {
          data: m,
          edit: !!that.p.edit,
          errmsg: msg
        })
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .uploadimg {
    display: inline-block;
    margin: 0 30px 30px 0;
  }
  .price-tip {
    position: absolute;
    left: 180px;
    top: 0;
    color: #999;
    font-size: 12px;
    white-space: nowrap;
  }
  .price-item {
    .el-input__inner {
      line-height: 30px;
      height: 30px;
    }
  }
</style>
<style lang="less" type="text/less" scoped>
  .upload {
    position: relative;
    input[type=file] {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      width: 70px;
      opacity: 0;
      z-index: 10;
      cursor: pointer;
    }
  }
  .close-btn {
    width: 20px;
    height: 20px;
    display: inline-block;
    text-align: center;
    line-height: 20px;
    margin: 0 10px;
    font-size: 18px;
    color: #999;
    background: #eee;
    border-radius:  50%;
    cursor: pointer;
    vertical-align: middle;
  }

  .section {
    .section-title {
      height: 40px;
      line-height: 40px;
      list-style: none;
      padding: 0;
      display: flex;
      // border-bottom: 1px solid #dfe6ec;
      li {
        text-align: center;
        cursor: pointer;
        flex: 1;
        max-width: 150px;
        border: 1px solid #53b6ff;
        &:first-child:not(:last-child) {
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        &:last-child:not(:first-child) {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        &:not(:first-child) {
          border-left: 1px solid #53b6ff;
        }
        background: #fff;
        color: #20a0ff;
        &.active {
          color: #fff;
          background: #53b6ff;
          & + li {
            border-left: 0;
          }
        }
      }
    }
    .price-title {
      font-size: 16px;
      font-weight: normal;
    }
    .price-item {
      display: flex;
      margin: 10px 0;
      .tag {
        width: 60px;
        margin-right: 20px;
        line-height: 30px;
      }
      .icon {
        display: inline-block;
        min-width: 105px;
      }
      .plus, .minus {
        display: inline-block;
        margin: 3px 5px 0 5px;
        line-height: 20px;
        border: 1px solid #eee;
        font-size: 18px;
        color: #666;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        text-align: center;
        cursor: pointer;
        &:hover {
          background: #e7e7e7;
        }
      }
      .plus {
        margin-left: 24px;
      }
    }
  }

  .error-tip {
    color: #f56c6c;
    font-size: 12px;
    line-height: 28px;
  }

  .order-tip {
    color: #999;
    margin-left: 30px;
    font-size: 12px;
  }
</style>
