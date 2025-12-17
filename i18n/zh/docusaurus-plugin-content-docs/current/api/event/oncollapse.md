---
sidebar_label: onCollapse
title: onCollapse event
description: "当甘特图视图从全屏模式切换回普通模式时触发。"
---

# onCollapse

### Description

@short: 当甘特图视图从全屏模式切换回普通模式时触发。

@signature: onCollapse: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onCollapse", function (){
    // 在这里编写任何自定义逻辑
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
 此事件属于 **fullscreen** 扩展的一部分，因此请确保通过 [gantt.plugins](api/method/plugins.md) 方法启用 [fullscreen](guides/extensions-list.md) 插件。更多详情请参见 [全屏模式](guides/fullscreen-mode.md) 文章。 
:::

### Related API
- [onExpand](api/event/onexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [全屏模式](guides/fullscreen-mode.md)

