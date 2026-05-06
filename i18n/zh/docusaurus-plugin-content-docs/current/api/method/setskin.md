---
sidebar_label: setSkin
title: setSkin 方法
description: "设置活动皮肤"
---

# setSkin

### Description

@short: 设置活动皮肤

@signature: setSkin: (skin: string) =\> void

### Parameters

- `skin` - (required) *string* - 皮肤的名称。可用的值有： "terrace", "dark", "material", "contrast-white", "contrast-black", "meadow", "skyblue", "broadway"

### Example

~~~jsx
gantt.setSkin("dark");
~~~

### Related samples
- [深色皮肤](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)

### Details

如果该方法在 gantt 初始化后被调用，它将触发 [render](api/method/render.md) 方法。

如果在初始化之前调用，该方法将具有与对 `gantt.skin` 属性赋值相同的效果：

~~~js
gantt.skin = "dark";
~~~

### Related Guides
- [皮肤](guides/skins.md)

### Change log
- 已在 v9.0 中新增