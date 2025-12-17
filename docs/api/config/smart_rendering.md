---
sidebar_label: smart_rendering
title: smart_rendering config
description: "enables the smart rendering mode for gantt's tasks and links rendering"
---

# smart_rendering

### Description

@short: Enables the smart rendering mode for gantt's tasks and links rendering

@signature: smart_rendering: boolean

### Example

~~~jsx
gantt.config.smart_rendering = true;
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Starting from v6.2, the smart rendering is enabled by default, as it is included in the core *dhtmlxgantt.js* file. Thus, you don't need to include the *dhtmlxgantt_smart_rendering.js* file on the page to make smart rendering work.

:::note
If you connect the *dhtmlxgantt_smart_rendering.js* file, which is from the old version, it will override the improvements of the new built-in **smart_rendering** extension. 
:::

### Related Guides
- [Performance: Ways to Improve](guides/performance.md#smart-rendering)
