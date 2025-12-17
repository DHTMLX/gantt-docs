---
sidebar_label: destructor
title: destructor method
description: "очищает экземпляр gantt"
---

# destructor

### Description

@short: Очищает экземпляр gantt

@signature: destructor: () =\> void

### Example

~~~jsx
const myGantt = Gantt.getGanttInstance();

//удаление экземпляра gantt
myGantt.destructor();
~~~

### Details

Этот метод очищает экземпляр gantt и вызывает событие [onDestroy](api/event/ondestroy.md).

При вызове destructor будут выполнены следующие действия:

- очищены все данные, загруженные в экземпляр gantt
- удалён [dataProcessor](api/method/dataprocessor.md), если он был связан с gantt
- gantt будет отсоединён от DOM
- удалены все DOM обработчики событий, добавленные через метод [event](api/method/event.md)

:::note

Если вы используете пакет, который не поддерживает несколько экземпляров gantt (например, GPL или Individual edition), вызов destructor сделает gantt недоступным до перезагрузки страницы.
 
:::

### Related API
- [onDestroy](api/event/ondestroy.md)

### Related Guides
- [Несколько диаграмм Gantt на одной странице](guides/multiple-gantts.md#destructorofganttanddataprocessorinstances)

### Change log
- добавлено в версии 5.1

