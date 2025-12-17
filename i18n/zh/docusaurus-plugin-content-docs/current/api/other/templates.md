---
sidebar_label: templates
title: templates config
description: "设置甘特图中日期、标题和tooltip的格式化templates"
---

# templates

### Description

@short: 设置甘特图中日期、标题和tooltip的格式化templates

@signature: templates: GanttTemplates

### Example

~~~jsx
//定义表格中“开始时间”列显示日期的方式
gantt.templates.date_grid = function(date){
    return gantt.date.str_to_date(gantt.config.date_grid);
};
~~~

### Details

有关**templates**对象的详细信息，请参阅主API页面中专门的章节<br> 
["Gantt API: Templates"](api/api-overview.md#templates)。
