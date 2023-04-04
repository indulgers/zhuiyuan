// pages/index/result_detail/result_detail.js
var app=getApp()
import * as echarts from '../../../../ec-canvas/echarts'
var chart=null;
function initCharts(canvas,width,height){
   chart =echarts.init(canvas,null,{
    width:width,
    height:height
    
  });
  canvas.setChart(chart);
  var option = {
    title:{
      text:"成分含量"
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    legend:{
      data:['A']
    },
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        label:{
          show:true,
          position:'top',
          textStyle:{
            fontSize:'15px',
            color:'#666'
          },
          formatter:'{c}'},
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        
      }
    ]
  };
 option.legend.data=app.globalData.IngredientName
 option.xAxis.data=app.globalData.IngredientName
 option.series[0].data=app.globalData.componentNum
  chart.setOption(option);
 console.log(chart)
  return chart;

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec:{
      onInit:initCharts
    },
    list:{},
    list1:{},
    components:'',
    tolist:'',
    Ingredient:'',
    IngredientName:[],
    IngredientUnit:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(res) {
   app.globalData.IngredientName=[]
   app.globalData.componentNum=[]
   app.globalData.componentUnit=[]
    var data=JSON.parse(res.data) 
    this.setData({
      list:data,
      tolist:data.medicineId,
      Ingredient:data.medicineEffectiveIngredient
    })
    console.log(data)
    console.log(data.medicineName)
    
    this.setData({
      components:data.medicineId
    })
   var datamm=this.data.Ingredient.match(/(\d+\.\d)/g);
   var datam=this.data.Ingredient.match(/[0-9\.\s]+(?:mg|kg|M|g|µg)/g).slice(1);
   var dataz=this.data.Ingredient.match(/[\u4e00-\u9fa5]+/g).slice(2);
   console.log(dataz)
   console.log(datam)
    this.setData({
      Ingredient:datamm,
      IngredientUnit:datam,
      IngredientName:dataz
    })
    console.log(this.data.Ingredient)
    for(var name in this.data.Ingredient){
    app.globalData.componentNum.push(this.data.Ingredient[name])
    app.globalData.IngredientName.push(this.data.IngredientName[name])
    app.globalData.componentUnit.push(this.data.IngredientUnit[name])
  }
    console.log(app.globalData.IngredientName)
    console.log(app.globalData.componentNum)
  },
  
  toCompare(){
    wx.navigateTo({
      url: '/pages/index/result/result_detail/compare/compare',
    })
  },
  toComponent:function(e){
    let tolist=this.data.components
    console.log(tolist)
    wx.navigateTo({
      url: '/pages/index/result/result_detail/componentUsage/Usage.wxml?tolist='+tolist,
    })
    // wx.request({
    //   url: 'https://zhuiyuan.origami.wang/medicine/selectMedicinesByComponentName/'+this.data.components+'?pageNum&pageSize',
    //   method:'POST',
    //    header: {
    //   'Content-Type': 'application/json'
    // }, 
    //   dataType: 'json',
    //   responseType: 'text',
    //   success:function(res){
    //     console.log(res.data)
    //     let tolist = JSON.stringify(res.data)
    //     console.log(tolist)
    //     wx.navigateTo({
    //       url: '/pages/index/result/result_detail/componentUsage/Usage?tolist='+tolist,
          
    //       success: (result) => {
            
    //       },
    //       fail: (res) => {},
    //       complete: (res) => {},
    //     })
        
    // }
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})