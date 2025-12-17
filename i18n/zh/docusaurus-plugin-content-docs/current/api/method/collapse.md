---
sidebar_label: collapse
title: collapse method
description: "将甘特图视图从全屏模式切换回常规模式"
---

# collapse

### Description

@short: 将甘特图视图从全屏模式切换回常规模式

@signature: collapse: () =\> void

### Example

~~~jsx
gantt.collapse();
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
 此方法来自 **fullscreen** 扩展，因此请确保通过 [gantt.plugins](api/method/plugins.md) 方法启用 [fullscreen](guides/extensions-list.md) 插件。更多详情请参见 [全屏模式](guides/fullscreen-mode.md) 文章。 
:::

### Related API
- [expand](api/method/expand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

### Related Guides
- [全屏模式](guides/fullscreen-mode.md)

