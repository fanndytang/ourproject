/** 列表搜索  监听 rs-list-search 事件，开始搜索 */
var template = '<form>\n' +
    '    <div style="display:inline-block;margin-right:10px;">\n' +
    '      <slot></slot>\n' +
    '    </div>\n' +
    '\n' +
    '    <button class="btn btn-primary btn-sm" type="button" @click="search()">查询</button>\n' +
    '    <button class="btn btn-sm" type="reset" @click="reset()">重置</button>\n' +
    '  </form>'

Vue.component('rs-search', {
    template: template,
    props: {
        model: Object
    },
    watch: {
        /** 监听筛选词的变化，更新列表 */
        'model.rsSearch': {
            handler (val, oldVal) {
                this.search()
            },
            deep: true
        }
    },
    methods: {
        /** 查询时，存储筛选值 */
        search() {
            for(let k in this.model.rsSearch) {
                sessionStorage.setItem(`${this.model.$unique}-rsSearch-${k}`, this.model.rsSearch[k])
            }
          //  this.$root.eventHub.$emit('rs-get-list', this.model)
            window.$eventHub.$emit('rs-get-list', this.model)
        },
        /** 重置时，移除筛选值 */
        reset() {
            for(let k in this.model.rsSearch) {
                sessionStorage.removeItem(`${this.model.$unique}-rsSearch-${k}`)
            }
            this.$root.eventHub.$emit('rs-get-list', this.model)
        }
    }
})
