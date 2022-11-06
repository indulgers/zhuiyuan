import {
  promisifyAll,
  promisify
} from 'miniprogram-api-promise'

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
        env: 'xly-2gt219o656bc8b5a',
        traceUser: true,
    })
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  },
  globalData: {
    userInfo: null
  },
  wxp: wxp
})