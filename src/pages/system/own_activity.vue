<template>
  <div>
    <rs-list page_title="商品活动" :column="column" :model="model">
      <template slot="search">
        <el-form-item label="归属分类" prop="code">
          <select-scroll v-model="model.pkeysearch.code" @change="model.search()" :model="activities" :rows="40" :prop="{value: 'code', label: 'title'}"></select-scroll>
        </el-form-item>
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="model.pkeysearch.title" @keyup.enter.native="model.search()" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="活动类型" prop="type">
          <el-select v-model="model.pkeysearch.type" @change="model.search()">
            <el-option label="专题" value="2"></el-option>
            <el-option label="商品" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上架状态" prop="status">
          <el-select v-model="model.pkeysearch.status" @change="model.search()">
            <el-option label="全部" value=""></el-option>
            <el-option label="上架中" value="1"></el-option>
            <el-option label="下架中" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="start_time">
          <el-date-picker @change="model.search()" type="daterange" v-model="model.pkeysearch.start_time"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time">
          <el-date-picker @change="model.search()" type="daterange" v-model="model.pkeysearch.end_time"></el-date-picker>
        </el-form-item>
        <el-form-item label="创建时间" prop="create_time">
          <el-date-picker @change="model.search()" type="daterange" v-model="model.pkeysearch.create_time"></el-date-picker>
        </el-form-item>
      </template>
      <template slot="table-tool" slot-scope="p">
        <span class="table-tool"
              v-show="parseInt(p.item.shelves_status) === 0 || parseInt(p.item.shelves_status) === 2 && p.item.can_shelves"
              @click="showdialog=true;currentItem=p.item;shelves_flag='up';">上架</span>
        <span class="table-tool"
              v-show="parseInt(p.item.shelves_status) === 1 && p.item.can_shelves"
              @click="showdialog=true;currentItem=p.item;shelves_flag='down';">下架</span>
      </template>
      <template slot="table-tool-end" slot-scope="p">
        <a class="table-tool" v-show="p.item.has_rights_watch" :href="p.item.watch_href">查看关联商品</a>
      </template>
      <template slot="form-item" slot-scope="p">
        <el-form-item label="活动名称" prop="title" :rules="{required: true, message: '请输入活动名称', trigger: 'blur'}">
          <el-input v-model="p.item.title" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="封面图" prop="cover_fid" :rules="{required: true, message: '请上传封面图', trigger: 'blur'}">
          <upload-img width="375" height="281" v-model="p.item.cover_fid" :url="p.item.cover_pic"></upload-img>
          <span class="form-label-tip" style="line-height:20px;margin-top:8px;">(图片尺寸：<br />750px * 562px)</span>
        </el-form-item>
        <el-form-item label="开始时间" prop="start_time" :rules="{required: true, message: '请选择开始时间', trigger: 'blur'}">
          <el-date-picker v-model="p.item.start_time"  type="datetime" placeholder="请选择开始时间"
            :picker-options="{disabledDate(time){if(Number(new Date(p.item.start_time)) > Number(new Date(p.item.end_time))) { p.item.end_time = p.item.start_time; } return time.getTime() < Date.now() - 8.64e7; }}"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time" :rules="{required: true, message: '请选择开始时间', trigger: 'blur'}">
          <el-date-picker v-model="p.item.end_time" type="datetime" placeholder="请选择结束时间"
            :picker-options="{disabledDate(time){ return time.getTime() < new Date(p.item.start_time).getTime() - 8.64e7; }}"></el-date-picker>
        </el-form-item>
        <el-form-item label="介绍" prop="description">
          <el-input v-model="p.item.description" type="textarea" :rows="5" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="活动类型" prop="type" :rules="{required: true, message: '请选择活动类型', trigger: 'blur'}">
          <el-select v-model="p.item.type" @change="changeType($event, p.item)">
            <el-option label="专题" :value="2"></el-option>
            <el-option label="商品" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联商品" prop="data_id" class="rs-transfer is-required">
          <div class="transfer-panel">
            <div class="p-header">
              <div class="title">商品列表</div>
              <el-input class="right" v-model="watchList.pkeysearch.title" placeholder="请输入搜索内容，回车键确定" @keyup.native="searchWatch($event)" size="small" icon="search"></el-input>
            </div>
            <div class="p-body">
              <el-checkbox-group @change="changeCheckAll" v-model="p.item.watchlist_check" v-show="p.item.type === 2">
                <div class="check_list all_list" v-for="item,i in watchList.datalists.data" :key="i">
                  <el-checkbox @change="setSelectWatch($event, [item], p.item)" :label="item.gid">{{item.title}}</el-checkbox>
                </div>
              </el-checkbox-group>

              <el-radio-group v-model="p.item.watchlist_radio" v-show="p.item.type === 1">
                <div class="check_list all_list" v-for="item,i in watchList.datalists.data" :key="i">
                  <el-radio @change="setSelectWatch($event, [item], p.item)" :label="item.gid">{{item.title}}</el-radio>
                </div>
              </el-radio-group>

              <div v-if="watchList.datalists.data.length <= 0" class="no-data">暂无数据</div>
            </div>
            <div class="p-footer">
              <el-checkbox v-model="check_all" @change="checkAll($event, p)" v-show="p.item.type === 2">全选</el-checkbox>
              <button class="btn btn-primary btn-sm transfer-footer" type="button" @click="getMore()">
                <i class="fa fa-refresh" style="margin-right: 5px;"></i>换一页</button>
            </div>
          </div>
          <i class="fa fa-angle-double-right"></i>
          <div class="transfer-panel">
            <div class="p-header"><div class="title">商品列表</div></div>
            <div class="p-body" v-loading="p.item.sel_list.datalists.loading" element-loading-text="加载中">
              <div v-if="p.item.sel_list.datalists.data.length > 0">
                <div v-for="item,i in p.item.sel_list.datalists.data" :key="i" role="button" class="check_list" v-show="!item.close">
                  <div class="check_title">{{item.title}}</div>
              <!--    <div class="check_del"><i @click="deleteSelect(p.item, i)" class="fa fa-trash" title="删除"></i></div>-->
                </div>
              </div>
              <div class="load-fail" v-show="neterror && p.item.sel_list.datalists.data.length<=0 && !p.item.sel_list.datalists.loading" @click="p.item.sel_list.datalists.data = [];p.item.sel_list.get_list()">
                <i class="fa fa-repeat"></i>
                加载失败
              </div>
            </div>
            <div class="p-footer">
              <button class="btn btn-primary btn-sm transfer-footer" type="button"
                      @click="delAll(p.item)">
                <i class="fa fa-refresh" style="margin-right: 5px;"></i>全部清除</button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="归属分类" prop="category_code" :rules="{required: true, message: '请选择归属分类', trigger: 'blur'}">
          <select-scroll v-model="p.item.category_code" remoteKey="name" :model="activities" :rows="40" :prop="{value: 'code', label: 'title'}"></select-scroll>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <input-number style="margin-top:5px;" v-model.number="p.item.sort" dot="0" min="1" max="1000" px=" " pos="right" placeholder="数字越小排序越靠前"></input-number>
        </el-form-item>
      </template>
    </rs-list>

    <div class="rs-dialog" v-show="showdialog">
      <div class="dialog-pane" v-loading="loading" element-loading-text="提交中">
        <h1 class="dialog-title">提示</h1>
        <div class="dialog-body">
          <div style="margin-bottom:5px;">
            活动开始时间： {{currentItem.start_time_show | formateDate }}
          </div>
          <div style="margin-bottom:  20px;">
            活动结束时间： <el-date-picker v-model="currentItem.end_time" type="datetime" placeholder="请选择结束时间"
            :picker-options="{disabledDate(time){ return time.getTime() < new Date(currentItem.start_time).getTime() - 8.64e7 }}"></el-date-picker>
          </div>
          确定要{{shelves_flag === 'up' ? '上架' : '下架'}}<span style="color: teal;margin: 10px;">{{currentItem.title}}</span>到活动吗？
        </div>
        <div class="dialog-foot">
          <button class="btn btn-sm" type="button" @click="showdialog=false">取消</button>
          <button class="btn btn-primary btn-sm" type="button" @click="Shelves()">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import OwnActivity from '@/model/system/OwnActivity'
  import Watch from '@/model/system/ActivityGoods'
  import Activities from '@/model/system/activities'
  /** @vue  */
  export default {
    data () {
      return {
        showdialog: false,
        loading: false,
        shelves_flag: '',       //  up 推荐  down 撤销推荐
        currentItem: {},
        model: new OwnActivity(),
        activities: new Activities(),
        column: [
          {prop: 'title', label: '活动名称'},
          {prop: 'cover_pic', label: '封面图', type: 'img'},
          {prop: 'type_name', label: '活动类型'},
          {prop: 'sort', label: '排序'},
          {prop: 'shelves_name', label: '上架状态'},
          {prop: 'start_time_show', label: '开始时间', type: 'date'},
          {prop: 'end_time_show', label: '结束时间', type: 'date'},
          {prop: 'create_time', label: '创建时间', type: 'date'},
          {prop: 'handler_time', label: '操作时间', type: 'date'},
          {prop: 'handler_user', label: '操作用户'}
        ],
        watchList: new Watch(),
        check_all: false,
        neterror: false
      }
    },
    mounted () {
      let that = this
      /** 点击重置按钮 */
      that.$root.eventHub.$on('click-btn-reset', (res) => {
        if(that.$xhr.get_query('code', 'system/ownactivity')) {
          that.model.pkeysearch.code = ''
          sessionStorage.removeItem(`${that.model.sessionkey_search}-pkeysearch-code`)
          window.location.href = `${process.env.URL.SYSTEM}/#/system/ownactivity`
          window.location.reload()
        }
      })
      /** 打开新tab时相关操作 */
      that.$root.eventHub.$on('add-tab-success', (res) => {
        if(!res.edit) {
          res.item.type = 2          // 新增时设置默认选中专题
        }else {
          res.item.sel_list.datalists.current = 1
          res.item.sel_list.get_list({  // 编辑时获取已经选择过的活动商品
            callback (cal) {
              that.neterror = parseInt(cal.errcode) !== 0
              res.item.sel_list.datalists.data = cal.data
              res.item.sel_list.datalists.pages = cal.pages
              res.item.sel_list.datalists.current = cal.current || res.item.sel_list.datalists.current
              res.item.sel_list.datalists.totals = cal.totals
            }
          })
        }
        /** 获取活动可选的商品列表 */
        that.getWatch(1)
      })
    },
    methods: {
      /** 切换活动类型时，操作右侧商品列表显示状态 */
      changeType(val, item) {
        let target = parseInt(item.type) === 2 ? item.watchlist_check.join(',') : item.watchlist_radio
        let data = {}
        for(let k in item.sel_list.datalists.data) {
          data = item.sel_list.datalists.data[k]
          data.close = target.match(item.sel_list.datalists.data[k].gid) === null
          item.sel_list.datalists.data.splice(k, 1, data)
        }
        item.watchlist = parseInt(item.type) === 2 ? item.watchlist_check : item.watchlist_radio
      },
      /** 获取商品 */
      getWatch(p) {
        let that = this
        that.$store.dispatch('getList', {
          lang: that.watchList.web_language || 'zh-cn',
          p: p || that.watchList.datalists.current || 1,
          model: that.watchList,
          callback(res) {
            that.watchList.datalists.data = res.data
            that.watchList.datalists.pages = res.pages
            that.watchList.datalists.totals = res.totals
          }
        })
      },
      /** 下架、上架活动 */
      Shelves() {
        let that = this
        if(!!that.currentItem.start_time && !!that.currentItem.end_time && Number(new Date(that.currentItem.start_time)) >= Number(new Date(that.currentItem.end_time))) {
          that.$message.error('结束时间应当大于开始时间')
        }else {
          that.loading = true
          let status =  that.currentItem.shelves_status
          that.currentItem.shelves_status =  that.shelves_flag === 'up' ? 1 : 2
          that.currentItem.ShelvesActivity({
            success: (res) => {
              that.showdialog = false
              that.$message.success(res.data.errmsg || '请求成功')
              that.loading = false
              that.$root.eventHub.$emit('form-success-tab', res)
            },
            error: (res) => {
              that.currentItem.shelves_status = status
              that.showdialog = false
              that.$message.error(res.msg || '请求失败')
              that.loading = false
            }
          })
        }
      },
      /** 根据商品标题搜索商品 */
      searchWatch(event) {
        let that = this
        setTimeout(() => {
          that.watchList.datalists.current = 1
          that.$store.state[that.watchList.$storeList] = {}
          that.getWatch()
        }, 1000)
      },
      /** 设置全选按钮状态 */
      changeCheckAll(value) {
        let checkedCount = value.length
        this.check_all = checkedCount === this.watchList.datalists.data.length
      },
      /** 关联商品：左侧选框状态改变时，设置右侧显示状态 */
      setSelectWatch(flag, data, item) {
        let check = []
        let gid = ''
        let has_item = false
        let target = item.sel_list.datalists.data
        for(let i=0, ilen=data.length; i<ilen; i++) {
          gid = data[i].gid
          has_item = false
          check.push(gid)
          for(let k=0,len=target.length; k<len; k++) {
            if(target[k] && target[k].gid && gid === target[k].gid) {
              if(!flag) {   //  没选中 则删除
                target.splice(k, 1)
              }
              has_item = true
            }
          }
          if(!has_item && flag) {
            target.push(data[i])
          }
        }
        this.changeType('', item)
        return check
      },
      /** 全选按钮操作 */
      checkAll (event, props) {
        let check = this.setSelectWatch(event, this.watchList.datalists.data, props.item)
        props.item.gid = event ? check : []

        let d = this.watchList.datalists.data
        let str = props.item.watchlist_check || []
        str = str.join(',')
        for(let k in d) {
          let gid = d[k].gid
          if(event) {
            if(str.match(gid) === null) {
              props.item.watchlist_check.push(gid)
              str = props.item.watchlist_check.join(',')
            }
          }else {
            if(str.match(gid) !== null) {
              str = str.replace(gid+',', '').replace(gid, '')
              props.item.watchlist_check = str.split(',')
            }
          }
        }
        this.changeType('', props.item)
        this.check_all = event
      },
      /** 换一换，获取更多商品列表 */
      getMore () {
        if(this.watchList.datalists.current >= this.watchList.datalists.pages) {
          this.watchList.datalists.current = 1
        }else {
          this.watchList.datalists.current ++
        }
        this.check_all = false
        this.getWatch()
      },
      /** 关联商品：右侧显示状态 */
      deleteSelect (item, i) {
        let gid = item.sel_list.datalists.data[i].gid
        item.sel_list.datalists.data.splice(i, 1)
        this.check_all = false

        if(parseInt(item.type) === 2) { //  专题
          if(item.watchlist_check && item.watchlist_check.length) {
            for(let i=0, len=item.watchlist_check.length; i<len; i++) {
              if(item.watchlist_check[i] === gid) {
                item.watchlist_check.splice(i, 1)
              }
            }
          }
        }else {  //  商品
          item.watchlist_radio = ''
        }

        item.watchlist = parseInt(item.type) === 2 ? item.watchlist_check : item.watchlist_radio
      },
      /** 全部清除 */
      delAll(item) {
        item.type === 1 ? item.watchlist_radio = '' : item.watchlist_check = [];
        item.sel_list.datalists.data = []
      }
    }
  }
</script>

<style lang="less" scoped>
  .load-fail {
    text-align: center;
    color: #666;
    font-size: 16px;
    margin-top: 100px;
    cursor: pointer;
  }
</style>
