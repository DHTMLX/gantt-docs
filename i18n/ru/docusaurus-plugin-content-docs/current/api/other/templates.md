---
sidebar_label: templates
title: templates config
description: "настраивает форматирующие templates для дат, заголовков и тултипов в диаграмме Ганта"
---

# templates

### Description

@short: Настраивает форматирующие templates для дат, заголовков и тултипов в диаграмме Ганта

@signature: templates: GanttTemplates

### Example

~~~jsx
//определяет, как дата отображается в колонке 'Start Time' таблицы
gantt.templates.date_grid = function(date){
    return gantt.date.str_to_date(gantt.config.date_grid);
};
~~~

### Details

Подробная информация об объекте **templates** доступна в отдельном разделе на <br>
главной странице API ["Gantt API: Templates"](api/overview/properties-overview.md).
