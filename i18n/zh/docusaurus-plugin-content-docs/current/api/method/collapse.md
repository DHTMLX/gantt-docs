---
sidebar_label: collapse
title: collapse 方法
description: "将甘特图从全屏模式折叠回普通模式"
---

# collapse

### Description

@short: 将甘特图从全屏模式折叠回普通模式

@signature: collapse: () => void

### Example

~~~jsx
gantt.collapse();
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
此方法在 **fullscreen** 扩展中定义，因此您需要使用 [gantt.plugins](api/method/plugins.md) 方法来激活 [fullscreen](guides/extensions-list.md#fullscreen) 插件。有关详细信息，请阅读 [Full Screen Mode](guides/fullscreen-mode.md) 文章。 
:::

### Related API
- [expand](api/method/expand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

### Related Guides
- [Full Screen Mode](guides/fullscreen-mode.md)