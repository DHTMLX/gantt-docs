---
sidebar_label: onBeforeTaskMultiSelect
title: onBeforeTaskMultiSelect событие
description: "срабатывает до изменения состояния выбора задачи (задача будет выбрана или снята с выбора)"
---

# onBeforeTaskMultiSelect

### Description

@short: Срабатывает до изменения состояния выбора задачи (задача будет выбрана или снята с выбора)

@signature: onBeforeTaskMultiSelect: (id: string | number, state: boolean, e: Event | null) =\> void;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `state` - (required) *boolean* - true, если задача будет выбрана, false - если снята с выбора
- `e` - (required) *Event | null* - объект нативного события

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskMultiSelect", function(id, state, e){
    // любая ваша логика здесь
     return true;
});
~~~

### Details

:::note
Это событие определяется в расширении **multiselect**, поэтому вам нужно активировать плагин [multiselect](guides/extensions-list.md#multitaskselection). Подробности читайте в статье [Multi-Task Selection](guides/multiselection.md). 
:::

Событие вызывается для каждой задачи диапазона.

Событие можно блокировать: возвращение false отменяет изменение состояния выбора задачи.

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#apievents)