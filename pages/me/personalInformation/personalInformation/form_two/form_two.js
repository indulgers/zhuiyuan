// pages/me/personalInformation/form_two/form_two.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cateItems:[
            {
              cate_id:1,
              cate_name:'心血管疾病',
              cate_icon:'../../../../images/form_two/heart.png',
              cate_desc:'心肌病、冠心病、高...',
              children: [
                { 
                  child_id: 1, 
                  name: '心肌病'
                }, 
                { 
                  child_id: 2, 
                  name: '冠心病'
                },
                { 
                  child_id: 3, 
                  name: '高尿酸'
                },
                { 
                  child_id: 4, 
                  name: '高血压'
                },
                { 
                  child_id: 5, 
                  name: '风湿性心脏病'
                },
              ]
            },
            {
              cate_id:2,
              cate_name:'呼吸系统',
              cate_icon:'../../../../images/form_two/breathe.png',
              cate_desc:'哮喘、慢性支气管炎...',
            },
            {
              cate_id:3,
              cate_name:'内分泌系统',
              cate_icon:'../../../../images/form_two/endocrine.png',
              cate_desc:'糖尿病、甲亢...',
            },
            {
              cate_id: 4,
              cate_name: '骨骼运动系统',
              cate_icon:'../../../../images/form_two/bone.png',
              cate_desc:'骨质疏松、关节炎...',
            },
            {
              cate_id: 5,
              cate_name: '消化系统',
              cate_icon:'../../../../images/form_two/noodles.png',
              cate_desc:'消化不良、腹泻、胃...',
            },
            {
              cate_id: 6,
              cate_name: '精神系统',
              cate_icon:'../../../../images/form_two/spirit.png',
              cate_desc:'帕金森、抑郁症、失...',
            },
            {
              cate_id: 7,
              cate_name: '眼部疾病',
              cate_icon:'../../../../images/form_two/eyes.png',
              cate_desc:'白内障、青光眼、虹...',
            }
            
            
          ],
          curNav:1,
          curIndex:0
    },

    switchRightTab:function(e){
        let id = e.currentTarget.dataset.id,index=e.currentTarget.dataset.index;
        this.setData({
          curNav:id,
          curIndex:index
        })
      },
      go3:function (params) {
        wx.navigateTo({
          url: '/pages/me/personalInformation/form_three/form_three'
        })
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

    }
})