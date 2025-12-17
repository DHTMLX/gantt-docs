---
sidebar_label: wheel_scroll_sensitivity
title: wheel_scroll_sensitivity config
description: "控制使用鼠标滚轮时甘特图滚动的速度"
---

# wheel_scroll_sensitivity

### Description

@short: 控制使用鼠标滚轮时甘特图滚动的速度

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

**Default value:** undefined

### Details

该配置对象包含以下属性:

- **x** - (*number*) - 控制水平滚动速度
- **y** - (*number*) - 控制垂直滚动速度

### Change log
- 在 v7.0.11 中新增
