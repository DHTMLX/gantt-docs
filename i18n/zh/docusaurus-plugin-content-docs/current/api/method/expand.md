---
sidebar_label: expand
title: expand method
description: "切换甘特图到全屏模式，使其占据整个屏幕空间。"
---

# expand

### Description

@short: 切换甘特图到全屏模式，使其占据整个屏幕空间。

@signature: expand: () =\> void

### Example

~~~jsx
gantt.expand();
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
 此方法属于 **fullscreen** 扩展，因此需要通过 [gantt.plugins](api/method/plugins.md) 方法启用 [fullscreen](guides/extensions-list.md#quanpingxianshi) 插件。更多信息请参阅 [全屏模式](guides/fullscreen-mode.md) 文章中的详细说明。 
:::

### Related API
- [collapse](api/method/collapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

### Related Guides
- [全屏模式](guides/fullscreen-mode.md)

