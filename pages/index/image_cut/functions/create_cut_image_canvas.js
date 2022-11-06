/**
 * 创建图片裁剪画布和图片裁剪框
 * image_url:要绘制的图片，只接受微信小程序临时文件链接
 * 网络图片需要先下载到本地
 * that:自定义组件或者页面实例，即this
 */
let create_cut_image_canvas = function(image_url, that) {
  // 在page中使用时应改为wx.createSelectorQuery()
  const query = that.createSelectorQuery()
  query.select('#cut_image_canvas')
    .fields({
      node: true,
      size: true
    })
    .exec((res) => {
      const canvas = res[0].node
      that.data.mycanvas = canvas
      that.data.cut_image_canvas = canvas.getContext('2d')
      // 调整像素比，防止缩放
      let w = 0
      let h = 0
      // 根据要绘制的图片调整画布宽高
      wx.getImageInfo({
        src: image_url,
        success: function(res) {
          // 画布宽度
          canvas.width = that.data.window_width;
          w = that.data.window_width
          // 画布高度
          canvas.height = that.data.window_width / res.width * res.height
          h = canvas.height

          // 预先设置裁剪区域宽度为屏幕宽度的80%
          that.data.cut_area.cut_width = 0.8 * w
          // 预先设定的裁剪区域左上角顶点位置
          that.data.cut_area.x = (w - that.data.cut_area.cut_width) / 2
          that.data.cut_area.y = (h - that.data.cut_area.cut_height) / 2
          // 设置画布宽高
          that.setData({
            cut_img_canvas_h: h,
            cut_img_canvas_w: w
          })
          // 绘制图片
          that.data.image_obj = canvas.createImage();
          that.data.image_obj.src = image_url
          that.data.image_obj.onload = () => {
            // 保存当前绘图状态，在清除裁剪框时使用
            that.data.cut_image_canvas.drawImage(that.data.image_obj, 0, 0, w, h)
            // 创建图片裁剪区域
            that.create_cut_area()
          }
        }
      })

    })
}
module.exports = {
  create_cut_image_canvas: create_cut_image_canvas
}