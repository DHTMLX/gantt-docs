---
sidebar_label: setSkin
title: setSkin method
description: "изменяет активный скин"
---

# setSkin

### Description

@short: Изменяет активный скин

@signature: setSkin: (skin: string) =\> void

### Parameters

- `skin` - (required) *string* - название скина. Доступные варианты включают: "terrace", "dark", "material", "contrast-white", "contrast-black", "meadow", "skyblue", "broadway"

### Example

~~~jsx
gantt.setSkin("dark");
~~~

### Related samples
- [Dark skin](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)

### Details

Вызов этого метода после инициализации gantt приведёт к выполнению метода [render](api/method/render.md).

Если использовать его до инициализации, он работает так же, как прямое присвоение свойства `gantt.skin`:

~~~js
gantt.skin = "dark";
~~~

### Related Guides
- [Скины](guides/skins.md)

### Change log
- добавлено в версии v9.0

