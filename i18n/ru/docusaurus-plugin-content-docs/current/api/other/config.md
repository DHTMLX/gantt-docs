---
sidebar_label: config
title: config
description: "определяет параметры конфигурации для дат, шкалы, элементов управления"
---

# config

### Description

@short: Определяет параметры конфигурации для дат, масштаба и элементов управления

@signature: config: GanttConfigOptions

### Example

~~~jsx
//задает формат шкалы времени
gantt.config.date_scale = "%F, %Y";
 
gantt.init("gantt_here");
~~~

### Details

Свойства объекта config описаны в отдельной главе на корневой странице API ["Gantt API: Properties"](api/overview/properties-overview.md).