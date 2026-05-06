---
sidebar_label: templates
title: templates config
description: "设置甘特图中日期、标题和tooltip的格式化templates"
---

# templates

### Description

@short: 定义甘特图中日期、标题、工具提示的格式化模板

@signature: templates: GanttTemplates

### Example

~~~jsx
//定义表格中“开始时间”列显示日期的方式
gantt.templates.date_grid = function(date){
    return gantt.date.str_to_date(gantt.config.date_grid);
};
~~~

### Details

**templates** 对象的属性在根 API 页面的单独章节中描述，参见页面 “Gantt API: Templates”。