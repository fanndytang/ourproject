export default {
  formateDate (val) {
    if(!val || isNaN(val)) {
      return ''
    }
    let date = new Date(val*1000)
    let year = date.getFullYear()
    let month = ('00' + (parseInt(date.getMonth()) + 1)).substr(-2)
    let day = ('00' + date.getDate()).substr(-2)
    let hour = ('00' + date.getHours()).substr(-2)
    let minute = ('00' + date.getMinutes()).substr(-2)
    let second = ('00' + date.getSeconds()).substr(-2)

    return year + '-' + month + '-' + day + '  ' + hour + ':' + minute + ':' + second
  }
}
