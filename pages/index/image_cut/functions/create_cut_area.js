/**
 * 绘制裁剪区域
 * that:自定义组件实例或page实例，即this
 */
let create_cut_area = function(that) {
  // 创建预先选中的图片裁剪区域
  that.data.cut_image_canvas.strokeStyle = that.data.cut_area.cut_area_color
  // 裁剪区域边界线
  that.data.cut_image_canvas.strokeRect(that.data.cut_area.x, that.data.cut_area.y, that.data.cut_area.cut_width, that.data.cut_area.cut_height)

  // 裁剪区域边界的缩放圆点

  // 左上角外圆点
  that.data.cut_image_canvas.beginPath()
  that.data.cut_image_canvas.arc(that.data.cut_area.x, that.data.cut_area.y, 5 * that.data.pixelRatio, 0, 2 * Math.PI)
  that.data.cut_image_canvas.fillStyle = 'white'
  that.data.cut_image_canvas.fill()
  // 左上角内圆点
  that.data.cut_image_canvas.beginPath()
  that.data.cut_image_canvas.arc(that.data.cut_area.x, that.data.cut_area.y, 2.5 * that.data.pixelRatio, 0, 2 * Math.PI)
  that.data.cut_image_canvas.fillStyle = '#1296db'
  that.data.cut_image_canvas.fill()

  // 左下角外圆点
  that.data.cut_image_canvas.beginPath()
  that.data.cut_image_canvas.arc(that.data.cut_area.x, that.data.cut_area.y + that.data.cut_area.cut_height, 5 * that.data.pixelRatio, 0, 2 * Math.PI)
  that.data.cut_image_canvas.fillStyle = 'white'
  that.data.cut_image_canvas.fill()
  // 左下角内圆点
  that.data.cut_image_canvas.beginPath()
  that.data.cut_image_canvas.arc(that.data.cut_area.x, that.data.cut_area.y + that.data.cut_area.cut_height, 2.5 * that.data.pixelRatio, 0, 2 * Math.PI)
  that.data.cut_image_canvas.fillStyle = '#1296db'
  that.data.cut_image_canvas.fill()

  // 右下角外圆点
  that.data.cut_image_canvas.beginPath()
  that.data.cut_image_canvas.arc(that.data.cut_area.x + that.data.cut_area.cut_width, that.data.cut_area.y + that.data.cut_area.cut_height, 5 * that.data.pixelRatio, 0, 2 * Math.PI)
  that.data.cut_image_canvas.fillStyle = 'white'
  that.data.cut_image_canvas.fill()
  // 右下角内圆点
  that.data.cut_image_canvas.beginPath()
  that.data.cut_image_canvas.arc(that.data.cut_area.x + that.data.cut_area.cut_width, that.data.cut_area.y + that.data.cut_area.cut_height, 2.5 * that.data.pixelRatio, 0, 2 * Math.PI)
  that.data.cut_image_canvas.fillStyle = '#1296db'
  that.data.cut_image_canvas.fill()

  // 右上角外圆点
  that.data.cut_image_canvas.beginPath()
  that.data.cut_image_canvas.arc(that.data.cut_area.x + that.data.cut_area.cut_width, that.data.cut_area.y, 5 * that.data.pixelRatio, 0, 2 * Math.PI)
  that.data.cut_image_canvas.fillStyle = 'white'
  that.data.cut_image_canvas.fill()
  // 右上角内圆点
  that.data.cut_image_canvas.beginPath()
  that.data.cut_image_canvas.arc(that.data.cut_area.x + that.data.cut_area.cut_width, that.data.cut_area.y, 2.5 * that.data.pixelRatio, 0, 2 * Math.PI)
  that.data.cut_image_canvas.fillStyle = '#1296db'
  that.data.cut_image_canvas.fill()
}
module.exports = {
  create_cut_area: create_cut_area
}