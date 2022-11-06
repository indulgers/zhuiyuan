// pages/me/personalInformation/form_four/form_four.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    imgUrls:[
      '../../../../images/form_four/medicine.jpeg',
      '../../../../images/form_four/medicine.jpeg',
      '../../../../images/form_four/medicine.jpeg'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    "disease_name":"高血压"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    go2dau:function (params) {
      wx.navigateTo({
        url: '/pages/me/personalInformation/form_six/form_six'
      })
    },
    go2tab:function (params) {
      wx.navigateTo({
        url: '/pages/me/personalInformation/form_five/form_five'
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