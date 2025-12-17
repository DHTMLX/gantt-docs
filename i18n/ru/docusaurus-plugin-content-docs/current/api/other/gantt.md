---
sidebar_label: getGanttInstance
title: getGanttInstance
description: "a factory object that can be used to create new instances of dhtmlxGantt chart"
---

# getGanttInstance

:::info
This functionality is available in the Gantt PRO version under the Commercial (since October 6, 2021), Enterprise and Ultimate licenses 
:::

### Description

@short: A factory object that can be used to create new instances of dhtmlxGantt chart

### Example

~~~jsx
// can be used as a global object
const myGantt = Gantt.getGanttInstance();

// or imported from `dhtmlxgantt.js` as a module
import { Gantt } from 'dhtmlx-gantt';
...
const myGantt = Gantt.getGanttInstance();
~~~

## Methods

- **getGanttInstance(ganttConfig)** - creates a new instance of dhtmlxGantt. Takes the following parameter:
    - **ganttConfig** - (*object*) optional, a [configuration object](guides/multiple-gantts.md#ganttinstanceconfiguration) for a new gantt

Example:

~~~js
const myGantt = Gantt.getGanttInstance();
~~~

When no longer needed, an instance of gantt can be destroyed using the `destructor()` method of the instance, for example:

~~~js
const myGantt = Gantt.getGanttInstance();
...
myGantt.destructor();
~~~
