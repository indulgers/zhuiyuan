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
     url: './image_cut/image_cut',
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
  scan:function(){
    wx.scanCode({
      success(res){
        console.log(res)
      }
    })
  },
  getdata(){
    const that=this
    wx.request({
      url: '',
      data:{

      },
      method:'GET',
      success(res){
        console.log("请求状态："+res.statusCode)
        console.log(res.data)
        this.setData({
            message:res.data
        })
      }
    })
  }
})