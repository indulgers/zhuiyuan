// pages/index/community/community.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
     
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

  
 

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   },
//   tapName: function(event) {
//     console.log(event)
//   }

// })

// pages/snows/snows.js
var i = 0;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    snows: [],
    animation: [],
    dateTime: "",
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.initSnow();
    this.data.snows = [];
    this.data.animation = [];
    let j = 50
    while (j--)
      this.data.snows.push(Math.floor(Math.random() * 700))
    this.setData({
      snows: this.data.snows
    })
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    clearTimeout(this.data.dateTime)
    this.setData({
      snows: [],
      animation: []
    })
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    clearTimeout(this.data.dateTime)
    this.setData({
      snows: [],
      animation: []
    })
  },
  initSnow: function () {
    setTimeout(function () {
      let animation = wx.createAnimation({})
      animation.translateY(804).opacity(1).step({
        duration: 4000
      })
      animation.translateY(0).opacity(1).step({
        duration: 0
      })
      this.setData({
        ['snows[' + i + ']']: Math.floor(Math.random() * 700),
        ['animation[' + i + ']']: animation.export()
      })
      i++;
      if (i == 50)
        i = 0
    }.bind(this), 500)
    var dateTime = setTimeout(function () {
      this.initSnow()
    }.bind(this), 100)
    this.setData({
      dateTime,
    })
  },

  click(){
    
  }
 
})