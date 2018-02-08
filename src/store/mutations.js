// mutations.js      //  改动store中各种状态的地方
/**
 * 设置需要缓存的数据
 * */
export const setList = (state, payload) => {
  let p = payload.result.options.p || 1
  let rows = payload.result.options.rows || 10
  let data = payload.result.res.data
  let totals = payload.result.res.totals
  let key = payload.result.options.model.$storeList
  let lang = payload.result.options.lang || 'zh-cn'

  if(!state[`${key}Totals`]) {
    state[`${key}Totals`] = {}
  }
  if(!state[key]) {
    state[key] = {}
  }

  if(totals > 0) {
    if(!state[`${key}Totals`][lang] || state[`${key}Totals`][lang] !== totals || !state[key][lang]) {
      state[`${key}Totals`][lang] = totals
      state[key][lang] = new Array(totals)

      state[key][lang] = []
      state[key][lang] = new Array(totals)
    }

    let init = (p-1)*rows
    for(let i=init, len=init + data.length; i<len; i++) {
      state[key][lang].splice(i, 1, data[i - init])
    }
    if(typeof payload.result.options.callback === 'function') {
      payload.result.options.callback(payload.result.res)
    }
  }else {
    state[key][lang] = []
    state[`${key}Totals`] = {}
    if(typeof payload.result.options.callback === 'function') {
      payload.result.options.callback(payload.result.res)
    }
  }
}
