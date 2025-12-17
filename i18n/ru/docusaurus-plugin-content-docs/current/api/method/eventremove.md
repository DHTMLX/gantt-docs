---
sidebar_label: eventRemove
title: eventRemove method
description: "удаляет обработчик события с указанного HTML-элемента"
---

# eventRemove

### Description

@short: Удаляет обработчик события с указанного HTML-элемента

@signature: eventRemove: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (required) *HTMLElement | string* -            HTML-элемент или его ID
- `event` - (required) *string* - название события (без префикса 'on')
- `handler` - (required) *function* - функция, обрабатывающая событие
- `options` - (optional) *boolean | HandlerSettings* -                необязательно, либо флаг <i>useCapture</i>, либо объект <i>options</i>. [Подробнее](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)

### Example

~~~jsx
const handler = function(event){
    console.log("event!");
};
var element = document.querySelector(".my-element");

gantt.event(element, "click", handler);

gantt.eventRemove(element, "click", handler);
~~~

### Details

Любые слушатели событий, добавленные через [event](api/method/event.md), будут автоматически удалены при вызове [destructor](api/method/destructor.md).

### Related API
- [event](api/method/event.md)

### Related Guides
- [Обработка событий](guides/handling-events.md)

### Change log
- добавлено в версии 4.0

