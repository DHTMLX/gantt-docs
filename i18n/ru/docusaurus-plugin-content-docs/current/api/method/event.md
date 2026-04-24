---
sidebar_label: event
title: event method
description: "привязывает обработчик события к элементу HTML"
---

# event

### Description

@short: Привязывает обработчик события к элементу HTML

@signature: event: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (обязательно) *HTMLElement | string* -  HTML-элемент или его id
- `event` - (обязательно) *string* - имя HTML-события (без префикса 'on')
- `handler` - (обязательно) *function* -  обработчик события
- `options` - (необязательно) *boolean | HandlerSettings* - необязательное значение, представляющее либо параметр useCapture, либо параметр options. Подробнее

### Example

~~~jsx
// adds a handler for the 'onclick' event
gantt.event("divId", "click", function(event){
    // e - DOM event object
    do_something();
}, options);
~~~

### Details

Все обработчики событий, привязанные с использованием [event](api/method/event.md), будут автоматически отсоединены, когда будет вызван [destructor](api/method/destructor.md).

### Related API
- [eventRemove](api/method/eventremove.md)

### Related Guides
- [Обработка событий](guides/handling-events.md)

### Change log
- добавлено в версии 4.0