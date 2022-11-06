/**
 * 数据
 */
let data = {
  // 是否打开相机拍照
  open_camera: true,
  // 剪切图片的canvas上下文
  cut_image_canvas: {},
  // canvas实例
  mycanvas: {},
  // 图片对象
  image_obj: {},
  // 屏幕宽度和高度
  window_width: 0,
  window_heigt: 0,
  // 画布宽高
  cut_img_canvas_w: 0,
  cut_img_canvas_h: 0,
  // 裁剪区域
  cut_area: {
    // 裁剪区域左上角离屏幕原点坐标
    x: 0,
    y: 0,
    // 裁剪宽高
    cut_width: 0,
    cut_height: 60,
    // 裁剪区域边框颜色
    cut_area_color: 'red',
  },
  // 屏幕像素比
  pixelRatio: 1,
  // 裁剪区域移动和缩放时上一个触摸点坐标
  // 用来计算移动距离和移动方向
  last_touches_x: 0,
  last_touches_y: 0,
  // 裁剪框变换类型，可选值有：
  // move,left_up_scale,left_down_scale,
  // right_up_scale,right_down_scale
  cut_area_change_status: 'move',
  // 裁剪好的图片临时文件链接
  cut_image: ''
}
module.exports = {
  data: data
}