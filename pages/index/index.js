import api from '../../utils/api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: null,
    
    Image: null,
    isChose: false,
    files: null,
    message:'',
    medicineName:'',
    tabs: [{
        id: 0,
        value: "热门",
        isActive: true
      },
      {
        id: 1,
        value: "最新资讯",
        isActive: false
      },
      {
        id: 2,
        value: "中老年健康",
        isActive: false
      },
      {
        id: 3,
        value: "孕产育儿",
        isActive: false
      },
      {
        id: 4,
        value: "青少年健康",
        isActive: false
      }

  ]
  },
  
    

  toSearch() {
    wx.navigateTo({
      url: '/pages/index/searchinto/searchinto',
    })
  },

  onLoad: function (options) {


 },
  //标题点击事件
  handleTabsItemChange(e) {
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })

    

  },

 
  searchPic: function () {
   wx.navigateTo({
     url: './cropper/cropper',
   })
  },
  uploadImage: function (url) {
    wx.showLoading({
      title: '加载中',
    })
    url = "https://zhenzhi.cpoe.top/products/searchPicture/"
    wx.uploadFile({
      url: url,
      filePath: this.data.tempFilePaths[0],
      name: 'file',
      success(res) {
        console.log(res);
        //demo区

        wx.navigateTo({
          url: '/pages/index/result/result',
        })

        //demo区
        if (res.statusCode != 404) {
          let data = JSON.parse(res.data)
          console.log(data);
          wx.hideLoading()
          // TODO: 携带data.id跳转单独页面显示
          api.getProductDetail(data.id).then(res => {
            console.log(res);
          })
        }
      },
      fail: err => {
        wx.hideLoading()
        //demo区

        wx.navigateTo({
          url: '/pages/index/result/result',
        })

        //demo区
        console.log(err);
      }
    })

  },
  
    fuck:function(){
      wx.uploadFile({
        url: 'http://zhuiyuan.origami.wang:8081/ocr/selectComponentsByMedicineRegisterNoWithOcr/',
         filePath:'/images/index/askdoctor.png',
         name: 'file',
         header:{
     'content-type':'Application/json'
   },
         formData: {
        'user': 'test'
   },
   
success: function (res) {
  
  console.log(res.data + "结果")
  
}
})
    //    wx.request({
    //      url: 'http://43.139.5.93:8081/es/fuzzyQueryByMedicineName/总统',
    //     method:'POST',
    //      header: {
    //      'Content-Type': 'application/json'
    //  },
    //     success:function(res){
    //      console.log(res.data)
    //        wx.navigateTo({
    //         url: '/pages/index/matchAndAnalysis/result/result.wxml',
            
    //         success: (result) => {},
    //         fail: (res) => {},
    //       complete: (res) => {},
    //        })
    //   }
    // })
    }
})