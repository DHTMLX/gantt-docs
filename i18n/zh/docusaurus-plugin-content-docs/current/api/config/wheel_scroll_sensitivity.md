---
sidebar_label: wheel_scroll_sensitivity
title: wheel_scroll_sensitivity 配置
description: "指定通过鼠标滚轮滚动甘特图的速度"
---

# wheel_scroll_sensitivity

### Description

@short: 指定通过鼠标滚轮滚动甘特图的速度

@signature: wheel_scroll_sensitivity: undefined | number | \{ x?: number; y?: number; \}

### Example

~~~jsx
// 以双倍速度滚动
gantt.config.wheel_scroll_sensitivity = 2;

// 以半速滚动
gantt.config.wheel_scroll_sensitivity = 0.5;

// 或者在不同轴上设置不同的滚动速度
gantt.config.wheel_scroll_sensitivity = {
      x: 1,
      y: 0.5
};
~~~

**默认值:** undefined

### Details

该对象配置具有以下属性：

- **x** - (*number*) - 水平方向的速度
- **y** - (*number*) - 垂直方向的速度

### Change log
- 新增于 v7.0.11