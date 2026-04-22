---
sidebar_label: expand
title: expand 方法
description: "将甘特图扩展到全屏模式"
---

# expand

### Description

@short: 将甘特图扩展到全屏模式

@signature: expand: () =\> void

### Example

~~~jsx
gantt.expand();
~~~

### Related samples
- [全屏](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
此方法在 **fullscreen** 扩展中定义，因此您需要使用 [gantt.plugins](api/method/plugins.md) 方法激活 [fullscreen](guides/extensions-list.md#fullscreen) 插件。请参阅 [全屏模式](guides/fullscreen-mode.md) 文章获取详细信息。
:::

### Related API
- [collapse](api/method/collapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

### Related Guides
- [全屏模式](guides/fullscreen-mode.md)