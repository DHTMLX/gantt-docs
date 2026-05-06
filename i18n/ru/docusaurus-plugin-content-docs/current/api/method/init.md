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

- `container` - (required) *string* - | HTMLElement        HTML-контейнер (или его id), в котором будет инициализирован объект dhtmlxGantt

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
gantt.load("tasks.json");
~~~

### Details

Использование второго и третьего параметров метода — эффективный способ задать границы временного масштаба:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

Обратите внимание, что параметры дат метода `gantt.init` являются краткими формами конфигураций [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md). Два приведённых ниже фрагмента кода эквивалентны друг другу:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

и

~~~js
gantt.config.start_date = new Date(2023, 08, 10);
gantt.config.end_date = new Date(2023, 08, 20);
gantt.init("gantt_here");
~~~

Что делают эти конфигурации — они задают и ограничивают отображаемый диапазон дат. Задачи, выходящие за пределы указанного диапазона, не будут отображаться.

Использование параметров дат метода `gantt.init`, а также конфигураций [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md) отменят настройку [fit_tasks](api/config/fit_tasks.md).

If you want the time scale to be dynamically adjusted according to the date range, you can either skip these parameters or [manage the time range dynamically](guides/configuring-time-scale.md#range).

:::note
Этот метод сбрасывает пользовательские слои, добавленные на область временной шкалы с помощью методов [addTaskLayer](api/method/addtasklayer.md) и [addLinkLayer](api/method/addlinklayer.md). Поэтому после вызова метода **gantt.init** необходимо заново определить эти слои, чтобы пользовательские слои отображались на странице.
:::

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)
- [fit_tasks](api/config/fit_tasks.md)

### Related Guides
- [dhtmlxGantt в Plain JS/HTML](guides/initializing-gantt-chart.md)