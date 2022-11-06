/**
 * 根据触点位置辨别是移动还是缩放图片裁剪框
 * e:点击事件
 * that:页面或者自定义组件实例，即this
 */
let get_cut_area_change_status = function (e,that) {
  // 触摸点位置
  let x = e.touches[0].x
  let y = e.touches[0].y
  // 复位裁剪框变化状态
  that.data.cut_area_change_status = ''
  // 缩放感应区域半径，触点落入该区域响应缩放
  let scale_reponse_radius = 30

  // 记录当前坐标
  that.data.last_touches_x = x
  that.data.last_touches_y = y

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

  // 判断是否是在移动裁剪框
  if ((left_up_point_x + scale_reponse_radius) < x && x < (right_down_point_x - scale_reponse_radius) && left_up_point_y < y && y < right_down_point_y) {
    that.data.cut_area_change_status = 'move'
  }
  // 按住左上角缩放
  if (Math.sqrt(Math.pow(x - left_up_point_x, 2) + Math.pow(y - left_up_point_y, 2)) < scale_reponse_radius) {
    that.data.cut_area_change_status = 'left_up_scale'
  }
  // 按住左下角缩放
  if (Math.sqrt(Math.pow(x - left_down_point_x, 2) + Math.pow(y - left_down_point_y, 2)) < scale_reponse_radius) {
    that.data.cut_area_change_status = 'left_down_scale'
  }
  // 按住右上角缩放
  if (Math.sqrt(Math.pow(x - right_up_point_x, 2) + Math.pow(y - right_up_point_y, 2)) < scale_reponse_radius) {
    that.data.cut_area_change_status = 'right_up_scale'
  }
  // 按住右下角缩放
  if (Math.sqrt(Math.pow(x - right_down_point_x, 2) + Math.pow(y - right_down_point_y, 2)) < scale_reponse_radius) {
    that.data.cut_area_change_status = 'right_down_scale'
  }
}
module.exports={
  get_cut_area_change_status: get_cut_area_change_status
}