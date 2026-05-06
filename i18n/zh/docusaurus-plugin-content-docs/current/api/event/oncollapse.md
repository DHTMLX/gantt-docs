---
sidebar_label: onCollapse
title: onCollapse 事件
description: "当甘特图从全屏模式返回到普通模式时触发"
---

# onCollapse

### Description

@short: 当甘特图从全屏模式返回到普通模式时触发

@signature: onCollapse: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onCollapse", function (){
    // 在这里插入您的自定义逻辑 
});
~~~

### Related samples
- [全屏示例](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
此事件在 **fullscreen** 扩展中定义，因此需要通过 [fullscreen](guides/extensions-list.md#fullscreen) 插件并使用 [gantt.plugins](api/method/plugins.md) 方法来激活。有关详细信息，请参阅 [全屏模式](guides/fullscreen-mode.md) 文章。
:::

### Related API
- [onExpand](api/event/onexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Full Screen Mode](guides/fullscreen-mode.md)