---
sidebar_label: autoscroll
title: autoscroll config
description: "позволяет диаграмме Ганта автоматически прокручивать содержимое при перетаскивании задачи или связи за пределы видимой области браузера"
---

# autoscroll

### Description

@short: Позволяет диаграмме Ганта автоматически прокручивать содержимое при перетаскивании задачи или связи за пределы видимой области браузера

@signature: autoscroll: boolean

### Example

~~~jsx
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Working with 30000 tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)

### Details

До версии 7.1.11 для включения функции **autoscroll** необходимо было использовать [зарезервированные views и их специфические ID для scrollbars](guides/layout-config.md#requiredviewsandsettings).

~~~js
// горизонтальная scrollbar:
{view: "scrollbar", id: "scrollHor"}
// вертикальная scrollbar:
{view: "scrollbar", id: "scrollVer"}
~~~

Использование других ID приведёт к отображению scrollbars, но функциональность autoscroll работать корректно не будет.

Начиная с версии 7.1.11, scrollbars могут иметь любые имена без влияния на autoscroll.

### Related API
- [autoscroll_speed](api/config/autoscroll_speed.md)

### Change log
- добавлено в версии 4.2

