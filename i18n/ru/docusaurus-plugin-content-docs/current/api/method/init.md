---
sidebar_label: init
title: init method
description: "инициализирует dhtmlxGantt внутри контейнера"
---

# init

### Description

@short: Инициализирует dhtmlxGantt внутри контейнера

@signature: init: (container: string | HTMLElement, from?: Date, to?: Date) =\> void

### Parameters

- `container` - (required) *string | HTMLElement* - HTML-контейнер (или его id), в котором будет инициализирован объект dhtmlxGantt

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
gantt.load("tasks.json");
~~~

### Details

Использование второго и третьего параметров `init()` — надёжный способ задать границы отображаемой временной шкалы:

~~~js
gantt.init("gantt_here", new Date(2027, 8, 10), new Date(2027, 8, 20));
~~~

Обратите внимание, что параметры даты в `init()` являются сокращениями для конфигураций [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md).
Два приведённых ниже примера кода эквивалентны друг другу:

~~~js
gantt.init("gantt_here", new Date(2027, 8, 10), new Date(2027, 8, 20));
~~~

и

~~~js
gantt.config.start_date = new Date(2027, 8, 10);
gantt.config.end_date = new Date(2027, 8, 20);
gantt.init("gantt_here");
~~~

Что делают эти конфигурации — они задают и ограничивают отображаемый диапазон дат. Задачи, выходящие за пределы указанного диапазона, не будут отображаться.

Использование параметров даты в `init()`, а также конфигураций [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md) отменяет настройку [fit_tasks](api/config/fit_tasks.md).

Если вы хотите, чтобы временная шкала динамически подстраивалась под диапазон дат, можно либо пропускать эти параметры, либо [управлять диапазоном времени динамически](guides/configuring-time-scale.md#range).

:::note
Этот метод сбрасывает пользовательские слои, добавленные в область временной шкалы через методы [`addTaskLayer()`](api/method/addtasklayer.md) и [`addLinkLayer()`](api/method/addlinklayer.md). Поэтому после вызова `init()` необходимо заново определить их, чтобы пользовательские слои отображались на странице.
:::

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)
- [fit_tasks](api/config/fit_tasks.md)

### Related Guides
- [dhtmlxGantt в Plain JS/HTML](guides/initializing-gantt-chart.md)