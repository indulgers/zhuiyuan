// pages/index/result/result.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    list1:{},
    Id:'',
    pageNum:1,
    pageSize:5,
    Name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(res) {
    var tolist=JSON.parse(res.tolist)
    this.setData({
      list:tolist,
    })
    console.log(tolist);
  },
  toDetail:function(e){
    var data=JSON.stringify(e.currentTarget.dataset.data) 
     
    wx.navigateTo({
      url: '/pages/index/result/result_detail/result_detail?data='+data,
    })
  },
  handleChange({detail}){
    var that=this
    const type=detail.type;
    if(type=='next'){
      that.setData({
        pageNum:that.data.pageNum+1
      });
    }
    else if(type=='prev'){
      that.setData({
        pageNum:that.data.pageNum-1
      })
    }
    console.log(that.data.pageNum)
    wx.request({
      url: 'https://zhuiyuan.origami.wang/medicine/fuzzySelectMedicineByMedicineName/'+app.globalData.SearchName,
      data:{
        pageNum:that.data.pageNum,
        pageSize:that.data.pageSize
      },
      method:'GET',
       header: {
      'Content-Type': 'application/json'
    }, 
      dataType: 'json',
      responseType: 'text',
      success:function(res){
        console.log(app.globalData.SearchName)
        console.log(res.data)
        
       that.setData({
         list:res.data
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