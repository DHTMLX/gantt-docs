---
sidebar_label: onBeforeMultiSelect
title: onBeforeMultiSelect event
description: "срабатывает до выбора задачи или диапазона задач"
---

# onBeforeMultiSelect

### Description

@short: Срабатывает до выбора задачи или диапазона задач

@signature: onBeforeMultiSelect: (e: Event) =\> void;

### Parameters

- `e` - (обязателен) *Event* - нативный объект события

### Example

~~~jsx
gantt.attachEvent("onBeforeMultiSelect", function(e){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

:::note
Это событие определяется в расширении **multiselect**, поэтому вам нужно активировать плагин [multiselect](guides/extensions-list.md#multitaskselection). Подробности см. в статье [Multi-Task Selection](guides/multiselection.md).
:::

Событие является блокируемым: возвращение *false* отменит множественный выбор задач.

### Related API
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Выбор нескольких задач](guides/multiselection.md#apievents)