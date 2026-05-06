---
sidebar_label: addMarker
title: addMarker 方法
description: "向时间线区域添加一个标记"
---

# addMarker

### Description

@short: 向时间线区域添加一个标记

@signature: addMarker: (marker: MarkerConfig) =\> number | string

### Parameters

- `marker` - (required) *MarkerConfig* - 标记的配置对象

### Returns
- `markerId` - (number|string) - 可选，标记的 id

### Example

~~~jsx
const dateToString = gantt.date.date_to_str(gantt.config.task_date);
const markerId = gantt.addMarker({
    start_date: new Date(),
    css: "today",
    title: dateToString(new Date())
});

setInterval(() => {
    const marker = gantt.getMarker(markerId);
    marker.start_date = new Date();
    marker.title = dateToString(marker.start_date);
    gantt.updateMarker(markerId);
}, 1000 * 60);
~~~

### Related samples
- [Gantt 中的 Today 与 Status 线（竖直标记）](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
此方法在 **marker** 扩展中定义，因此需要启用该 [marker](guides/extensions-list.md#vertical-marker) 插件。请阅读 [Adding Vertical Markers](guides/markers.md) 文章中的详细信息。
:::

配置对象具有以下属性：

- **id?** - (*string | number*) - 标记的 id
- **start_date** - (*Date*) - 设置标记起始日期的 Date 对象
- **end_date?** - (*Date*) - 设置标记结束日期的 Date 对象
- **css?** - (*string*) - 应用于标记的 CSS 类
- **text?** - (*string | number*) - 标记标题
- **title?** - (*string | number*) - 标记的 tooltip

### Related API
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Adding Vertical Markers](guides/markers.md)