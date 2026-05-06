---
sidebar_label: scale_offset_minimal
title: scale_offset_minimal config
description: "sets the minimal scale unit (in case multiple scales are used) as the interval of the leading/closing empty space"
---

# scale_offset_minimal

### Description

@short: Устанавливает минимальную единицу масштаба (на случай использования нескольких шкал) как интервал начального и конечного пустого пространства

@signature: scale_offset_minimal: boolean

### Example

~~~jsx
gantt.config.scale_offset_minimal = false;
~~~

**Значение по умолчанию:** true

### Details

Если интервал шкалы не задан строго (опции [start_date](api/config/start_date.md), [end_date](api/config/end_date.md)), dhtmlxGantt рассчитывает его на основе дат самых ранних и самых поздних задач. 
Кроме того, он добавляет пустой интервал в начале и в конце шкалы. По умолчанию этот 'пустой' интервал равен минимальной единице используемых шкал (если используется несколько шкал). 

Если вы отключите опцию, dhtmlxGantt добавит пустой интервал, равный значению свойства **unit** у опции [scales](api/config/scales.md).