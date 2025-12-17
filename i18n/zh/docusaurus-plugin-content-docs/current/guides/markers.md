---
title: "添加垂直标记"
sidebar_label: "添加垂直标记"
---

添加垂直标记
=========================================================

该库包含了 **marker** 扩展，可以让你在时间轴上高亮显示特定的日期或日期区间。

<div style="text-align:center;">![today_marker](/img/today_marker.png)</div>

:::note
要开始使用此扩展，请通过调用 [gantt.plugins](api/method/plugins.md) 方法启用 **marker** 插件。
:::

~~~js
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
</head>
<body>
    gantt.plugins({ /*!*/
        marker: true /*!*/
    }); /*!*/
    //你的代码将在这里编写
</body>
</html>
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


## 添加标记

要在时间轴上添加一个标记，比如显示今天日期的标记，可以使用 [addMarker](api/method/addmarker.md) 方法:

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({
    start_date: new Date(), // 指定标记日期的 Date 对象
    css: "today", // 应用于标记的 CSS 类
    text: "Now", // 标记标签
    title: dateToStr(new Date()) // 标记的提示文本
});
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


:::note
请注意，'text' 属性可以接受任意 HTML 内容。
:::

要获取已添加标记的对象，可以使用 [getMarker](api/method/getmarker.md) 方法:

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({  /*!*/
    start_date: new Date(), 
    css: "today", 
    text: "Now", 
    title: dateToStr(new Date()) 
});
gantt.getMarker(markerId); // 返回 {css:"today", text:"Now", id:...}
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


## 移除标记

要删除之前添加的标记，请使用 [deleteMarker](api/method/deletemarker.md) 方法:

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({  /*!*/
    start_date: new Date(), 
    css: "today", 
    text: "Now", 
    title: dateToStr(new Date()) 
});

gantt.deleteMarker(markerId); /*!*/
~~~

## 隐藏标记

如果需要隐藏所有已添加的标记，可以将 [show_markers](api/config/show_markers.md) 选项设置为 'false':

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false; // 隐藏所有 3 个标记
~~~

## 更新标记

如需修改某个标记，请使用 [updateMarker](api/method/updatemarker.md) 方法:

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({  /*!*/
    start_date: new Date(), 
    css: "today", 
    text: "Now", 
    title: dateToStr(new Date()) 
});

gantt.getMarker(markerId).css = "today_new";
gantt.updateMarker(markerId); /*!*/
~~~

如需一次性刷新所有标记，可以使用 [renderMarkers](api/method/rendermarkers.md) 方法:

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.renderMarkers(); /*!*/
~~~

标记样式
----------------------------

你可以通过 [gantt.templates.marker_class](api/template/marker_class.md) 模板为标记自定义样式:

~~~js
var showAdvancedMarkers;
gantt.templates.marker_class = function(marker){
    if (showAdvancedMarkers)
    return "advanced_marker";
    return "hidden";
}
~~~

今日标记
-------------------------------------

如果你希望在甘特图上显示当天的标记，需要添加标记并提供一个函数，使其随时间自动更新位置。可以参考以下代码实现:

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);

var id = gantt.addMarker({ 
    start_date: new Date(), 
    css: "today", 
    title: dateToStr(new Date())
});
setInterval(function(){
    var today = gantt.getMarker(id);
    today.start_date = new Date();
    today.title = dateToStr(today.start_date);
    gantt.updateMarker(id);
}, 1000*60);
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

