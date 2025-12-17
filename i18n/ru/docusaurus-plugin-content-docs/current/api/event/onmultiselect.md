---
sidebar_label: onMultiSelect
title: onMultiSelect event
description: "Срабатывает после завершения выбора одной или нескольких задач"
---

# onMultiSelect

### Description

@short: Срабатывает после завершения выбора одной или нескольких задач

@signature: onMultiSelect: (e: Event) =\> void;

### Parameters

- `e` - (required) *Event* - объект нативного события

### Example

~~~jsx
gantt.attachEvent("onMultiSelect", function(e){
    // некоторая логика здесь
    return true;
});
~~~

### Details

:::note
 Это событие является частью расширения **multiselect**, поэтому убедитесь, что плагин [multiselect](guides/extensions-list.md#multitaskselection) включен. Для получения дополнительной информации ознакомьтесь со статьей [Множественный выбор задач](guides/multiselection.md). 
:::

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)

### Related Guides
- [Множественный выбор задач](guides/multiselection.md#apievents)

