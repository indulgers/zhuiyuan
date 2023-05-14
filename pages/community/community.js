Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    list1:[],
    list2:[],
    beentouched:0,
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
     

    ],
    
  },

  

  onLoad: function (options) {
   
    let db=wx.cloud.database().collection('Article').get().then(res=>{
      console.log('请求到的数据',res)
      this.setData({
        list:res.data
      })
    })
    .catch(err=>{
      console.log('信息请求失败',res);
    })
  
    let db1=wx.cloud.database().collection('Article').orderBy("heat",'desc').get().then(res=>{
      console.log('请求到的数据',res)
      this.setData({
        list1:res.data
      })
    })
    .catch(err=>{
      console.log('信息请求失败',res);
    })
    let db2=wx.cloud.database().collection('Article').orderBy("time",'desc').get().then(res=>{
      console.log('请求到的数据',res)
      this.setData({
        list2:res.data
      })
    })
    .catch(err=>{
      console.log('信息请求失败',res);
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
          url: '/pages/index/result/result.wxml',
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
  
 
  beentouched:function(){
      
  }
})


