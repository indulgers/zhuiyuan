import api from '../../utils/api/api'
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: null,
    current: 0,
    current_scroll: 'tab1',
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
  
  pagechange: function (e) {
    // 通过touch判断，改变tab的下标值
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.current;
      currentPageIndex = (currentPageIndex + 1) % 2;
      // 拿到当前索引并动态改变
      this.setData({
        current: currentPageIndex,
      })
    }
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

  handleChange ({ detail }) {
    this.setData({
        current: detail.key
    });
   
},
handleClick(){
 wx.navigateTo({
   url: '/pages/old_index/old_index',
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
  getmedicineName(e) {
    // console.log("获取value值",e.detail)   // {value: "ff", cursor: 2}
    this.setData({
      medicineName: e.detail.value
    })
    this.setData({
      searchresult: true,
    })
  },
   bindconfirm:function(e){
     
    app.globalData.SearchName=e.detail.value
    console.log(app.globalData.SearchName)
     var that=this;
    console.log(e.detail.value)
    var flag=new RegExp ("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#¥……&*（）——|{}【】‘；：’“”。，、？]")
    if(flag.test(e.detail.value)){
     wx.showModal({
       title: '您输入的内容中含有非法字符',
       content: '请您重新输入',
       complete: (res) => {
         if (res.cancel) {
          console.log('用户点击了取消')
         }
     
         if (res.confirm) {
          console.log('用户点击了确定')
         }
       }
     })
     
    }
    else{
      
      console.log(app.globalData.SearchName)
      // if(this.data.current=="0")
      if(1)
      {
      wx.request({
        url: 'https://zhuiyuan.origami.wang/medicine/fuzzySelectMedicineByMedicineName/'+e.detail.value+'?pageNum&pageSize=5',
        method:'GET',
         header: {
        'Content-Type': 'application/json'
      }, 
        dataType: 'json',
        responseType: 'text',
        success:function(res){
          console.log(res.data)
          that.setData({
            list:res.data
          })
          
         
          let tolist = JSON.stringify(res.data)
          console.log(tolist)
          wx.navigateTo({
            url: '/pages/index/result/result?tolist='+tolist,
            
            success: (result) => {
              
            },
            fail: (res) => {},
            complete: (res) => {},
          })
          
      }
      })}
      else if(this.data.current=="1"){
        wx.request({
          url: 'https://zhuiyuan.origami.wang/medicine/selectMedicinesByComponentName/'+e.detail.value+'?pageNum&pageSize=5',
          method:'POST',
           header: {
          'Content-Type': 'application/json'
        }, 
          dataType: 'json',
          responseType: 'text',
          success:function(res){
            console.log(res.data)
            that.setData({
              list:res.data
            })
            
           
            let tolist = JSON.stringify(res.data)
            console.log(tolist)
            wx.navigateTo({
              url: '/pages/index/result/result?tolist='+tolist,
              
              success: (result) => {
                
              },
              fail: (res) => {},
              complete: (res) => {},
            })
            
        }
        })
      }
      else{
        wx.request({
          url: 'https://zhuiyuan.origami.wang/medicine/selectMedicinesByComponentName/'+e.detail.value+'?pageNum&pageSize=5',
          method:'POST',
           header: {
          'Content-Type': 'application/json'
        }, 
          dataType: 'json',
          responseType: 'text',
          success:function(res){
            console.log(res.data)
            that.setData({
              list:res.data
            })
            
           
            let tolist = JSON.stringify(res.data)
            console.log(tolist)
            wx.navigateTo({
              url: '/pages/index/result/result?tolist='+tolist,
              
              success: (result) => {
                
              },
              fail: (res) => {},
              complete: (res) => {},
            })
            
        }
        })
      }
    }
   this.setData({
     medicineName:''
   })
   },
   clean(){
    this.setData({
      medicineName:''
    })
   }
})