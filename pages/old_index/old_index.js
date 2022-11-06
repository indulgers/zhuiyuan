// pages/old_index/old_index.js
import api from '../../utils/api/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  toSearch() {
    wx.navigateTo({
      url: '/pages/index/searchinto/searchinto',
    })
  },
  onLoad: function (options) {},
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

  searchPic: function () {
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera', 'album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        let Image = res.tempFilePaths[0]
        that.setData({
          tempFilePaths,
          Image: Image,
          isChose: true
        })
        console.log(that.data.Image);
        // that.setData({
        //   files: that.data.files.concat(res.tempFilePaths)
        // });
        that.uploadImage()
      }
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
          url: './matchAndAnalysis/result/result',
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
          url: './matchAndAnalysis/result/result',
        })

        //demo区
        console.log(err);
      }
    })

  },
})