---
sidebar_label: fit_tasks
title: fit_tasks config
description: "сообщает Gantt chart автоматически подстраивать временную шкалу под все отображаемые задачи"
---

# fit_tasks

### Description

@short: Сообщает Gantt chart автоматически подстраивать временную шкалу под все отображаемые задачи

@signature: fit_tasks: boolean

### Example

~~~jsx
gantt.config.fit_tasks = true; /*!*/
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto resize scale](https://docs.dhtmlx.com/gantt/samples/03_scales/08_scale_autoconfig.html)

### Details

По умолчанию dhtmlxGantt не расширяет временную шкалу автоматически, если задача выходит за пределы текущего интервала. Такая ситуация может возникнуть, когда пользователь изменяет даты задачи или после автопланирования. 
В результате, полоса задачи может быть обрезана или стать невидимой.

Чтобы временная шкала обновлялась каждый раз, когда задача не помещается в текущий интервал, установите свойство [fit_tasks](api/config/fit_tasks.md) в *true*.

Учтите, что это поведение может быть переопределено настройками [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md), которые ограничивают временную шкалу определёнными границами.

Если вы хотите, чтобы временная шкала динамически подстраивалась под диапазон дат, вы можете либо не задавать настройки [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md), либо [обрабатывать диапазон времени динамически](guides/configuring-time-scale.md#range).

<br>

**Например, изначальная длительность задачи "Project #2" составляет 6 дней.**

![property_fit_tasks_01](/img/property_fit_tasks_01.png)

Если длительность увеличивается до 8 дней, Gantt chart отреагирует по-разному в зависимости от значения свойства [fit_tasks](api/config/fit_tasks.md):


- **gantt.config.fit_tasks = false;** (значение по умолчанию)

![property_fit_tasks_02](/img/property_fit_tasks_02.png)

- **gantt.config.fit_tasks = true;** 

![property_fit_tasks_03](/img/property_fit_tasks_03.png)

### Related API
- [onScaleAdjusted](api/event/onscaleadjusted.md)
- [end_date](api/config/end_date.md)
- [start_date](api/config/start_date.md)
- [init](api/method/init.md)

