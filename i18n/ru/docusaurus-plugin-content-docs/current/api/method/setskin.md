---
sidebar_label: setSkin
title: setSkin method
description: "устанавливает активный скин"
---

# setSkin

### Description

@short: Устанавливает активный скин

@signature: setSkin: (skin: string) => void

### Parameters

- `skin` - (required) *string* - имя скина. Допустимые значения: "terrace", "dark", "material", "contrast-white", "contrast-black", "meadow", "skyblue", "broadway"

### Example

~~~jsx
gantt.setSkin("dark");
~~~

### Related samples
- [Темный скин](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)

### Details

Если метод вызывается после инициализации gantt, он вызовет метод [render](api/method/render.md). 

Если вызван до инициализации, метод будет иметь тот же эффект, что и присваивание свойства `gantt.skin`:

~~~js
gantt.skin = "dark";
~~~

### Related Guides
- [Скины](guides/skins.md)

### Change log
- добавлено в версии v9.0