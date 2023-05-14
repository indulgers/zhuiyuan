import {
  promisifyAll,
  promisify
} from 'miniprogram-api-promise'
import api from './config/config.js';
const wxp = {}
// promisify all wx's api
promisifyAll(wx, wxp)
App({
 
  onLaunch() {
    // api.getDevice().then(res => {
    //   console.log(res);
    // })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
     logs.unshift(Date.now())
     wx.setStorageSync('logs', logs)
     wx.cloud.init({
         env: 'cloud1-9g332csq515f3-1bga169cfab',
         traceUser: true,
     })
    // // 登录
    //  wx.login({
    //  success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //    }
    //  })
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cloud1-9g332csq515f3-1bga169cfab',
        traceUser: true,
      })
    }
    this.IsLogon()
 
  },
   // 公共登录动作
   doLogin: function (callback) {
    let that = this;
    wx.login({
      success: function (loginRes) {
        //console.log(loginRes, "loginRes");
        if (loginRes.code) {
          /*
           * @desc: 获取用户信息 期望数据如下
           *
           * @param: userInfo       [Object]
           * @param: rawData        [String]
           * @param: signature      [String]
           * @param: encryptedData  [String]
           * @param: iv             [String]
           **/
          console.log("code", loginRes.code);
          wx.getUserInfo({
            withCredentials: true, // 非必填, 默认为true
            success: function (infoRes) {
              console.log("infoRes:", infoRes);
              // 请求服务端的登录接口
              //console.log("token", wx.getStorageSync("loginFlag"));
              // AppID不正确，无法使用
              wx.request({
                url: api.loginUrl,
                method: "POST",
                data: {
                  authType: 1, //1代表微信端登录
                  userName: "",
                  // password: "",
                  code: loginRes.code, // 临时登录凭证
                  rawData: infoRes.rawData, // 用户非敏感信息
                  signature: infoRes.signature, // 签名
                  encryptedData: infoRes.encryptedData, // 用户敏感信息
                  iv: infoRes.iv, // 解密算法的向量
                  //token: wx.getStorageSync("loginFlag"),
                },

                success: function (res) {
                  console.log("login success:", res);
                  res = res.data;
                  if (res.success) {
                    that.globalData.userInfo = res.module.userInfo;
                    console.log(
                      "globalData.userInfo",
                      that.globalData.userInfo
                    );
                    wx.setStorageSync("userInfo", res.module.userInfo);
                    wx.setStorageSync("loginFlag", res.module.token);
                    if (callback) {
                      callback();
                    }
                  } else {
                    that.showInfo(res.message);
                  }
                },

                fail: function (error) {
                  // 调用服务端登录接口失败
                  that.showInfo("调用接口失败");
                  console.log(error);
                },
              });
            },

            fail: function (error) {
              console.log(error);
              // 获取 userInfo 失败，去检查是否未开启权限
              wx.hideLoading();
              that.showInfo("调用request接口失败");
              console.log(error);
              wx.navigateTo({
                url: "/pages/index/index",
              });
            },
          });
        } else {
          // 获取 code 失败
          that.showInfo("登录失败");
          console.log("调用wx.login获取code失败");
        }
      },

      fail: function (error) {
        // 调用 wx.login 接口失败
        that.showInfo("接口调用失败");
        console.log(error);
      },
    });
  },
  //检测是否登录函数
    // 为登录则提示登录
    IsLogon() {
      // 获取缓存的登录信息
      var userInfo = wx.getStorageSync('userInfo')
      console.log('app.js',userInfo)
      if (userInfo.nickName && userInfo.phone) {
          this.globalData.UserLogin = true
          this.globalData.userInfo = userInfo
      }else{
          this.globalData.UserLogin = false
      }
  },
 showInfo: function (info = "error", icon = "none") {
    wx.showToast({
      title: info,
      icon: icon,
      duration: 2000,
      mask: false,
    });
  },
  logout: function () {
    wx.removeStorageSync("userInfo");
    wx.removeStorageSync("loginFlag");
    this.globalData.userInfo = null;
  },
  
  globalData: {
    userInfo: null,
    UserLogin:false,
    SearchName:'',
    componentNum:[],
    componentUnit:[],
    IngredientName:[]
  },

   wxp: wxp

})
   