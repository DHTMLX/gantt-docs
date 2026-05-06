---
sidebar_label: fit_tasks
title: Конфигурация fit_tasks
description: "Диаграмма Ганта автоматически расширяет шкалу времени, чтобы поместить все отображаемые задачи"
---

# fit_tasks

### Description

@short: Диаграмма Ганта автоматически расширяет шкалу времени, чтобы поместить все отображаемые задачи

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

По умолчанию dhtmlxGantt не автоматически расширяет шкалу времени, если какая-то задача больше не помещается в текущий диапазон. Это может произойти, когда пользователь устанавливает дату задачи или после автоматического планирования. В таком случае полоса задачи может быть усечена или вовсе не отображаться.

Чтобы принудительно выполнить повторную отрисовку шкалы каждый раз, когда задача не помещается в существующий диапазон шкалы, установите свойство [fit_tasks](api/config/fit_tasks.md) в *true*.

Эта настройка может быть отменена конфигурациями [start_date] и [end_date], которые ограничат шкалу времени указанными границами.

Если вы хотите, чтобы шкала времени динамически подстраивалась под диапазон дат, вы можете либо пропустить конфигурации [start_date] и [end_date], либо [управлять диапазоном времени динамически](guides/configuring-time-scale.md#range).

**Например, исходная длительность задачи "Project #2" составляет 6 дней.**

![property_fit_tasks_01](/img/property_fit_tasks_01.png)


Если пользователь увеличит длительность до 8 дней, диаграмма Ганта будет вести себя по-разному в зависимости от значения свойства [fit_tasks](api/config/fit_tasks.md):

- **gantt.config.fit_tasks = false;** (значение по умолчанию)

![property_fit_tasks_02](/img/property_fit_tasks_02.png)

- **gantt.config.fit_tasks = true;**
![property_fit_tasks_03](/img/property_fit_tasks_03.png)


### Related API
- [onScaleAdjusted](api/event/onscaleadjusted.md)
- [end_date](api/config/end_date.md)
- [start_date](api/config/start_date.md)
- [init](api/method/init.md)