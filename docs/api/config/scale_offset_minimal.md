---
sidebar_label: scale_offset_minimal
title: scale_offset_minimal config
description: "sets the minimal scale unit (in case multiple scales are used) as the interval of the leading/closing empty space"
---

# scale_offset_minimal

### Description

@short: Sets the minimal scale unit (in case multiple scales are used) as the interval of the leading/closing empty space

@signature: scale_offset_minimal: boolean

### Example

~~~jsx
gantt.config.scale_offset_minimal = false;
~~~

**Default value:** true

### Details

If the scale interval is not strictly specified (by the [start_date](api/config/start_date.md), [end_date](api/config/end_date.md) options), dhtmlxGantt calculates it based on the dates of the earliest and latest tasks. 
Plus, it adds an empty interval to the beginning and the end of the scale. By default, this 'empty' interval is equal to the minimum unit of the used scales (in case multiple scales are used). 

If you disable the option, dhtmlxGantt will add an empty interval equal to the value of the **unit** property of the [scales](api/config/scales.md) option.

