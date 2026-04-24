---
sidebar_label: onLightboxButton
title: onLightboxButton event
description: "当用户在 lightbox 中点击自定义按钮时触发"
---

# onLightboxButton

### Description

@short: 当用户在 lightbox 中点击自定义按钮时触发

@signature: onLightboxButton: (css: string, node: HTMLElement, e: Event) =\> void;

### Parameters

- `css` - (required) *string* - 应用到按钮上的 CSS 类名
- `node` - (required) *HTMLElement* - 被点击按钮的 HTML 元素
- `e` - (required) *Event* - 原生的 'click' 事件对象

### Example

~~~jsx
gantt.attachEvent("onLightboxButton", function (css, node, e){
    // 在这里插入您的自定义逻辑 
});
~~~

### Details

该事件仅在 lightbox 底部的自定义按钮上触发，而不会在默认按钮上触发。