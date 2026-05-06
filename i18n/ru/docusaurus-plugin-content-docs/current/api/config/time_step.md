---
sidebar_label: time_step
title: time_step конфигурация
description: "задает минимальный шаг (в минутах) для значений времени задачи"
---

# time_step

### Description

@short: Устанавливает минимальный шаг (в минутах) для значений времени задачи

@signature: time_step: number

### Example

~~~jsx
gantt.config.time_step = 15;
...
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** 60

### Details

- Начальное и конечное время задачи будут принимать значения, кратные шагу времени, т.е. если *time_step = 20*, задача может начинаться только с: 0, 20, 40 минут и т.д.
- Панель выбора времени в lightbox будет иметь такой же шаг времени.

:::note
Примечание: Если вы хотите перетащить задачу с шагом, установленным через свойство **time_step**, необходимо установить конфигурацию [round_dnd_dates](api/config/round_dnd_dates.md) в *false*.
~~~js
gantt.config.round_dnd_dates = false;
~~~

:::note
пример: [Gantt. Drag'n'drop задач с минимальным шагом](https://snippet.dhtmlx.com/bd7ir3w7)
:::

### Related API
- [round_dnd_dates](api/config/round_dnd_dates.md)