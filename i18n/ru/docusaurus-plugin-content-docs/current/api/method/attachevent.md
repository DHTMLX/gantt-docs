---
sidebar_label: attachEvent
title: attachEvent method
description: "подключает обработчик к внутреннему событию dhtmlxGantt"
---

# attachEvent

### Description

@short: Подключает обработчик к внутреннему событию dhtmlxGantt

@signature: attachEvent: \<T extends keyof GanttEventCallback\>(event: T, handler: GanttEventCallback[T], settings?: HandlerSettings) =\> string

### Parameters

- `name` - (required) *string* - имя события, регистронезависимое
- `handler` - (required) *function* - функция-обработчик
- `settings` - (optional) *HandlerSettings* - необязательный параметр, [объект с настройками](#propertiesofsettingsobject) для обработчика события

### Returns
- `event_id` - (string) - идентификатор подключенного обработчика события

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("Вы только что кликнули по элементу с id="+id);
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

К одному событию можно подключить несколько обработчиков, и все они будут выполнены.
Если какой-либо обработчик возвращает *false*, соответствующая операция будет отменена.
Обработчики выполняются в том порядке, в котором они были подключены.

## Свойства объекта settings

Объект settings может включать следующие свойства:

- **id?** - (*string | number*) - идентификатор обработчика события.
Это позволяет легко отключить конкретный обработчик от события:

~~~js
gantt.attachEvent("onTaskClick", function(){
    console.log("task click");
}, {id: "my-click"}); /*!*/
... //позже:
gantt.detachEvent("my-click");
~~~

- **once?** - (*boolean*) - указывает, должно ли событие сработать только один раз.
Установите это в *true*, чтобы отловить только первое срабатывание события, например:

~~~js
gantt.attachEvent("onTaskClick", function(){
    console.log("capture next task click");
    return true;
}, {once: true}); /*!*/
~~~

- **thisObject?** - (*any*) - задаёт контекст `this` для слушателя события.

~~~js
gantt.attachEvent("onTaskClick", function(){
    // ...
    return true;
}, {thisObject: this}); /*!*/
~~~

### Related API
- [detachEvent](api/method/detachevent.md)

### Related Guides
- [Обработка событий](guides/handling-events.md)

