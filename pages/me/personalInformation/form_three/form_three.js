// pages/me/personalInformation/form_three/form_three.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cateItems:[
            {
              cate_id:1,
              cate_name:'维生素',
              cate_icon:'../../../../images/form_three/pill.png',
              cate_desc:'维生素A、维生素B2...',
              children: [
                { 
                  child_id: 1, 
                  name: '维生素A'
                }, 
                { 
                  child_id: 2, 
                  name: '维生素B2（核黄素）'
                },
                { 
                  child_id: 3, 
                  name: '维生素B3（烟酸、烟酰胺）'
                },
                { 
                  child_id: 4, 
                  name: '维生素C'
                },
                { 
                  child_id: 5, 
                  name: '维生素D'
                },
                { 
                    child_id: 6, 
                    name: '维生素E'
                  },
              ]
            },
            {
              cate_id:2,
              cate_name:'矿物质',
              cate_icon:'../../../../images/form_three/milk.png',
              cate_desc:'钙、镁、锌、硒...',
            },
            {
              cate_id:3,
              cate_name:'肽与蛋白类',
              cate_icon:'../../../../images/form_three/egg.png',
              cate_desc:'谷胱甘肽、免疫球蛋白...',
            },
            {
              cate_id: 4,
              cate_name: '多糖类',
              cate_icon:'../../../../images/form_three/sugar.png',
              cate_desc:'膳食纤维、香菇多醣...',
            },
            {
              cate_id: 5,
              cate_name: '功能性油脂类',
              cate_icon:'../../../../images/form_three/Fat.png',
              cate_desc:'多不饱和脂肪酸、磷脂...',
            },
            {
              cate_id: 6,
              cate_name: '活性菌类',
              cate_icon:'../../../../images/form_three/germ.png',
              cate_desc:'聚乳酸菌、双歧杆菌...',
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
      go4:function (params) {
        wx.navigateTo({
          url: '/pages/me/personalInformation/form_four/form_four'
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