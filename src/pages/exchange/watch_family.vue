<template>
  <div class="box-family newtab-form">
    <h1 class="page-title"><span>腕表之家</span></h1>
    <el-form class="form" :model="model" ref="form" label-width="100px" v-loading="loading" element-loading-text="提交中">
      <el-form-item label="详情url" prop="detail_url" :rules="{required: true, message: '请输入详情url', trigger: 'blur'}">
        <div style="display:flex;">
          <el-input v-model="model.detail_url" placeholder="请输入" style="flex: 1;"></el-input>
          <button class="btn btn-primary btn-sm sure" type="button" @click="model.getPriceAttr()">确定</button>
        </div>
      </el-form-item>
      <el-form-item label="基本信息" prop="base_data">
        <div v-for="item,i in model.base_data" :key="i" class="box-info">
          <label class="box-key" style="text-align:right;width:15%;">{{ i | formateLabel }}</label>
          <div class="box-value">
            <div v-if="typeof model.base_data[i] === 'string'">
              <el-input v-model="model.base_data[i]"></el-input>
              <span class="tip" v-show="sub && !model.base_data[i]">请完善{{ i | formateLabel }}</span>
            </div>
            <div v-if="typeof model.base_data[i] !== 'string'">
              <div v-for="el,k in model.base_data[i]" :key="k">
                <el-input v-model="model.base_data[i][k]"></el-input>
                <span class="tip" v-show="sub && !model.base_data[i][k]">请完善{{ i | formateLabel }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!model.hasbase">暂无</div>
      </el-form-item>
      <el-form-item label="详情描述" prop="other_attr">
        <div v-for="item,i in model.other_attr" :key="i" class="box-info">
          <el-input v-model="model.other_attr[i].key" class="box-key"></el-input>
          <el-input v-model="model.other_attr[i].value" class="box-value"></el-input>
          <span class="tip" v-show="sub && !!model.other_attr[i].key && !model.other_attr[i].value">请完善{{model.other_attr[i].key}}</span>
          <span class="add" @click="addDict(i)">+</span>
          <span class="plus" @click="plusDict(i)">-</span>
        </div>
        <div v-if="model.other_attr.length <= 0">暂无</div>
      </el-form-item>
       <el-form-item label="商品名称" prop="title" :rules="{required: true, message: '请输入商品名称', trigger: 'blur'}">
         <el-input v-model="model.title" placeholder="请输入商品名称"></el-input>
       </el-form-item>
       <el-form-item label="封面图" prop="cover_fid" :rules="{required: true, message: '请上传封面图', trigger: 'blur'}">
         <upload-img v-model="model.cover_fid" :url="model.cover_pic"></upload-img>
       </el-form-item>
       <el-form-item label="商品图片" prop="watch_fid" :rules="{required: true, message: '请上传商品图片', trigger: 'change'}">
         <rs-cropper v-model="model.watch_fid" :url="model.file_pic" :file_list="true" :autoCropWidth="500"></rs-cropper>
       </el-form-item>
       <el-form-item label="备注" prop="remark">
         <el-input type="textarea" :rows="2" v-model="model.remark"></el-input>
       </el-form-item>
      <el-form-item>
        <button class="btn btn-primary" type="button" @click="subForm()">提交</button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Family from '@/model/exchange/watch-family'
  export default {
    data () {
      return {
        model: new Family(),
        loading: false,
        sub: false
      }
    },
    filters: {
      /**
       * 格式化基本信息名称
       * */
      formateLabel (val) {
        let result = ''
        switch(val) {
          case 'model_num':  result = '机型'; break;
          case 'brand': result = '品牌'; break;
          case 'movement': result = '机芯'; break;
          case 'gender': result = '性别'; break;
          case 'diameter': result = '表盘直径'; break;
          case 'shape': result = '形状'; break;
          case 'material': result = '表壳材质'; break;
          case 'function': result = '复杂功能'; break;
          default: break;
        }
        return result
      }
    },
    methods: {
      /**
       * 校验商品图片
       * */
      checkFile(rule, value, callback) {
        let arr = !!value ? value.split(',') : []
        if(arr.length <= 0) {
          callback(new Error('请上传商品图片'))
        }else if(arr.length < 3) {
          callback(new Error('商品图片应不少于3张'))
        }else if(arr.length > 9) {
          callback(new Error('商品图片应不多于9张'))
        }else {
          callback()
        }
      },
      /**
       * 提交表单
       * */
      subForm() {
        let that = this
        let form = that.$refs['form']
        that.sub = true
        if(!!form) {
          that.$refs['form'].validate((valid) => {
            if (!valid)  return false
            that.loading = true
            that.model.afterSend = (res) => {
              that.$message.success(res.data.errmsg)
              that.loading = false
              that.sub = false
              location.href = `${process.env.URL.EXCHANGE}/#/market/sell`
            }
            that.model.afterError = (res) => {
              that.$message.error(res.msg || '')
              that.loading = false
              that.sub = false
            }
            that.model.add()
          })
        }
      },
      /**
       * 增加属性
       * */
      addDict(i) {
        this.model.other_attr.splice(i+1, 0, {})
      },
      /**
       * 删除属性
       * */
      plusDict(i) {
        this.model.other_attr.splice(i,1)
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .box-family {
    .el-input__inner {
      height: 30px;
    }
  }
</style>
<style lang="less" type="text/less" scoped>
  .box-family {
    padding: 10px 20px;
  }
  .box-info {
    display: flex;
    position: relative;
    margin: 2px 0;
    .box-key {
      width: 30%;
      padding-right: 10px;
    }
    .box-value {
      flex: 1;
    }
    .tip {
      position: absolute;
      top: 0;
      left: 100%;
      white-space: nowrap;
      margin-left: 75px;
      color: #f56c6c;
    }
  }
  .page-title {
    font-size: 15px;
    font-weight: normal;
    border-bottom: 1px solid #dcdfe6;
    color: #20a0ff;
    span {
      display: inline-block;
      border-bottom: 3px solid #20a0ff;
      padding: 5px 10px;
    }
  }
  .sure {
    white-space: nowrap;
    margin-left: 5px;
    height: 30px;
    margin-top: 5px;
  }
  .price-tip {
    position: absolute;
    left: 180px;
    top: -3px;
    color: #999;
    font-size: 12px;
    white-space: nowrap;
  }

  .add, .plus {
    position: absolute;
    left: 100%;
    margin: 0 5px;
    border: 1px solid #bfcbd9;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    text-align: center;
    color: #999;
    font-size: 23px;
    line-height: 20px;
    top: 9px;
    cursor: pointer;
  }
  .plus {
    margin-left: 5px + 5px + 24px;
  }
</style>
