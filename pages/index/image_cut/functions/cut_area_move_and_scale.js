/**
 * 裁剪框移动和缩放
 * e:微信小程序点击事件
 * that:自定义组件或者页面实例,即this
 */
let cut_area_move_and_scale = function(e, that) {
  // 当前触点x和y坐标
  let touch_x = e.touches[0].x
  let touch_y = e.touches[0].y
  // 坐标变化量
  let dx = touch_x - that.data.last_touches_x
  let dy = touch_y - that.data.last_touches_y
  // 按住左上角缩放点缩放
  if (that.data.cut_area_change_status == "left_up_scale" || that.data.cut_area_change_status == "left_down_scale") {
    // 更新裁剪框高度
    that.data.cut_area.cut_height += -dy
    that.data.cut_area.cut_width += -dx
    // 更新左上角坐标
    that.data.cut_area.x += dx
    that.data.cut_area.y += dy
    // 裁剪框超出屏幕
    if (that.watch_cut_area_overflow()) {
      // 超出屏幕，撤销变化
      that.data.cut_area.cut_height -= -dy
      that.data.cut_area.cut_width -= -dx
      that.data.cut_area.x -= dx
      that.data.cut_area.y -= dy
      return;
    }
    // 重绘画布
    that.redraw()
  }
  // 按住其他缩放点缩放
  if (that.data.cut_area_change_status == "right_up_scale" || that.data.cut_area_change_status == "right_down_scale") {
    // 更新裁剪框高度
    that.data.cut_area.cut_height += dy
    that.data.cut_area.cut_width += dx
    // 裁剪框超出屏幕
    if (that.watch_cut_area_overflow()) {
      // 超出屏幕，撤销坐标变化
      that.data.cut_area.cut_width -= dx
      that.data.cut_area.cut_height -= dy
      return;
    }
    // 重绘画布
    that.redraw()
  }
  // 整体移动裁剪框
  if (that.data.cut_area_change_status == "move") {
    // 更新裁剪框左上角坐标量
    that.data.cut_area.x += dx
    that.data.cut_area.y += dy
    // 裁剪框超出屏幕
    if (that.watch_cut_area_overflow()) {
      // 超出屏幕，撤销坐标增量
      that.data.cut_area.x -= dx
      that.data.cut_area.y -= dy
      return;
    }
    // 重绘画布
    that.redraw()

  }
  // 更新点坐标
  that.data.last_touches_x = touch_x
  that.data.last_touches_y = touch_y
}
module.exports = {
  cut_area_move_and_scale: cut_area_move_and_scale
}