---
sidebar_label: setSkin
title: setSkin method
description: "更改当前使用的皮肤"
---

# setSkin

### Description

@short: 更改当前使用的皮肤

@signature: setSkin: (skin: string) =\> void

### Parameters

- `skin` - (required) *string* - 皮肤名称。可用选项包括:"terrace"、"dark"、"material"、"contrast-white"、"contrast-black"、"meadow"、"skyblue"、"broadway"

### Example

~~~jsx
gantt.setSkin("dark");
~~~

### Related samples
- [Dark skin](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)

### Details

在 gantt 初始化后调用此方法，会触发 [render](api/method/render.md) 方法的执行。

如果在初始化之前使用，效果等同于直接设置 `gantt.skin` 属性:

~~~js
gantt.skin = "dark";
~~~

### Related Guides
- [皮肤（Skins）](guides/skins.md)

### Change log
- v9.0 版本新增

