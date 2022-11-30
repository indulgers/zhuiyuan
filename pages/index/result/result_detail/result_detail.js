// pages/index/result_detail/result_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    list1:{},
    components:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(res) {
   
    var data=JSON.parse(res.data) 
    this.setData({
      list:data
    })
    console.log(data)
    console.log(data.medicineName)
    var component=data.medicineRawMaterial
    this.setData({
      components:component
    })
  },
  toComponent:function(e){
    wx.request({
      url: 'http://zhuiyuan.origami.wang:8081/medicine/selectMedicinesByComponentName/'+this.data.components+'?pageNum&pageSize',
      method:'POST',
       header: {
      'Content-Type': 'application/json'
    }, 
      dataType: 'json',
      responseType: 'text',
      success:function(res){
        console.log(res.data)
        let tolist = JSON.stringify(res.data)
        console.log(tolist)
        wx.navigateTo({
          url: '/pages/index/result/result_detail/componentUsage/Usage?tolist='+tolist,
          
          success: (result) => {
            
          },
          fail: (res) => {},
          complete: (res) => {},
        })
        
    }
    })
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