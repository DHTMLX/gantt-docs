---
sidebar_label: onMultiSelect
title: onMultiSelect событие
description: "срабатывает после завершения выбора задачи или диапазона задач"
---

# onMultiSelect

### Description

@short: Срабатывает после завершения выбора задачи или диапазона задач

@signature: onMultiSelect: (e: Event) =\> void;

### Parameters

- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
gantt.attachEvent("onMultiSelect", function(e){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

:::note
Это событие определяется в расширении **multiselect**, поэтому нужно активировать плагин [multiselect](guides/extensions-list.md#multitaskselection). Прочитайте детали в статье [Multi-Task Selection](guides/multiselection.md). 
:::

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#apievents)