/**
 * 防止裁剪框超出屏幕
 * that:自定义组件或者页面实例，即this
 */
let watch_cut_area_overflow = function (that) {
  // 距离屏幕边界裕度
  let margin = 5 * that.data.pixelRatio
  // 获取四个缩放点位置
  const scale_point_location = that.get_scale_point_location()
  // 裁剪框左上角缩放点位置
  let left_up_point_x = scale_point_location.left_up_point_x
  let left_up_point_y = scale_point_location.left_up_point_y
  // 左下角缩放点位置
  let left_down_point_x = scale_point_location.left_down_point_x
  let left_down_point_y = scale_point_location.left_down_point_y
  // 右下角缩放点位置
  let right_down_point_x = scale_point_location.right_down_point_x
  let right_down_point_y = scale_point_location.right_down_point_y
  // 右上角缩放点位置
  let right_up_point_x = scale_point_location.right_up_point_x
  let right_up_point_y = scale_point_location.right_up_point_y
  // 裁剪框左边超出屏幕
  if (left_up_point_x < margin) {
    return 1
  }
  //裁剪框右边超出屏幕
  if (right_down_point_x > (that.data.window_width - margin)) {
    return 1
  }
  // 裁剪框上边超出屏幕
  if (left_up_point_y < margin) {
    return 1
  }
  //裁剪框下边超出屏幕
  if (right_down_point_y > (that.data.window_heigt - margin)) {
    return 1
  }
  return 0
}
module.exports={
  watch_cut_area_overflow: watch_cut_area_overflow
}