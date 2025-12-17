---
sidebar_label: clearAll
title: clearAll method
description: "удаляет все задачи и дополнительные элементы (например, маркеры) из Gantt chart"
---

# clearAll

### Description

@short: Удаляет все задачи и дополнительные элементы (например, маркеры) из Gantt chart

@signature: clearAll: () =\> void

### Example

~~~jsx
// перезагружает данные в Gantt chart
gantt.load("url1");

gantt.clearAll(); /*!*/
gantt.load("url2");/*!*/
~~~

### Details

Имейте в виду, что этот метод вызывает событие [onClear](api/event/onclear.md).

### Related API
- [onClear](api/event/onclear.md)

### Related Guides
- [Базовые операции с задачами](guides/crud-task.md)

