---
sidebar_label: onBeforeExpand
title: onBeforeExpand event
description: "在 gantt 展开为全屏之前触发"
---

# onBeforeExpand

### Description

@short: 在 gantt 展开为全屏之前触发

@signature: onBeforeExpand: () => boolean;

### Returns
- ` result` - (boolean) - 定义事件的默认操作是否会被触发（<b>true</b>）或取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeExpand",function(){
    // 在这里插入您的自定义逻辑   
    return true;
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

该事件是可阻塞的。返回 *false* 将取消后续处理。

:::note
该事件在 **fullscreen** 扩展中定义，因此你需要通过 [gantt.plugins](api/method/plugins.md) 方法激活 [fullscreen](guides/extensions-list.md#fullscreen) 插件。请在 [Full Screen Mode](guides/fullscreen-mode.md) 文章中阅读详细信息。
:::

### Related API
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Full Screen Mode](guides/fullscreen-mode.md)