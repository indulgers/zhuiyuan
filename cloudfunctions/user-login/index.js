// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-9g332csq515f3-1bga169cfab',
  traceUser: true,
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  var resultMsg = {};
  const wxContext = cloud.getWXContext();
  //获取用户提交的参数
  var userInfo ={};
  userInfo.openid = event.openid;
  userInfo.avatarUrl = event.avatarUrl;
  userInfo.gender = event.gender;
  userInfo.nickName = event.nickName;
  userInfo.province = event.province;
  userInfo.city = event.city;
  userInfo.loginDate = new Date();
  //根据openid查询用户信息
  var userInfoList = await db.collection('userInfo').where({
    openid: userInfo.openid
  }).get();
  //如果用户不存在则新增用户
  if(userInfoList.data.length ==0 ){
    resultMsg.data = userInfo;
    await db.collection('userInfo').add({
      data: userInfo,
      success(res) {},
      fail(res) {}
    })
  //如果用户存在则更新用户信息
  }else{
    var oldUserInfo = userInfoList.data[0];
    resultMsg.data = oldUserInfo;
    await db.collection('userInfo').doc(oldUserInfo._id).update({
      data: {
        loginDate:new Date()
      },
      success: function(res) {}
    })
  }
  resultMsg.status ="ok";
  resultMsg.message ="登录成功";
  return resultMsg
}