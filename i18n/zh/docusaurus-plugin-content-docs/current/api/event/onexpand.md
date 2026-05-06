---
sidebar_label: onExpand
title: onExpand 事件
description: "在甘特图扩展为全屏时触发"
---

# onExpand

### Description

@short: 在甘特图扩展为全屏时触发

@signature: onExpand: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onExpand", function (){
    // 在这里插入您的自定义逻辑 
});
~~~

### Related samples
- [全屏](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
该事件在 **fullscreen** 扩展中定义，因此需要使用 [gantt.plugins](api/method/plugins.md) 方法来激活 [fullscreen] 插件。请在 [全屏模式](guides/fullscreen-mode.md) 文章中了解详细信息。 
:::

### Related API
- [onCollapse](api/event/oncollapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [全屏模式](guides/fullscreen-mode.md)