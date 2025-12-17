---
sidebar_label: getState
title: getState method
description: "получает текущий статус диаграммы Ганта"
---

# getState

### Description

@short: Получает текущий статус диаграммы Ганта

@signature: getState: () =\> GanttUIState

### Returns
- ` obj` - (GanttUIState) - объект состояния

### Example

~~~jsx
const opened_task = gantt.getState().lightbox;
~~~
