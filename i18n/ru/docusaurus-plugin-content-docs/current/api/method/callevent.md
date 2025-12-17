---
sidebar_label: callEvent
title: callEvent method
description: "триггерит внутреннее событие"
---

# callEvent

### Description

@short: Триггерит внутреннее событие

@signature: callEvent: (name: string, params?: any[]) =\> boolean

### Parameters

- `name` - (required) *string* - имя события, регистр не имеет значения
- `params` - (optional) *array* - необязательно, массив с данными, связанными с событием

### Returns
- ` result` - (boolean) - <i>false</i>, если любой из обработчиков события возвращает <i>false</i>. В противном случае <i>true</i>

### Example

~~~jsx
gantt.attachEvent("CustomEvent", function(param1, param2){
    return true;
});

var res = gantt.callEvent("CustomEvent", [param1, param2]);
~~~

### Details

Обычно события вызываются автоматически, поэтому нет необходимости вызывать этот метод вручную.
