import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
import show from '../show'

axios.defaults.adapter = mpAdapter

const app = getApp()

const config = {
  baseURL: 'https://zhenzhi.cpoe.top/',
  withCredentials: true
}

const service = axios.create(config)

const handleRequest = req => {
  wx.showLoading({
    title: '请求数据中'
  })
  return req
}

// request拦截器
service.interceptors.request.use(handleRequest,
  err => {
    console.log(err)
    show.showError()
    return Promise.reject(err)
  }
)

const handleResponseError = err => {
  wx.hideLoading()
  console.log(err);

  return Promise.reject(err)
}

// response拦截器
service.interceptors.response.use(
  res => {

    // 数据响应之后，要做的业务
    wx.hideLoading()
    return res
  },
  handleResponseError
)


export default {
  /**
   * 封装Ajax请求
   * @param {string} url 子url
   * @param {Object} data 请求数据
   */
  post(url, data) {
    return service({
      url,
      method: 'post',
      data
    })
  },
  /**
   * 封装Ajax请求
   * @param {string} url 子url
   * @param {Object} params 参数
   */
  get(url, params) {
    return service({
      url,
      method: 'get',
      params
    })
  },
  /**
   * 封装Ajax请求
   * @param {string} url 子url
   * @param {Object} data 请求数据
   */
  put(url, data) {
    return service({
      url,
      method: 'put',
      data
    })
  },
  /**
   * 封装Ajax请求
   * @param {string} url 子url
   */
  delete(url) {
    return service({
      url,
      method: 'delete'
    })
  },
  /**
   * 封装Ajax请求
   * @param {string} url 子url
   * @param {Object} data 请求数据
   */
  patch(url, data) {
    return service({
      url,
      method: 'patch',
      data
    })
  },
}