---
sidebar_label: eventRemove
title: eventRemove method
description: "удаляет обработчик события из элемента HTML"
---

# eventRemove

### Description

@short: Удаляет обработчик события из элемента HTML

@signature: eventRemove: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) => void

### Parameters

- `node` - (required) *HTMLElement | string* -  the HTML node or its id
- `event` - (required) *string* - имя HTML-события (без префикса 'on')
- `handler` - (required) *function* - обработчик события
- `options` - (optional) *boolean | HandlerSettings* - необязательный, значение параметра useCapture или options. См. детали

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

Все обработчики событий, подключенные с использованием [event](api/method/event.md) будут автоматически отсоединены при вызове [destructor](api/method/destructor.md).

### Related API
- [event](api/method/event.md)

### Related Guides
- [Event Handling](guides/handling-events.md)

### Change log
- добавлено в версии 4.0