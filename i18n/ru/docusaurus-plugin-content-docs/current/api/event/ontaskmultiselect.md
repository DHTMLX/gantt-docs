---
sidebar_label: onTaskMultiSelect
title: onTaskMultiSelect event
description: "срабатывает после изменения состояния выделения задачи (задача была выбрана/снята с выделения)"
---

# onTaskMultiSelect

### Description

@short: Срабатывает после изменения состояния выделения задачи (задача была выбрана или снята с выделения)

@signature: onTaskMultiSelect: (id: string | number, state: boolean, e: Event) =\> void;

### Parameters

- `id` - (обязательный) *string | number* - идентификатор задачи
- `state` - (обязательный) *boolean* - true, если задача выбрана; false — если снята с выбора
- `e` - (обязательный) *Event* - объект нативного события

### Example

~~~jsx
gantt.attachEvent("onTaskMultiSelect", function(id, state, e){
    // любая ваша логика здесь
});
~~~

### Details

:::note
Это событие определено в расширении **multiselect**, поэтому необходимо активировать плагин [multiselect](guides/extensions-list.md#multitaskselection). Подробности читайте в статье [Multi-Task Selection](guides/multiselection.md).
:::

Событие вызывается для каждой задачи в диапазоне.

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#apievents)