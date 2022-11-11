// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:'cloud1-9g332csq515f3101'
})
exports.main=async(event,context)=>{
  return await cloud.database().collection('article').get()
}

const article = db.collection("article")

// 云函数入口函数
exports.main = async (event, context) => {
    const wxInfo = cloud.getWXContext()
  return {
    wxInfo,
    openid:wxInfo.OPENID,
  }
}