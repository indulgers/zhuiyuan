//import api from "../../utils/api/api"
const app = getApp();

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
      title: "我的社区小屋",
      desc: "",
      url: "/pages/community/mypage/mypage"
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
      //  {
      //    icon: "/images/me/customer_feedback.png",
      //    title: "用户反馈",
      //    desc: "",
      //    url: "/pages/me/customer_feedback/customer_feedback"
      //  }
    ],
    user_openid: ""
  },
  getUserProfile(e) {
    /*
    wx.cloud.callFunction({
      name: 'user-login',
      success(res){
        console.log("云函数返回的内容"+res);
        wx.setStorageSync('userId', res.result.wxInfo.OPENID)
        wx.cloud.database().collection('user').where({
          open_id: res.result.wxInfo.OPENID
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
    */
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
    app.doLogin();
    //调用云函数
    // wx.cloud.callFunction({
    // name: 'user-login',
    // data: userInfo
    // }).then(res => {
    //   app.globalData.userInfo = res.result.data;
    //   that.setData({
    //   userInfo: res.result.data,
    //   hasUserInfo: true
    //   })
    //   wx.hideLoading();
    // }).catch(err => {
    //   console.log(err);
    // })
  },
  getid() {
    wx.cloud.callFunction({
      name: "login",//这里写上云函数login的名字，一定要输入正确不然会报错！
      success(res) {
        console.log("获取openid成功:", res.result.openid)
        wx.setStorageSync('OpenId', res.result.openid)
        wx.cloud.database().collection('user').where({
          open_id: res.result.openid
        }).get({
          success: res => {
            console.log(res)
            this.setData({
              userlists: res.data[0]
            })
          }
        })
        //这里获取成功后可以通过 res.result.openid来获取用户的openid        
      },
      fail(err) {
        console.log("获取openid失败:", err)
        //当获取失败，1.要考虑云函数部署是否成功；
        //           2.要查看调用的这个云函数的名字输入是否正确
      }
    })
    this.data.user_openid = wx.getStorageSync('OpenId')
    console.log("本地拿到的openid：" + this.data.user_openid);
  },
  onLoad: function (options) {
    /* 先试试直接登录
    let isfirst = wx.getStorageSync('userId')
    //这个是在已经完成过一次授权之后再次登录直接加载openid信息，避免多次调用授权操作
    if (isfirst) {
      //Do something with return value
      wx.cloud.database.c
      wx.cloud.database().collection('user').where({
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
    */
    //这里是直接读取第一次授权是设置的用户信息（头像、昵称）的缓存信息
    wx.removeStorageSync('userInfo')
    // 获取个人信息，如果不存在，则跳转到认证页面
                   this.IsAuthor()
           
           var that = this;
           /**
            * 获取当前设备的宽高
            */
           wx.getSystemInfo( {
               success: function( res ) {
                   that.setData( {
                       winWidth: res.windowWidth,
                       winHeight: res.windowHeight
                   });
               }
       
           });
    let user = wx.getStorageSync('userInfo')
    console.log("Storage中的用户信息：" + user)
    let open_id = wx.getStorageSync('userId')
    if (user) {
      this.setData({
        userInfo: user,
        hasUserInfo: true
      })
    }
    //this.getid()
  },
  //退出登录
  logout() {
    wx.showModal({
      title: '您确定要退出吗',
      content: '',
      complete: (res) => {
        if (res.cancel) {
          console.log("用户取消了退出")
        }

        if (res.confirm) {
          console.log("用户确定退出")
          this.setData({
            userInfo: '',
            hasUserInfo: false
          })
          app.logout();
        }
      }
    }),
      // 清空缓存
      wx.setStorageSync('user', null)
  },
  InitInfo() {
    wx.showLoading({
        title: '正在登录...',
        mask: true
    })
    let that = this
    wx.cloud.callFunction({
        name: 'InitInfo',
        data: {
            type: 'INIT'
        },
        success: res => {
            wx.hideLoading()
            let result = res.result.data
            console.log('res', result)

          
        },
        fail: err => {
            
        },
        complete: res => {
            console.log('complete', res)
        }
    })
},
  /**
 * 检查授权情况
 */
IsAuthor: function () {
    wx.showLoading({
        title: '加载中...',
        mask: true
    })
    
    var that = this
    wx.getSetting({
        success(res) {
            if (res.authSetting['scope.userInfo']) {
               // 获取数据库的用户信息
               that.InitInfo()
            } else {
                // 未授权，跳转到授权页面
                // wx.redirectTo({
                //     url: '../login/login?id=auth'
                // })
                
                   // 获取推荐列表的数据
                   this.getarticles()
                   // 骨架屏幕消失
                   this.setData({
                       loading: false
                     })
            }
        },
        fail: function (err) {
            wx.hideLoading()
        }
    })
},
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo);
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      this.setData({
        userInfo: e.detail.userInfo
      })
    } else {
      //用户按了拒绝按钮
    }
  },
  onShow: function () {
      
    app.IsLogon()
    console.log(app.globalData)
    // 全局变量
    let globalData = app.globalData
    let userInfo = globalData.userInfo
    this.setData({
        UserLogin: globalData.UserLogin,
        userInfo: userInfo
    })
    if(globalData.UserLogin){
         // 获取文章列表
        this.getarticles()
        // 获取 关注/粉丝/获赞 
        this.getuserfans(userInfo.openid)
    }
   
}
})