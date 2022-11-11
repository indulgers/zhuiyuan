var plugin = requirePlugin("WechatSI")

let manager = plugin.getRecordRecognitionManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    medicineName:'',
    
    placeholderContent: '',//placeholder内容
    hotList:[],//热搜榜数组
    searchContent: '',//表单项内容
    searchList: [],//匹配到的数据
    historyList: [],//历史搜索记录
    list:[{'name':'连花清瘟胶囊','num':'1盒'},{'name':'感冒灵颗粒','num':'1盒'},{'name':'维生素C','num':'2瓶'},{'name':'蒲地蓝消炎片','num':'3盒'}],
    list2:[{'name':'连花清瘟胶囊','num':'1盒'},{'name':'感冒灵颗粒','num':'1盒'},{'name':'维生素C','num':'2瓶'},{'name':'蒲地蓝消炎片','num':'3盒'}],
    inputValue:"",
    focus:false,//控制是否显示带按钮的搜索框
    
    
  },
  focusHandler(e){
    this.setData({focus:true});
  },
  cancelHandler(e){
    this.setData({focus:false});
  },
 
  query(e){
    this.setData({
      inputValue:e.detail.value//回显输入
    })
    var list=this.data.list2;
    var list2=[];
    for(var i=0;i<list.length;i++){
      var string =list[i].name;
      if(string.indexOf(e.detail.value)>=0){
        list2.push(list[i]);
      }

      if(e.detail.value==''){
        this.setData({
          list:list
        })
      }
      else{
        this.setData({
          list:list2
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    manager.onRecognize = function (res) {
           cons.log("current result", res.result)
    
        }
    
        manager.onStop = function (res) {
          console.log('识别开始');
    
          var result = res.result;
    
          var s = result.indexOf('。') //找到第一次出现下划线的位置
    
          result = result.substring(0,s)  //取下划线前的字符
    
          var searchType = that.data.searchType;
    
          wx.showToast({
            title: result,
    
          })
    
    }
    
        manager.onError = function (res) {
          console.log('manager.onError')
    
          console.log(res) //报错信息打印
    
          wx.showToast({
            title: res.msg,
    
          })
    
          // UTIL.log("error msg", res.msg)
    
        }

    //获取本地历史记录
    this.getSearchHistory();

  },

  //获取本地历史记录
  getSearchHistory(){
    let historyList =  wx.getStorageSync('searchHistory');
    if(historyList){
      this.setData({
        historyList: historyList
      })
    }
  },
  //表单项内容发生改变
  handleInputChange(event){
    this.setData({
      searchContent: event.detail.value.trim()
    })
    
    if(isSend){
      return;
    }
    isSend = true;
    
  },
  //发请求获取搜索匹配到的数据
  async getSearchListData(){
    //当搜索内容为空时就不发送请求并清空内容
    if(!this.data.searchContent){
      this.setData({
        searchList: []
      })
      return;
    }

    let {searchContent, historyList} = this.data;

    let searchListData = await request('/search', {keywords: searchContent, limit: 10});
    this.setData({
      searchList: searchListData.result.songs    
    })

    //将搜索关键字添加到历史记录
    if(historyList.indexOf(searchContent) !== -1){
      historyList.splice(historyList.indexOf(searchContent), 1)
    }
    historyList.unshift(searchContent);
    
    this.setData({
      historyList: historyList
    })

    //存储到本地
    wx.setStorageSync('searchHistory', historyList)
  },
  //清空搜索内容
  handleClear(){
    this.setData({
      searchContent: '',
      searchList: []
    })
  },
  //删除搜索历史记录
  handleDelete(){
    //是否确认清空
    wx.showModal({
      content: '确认清空记录吗?',
      success: (res)=>{
        if(res.confirm){
          this.setData({
            historyList: []
          })
          wx.removeStorageSync('searchHistory');
        }
      }
    })
  },
  toSearch:function(){
    wx.request({
    url: '/es/fuzzyQueryByMedicineName/{medicineName}',
    method:'GET',
    data:{
      medicineName:''
    },
    success:function(res){
      console.log(res.data)
      wx.navigateTo({
        url: '/pages/index/matchAndAnalysis/result/result.wxml',
        events: events,
        success: (result) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
  }
})
  },
  touchdown_plugin: function () {
    var _this = this

    // UTIL.stopTTS();

    manager.start({
      duration: 30000,

      lang: "zh_CN"

    })

  },

  //手指松开

  touchup_plugin: function (e) {
    var searchType = e.currentTarget.dataset.type;
    let text=e.result
    this.setData({
      searchType: searchType,

      background:  "#ED6C00",

      yysb:"长按语音识别"

    });

    manager.stop();

    wx.showToast({
      title: '正在识别……',

      icon: 'loading',

      duration: 2000

    })
    if(text==''){
      console.log('没有说话')
      return
    }
    this.inputValue=text
  },
bindinput:function(e){
  this.setData({
    inputValue:e.detail.value
  })
},
 bindconfirm:function(e){
  wx.navigateTo({
    url: '/pages/index/matchAndAnalysis/result/result.wxml',
  })
 },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})