---
sidebar_label: onLinkValidation
title: onLinkValidation event
description: "当用户添加新链接时触发，dhtmlxGantt 会验证该链接是否有效"
---

# onLinkValidation

### Description

@short: 当用户添加新链接时触发，dhtmlxGantt 会验证该链接是否有效

@signature: onLinkValidation: (link: Link) =\> boolean;

### Parameters

- `link` - (required) *Link* - 链接对象

### Returns
- ` result` - (boolean) - 指示事件的默认操作是否继续执行（<b>true</b>）或被取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onLinkValidation", function(link){
    // 在这里编写自定义逻辑
});
~~~

### Details

:::note
 该事件在 [isLinkAllowed](api/method/islinkallowed.md) 方法中触发。 
:::

当用户通过鼠标拖放创建任务之间的新链接时，会触发此事件。

如果事件处理程序返回 `false`，目标任务的圆形控制点将变为红色，且链接不会被创建。返回 `true` 会将圆形控制点高亮为橙色，并允许链接创建。

### Related API
- [isLinkAllowed](api/method/islinkallowed.md)

