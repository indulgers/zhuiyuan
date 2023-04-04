// pages/match/match.ts
Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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

  },
  // formSubmit: function (e: { detail: { value: any } }) {
  //   console.log('form发生了submit事件，携带数据为：', e.detail.value)
  // },
  formReset: function () {
    console.log('form发生了reset事件')
  },
// template.js
data: {
  options: [
    { value: '1', label: '免疫提升', checked: false },
    { value: '2', label: '美颜瘦身', checked: false },
    { value: '3', label: '抗疲劳', checked: false },
    { value: '4', label: '抗衰老', checked: false },
    { value: '5', label: '孕期保健', checked: false },
    { value: '6', label: '骨骼养护', checked: false },
    { value: '7', label: '运动增肌', checked: false },
    { value: '8', label: '消化系统', checked: false },
    { value: '9', label: '睡眠提升', checked: false },
    { value: '10', label: '清肝护目', checked: false },
    { value: '11', label: '生长发育', checked: false },
    { value: '12', label: '清咽养肺', checked: false },
    { value: '13', label: '脑部发育', checked: false },
    { value: '14', label: '三高防治', checked: false },
    { value: '15', label: '微量元素', checked: false },
    { value: '16', label: '维生素、益生菌', checked: false },
    { value: '17', label: '功能饮品', checked: false },
    { value: '18', label: '其他', checked: false },
  ],
  showOptions: false,
  text: '请选择保健品功效',
  Id:0,
  list:{}
},

onTapSelect() {
  this.setData({
    showOptions: !this.data.showOptions
  });
},

onTapOption(e) {
  const { value } = e.currentTarget.dataset;
  const options = this.data.options.map(item => {
    if (item.value === value) {
      item.checked = !item.checked;
    }
    return item;
  });
  const list = options.filter(item => item.checked).map(item => item.label);
  var text = list.length === 0 ? '请选择您的保健需求' : list.join('，');
  if(list.length>=2){
    text='仅限选一种需求哦'
  }
  this.setData({
    options,
    text
  });
},
  submit(){
    let that=this
    let id=this.data.options.map(item=>{
      if(item.label===this.data.text){
        return item.value }
    }
    )

    let target = id.filter(current => {
      return current !== null && current !== undefined
    })
    console.log(target)
    let index=target[0]
    console.log(index)
    this.setData({
        Id:index
    })
    wx.request({
      url: 'https://zhuiyuan.origami.wang/medicine/getMedicineListGroupByType/'+this.data.Id,
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
    })
  }
 

})