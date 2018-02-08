<template>
  <rs-list :page_title="'换戴记录'" :column="column" :model="model">
    <template slot="search">
      <el-form-item label="换戴用户" prop="user">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.user" placeholder="请输入换戴用户"></el-input>
      </el-form-item>
      <el-form-item label="换戴产品" prop="title">
        <el-input @keyup.enter.native="model.search()" v-model="model.pkeysearch.title" placeholder="请输入换戴产品"></el-input>
      </el-form-item>
      <el-form-item label="换戴时间" prop="datetimepicker">
        <el-date-picker
          @change="model.search()"
          v-model="model.pkeysearch.datetimerange"
          type="daterange"
          placeholder="选择时间范围"
          align="right">
        </el-date-picker>
      </el-form-item>
    </template>

    <template slot-scope="p" slot="form-item">
      <el-form-item label="体验厅编号" prop="hall_code">
        <select-scroll :model="hall_model" :form_data="p.item"
                       :select_key="{value: 'id', label: 'location',value_key: 'hall_code'}"></select-scroll>
      </el-form-item>
      <el-form-item label="换戴用户" prop="member_tel">
        <div @click="current_item = p.item">
          <el-select
            v-model="p.item.member_tel"
            filterable
            remote
            default-first-option
            placeholder="请输入关键词"
            :remote-method="searchUser"
            @change="changeUser"
            :loading="loading">
            <el-option
              v-for="item in user_datalist"
              :key="item.uid"
              :label="`${item.tel}, ${item.username}`"
              :value="item.tel">
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="换戴产品" prop="out_gid">
        <el-select
          v-model="p.item.out_gid"
          filterable
          remote
          default-first-option
          placeholder="请输入关键词"
          :remote-method="searchOut"
          :loading="loading">
          <el-option
            v-for="item in out_datalist"
            :key="item.gid"
            :label="`${item.gid_short},  ${item.title}`"
            :value="item.gid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="还回产品" prop="in_gid">
        <el-select
          v-model="p.item.in_gid"
          filterable
          remote
          default-first-option
          placeholder="请输入关键词"
          :remote-method="searchIn"
          :loading="loading">
          <el-option
            v-for="item in in_datalist"
            :key="item.gid"
            :label="`${item.gid_short},  ${item.title}`"
            :value="item.gid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="换戴日期" prop="change_time">
        <el-date-picker :picker-options="picker" v-model="p.item.change_time" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input type="textarea" v-model="p.item.remark"></el-input>
      </el-form-item>
    </template>
  </rs-list>
</template>

<script>
  import VipLog from '@/model/vip/log'
  import Hall from '@/model/system/hall'
  /** @vue */
  export default {
    data () {
      return {
        picker: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        page_model: new VipLog(),
        model: new VipLog(),
        hall_model: Hall,
        current_item: '',
        column: [
          {prop: 'tel', label: '换戴用户', type: 'a', a_href: 'tel_href'},
          {prop: 'out_title', label: '换戴产品'},
          {prop: 'in_title', label: '还回产品'},
          {prop: 'change_time', label: '换戴时间', type: 'date'},
          {prop: 'handler_time', label: '操作时间', type: 'date'},
          {prop: 'handler_user', label: '操作者'},
          {prop: 'remark', label: '备注'},
        ],
        loading: false,
        user_datalist: [],
        in_datalist: [],
        out_datalist: []
      }
    },
    methods: {
      changeUser(val) {
        this.page_model.searchLive(val, 'tel', (res) => {
          if(res.data.data) {
            this.current_item.member_uid = res.data.data[0].uid
            this.in_datalist = [
              {
                gid: res.data.data[0].out_gid,
                gid_short: res.data.data[0].out_gid_short,
                title: res.data.data[0].title
              }
            ]
            if(res.data && res.data.data[0] && res.data.data[0].out_gid) {
              this.current_item.in_gid = res.data.data[0].out_gid
            }
          }
        })
      },
      searchUser (val) {
        this.page_model.searchLive(val, 'tel', (res) => {
          this.user_datalist = res.data.data
        })
      },
      searchIn (val) {
        this.page_model.searchLive(val, 'watch', (res) => {
          this.in_datalist = res.data.data
        })
      },
      searchOut(val) {
        this.page_model.searchLive(val, 'watch',  (res) => {
          this.out_datalist = res.data.data
        })
      }
    }
  }
</script>
