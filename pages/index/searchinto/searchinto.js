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