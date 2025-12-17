---
sidebar_label: task_end_date
title: task_end_date template
description: "控制任务结束日期在lightbox中的显示方式"
---

# task_end_date

### Description

@short: 控制任务结束日期在lightbox中的显示方式

@signature: task_end_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *日期* - 需要格式化的日期

### Returns
- ` text` - (字符串) - 将在甘特图中显示的html文本

### Example

~~~jsx
gantt.templates.task_end_date = function(date){
   return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};
~~~

### Details

## 调整包含结束日期的格式

您可以重定义此模板，以修改任务结束日期在甘特图中的显示方式，例如将结束日期包含在任务持续时间内。

例如，考虑一个从2020年4月2日开始，持续一天的任务。

默认情况下，其结束日期将显示为2020年4月3日（`03-04-2020 00:00:00`）:

- [在线演示:默认格式](https://snippet.dhtmlx.com/5/24f73d6ec)

![task_end_date_template_default](/img/task_end_date_template_default.png)

也可以将结束日期显示为2020年4月2日:

- [在线演示:包含结束日期格式](https://snippet.dhtmlx.com/t1k1rwo7)

![task_end_date_template](/img/task_end_date_template.png)

为实现此效果，请按如下方式重写 **columns** 配置:

~~~js

gantt.config.columns = [
  {name: "wbs", label: "#", width: 60, align: "center", template: gantt.getWBSCode},
  {name: "text", label: "Name", tree: true, width: 200, resize: true},
  {name: "start_date", label: "Start", width:80, align: "center", resize: true},
  {name: "end_date", label: "Finish", width:80, align: "center", resize: true},    
  {name:"add"}
];
gantt.templates.task_end_date = function(date){
   return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};

var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
   if(column === "end_date"){
     return gridDateToStr(new Date(date.valueOf() - 1)); 
   }else{
     return gridDateToStr(date); 
   }
}
gantt.init("gantt_here");

~~~

有关结束日期格式化的更多信息，请参阅[Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates)文章。

### Related API
- [task_date](api/config/task_date.md)
- [task_date](api/template/task_date.md)
- [grid_date_format](api/template/grid_date_format.md)

### Related Guides
- [Lightbox 的模板](guides/lightbox-templates.md)
- [数据加载](guides/loading.md#taskenddatedisplayampinclusiveenddates)

