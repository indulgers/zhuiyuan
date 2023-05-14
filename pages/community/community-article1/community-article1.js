Page({
  data:{
    list:[],
  },
  onLoad: function (options) {
    wx.cloud.database().collection('Article').limit(1).get().then(res=>{
      console.log('请求到的数据',res)
      this.setData({
        list:res.data
      })
    })
  },


})