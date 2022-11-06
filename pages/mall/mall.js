// pages/mall/mall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    imgUrls:[
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage3.cnpp.cn%2Fupload%2Fimages%2F20180129%2F17083593412_840x500.jpg&refer=http%3A%2F%2Fimage3.cnpp.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637162346&t=39e7cb0df19dcce76c944f489cef74c4',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg11.360buyimg.com%2FpopWaterMark%2Fjfs%2Ft304%2F128%2F174750791%2F292282%2Fa5305f58%2F54043024N5c9487ec.jpg&refer=http%3A%2F%2Fimg11.360buyimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637162346&t=5072d598b3361940ea6eeb26e96d5fc2',
      'https://img0.baidu.com/it/u=779407964,1931901190&fm=224&fmt=auto&gp=0.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,

    tabs: [
      {
        id:0,
        value:"为您推荐",
        isActive:true
      },
      {
        id:1,
        value:"科学补钙",
        isActive:false
      },
      {
        id:2,
        value:"营养补剂",
        isActive:false
      },
      {
        id:3,
        value:"免疫力提高",
        isActive:false
      }
    ],

  con:[
    {
      "image1": "https://img0.baidu.com/it/u=779407964,1931901190&fm=224&fmt=auto&gp=0.jpg",
      "shopName": "内蒙特产套餐—（烤羊腿：1000g/盒*1+内蒙奶酪：450g/盒*1+风干牛肉：500g/袋*2）",
      "price": 1280.00,
      "markPrice": 2256.00
    },
    {
      "image1": "https://img0.baidu.com/it/u=779407964,1931901190&fm=224&fmt=auto&gp=0.jpg",
      "shopName": "老人保健按摩毯",
      "price": 1280.00,
      "markPrice": 2256.00
    },
    {
      "image1": "https://img0.baidu.com/it/u=779407964,1931901190&fm=224&fmt=auto&gp=0.jpg",
      "shopName": "詹姆士公爵干红葡萄酒VCE0137【750ml/瓶*3瓶】",
      "price": 1280.00,
      "markPrice": 2256.00
    },
    {
      "image1": "https://img0.baidu.com/it/u=779407964,1931901190&fm=224&fmt=auto&gp=0.jpg",
      "shopName": "泰国天然乳胶高低颈椎按摩枕（两个）",
      "price": 1280.00,
      "markPrice": 2256.00
    }
  ]

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  handleTabsItemChange(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
})