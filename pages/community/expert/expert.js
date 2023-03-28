Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    number:0,
    starIndex1 : 0,
    starIndex2 : 0,
    starIndex3 : 0,
    starIndex4 : 4,
    starIndex5 : 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
      let expert=wx.cloud.database().collection('Expert_column').get().then(res=>{
        console.log('请求到的数据',res)
        this.setData({
          list:res.data,
          number:res.data.num
        })
      })
      .catch(err=>{
        console.log('信息请求失败',res);
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})