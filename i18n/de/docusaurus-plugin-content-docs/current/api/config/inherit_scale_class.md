---
sidebar_label: inherit_scale_class
title: inherit_scale_class Konfiguration
description: "Legt fest, ob Unter-Skalen standardmäßig die scale_cell_class-Template verwenden sollen"
---

# inherit_scale_class

### Description

@short: Legt fest, ob Unter-Skalen standardmäßig die scale_cell_class-Template verwenden sollen

@signature: inherit_scale_class: boolean

### Example

~~~jsx
gantt.config.inherit_scale_class=true;
gantt.init("gantt_here");
~~~

**Default value:** false

### Details

Diese Option wurde in Version 3.2 hinzugefügt.
In älteren Versionen verwendeten Unter-Skalen standardmäßig immer die [scale_cell_class](api/template/scale_cell_class.md) Template. Wenn die Option auf 'true' gesetzt wird, kehrt das alte Verhalten zurück.

### Related API
- [scale_cell_class](api/template/scale_cell_class.md)