<!-- 用户组 权限分配 -->
<template>
  <rs-list :page_title="'用户组权限'" :column="column" :form_self_btn="true" :model="model">
    <template slot="form-item" slot-scope="p">
      <el-form-item label="用户组" :rules="{required: true, message: '请输入用户组名称', trigger: 'blur'}">
        <el-input v-model="p.item.name" placeholder="请输入用户组"></el-input>
      </el-form-item>
      <el-form-item label="用户组权限">
        <div class="el-tree el-tree--highlight-current" style="width: 260%;">
          <div class="el-tree-node" v-for="item,i in page_model.rolelist" :class="open_index === i ? 'is-expanded is-current' : ''">
            <div class="el-tree-node__content"
                 @click.self="open_index = (open_index === i) ? '' : i">
              <span class="el-tree-node__expand-icon" :class="open_index === i ? 'expanded' : ''" ></span>
              <el-checkbox v-model="item.all" @change="check1($event, item)" :label="item.id"  class="el-tree-title">
                {{ item.label }}
              </el-checkbox>
            </div>
            <div class="el-tree-node__children"  v-if="open_index === i">
              <div class="title" role="button" @click="open_child_index = (open_child_index === 0) ? '' : 0">
                <span class="el-tree-node__expand-icon" style="margin-right: 5px;"  :class="open_child_index === 0 ? 'expanded' : ''" ></span>
                <el-checkbox v-model="item.user_all" @change="check3($event, item, 'user')">前台</el-checkbox>
              </div>
              <div class="el-tree-node" v-for="el,ii in item.user" v-if="open_child_index === 0">
                <div class="el-tree-node__content">
                  <el-checkbox v-model="el.all" @change="check2($event, item, ii, 'user')" :label="el.id"  class="el-tree-title">{{ el.label }}</el-checkbox>
                </div>
              </div>
              <div class="title" role="button" @click="open_child_index = (open_child_index === 1) ? '' : 1">
                <span class="el-tree-node__expand-icon" style="margin-right: 5px;" :class="open_child_index === 1 ? 'expanded' : ''" ></span>
                <el-checkbox v-model="item.admin_all"  @change="check3($event, item, 'admin')">后台</el-checkbox>
              </div>
              <div class="el-tree-node"  v-for="el,ii in item.admin" v-if="open_child_index === 1">
                <div class="el-tree-node__content">
                  <el-checkbox v-model="el.all" @change="check2($event, item, ii, 'admin')" :label="el.id"  class="el-tree-title">{{ el.label }}</el-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="备注">
        <span class="form-label-tip">(100字以内)</span>
        <el-input type="textarea" :rows="2" :maxlength="100" v-model="p.item.remark" placeholder="请输入备注"></el-input>
      </el-form-item>

      <el-form-item>
        <button class="btn btn-primary" type="button" @click="subForm(p.item, p.edit)">提交</button>
      </el-form-item>
    </template>
  </rs-list>
</template>

<script>
  import Role from '@/model/system/role'
  /** @vue */
  export default {
    data() {
      return {
        open_index: 0, //  当前展开的菜单索引
        open_child_index: 0, //  当前展开的菜单中 展开的子菜单的索引
        model: new Role(),
        column: [
          {prop: 'name', label: '用户组'},
          {prop: 'remark', label: '备注'}
        ],
        page_model: ''
      };
    },
    mounted () {
      this.page_model = new Role()
      this.page_model.getRoleList()

      this.$root.eventHub.$on('add-tab-success', (res) => {
        if(!!res.edit) {
          res.item.getRoleGroup(this.page_model)
        }else {
          res.item.clearGroup(this.page_model)
        }
      })
    },
    methods: {
      /**
       * 点击一级菜单总复选框
       * */
      check1 (e, item) {
      //  let check = e.target.checked
        let check = e
        item.all = check
        item.admin_all = check
        item.user_all = check
        for(let key in item.admin) {
          item.admin[key].all = check
        }
        for(let key in item.user) {
          item.user[key].all = check
        }
      },
      /**
       * 点击二级菜单 总复选框
       * */
      check2 (e, item, ii, role) {
      //  let check = e.target.checked
        let check = e
        item[role][ii].all = check
        if(!check) {
          item.all = false
          item[`${role}_all`] = false
        }else {
          let admin_flag = true
          let user_flag = true
          for(let key in item.user) {
            user_flag = item.user[key].all && user_flag
          }
          for(let key in item.admin) {
            admin_flag = item.admin[key].all && admin_flag
          }
          item.all = user_flag && admin_flag
          if(role === 'user') {
            item.user_all = user_flag
          }else {
            item.admin_all = admin_flag
          }
        }
      },
      check3(e, item, type) {
        for(let key in item[type]) {
       //   item[type][key].all = e.target.checked
         // item[`${type}_all`] = e.target.checked
          item[type][key].all = e
          item[`${type}_all`] = e
        }
        item.all = item.admin_all && item.user_all
      },
      /**
       * 提交表单
       * */
      subForm(item, edit) {
        item.rights = item.setCheck(this.page_model.rolelist)
        this.$root.eventHub.$emit('sub-form', {
          data: item,
          edit: !!edit
        })
      }
    }
  };
</script>

<style lang="less" scoped>
  .title {
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    margin: 0 30px;
  }
  .el-checkbox {
    font-weight: normal;
  }
  .el-tree-node__children .el-tree-node__content {
    margin: 0 50px;
    .el-checkbox {
      margin-left: 8px;
    }
  }
  .el-tree-title {
    display: inline-block;
    margin-right: 200px !important;
  }
</style>

