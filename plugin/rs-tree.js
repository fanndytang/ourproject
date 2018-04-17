/** 树形菜单 */
var template7 = '' +
    '<ul>\n' +
    '    <li v-for="item,i in list" :key="i"\n' +
    '      @click.stop="handle(item,i, level);$parent.$emit(\'click-tree-menu\', {data:item,index:i,level:level})"\n' +
    '      :class="active && active[level] && active[level].toString() === (i || -1).toString() ? \'open\' : \'\'">\n' +
    '      <div class="label clearfix">\n' +
    '        <span :style="`display:inline-block;float:left;width: ${level*20}px;height:1px;`"></span>\n' +
    '        <i v-if="item.icon" :class="\'fa \'+item.icon"></i>\n' +
    '        <span class="text">{{item[prop.label]}}</span>\n' +
    '      </div>\n' +
    '      <tree-child v-if="item[prop.child] && item[prop.child].length && (active && active[level] && active[level].toString() === (i || -1).toString() || visible)"\n' +
    '        :list="item[prop.child]"\n' +
    '        :prop="prop"\n' +
    '        :visible="visible"\n' +
    '        :active = "active"\n' +
    '        :level="level+1"></tree-child>\n' +
    '    </li>\n' +
    '  </ul>'

Vue.component('rs-tree', {
  template: template7,
    name: 'tree-child',                                      //  用于组件递归
    props: {
        list: [Object, Array],                                 //  菜单数据
        prop: Object,                                          //  显示的菜单名、子菜单在list中的key值
        visible: Boolean,                                      //  子菜单是否一直可见
        level: {                                               //  子菜单当前所处的等级
            type: Number,
            default: 0
        },
        active: Array                                          //  激活的索引
    },
    mounted () {
        /** 监听点击事件，传递给父组件 */
        this.$on('click-tree-menu', (res) => {
            this.$parent.$emit('click-tree-menu', res)
        })
        /** active中0需要特殊处理(替换为-1) */
        for(let k in this.active) {
            if(parseInt(this.active[k]) === 0) {
                this.active.splice(k, 1, -1)
            }
        }
    },
    methods: {
        /** 点击某一项，展开或收缩菜单 */
        handle(item,i, level) {
            this.active.splice(level, 1, item.child && this.active[level] && this.active[level] === i ? '' : (i || -1))
        }
    }
})
