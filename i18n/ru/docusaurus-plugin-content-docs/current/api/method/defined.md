---
sidebar_label: defined
title: defined method
description: "возвращает false, если переданный аргумент undefined, и true в противном случае"
---

# defined

### Description

@short: Возвращает false, если переданный аргумент undefined, и true в противном случае

@signature: defined: (param: any) =\> boolean

### Parameters

- `param` - (required) *any* - свойство объекта, которое нужно проверить

### Returns
- ` state` - (boolean) - false, если аргумент undefined, true, если он имеет значение

### Example

~~~jsx
// проверяем, существует ли свойство "custom_property" у объекта task
if(gantt.defined(task.custom_property)){
  // ..
};
~~~

### Change log
- added in version 4.0
