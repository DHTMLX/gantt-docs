---
sidebar_label: event
title: event method
description: "устанавливает обработчик события на HTML элемент"
---

# event

### Description

@short: Устанавливает обработчик события на HTML элемент

@signature: event: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (required) *HTMLElement | string* -            HTML элемент или его id
- `event` - (required) *string* - имя события (без префикса 'on')
- `handler` - (required) *function* - функция для обработки события
- `options` - (options) *boolean| HandlerSettings* -                 необязательно, значение параметра <i>useCapture</i> или <i>options</i>. [Подробнее](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

### Example

~~~jsx
// добавляет обработчик для события 'onclick'
gantt.event("divId", "click", function(event){
    // e - объект DOM события
    do_something();
}, options);
~~~

### Details

Все слушатели событий, добавленные через [event](api/method/event.md), будут автоматически удалены при вызове [destructor](api/method/destructor.md).

### Related API
- [eventRemove](api/method/eventremove.md)

### Related Guides
- [Обработка событий](guides/handling-events.md)

### Change log
- добавлено в версии 4.0

