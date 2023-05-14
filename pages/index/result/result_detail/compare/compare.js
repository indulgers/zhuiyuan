
var i = 0;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    snows: [],
    animation: [],
    dateTime: "",
    list1:{},
    list2:{},
    value2:'',
    isDropdownVisible: false
  },
 

  onLoad(res){
    var data=JSON.parse(res.data) 
    this.setData({
      list1:data
    })
    console.log(this.data.list1.medicineName)
    },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.initSnow();
    this.data.snows = [];
    this.data.animation = [];
    let j = 50
    while (j--)
      this.data.snows.push(Math.floor(Math.random() * 700))
    this.setData({
      snows: this.data.snows
    })
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    clearTimeout(this.data.dateTime)
    this.setData({
      snows: [],
      animation: []
    })
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    
    clearTimeout(this.data.dateTime)
    this.setData({
      snows: [],
      animation: []
    })
  },
  initSnow: function () {
    setTimeout(function () {
      let animation = wx.createAnimation({})
      animation.translateY(804).opacity(1).step({
        duration: 4000
      })
      animation.translateY(0).opacity(1).step({
        duration: 0
      })
      this.setData({
        ['snows[' + i + ']']: Math.floor(Math.random() * 700),
        ['animation[' + i + ']']: animation.export()
      })
      i++;
      if (i == 50)
        i = 0
    }.bind(this), 500)
    var dateTime = setTimeout(function () {
      this.initSnow()
    }.bind(this), 100)
    this.setData({
      dateTime,
    })
  },
  onBlur(e){
   
    let that=this
    that.setData({
      isDropdownVisible:true
    })
      console.log(e.detail.value)
      wx.request({
        url: 'https://zhuiyuan.origami.wang/medicine/fuzzySelectMedicineByMedicineName/'+e.detail.value,
        method:'GET',
         header: {
        'Content-Type': 'application/json'
      }, 
        dataType: 'json',
        responseType: 'text',
        success:function(res){
          console.log(res.data)
          that.setData({
            list2:res.data
          })
          let list2 = JSON.stringify(res.data)
          console.log(list2)
          
          
      }
      })
  },
  compareDetail(e){
      var data1=JSON.stringify(this.data.list1)
      var data2=JSON.stringify(e.currentTarget.dataset.data) 
       console.log(data2)
       console.log(e.currentTarget.dataset.data)
    this.setData({
      value2:e.currentTarget.dataset.data.medicineName,
      isDropdownVisible:false
   })
   
    wx.navigateTo({
      url: '/pages/index/result/result_detail/compare/compare_result/compare_result?data1='+data1+'&data2='+data2,
    })
    
   
  },
  click(){
    var that=this
    wx.request({
      url: 'https://zhuiyuan.origami.wang/medicine/fuzzySelectMedicineByMedicineName/'+that.data.value2,
      method:'GET',
       header: {
      'Content-Type': 'application/json'
    }, 
      dataType: 'json',
      responseType: 'text',
      success:function(res){
        console.log(res.data)
        that.setData({
          list2:res.data
        })
        let list2 = JSON.stringify(res.data)
        console.log(list2) 
    
      wx.navigateTo({
        url: '/pages/index/result/result_detail/compare/compare_result/compare_result?data1='+that.data.list1+'&data2='+that.data.list2,
    })
   
    }
    })
  
  },
  clean() {
    this.setData({
     value2: ''
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
            url: '/pages/index/result/result_detail/compare/compare_result/compare_result.wxml?tolist='+tolist,
            
            success: (result) => {
              
            },
            fail: (res) => {},
            complete: (res) => {},
          })
          
      }
      })
     
    
    }
   this.setData({
     medicineName:''
   })
   },
 
})