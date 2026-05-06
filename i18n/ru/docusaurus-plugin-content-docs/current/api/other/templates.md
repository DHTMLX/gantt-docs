---
sidebar_label: templates
title: templates config
description: "настраивает форматирующие templates для дат, заголовков и тултипов в диаграмме Ганта"
---

# templates

### Description
@short: Определяет форматы шаблонов для дат, заголовков и подсказок в диаграмме Ганта

@signature: templates: GanttTemplates

### Example

~~~jsx
//определяет, как дата отображается в колонке 'Start Time' таблицы
gantt.templates.date_grid = function(date){
    return gantt.date.str_to_date(gantt.config.date_grid);
};
~~~

### Details

Свойства объекта **templates** описаны в отдельной главе на главной странице API: «Gantt API: Templates».