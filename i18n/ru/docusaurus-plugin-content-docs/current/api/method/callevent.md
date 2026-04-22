---
sidebar_label: callEvent
title: callEvent method
description: "Вызывает внутреннее событие"
---

# callEvent

### Description

@short: Вызывает внутреннее событие

@signature: callEvent: (name: string, params?: any[]) =\> boolean

### Parameters

- `name` - (required) *string* - имя события, регистронезависимо
- `params` - (optional) *array* - массив связанных с событием данных

### Returns
- ` result` - (boolean) - <i>false</i>, если некоторые обработчики событий вернут <i>false</i>. В противном случае, <i>true</i>

### Example

~~~jsx
gantt.attachEvent("CustomEvent", function(param1, param2){
    return true;
});

var res = gantt.callEvent("CustomEvent", [param1, param2]);
~~~

### Details

Обычно, события вызываются автоматически, и вам не нужно использовать этот метод.