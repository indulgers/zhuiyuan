const app = getApp()
let code = null

export default {
  setDeviceInfo(info) {
    console.log(info)
    wx.setStorage({
      key: 'list_info',
      data: info,
    })
  },
  getDeviceInfo() {
    let res = wx.getStorageSync("list_info")
    if (res.UUID && res.name)
      return res;
    return null;
  },
}