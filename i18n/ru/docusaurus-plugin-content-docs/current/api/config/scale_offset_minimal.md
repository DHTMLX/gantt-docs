---
sidebar_label: scale_offset_minimal
title: scale_offset_minimal config
description: "управляет использованием минимальной единицы шкалы (при использовании нескольких шкал) в качестве размера ведущего и завершающего пустого пространства"
---

# scale_offset_minimal

### Description

@short: Управляет использованием минимальной единицы шкалы (при использовании нескольких шкал) в качестве размера ведущего и завершающего пустого пространства

@signature: scale_offset_minimal: boolean

### Example

~~~jsx
gantt.config.scale_offset_minimal = false;
~~~

**Default value:** true

### Details

Когда интервал шкалы явно не задан (с помощью опций [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md)), dhtmlxGantt определяет его на основе самых ранних и поздних дат задач. Также добавляется пустой интервал в начале и в конце шкалы. По умолчанию этот пустой интервал соответствует наименьшей единице среди используемых шкал (если применено несколько шкал).

Если эта опция выключена, dhtmlxGantt добавит пустой интервал, основанный на свойстве **unit**, определённом в опции [scales](api/config/scales.md).

