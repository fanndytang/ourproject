<template>
  <div class="box-back" v-show="showBox">
    <span class="btn-close" @click="showBox = false">&times;</span>
    <div class="box-page newtab-form">
      <h1 class="page-title">请选择导出的字段</h1>
      <el-form :model="export_data" ref="form" label-width="80px">
        <div class="rs-transfer">
          <div class="transfer-panel">
            <div class="p-header"><div class="title">字段列表</div></div>
            <div class="p-body">
              <el-checkbox-group v-model="selected">
                <div class="check_list all_list" v-for="item,i in export_data.data" :key="i"><el-checkbox :label="i"></el-checkbox></div>
              </el-checkbox-group>
            </div>
            <div class="p-footer"><el-checkbox v-model="check_all" @change="checkAll">全选</el-checkbox></div>
          </div>
          <i class="fa fa-angle-double-right"></i>
          <div class="transfer-panel">
            <div class="p-header"><div class="title">已选</div><div style="text-align:right;color:#666;font-size:12px;" class="right" v-if="selected.length > 1">（可拖动排序）</div></div>
            <div class="p-body">
              <rs-draggable v-if="selected.length > 0" :list="selected">
                <div v-for="item,i in selected" :key="i" role="button" class="check_list" style="line-height: 26px;">
                  <div class="check_title">{{item}}</div>
                  <div class="check_del"><i @click="selected.splice(i, 1)" class="fa fa-trash" title="删除"></i></div>
                </div>
              </rs-draggable>
            </div>
            <div class="p-footer"></div>
          </div>
        </div>
        <el-form-item label="文件名称">
          <el-input v-model="export_data.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="导出条数" prop="rows">
          <input-number v-model.number="rows" :dot="0" :min="0" px=""></input-number>
       <!--   <span class="price-tip">(为空默认导出所有数据)</span>-->
        </el-form-item>
        <el-form-item>
          <button class="btn btn-primary" type="button" @click="subForm()">确定</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  /** @vue */
  export default {
    props: {
      model: Object                                                   //  导出数据所属模块
    },
    data () {
      return {
        check_all: false,
        export_data: {},                                               //  设置导出数据集合
        selected: [],                                                  //  要导出的字段集合(页面显示使用)
        showBox: false,                                                //  是否显示导出数据框
        rows: 1000,                                                      //  导出数据条数据
        len: ''
      }
    },
    watch: {
      'selected' (val) {
        this.check_all = this.len === val.length
      }
    },
    mounted () {
      /** 设置导出数据集合 */
      this.export_data = this.model.module_export_data
      /** 统计所有可导出字段的长度（便于控制全选按钮状态） */
      for(let k in this.export_data.data) {this.len ++}
      /** 监测打开导出数据弹窗事件 */
      this.$root.eventHub.$on('show-export-file-window', () => {
        this.showBox = true
      })
    },
    methods: {
      /** 全选按钮操作 */
      checkAll (value) {
        let cache = []
        if(value) {
          for(let k in this.export_data.data) { cache.push(k) }
        }
        this.selected = cache
      },
      /** 导出数据 */
      subForm() {
        let that = this
        that.$refs['form'].validate((valid) => {
          if (!valid)  return false
          let rows = isNaN(that.rows) ? -1 : that.rows
          if(rows <= 0) {
            that.$message.error('导出条数不能小于1')
          }else {
            /** 下载文件 */
            that.model.setExportParams({
              selected: that.selected,
              rows: rows
            })
          }
        })
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .rs-transfer {
    margin-bottom: 10px;
    .p-header .title {
      font-size: 14px;
    }
    .p-header, .p-footer {
      line-height: 30px;
      height: 30px;
    }
  }
  .box-back {
    overflow: auto;
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    top: 0;
    left: 0;
  }
  .box-page {
    background: #fff;
    width: 55%;
    margin: 100px auto auto auto;
    height: 640px;
    overflow: auto;
    padding: 20px 30px;
    position: relative;
    .page-title {
      font-size: 18px;
      border-bottom: 1px solid #eee;
      padding-bottom: 5px;
    }
  }
  .btn-close {
    border: 2px solid #eee;
    background: #fff;
    position: absolute;
    right: 22%;
    top: 85px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    font-size: 30px;
    color: #aaa;
    line-height: 24px;
    cursor: pointer;
    z-index: 101;
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
