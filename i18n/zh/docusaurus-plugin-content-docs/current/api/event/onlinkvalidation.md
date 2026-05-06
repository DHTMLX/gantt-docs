---
sidebar_label: onLinkValidation
title: onLinkValidation event
description: "当用户添加新连线时触发，dhtmlxGantt 将检查该连线是否有效"
---

# onLinkValidation

### Description

@short: 当用户添加新链接时触发，dhtmlxGantt 会验证该链接是否有效

@signature: onLinkValidation: (link: Link) => boolean;

### Parameters

- `link` - (required) *Link* - 该 Link 对象

### Returns
- ` result` - (boolean) - 定义事件的默认行为是否会被触发（<b>true</b>）还是取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onLinkValidation", function(link){
    // 在这里插入您的自定义逻辑 
});
~~~

### Details

:::note
事件在 [isLinkAllowed](api/method/islinkallowed.md) 方法中触发。 
:::

事件在用户通过鼠标拖放在任务之间创建新连线时触发。

如果事件处理程序返回 `false`，目标任务的圆形把手将显示为红色，且不会添加连线。返回 `true` 时，将把圆形把手显示为橙色并允许创建连线。

### Related API
- [isLinkAllowed](api/method/islinkallowed.md)