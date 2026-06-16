---
sidebar_label: destructor
title: destructor method
description: "уничтожает экземпляр gantt"
---

# destructor

### Description

@short: Уничтожает экземпляр gantt

@signature: destructor: () =\> void

### Example

~~~jsx
const myGantt = Gantt.getGanttInstance();

//удаление экземпляра gantt
myGantt.destructor();
~~~

### Details

Метод destructor уничтожает экземпляр gantt и вызывает событие [onDestroy](api/event/ondestroy.md).

Вызов destructor приведёт к:

- очистке данных, загруженных в экземпляр gantt
- удалению [dataProcessor](api/method/dataprocessor.md) (если он прикреплён к gantt)
- отсоединению gantt от DOM
- отсоединению всех DOM-событий, привязанных через методы [event](api/method/event.md) и [attachEvent](api/method/attachevent.md)

:::note
Начиная с версии v10, во всех редакциях поддерживаются несколько экземпляров Gantt (бесплатное Community edition и PRO-издания). В устаревших версиях, которые не позволяют создавать несколько экземпляров (GPL-издание в v9.x и ранее, или коммерческая сборка с одним доменом), вызов destructor сделает gantt недоступным до перезагрузки страницы.
:::

### Related API
- [onDestroy](api/event/ondestroy.md)

### Related Guides
- [Multiple Charts on a Page](guides/multiple-gantts.md)

### Change log
- добавлено в версии 5.1