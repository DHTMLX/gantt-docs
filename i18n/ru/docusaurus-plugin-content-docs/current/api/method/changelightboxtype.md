---
sidebar_label: changeLightboxType
title: changeLightboxType метод
description: "Перерисовывает lightbox задачи в зависимости от её типа"
---

# changeLightboxType

### Description

@short: Перерисовывает lightbox для задачи в зависимости от её типа

@signature: changeLightboxType: (type: string) =\> void

### Parameters

- `type` - (обязательный) *string* - тип задачи

### Example

~~~jsx
gantt.changeLightboxType(gantt.config.types.project);
~~~

### Details

Метод перерисовывает lightbox и, при возможности, сохраняет все введённые данные. Для перестройки структуры метод использует [конфигурацию для указанного типа](guides/default-edit-form.md).

Если тип lightbox совпадает с типом, указанным в параметре, метод не перерисовывает lightbox.

### Related API
- [onLightboxChange](api/event/onlightboxchange.md)