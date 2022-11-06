export default {
  /**
   * 屏幕上显示错误信息
   * @param {string} errmsg 
   */
  showError(errmsg) {
    if (errmsg === undefined) {
      errmsg = '请求错误' // 默认信息
    }
    wx.showToast({
      title: String(errmsg),
      icon: 'none'
    })
  },


  //暂未开放的页面
  showNull() {
    wx.showToast({
      title: '暂未开放,敬请期待',
      icon: 'none',
      success: function () {
        setTimeout(function () {
          wx.navigateBack()
        }, 1500);
      }
    })
  }
}