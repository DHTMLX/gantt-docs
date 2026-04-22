---
sidebar_label: onBeforeCollapse
title: onBeforeCollapse 事件
description: "在甘特图退出全屏模式并返回到普通模式之前"
---

# onBeforeCollapse

### Description

@short: 在甘特图退出全屏模式并返回到普通模式之前

@signature: onBeforeCollapse: () =\> boolean;

### Returns
- ` result` - (boolean) - 定义事件的默认操作是否将被触发 (<b>true</b>) 或取消 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeCollapse",function(){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Related samples
- [全屏示例](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

该事件是可阻塞的。返回 *false* 将取消后续处理。

:::note
此事件在 **fullscreen** 扩展中定义，因此需要通过 [gantt.plugins](api/method/plugins.md) 方法来激活该插件。请在 [Full Screen Mode](guides/fullscreen-mode.md) 一文中了解详细信息。
:::

### Related API
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [全屏模式](guides/fullscreen-mode.md)