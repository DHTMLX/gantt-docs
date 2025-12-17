---
sidebar_label: setSkin
title: setSkin method
description: "sets the active skin"
---

# setSkin

### Description

@short: Sets the active skin

@signature: setSkin: (skin: string) =\> void

### Parameters

- `skin` - (required) *string* - the name of the skin. The allowed values are: "terrace", "dark", "material", "contrast-white", "contrast-black", "meadow", "skyblue", "broadway"

### Example

~~~jsx
gantt.setSkin("dark");
~~~

### Related samples
- [Dark skin](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)

### Details

If the method is called after a gantt is initialized, it will trigger the [render](api/method/render.md) method. 

If called before initialization, the method will have the same effect as the assignment of the `gantt.skin` property:

~~~js
gantt.skin = "dark";
~~~

### Related Guides
- [Skins](guides/skins.md)

### Change log
- added in v9.0

