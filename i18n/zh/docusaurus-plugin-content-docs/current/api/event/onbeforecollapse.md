---
sidebar_label: onBeforeCollapse
title: onBeforeCollapse event
description: "在甘特图退出全屏模式并返回普通视图之前触发"
---

# onBeforeCollapse

### Description

@short: 在甘特图退出全屏模式并返回普通视图之前触发

@signature: onBeforeCollapse: () =\> boolean;

### Returns
- ` result` - (boolean) - 决定事件的默认操作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeCollapse",function(){
    // 在这里添加您的自定义逻辑    
    return true;
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

此事件可以被阻止。返回 *false* 将防止任何后续操作。

:::note
 此事件属于 **fullscreen** 扩展的一部分，因此请确保通过 [gantt.plugins](api/method/plugins.md) 方法启用 [fullscreen](guides/extensions-list.md) 插件。更多详情请参见 [全屏模式](guides/fullscreen-mode.md) 文章。 
:::

### Related API
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [全屏模式](guides/fullscreen-mode.md)

