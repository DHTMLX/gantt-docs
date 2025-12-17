---
sidebar_label: onBeforeMultiSelect
title: onBeforeMultiSelect event
description: "Срабатывает непосредственно перед выбором одной или нескольких задач"
---

# onBeforeMultiSelect

### Description

@short: Срабатывает непосредственно перед выбором одной или нескольких задач

@signature: onBeforeMultiSelect: (e: Event) =\> void;

### Parameters

- `e` - (required) *Event* - родной объект события

### Example

~~~jsx
gantt.attachEvent("onBeforeMultiSelect", function(e){
    // логика здесь
    return true;
});
~~~

### Details

:::note
 Это событие является частью расширения **multiselect**, поэтому убедитесь, что плагин [multiselect](guides/extensions-list.md#multitaskselection) включен. Для получения дополнительной информации ознакомьтесь со статьей [Множественный выбор задач](guides/multiselection.md). 
:::


Это событие можно заблокировать - возвращение *false* предотвратит множественный выбор задач.

### Related API
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Множественный выбор задач](guides/multiselection.md#apievents)

