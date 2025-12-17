---
sidebar_label: addMarker
title: addMarker method
description: "向时间轴区域添加一个marker"
---

# addMarker

### Description

@short: 向时间轴区域添加一个marker

@signature: addMarker: (marker: MarkerConfig) =\> number | string

### Parameters

- `marker` - (required) *MarkerConfig* - marker的配置对象

### Returns
- `markerId` - (number|string) - 可选，marker的id

### Example

~~~jsx
var todayMarker = gantt.addMarker({
    start_date: new Date(),
    css: "today",
    title:date_to_str( new Date())
});
setInterval(function(){
    var today = gantt.getMarker(todayMarker);
    today.start_date = new Date();
    today.title = date_to_str(today.start_date);
    gantt.updateMarker(todayMarker);
}, 1000*60);
~~~

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
该方法属于**marker**扩展的一部分，请确保启用了[marker](guides/extensions-list.md#chuizhibiaoji)插件。更多详情请参阅[添加垂直标记](guides/markers.md)文章。 
:::


配置对象包括以下属性:

- **id?** - (*string | number*) - marker的id
- **start_date** - (*Date*) - 指定marker开始时间的Date对象
- **end_date?** - (*Date*) - 指定marker结束时间的Date对象
- **css?** - (*string*) - 用于样式化marker的CSS类
- **text?** - (*string | number*) - marker的标题文本
- **title?** - (*string | number*) - marker的tooltip文本

### Related API
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [添加垂直标记](guides/markers.md)

