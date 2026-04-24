---
sidebar_label: layer_attribute
title: layer_attribute config
description: "legt den Namen des Attributs des DOM-Elements der Aufgaben-Ebene fest"
---

# layer_attribute

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Legt den Namen des Attributs des DOM-Elements der Aufgaben-Ebene fest

@signature: layer_attribute: string

### Example

~~~jsx
gantt.config.layer_attribute = "tasklayer";
~~~

**Standardwert:** "data-layer"

### Related samples
- [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


### Related API
- [addTaskLayer](api/method/addtasklayer.md)