// components/ formula_recognition/ formula_recognition.js
const data = require('./data/data.js');
const create_cut_image_canvas = require('./functions/create_cut_image_canvas.js')
const cut_area_move_and_scale = require('./functions/cut_area_move_and_scale.js')
const watch_cut_area_overflow = require('./functions/watch_cut_area_overflow.js')
const get_cut_area_change_status = require('./functions/get_cut_area_change_status.js')
const create_cut_area = require('./functions/create_cut_area.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: data.data,
  /**
   * 组件生命周期
   */
  lifetimes: {
    ready: function() {
      const that = this
      // 获取屏幕宽高
      wx.getSystemInfo({
        success: function(res) {
          that.data.window_heigt = res.windowHeight
          that.data.window_width = res.windowWidth
          that.data.pixelRatio = res.pixelRatio
        },
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 创建图片裁剪画布和图片裁剪框
     */
    create_cut_image_canvas: function(image_url) {
      const that = this
      create_cut_image_canvas.create_cut_image_canvas(image_url, that)
    },
    /**
     * 裁剪框移动和缩放
     */
    cut_area_move_and_scale: function(e) {
      const that = this
      cut_area_move_and_scale.cut_area_move_and_scale(e, that)
    },
    /**
     * 画布重绘
     */
    redraw: function(mode = 0) {
      const that = this
      // 清空画布
      that.data.cut_image_canvas.clearRect(0, 0, that.data.cut_img_canvas_w, that.data.cut_img_canvas_h)
      // 重绘图片
      that.data.cut_image_canvas.drawImage(that.data.image_obj, 0, 0, that.data.cut_img_canvas_w, that.data.cut_img_canvas_h)
      // 重绘裁剪框
      // mode=0时重绘裁剪框
      // mode=1时不绘制裁剪框，防止切图时裁剪框被切入
      if (mode == 0) {
        that.create_cut_area()
      }

    },
    /**
     * 判断裁剪框是否超出屏幕
     */
    watch_cut_area_overflow: function() {
      const that = this
      return watch_cut_area_overflow.watch_cut_area_overflow(that)
    },
    /**
     * 获取裁剪框四个缩放点位置
     */
    get_scale_point_location: function() {
      const that = this
      return {
        // 裁剪框左上角缩放点位置
        left_up_point_x: that.data.cut_area.x,
        left_up_point_y: that.data.cut_area.y,
        // 左下角缩放点位置
        left_down_point_x: that.data.cut_area.x,
        left_down_point_y: that.data.cut_area.y + that.data.cut_area.cut_height,
        // 右下角缩放点位置
        right_down_point_x: that.data.cut_area.x + that.data.cut_area.cut_width,
        right_down_point_y: that.data.cut_area.y + that.data.cut_area.cut_height,
        // 右上角缩放点位置
        right_up_point_x: that.data.cut_area.x + that.data.cut_area.cut_width,
        right_up_point_y: that.data.cut_area.y

      }
    },
    /**
     * 根据触点位置辨别是移动还是缩放图片裁剪框
     */
    get_cut_area_change_status: function(e) {
      const that = this
      get_cut_area_change_status.get_cut_area_change_status(e, that)
    },
    /**
     * 创建裁剪区域
     */
    create_cut_area: function() {
      const that = this
      create_cut_area.create_cut_area(that)
      wx.hideLoading()
    },
    /**
     * 拍照
     */
    take_photo: function() {
      const that = this
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          // 隐藏相机
          wx.showLoading({
            title: '',
          })
          that.setData({
            open_camera: false
          })
          that.create_cut_image_canvas(res.tempImagePath)
        }
      })
      
     
    },
    /**
     * 图片裁剪
     */
    cut_image: function() {
      const that = this
      that.redraw(1)
      wx.canvasToTempFilePath({
        // 除以像素比例，因为切图时使用的是相对像素
        x: that.data.cut_area.x / that.data.pixelRatio,
        y: that.data.cut_area.y / that.data.pixelRatio,
        width: Math.round(that.data.cut_area.cut_width / that.data.pixelRatio),
        height: Math.round(that.data.cut_area.cut_height / that.data.pixelRatio),
        canvas: that.data.mycanvas,
        filetype: 'png',
        success: function(res) {
          console.log("裁剪的图片", res.tempFilePath)
          // 预览剪切好的图片
          that.setData({
            cut_image: res.tempFilePath
          })
        },
        fail: function(err) {
          console.log("裁剪图片失败", err)
          wx.showModal({
            title: '错误',
            content: '剪切图片失败',
          })
        }
      }, this)
    },
    /**
     * 公式识别
     */
    recognite: function() {

    }
  }
})