// rootState.js       //  保存顶层的数据  （原始数据）
let state = {
  uploadImgUrl: `${process.env.API.USER}/v1/user/upload`,  //  文件上传路径
  imgBaseUrl: `${process.env.API.USER}/v1`                 //  文件显示路径
}

export default state
