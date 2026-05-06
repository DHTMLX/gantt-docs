---
sidebar_label: defined
title: defined method
description: "возвращает false, если переданный аргумент не определен, иначе true"
---

# defined

### Description

@short: возвращает false, если переданный аргумент неопределен, иначе true

@signature: defined: (param: any) =\> boolean

### Parameters

- `param` - (required) *any* - свойство объекта, которое следует проверить

### Returns
- ` state` - (boolean) - false, если переданный аргумент неопределен, иначе true

### Example

~~~jsx
// проверяем, существует ли свойство "custom_property" у объекта task
if(gantt.defined(task.custom_property)){
  // ..
};
~~~

### Change log
- добавлено в версии 4.0