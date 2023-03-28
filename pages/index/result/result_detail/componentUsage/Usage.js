Page({



  
  data:{
    list:{},
    medicineId:'',
    medicineName:''
  },
  
  
  onLoad(res){
    var that =this
    that.setData({
      medicineId: res.medicineId ,
      medicineName:res.medicineName
    })
    wx.request({
      url: 'https://zhuiyuan.origami.wang/medicine/getComponentListByMedicineId/'+that.data.medicineId,
      method:'GET',
      header: {
        'Content-Type': 'application/json'}, 
        dataType: 'json',
        responseType: 'text',
        success:function(res){
          console.log(res.data)
          that.setData({
            list:res.data
          })
        }
    })
  },
    onReady() {
  
  
  
    },
  
  
  
    
  
    onShow() {
  
  
  
    },
  
  
  
    
  
    onHide() {
  
  
  
    },
  
  
  
    
  
    onUnload() {
  
  
  
    },
  
  
  
  
  
    onPullDownRefresh() {
  
  
  
    },
  
  
  
    /**
  
     \* 页面上拉触底事件的处理函数
  
     */
  
    onReachBottom() {
  
  
  
    },
  
  
  
    /**
  
     \* 用户点击右上角分享
  
     */
  
    onShareAppMessage() {
  
  
  
    }
  
  })