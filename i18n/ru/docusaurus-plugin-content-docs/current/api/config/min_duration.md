---
sidebar_label: min_duration
title: min_duration config
description: "определяет минимальную продолжительность (в миллисекундах), разрешённую для задачи при изменении её размера."
---

# min_duration

### Description

@short: Определяет минимальную продолжительность (в миллисекундах), разрешённую для задачи при изменении её размера.

@signature: min_duration: number

### Example

~~~jsx
gantt.config.min_duration = 24*60*60*1000; // (1 день)
~~~

**Default value:** 60*60*1000, или 3600000 мс, что равно 1 часу

### Details

- Эта настройка задаёт минимальный промежуток времени между датами начала и окончания задачи <b>(task.start_date - task.end_date)</b>. Она работает независимо от [настроек рабочего времени](guides/working-time.md) и [вычисления длительности](api/method/calculateduration.md).

### Related Guides
- [Перетаскивание задач на временной шкале](guides/dnd.md)

