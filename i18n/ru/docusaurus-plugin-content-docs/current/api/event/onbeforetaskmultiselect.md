---
sidebar_label: onBeforeTaskMultiSelect
title: onBeforeTaskMultiSelect event
description: "Срабатывает непосредственно перед изменением состояния выбора задачи (когда задача собирается быть выбрана или снята с выбора)."
---

# onBeforeTaskMultiSelect

### Description

@short: Срабатывает непосредственно перед изменением состояния выбора задачи (когда задача собирается быть выбрана или снята с выбора).

@signature: onBeforeTaskMultiSelect: (id: string | number, state: boolean, e: Event | null) =\> void;

### Parameters

- `id` - (required) *string | number* - уникальный идентификатор задачи  
- `state` - (required) *boolean* - true, если задача будет выбрана, false - если будет снята с выбора  
- `e` - (required) *Event | null* - нативный объект события, если доступен

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskMultiSelect", function(id, state, e){  
    // добавьте вашу логику здесь  
    return true;  
});
~~~

### Details

:::note
note Это событие является частью расширения **multiselect**, поэтому убедитесь, что плагин [multiselect](guides/extensions-list.md#multitaskselection) включён. Для подробностей смотрите статью [Множественный выбор задач](guides/multiselection.md). 
::: 

Это событие вызывается для каждой задачи в диапазоне выбора. 

Изменение состояния выбора задачи можно заблокировать, вернув false, что предотвратит изменение состояния выбора задачи.

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Множественный выбор задач](guides/multiselection.md#apievents)

