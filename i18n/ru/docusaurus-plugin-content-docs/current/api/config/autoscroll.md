---
sidebar_label: autoscroll
title: autoscroll config
description: "включает автоскролл во время перетаскивания задачи или ссылки за пределы текущего экрана браузера"
---

# autoscroll

### Description

@short: Включает автоскроллинг во время перетаскивания задачи или ссылки за пределы текущего экрана браузера

@signature: autoscroll: boolean

### Example

~~~jsx
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** true


### Related samples
- [Работа с 30000 задачами](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)

### Details

Note that **up to version 7.1.11**
you need to use [зарезервированные представления и их идентификаторы для полос прокрутки](guides/layout-config.md#required-views-and-settings) while using the **autoscroll** option. 

~~~js
// horizontal scrollbar:
{view: "scrollbar", id: "scrollHor"}
// vertical scrollbar:
{view: "scrollbar", id: "scrollVer"}
~~~

If you use different names, the scrollbars will work, but the "autoscroll" functionality won't. 

Начиная с версии v7.1.11, вы можете использовать любые имена для полос прокрутки.

### Related API
- [autoscroll_speed](api/config/autoscroll_speed.md)

### Change log
- добавлено в версии 4.2