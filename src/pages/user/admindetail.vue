<template>
  <rs-detail :model="model" :title="'用户详情'" :column="column">
    <template slot="rights" v-if="rights">
      <div v-for="item,i in rights" :key="i" class="rights">
        <h2>{{ item.name }}</h2>
        <div v-if="item.data.user">
          <h3>前台</h3>
          <span v-for="el,k in item.data.user" :key="k" class="item">{{ el.name }}</span>
        </div>
        <div v-if="item.data.admin">
          <h3>后台</h3>
          <span v-for="el,k in item.data.admin" :key="k" class="item">{{ el.name }}</span>
        </div>
      </div>
    </template>
  </rs-detail>
</template>

<script>
  import User from '@/model/user/adminuser'
  import Role from '@/model/system/role'
  /** @vue */
  export default {
    data () {
      return {
        model: new User({
          get_detail_data: {
            uid: this.$xhr.get_query('id', 'user/admin/detail')
          }
        }),
        rights: [],
        column: [
          {prop: 'user_group_name', label: '用户组'},
          {prop: 'username', label: '用户名'},
          {prop: 'reg_time', label: '注册时间', type: 'date'},
          {prop: 'rights', label: '用户权限', type: 'slot'}
        ]
      }
    },
    mounted () {
      let that = this
      that.$on('get-detail', (res) => {
        new Role().getGroupRights({
          params: {
            id: res.group_id
          },
          success (res) {
            let data = res.data.data
            let right = {
              user: '用户管理',
              news: '资讯管理',
              vip: '会籍管理',
              dict: '字典管理',
              market: '交易管理',
              friends: '圈子管理',
              system: '系统管理',
            }

            for(let k in right) {
              if(data[k]) {
                that.rights.push({
                  name: right[k],
                  data: data[k]
                })
              }
            }
          }
        })
      })
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .rights {
    border-bottom: 1px solid #eee;
    padding-bottom: 30px;
    .item {
      display: inline-block;
      margin-right: 30px;
      width: 30%;
      line-height: 25px;
    }
  }
</style>
