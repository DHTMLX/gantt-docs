---
sidebar_label: onTaskMultiSelect
title: onTaskMultiSelect event
description: "срабатывает при изменении статуса выбора задачи (когда задача выбирается или снимается выбор)"
---

# onTaskMultiSelect

### Description

@short: Срабатывает при изменении статуса выбора задачи (когда задача выбирается или снимается выбор)

@signature: onTaskMultiSelect: (id: string | number, state: boolean, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `state` - (required) *boolean* - true, если задача выбрана, false, если выбор снят
- `e` - (required) *Event* - объект нативного события

### Example

~~~jsx
gantt.attachEvent("onTaskMultiSelect", function(id, state, e){
    // некоторая логика здесь
});
~~~

### Details

:::note
 Это событие относится к расширению **multiselect**, поэтому убедитесь, что плагин [multiselect](guides/extensions-list.md#multitaskselection) включен. Дополнительную информацию можно найти в статье [Множественный выбор задач](guides/multiselection.md). 
:::


Это событие срабатывает для каждой задачи в пределах выбранного диапазона.

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Множественный выбор задач](guides/multiselection.md#apievents)

