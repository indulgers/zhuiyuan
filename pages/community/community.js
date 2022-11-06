Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    tempFilePaths: null,
    Image: null,
    isChose: false,
    files: null,
    tabs: [{
        id: 0,
        value: "每日更新",
        isActive: true
      },
      {
        id: 1,
        value: "热度排序",
        isActive: false
      },
      {
        id: 2,
        value: "时间排序",
        isActive: false
      }
     

    ]
  },

  

  onLoad: function (options) {
    wx.cloud.database().collection('article').get().then(res=>{
      console.log('请求到的数据',res)
      this.setData({
        list:res.data
      })
    })
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
          url: './matchAndAnalysis/result/result',
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
          url: './matchAndAnalysis/result/result',
        })

        //demo区
        console.log(err);
      }
    })

  },
  
  toservice:function(){
    wx.navigateTo({
      url: '',
    })
  }
  
})
