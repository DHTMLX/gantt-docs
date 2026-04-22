---
sidebar_label: clearAll
title: clearAll метод
description: "удаляет все задачи и дополнительные элементы (включая маркеры) из диаграммы Ганта"
---

# clearAll

### Description

@short: Удаляет все задачи и дополнительные элементы (включая маркеры) из диаграммы Ганта

@signature: clearAll: () => void

### Example

~~~jsx
// reloads data in the Gantt chart
gantt.load("url1");

gantt.clearAll(); /*!*/
gantt.load("url2");/*!*/
~~~

### Details

Примечание: метод вызывает событие [onClear](api/event/onclear.md).

### Related API
- [onClear](api/event/onclear.md)

### Related Guides
- [Основные операции с задачами](guides/crud-task.md)