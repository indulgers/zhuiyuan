// pages/index/result/result_detail/compare/compare_result/compare_result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list1:{},
      list2:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(res) {
    console.log(res)
    var data1=JSON.parse(res.data1) 
    var data2=JSON.parse(res.data2)
    this.setData({
      list1:data1,
      list2:data2
    })
      console.log(data1,data2)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})