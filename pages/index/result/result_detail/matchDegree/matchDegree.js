// pages/index/result/result_detail/matchDegree/matchDegree.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:{},
      match:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var data=JSON.parse(options.data) 
    this.setData({
      list:data
    })
  },
  levenshtein(str1, str2) {
    // 计算两个字符串长度
    const len1 = str1.length;
    const len2 = str2.length;
    // 创建装载数组
    const dif = [];
    for (let i = 0; i < len1 + 1; i++) {
      dif.push(new Array(len2 + 1));
    }
    // 赋初始值
    for (let i = 0; i <= len1; i++) {
      dif[i][0] = i;
    }
    for (let i = 0; i <= len2; i++) {
      dif[0][i] = i;
    }
    // 计算两个字符串是否一样
    const ch1 = str1.split('');
    const ch2 = str2.split('');
    let temp;
    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++){
        if(ch1[i - 1] == ch2[j - 1]) {
          temp = 0;
        } else {
          temp = 1;
        }
        // 取最小值
        const temp1 = dif[i - 1][j - 1] + temp;
        const temp2 = dif[i][j - 1] + 1;
        const temp3 = dif[i - 1][j] + 1;
  
        dif[i][j] = Math.min(temp1, temp2, temp3);
      }
    }
    
    const similarity = 1 - dif[len1][len2] / Math.max(str1.length, str2.length);
    if(similarity>0.1&&similarity<=0.5){   
    return (similarity+0.5)*100;
  }
    return similarity*100;
    // 计算相似度
 
  },
submitForm(e){
  console.log(this.levenshtein(e.detail.value.raw,this.data.list.medicineRawMaterial))
  console.log(this.levenshtein(e.detail.value.demand,this.data.list.medicineHealthFunction))
  console.log(this.levenshtein(e.detail.value.status,this.data.list.medicineSuitPerson))
  console.log(this.levenshtein(e.detail.value.demand,this.data.list.medicineHealthFunction)*0.1+0.3*this.levenshtein(e.detail.value.status,this.data.list.medicineSuitPerson)+0.2*this.levenshtein(e.detail.value.raw,this.data.list.medicineRawMaterial))
  this.setData({
    match:this.levenshtein(e.detail.value.demand,this.data.list.medicineHealthFunction)*0.1+0.3*this.levenshtein(e.detail.value.status,this.data.list.medicineSuitPerson)+0.2*(1-this.levenshtein(e.detail.value.raw,this.data.list.medicineRawMaterial))
  })
  wx.navigateTo({
    url: '/pages/index/result/result_detail/matchDegree/matchDetail/matchDetail?match='+this.data.match*100,
  })
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