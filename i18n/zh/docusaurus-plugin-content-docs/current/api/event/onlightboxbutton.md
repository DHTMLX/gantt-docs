---
sidebar_label: onLightboxButton
title: onLightboxButton event
description: "当用户点击 lightbox 内的自定义按钮时触发"
---

# onLightboxButton

### Description

@short: 当用户点击 lightbox 内的自定义按钮时触发

@signature: onLightboxButton: (css: string, node: HTMLElement, e: Event) =\> void;

### Parameters

- `css` - (required) *string* - 分配给按钮的 CSS 类名
- `node` - (required) *HTMLElement* - 表示被点击按钮的 HTML 元素
- `e` - (required) *Event* - 原生的 'click' 事件对象

### Example

~~~jsx
gantt.attachEvent("onLightboxButton", function (css, node, e){
    // 在这里编写您的自定义逻辑
});
~~~

### Details

此事件仅由位于 lightbox 底部的自定义按钮触发，不适用于默认按钮。
