---
sidebar_label: onBeforeExpand
title: onBeforeExpand event
description: "在甘特图切换到全屏模式之前触发"
---

# onBeforeExpand

### Description

@short: 在甘特图切换到全屏模式之前触发

@signature: onBeforeExpand: () =\> boolean;

### Returns
- ` result` - (boolean) - 决定默认事件动作是否继续执行（<b>true</b>）或被取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeExpand",function(){  
    // 在这里添加您的自定义逻辑  
    return true;  
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

此事件可以被阻止。返回 *false* 将停止后续操作。

:::note
 该事件属于 **fullscreen** 扩展，因此请确保通过 [gantt.plugins](api/method/plugins.md) 方法启用 [fullscreen](guides/extensions-list.md) 插件。更多信息请参见 [全屏模式](guides/fullscreen-mode.md) 文章。 
:::

### Related API
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [全屏模式](guides/fullscreen-mode.md)

