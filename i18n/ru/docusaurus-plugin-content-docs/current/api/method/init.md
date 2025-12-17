---
sidebar_label: init
title: init method
description: "инициализирует dhtmlxGantt внутри указанного контейнера"
---

# init

### Description

@short: Инициализирует dhtmlxGantt внутри указанного контейнера

@signature: init: (container: string | HTMLElement, from?: Date, to?: Date) =\> void

### Parameters

- `container` - (required) *string | HTMLElement* -       HTML-контейнер (или его id), в котором будет создан dhtmlxGantt
- `from` - (optional) *Date* - начальная точка временной шкалы (ось X)
- `to` - (optional) *Date* - конечная точка временной шкалы (ось X)

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
gantt.load("tasks.json");
~~~

### Details

Передача второго и третьего аргументов в этот метод - простой способ задать границы временной шкалы:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

Учтите, что параметры даты в `gantt.init` служат сокращением для конфигураций [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md).
Два приведённых ниже примера дают одинаковый результат:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

и

~~~js
gantt.config.start_date = new Date(2023, 08, 10);
gantt.config.end_date = new Date(2023, 08, 20);
gantt.init("gantt_here");
~~~

Эти настройки определяют и ограничивают видимый диапазон дат. Задачи вне этого диапазона отображаться не будут.

Использование аргументов даты в `gantt.init` или конфигураций [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md) переопределяет опцию
[fit_tasks](api/config/fit_tasks.md).

Если вы хотите, чтобы временная шкала автоматически подстраивалась под диапазон дат, вы можете опустить эти параметры или [динамически управлять временным диапазоном](guides/configuring-time-scale.md#range).

:::note
 Этот метод сбрасывает любые пользовательские слои, добавленные в область таймлайна через методы [addTaskLayer](api/method/addtasklayer.md) и [addLinkLayer](api/method/addlinklayer.md). Поэтому после вызова **gantt.init** потребуется повторно применить эти пользовательские слои, чтобы они отображались на странице. 
:::

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)
- [fit_tasks](api/config/fit_tasks.md)

### Related Guides
- [dhtmlxGantt на чистом JS/HTML](guides/initializing-gantt-chart.md)

