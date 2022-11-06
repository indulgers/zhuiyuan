import showError from '../show'
import ajax from './ajax'


const app = getApp()
let code = null

export default {
  /**
   * 向后端请求
   * @returns Promises
   */
  login() {
    return app.wxp.login().then(res => {
      console.log(res)
      return ajax.post('user/login/', {
        code: res.code
      })
    })
    // 登录需要获取code，再post至后端，由后端取得openid和session_key
  },

  getProductDetail(pk) {
    return ajax.get('products/' + pk + '/')
  },
  getProductsList(limit,offset) {
    return ajax.get('products/',{
      offset: offset,
      limit: limit
    })
  },

  saveSettings(config) {
    console.log(config, "ajax");

    return ajax.put('user/config/', config)
  },
  getSettings() {
    return ajax.get('user/config/')
  },
  ping() {
    return ajax.get('ping/')
  }
}