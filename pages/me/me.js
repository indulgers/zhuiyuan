//import api from "../../utils/api/api"
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    userlists: [],
    listicons: [{
        icon: "/images/me/pets.png",
        title: "宠物小精灵",
        desc: "",
        url: "/pages/me/pet/pet"
      },
      {
        icon: "/images/me/vip.png",
        title: "VIP服务",
        desc: "",
        url: "/pages/me/vip/vip"
      },
      {
        icon: "/images/me/community.png",
        title: "我的社区好友",
        desc: "",
        url: "/pages/me/community_friends/community_friends"
      },
      {
        icon: "/images/me/shopping cart.png",
        title: "我的购物车",
        desc: "",
        url: "/pages/me/shopping cart/shopping cart"
      },
      {
        icon: "/images/me/discount.png",
        title: "我的优惠和小样",
        desc: "",
        url: "/pages/me/discount/discount"
      },
      {
        icon: "/images/me/family.png",
        title: "家庭成员",
        desc: "",
        url: "/pages/me/family/family"
      },
      {
        icon: "/images/me/information.png",
        title: "我的健康数据",
        desc: "",
        url: "/pages/me/personalInformation/form_one/form_one"
      },
      {
        icon: "/images/me/help.png",
        title: "法律帮助",
        desc: "",
        url: "/pages/me/help/help"
      },
      // {
      //   icon: "/images/me/customer_feedback.png",
      //   title: "用户反馈",
      //   desc: "",
      //   url: "/pages/me/customer_feedback/customer_feedback"
      // }
    ],
    user_openid : ""
  },
  getUserProfile(e) {
    wx.cloud.callFunction({
      name: 'login',
      success(res){
        console.log("云函数返回的内容"+res);
        wx.setStorageSync('userId', res.result.wxInfo.OPENID)
        userinfoList.where({
          _openid: res.result.wxInfo.OPENID
        }).get({
          success: res => {
            console.log(res)
            this.setData({
              userlists: res.data[0]
            })
          }
        })
      },
      fail(err){
          console.log("失败了！")
      }
    })
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        // let user = res.userInfo
        // wx.setStorageSync('user', user)
        wx.setStorageSync('userInfo', res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }

    })
  },
  getid(){
    wx.cloud.callFunction({
        name: "login",//这里写上云函数login的名字，一定要输入正确不然会报错！
        success(res) {        
           console.log("获取openid成功:", res.result.openid)
           wx.setStorageSync('OpenId', res.result.openid)
           
           //这里获取成功后可以通过 res.result.openid来获取用户的openid        
         },
        fail(err) {        
           console.log("获取openid失败:", err)
           //当获取失败，1.要考虑云函数部署是否成功；
           //           2.要查看调用的这个云函数的名字输入是否正确
        }   
  })
  this.data.user_openid = wx.getStorageSync('OpenId')
  console.log("本地拿到的openid："+this.data.user_openid);
},
  onLoad: function (options) {
    let isfirst = wx.getStorageSync('userId')
    //这个是在已经完成过一次授权之后再次登录直接加载openid信息，避免多次调用授权操作
    if (isfirst) {
      //Do something with return value
      userinfoList.where({
        //可以用这个获取openid，app.globalData.userInfo.openid，也可以用下面的方式
        _openid: isfirst
      }).get({
        success: res => {
          this.setData({
            userlists: res.data[0],
          })
        }
      })
    }
    //这里是直接读取第一次授权是设置的用户信息（头像、昵称）的缓存信息
    let user = wx.getStorageSync('userInfo')
    let open_id = wx.getStorageSync('userId')
    if (user) {
    this.setData({
        userInfo: user,
        hasUserInfo: true
    })
    }
    this.getid()
},
 //退出登录
 
})