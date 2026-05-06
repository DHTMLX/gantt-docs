---
sidebar_label: attachEvent
title: attachEvent метод
description: "прикрепляет обработчик к внутреннему событию dhtmlxGantt"
---

# attachEvent

### Description

@short: Прикрепляет обработчик к внутреннему событию dhtmlxGantt

@signature: attachEvent: \<T extends keyof GanttEventCallback\>(event: T, handler: GanttEventCallback[T], settings?: HandlerSettings) =\> string

### Parameters

- `name` - (required) *string* - имя события, регистронезависимо
- `handler` - (required) *function* - функция обработчика
- `settings` - (optional) *HandlerSettings* - необязательный, объект с настройками для обработчика события

### Returns
- `event_id` - (string) - идентификатор прикрепленного обработчика события

### Example

~~~jsx
gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`Вы кликнули элемент с id=${id}`);
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

Вы можете привязать несколько обработчиков к одному и тому же событию, и все они будут выполняться.
Если некоторые обработчики вернут *false*, соответствующая операция будет заблокирована.
Обработчики событий выполняются в том же порядке, в котором они были подключены.

## Свойства объекта настроек

Объект настроек может содержать следующие свойства:

- `id?` - (*string | number*) - идентификатор обработчика события.
Например, можно легко открепить обработчик от указанного события:

~~~js {3}
gantt.attachEvent("onTaskClick", () => {
    console.log("клик задачи");
}, { id: "my-click" });

 // спустя некоторое время
gantt.detachEvent("my-click");
~~~

- `once?` - (*boolean*) - определяет, будет ли событие выполнено только один раз.
Установите свойство в *true*, если хотите зафиксировать первое срабатывание события, как в:

~~~js {4}
gantt.attachEvent("onTaskClick", () => {
    console.log("зафиксировать следующий клик по задаче");
    return true;
}, { once: true });
~~~

- `thisObject?` - (*any*) - задаёт объект `this` для обработчика.

~~~js {4}
gantt.attachEvent("onTaskClick", function() {
    // ...
    return true;
}, { thisObject: this });
~~~

### Related API
- [detachEvent](api/method/detachevent.md)

### Related Guides
- [Event Handling](guides/handling-events.md)