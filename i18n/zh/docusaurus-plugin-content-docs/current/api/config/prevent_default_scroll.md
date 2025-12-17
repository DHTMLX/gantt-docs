---
sidebar_label: prevent_default_scroll
title: prevent_default_scroll config
description: "控制 gantt 容器是否阻止 mousewheel 事件，或允许其传播到 window 元素"
---

# prevent_default_scroll

### Description

@short: 控制 gantt 容器是否阻止 mousewheel 事件，或允许其传播到 window 元素

### Example

~~~jsx
gantt.config.prevent_default_scroll = false;
gantt.init('gantt_here');
~~~

**Default value:** false

### Details

:::note
 此属性已被废弃。 
:::

当 gantt 放置在页面中间且周围有其他内容时，此设置非常实用。

禁用时，gantt 内部的滚动条将保持可见。若要滚动页面的其他部分，用户需要点击 gantt 区域外部。

### Change log
- 从 v5.0 起废弃
