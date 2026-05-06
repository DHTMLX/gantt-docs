---
title: "添加垂直标记"
sidebar_label: "添加垂直标记"
---

# 添加垂直标记

该库提供 **marker** 扩展，允许你标记（高亮）某些日期或日期范围。

<div style="text-align:center;">![today_marker](/img/today_marker.png)</div>

:::note
To start using the extension, enable the **marker** plugin using the [gantt.plugins](api/method/plugins.md) method.
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
    //your code will be here
</body>
</html>
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


## 添加标记

要向时间线区域添加标记，例如今天的标记，请调用 [addMarker](api/method/addmarker.md) 方法：

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
Note, as the value of the 'text' property, the method can take any HTML
:::


要获取已添加标记的对象，请使用 [getMarker](api/method/getmarker.md) 方法：

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({  /*!*/
    start_date: new Date(), 
    css: "today", 
    text: "Now", 
    title: dateToStr(new Date()) 
});
gantt.getMarker(markerId); //->{css:"today", text:"Now", id:...}
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)


## 删除标记

要删除已添加的标记，请使用 [deleteMarker](api/method/deletemarker.md) 方法：

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

要隐藏所有已添加的标记，将 [show_markers](api/config/show_markers.md) 配置选项设置为 'false'：

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false;// hides all 3 markers
~~~

## 更新标记

要更新标记，请使用 [updateMarker](api/method/updatemarker.md) 方法：

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

要更新所有已添加的标记，请使用 [renderMarkers](api/method/rendermarkers.md) 方法：

~~~js
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.renderMarkers(); /*!*/
~~~

## 标记样式

要为标记设定样式，请使用 [gantt.templates.marker_class](api/template/marker_class.md) 模板：

~~~js
var showAdvancedMarkers;
gantt.templates.marker_class = function(marker){
    if (showAdvancedMarkers)
    return "advanced_marker";
    return "hidden";
}
~~~

## 今天的标记

让我们设想你希望在你的 Gantt 图中显示今天的标记。在这种情况下，你需要两者：在页面上添加一个标记，并提供一个函数以便时间变化时移动该标记。你可以通过以下代码实现：

~~~js
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);

var id = gantt.addMarker({ 
    start_date: new Date(), 
    css: "today", 
    title:dateToStr(new Date())
});
setInterval(function(){
    var today = gantt.getMarker(id);
    today.start_date = new Date();
    today.title = date_to_str(today.start_date);
    gantt.updateMarker(id);
}, 1000*60);
~~~

[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)