---
sidebar_label: onExpand
title: onExpand event
description: "当甘特图切换到全屏模式时触发"
---

# onExpand

### Description

@short: 当甘特图切换到全屏模式时触发

@signature: onExpand: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onExpand", function (){
    // 在这里编写您的自定义逻辑
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
 该事件来自**fullscreen**扩展，因此请确保通过[gantt.plugins](api/method/plugins.md)方法启用[fullscreen](guides/extensions-list.md)插件。欲了解更多信息，请参阅[全屏模式](guides/fullscreen-mode.md)文章。 
:::

### Related API
- [onCollapse](api/event/oncollapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [全屏模式](guides/fullscreen-mode.md)

