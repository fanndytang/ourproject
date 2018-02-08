// actions.js      // 存放vuex的核心处理函数
/**
 * 缓存数据
 * */
export const getList = ({commit, state}, options) => {
  let p = options.p || 1         //  要访问数据的页码
  let rows = options.rows || 10  //  每页有10条
  let key = options.model.$storeList
  let flag = true
  let data = []
  let lang = options.lang || 'zh-cn'

  if(state[key] && state[key][lang] && state[key][lang].length > 0) {
    data = state[key][lang].slice((p-1)*rows, (p-1)*rows + rows)
    for(let k in data) {
      flag = flag && !(data[k] && data[k].current_model)
    }
  }

  if(flag) {
    options.model.get_list({
      p: p,
      rows: rows,
      lang: options.lang || options.model.web_language || 'zh-cn',
      callback(res) {
        commit({
          type: 'setList',    // 对应mutation.js中的getBrandList方法
          result: {
            res: res,
            options: options
          }
        })
      }
    })
  }else {
    if(options.callback) {
      options.callback({
        data: data,
        pages: Math.ceil(state[`${key}Totals`][lang]/rows)
      })
    }
  }
}
