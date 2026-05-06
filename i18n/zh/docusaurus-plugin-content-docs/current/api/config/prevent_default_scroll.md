---
sidebar_label: prevent_default_scroll
title: prevent_default_scroll 配置
description: "指定甘特图容器应阻止鼠标滚轮事件，还是应将该事件向上传递至 window 元素"
---

# prevent_default_scroll

:::warning
該屬性已棄用。
:::

### Description

@short: 指定甘特图容器是否应阻止鼠标滚轮事件，还是应将该事件向上传递至 window 元素

### Example

~~~jsx
gantt.config.prevent_default_scroll = false;
gantt.init('gantt_here');
~~~

**默认值：** false

### Details

该选项在以下情景中非常有用：当甘特图被插入到页面中间，并且页面外部还有其他内容时。

如果禁用此选项，甘特图中出现的滚轮滚动将停留在那儿。
要滚动页面的其他部分，用户需要在甘特图外部单击一下。

### Change log
- 自 v5.0 起已弃用