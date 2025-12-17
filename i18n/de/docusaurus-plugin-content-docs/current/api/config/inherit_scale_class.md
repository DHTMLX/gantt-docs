---
sidebar_label: inherit_scale_class
title: inherit_scale_class config
description: "Steuert, ob Sub-Skalen standardmäßig die scale_cell_class Vorlage verwenden"
---

# inherit_scale_class

### Description

@short: Steuert, ob Sub-Skalen standardmäßig die scale_cell_class Vorlage verwenden

@signature: inherit_scale_class: boolean

### Example

~~~jsx
gantt.config.inherit_scale_class=true;
gantt.init("gantt_here");
~~~

**Default value:** false

### Details

Diese Option wurde in Version 3.2 eingeführt. <br>
Davor verwendeten Sub-Skalen standardmäßig immer die [scale_cell_class](api/template/scale_cell_class.md) Vorlage. Wenn diese Option auf 'true' gesetzt wird, wird dieses vorherige Verhalten wiederhergestellt.

### Related API
- [scale_cell_class](api/template/scale_cell_class.md)

