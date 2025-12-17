---
sidebar_label: changeLightboxType
title: changeLightboxType method
description: "обновляет лайтбокс задачи в зависимости от её типа"
---

# changeLightboxType

### Description

@short: Обновляет лайтбокс задачи в зависимости от её типа

@signature: changeLightboxType: (type: string) =\> void

### Parameters

- `type` - (required) *string* - тип задачи

### Example

~~~jsx
gantt.changeLightboxType(gantt.config.types.project);
~~~

### Details

Этот метод обновляет лайтбокс и при возможности пытается сохранить введённые данные. Он перестраивает структуру, используя [конфигурацию для указанного типа](guides/default-edit-form.md).

Если текущий тип лайтбокса совпадает с типом, переданным в параметре, обновление не выполняется.

### Related API
- [onLightboxChange](api/event/onlightboxchange.md)

