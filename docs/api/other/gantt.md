---
sidebar_label: Gantt
title: Gantt
description: "a factory object that can be used to create new instances of dhtmlxGantt chart"
---

# Gantt

:::info
This functionality is available in the Gantt PRO version under the Commercial (since October 6, 2021), Enterprise and Ultimate licenses 
:::

### Description

@short: A factory object that can be used to create new instances of dhtmlxGantt chart

@signature: Gantt: object

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
    - **ganttConfig** - (*object*) optional, a [configuration object](guides/multiple-gantts.md#gantt-instance-configuration) for a new gantt

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

### registerSchedulingEngine {#registerschedulingengine}

`Gantt.registerSchedulingEngine(name: string, createEngine: () => SchedulingEngine): void` registers a named scheduling provider. The factory must return a new provider for each chart. The built-in name `"v2"` is reserved. Re-registering another name updates the factory used for later engine instances.

Set [auto_scheduling.engine](api/config/auto_scheduling.md#engine) to select the registered engine for a chart that uses the PRO auto-scheduling plugin.

### createPlanningEngine {#createplanningengine}

`Gantt.createPlanningEngine(plen: PlanningEngineModule): SchedulingEngine` creates a Gantt adapter for a separately loaded, initialized PlanningEngine module. The module must expose a compatible `Project` constructor, which accepts an optional setting `{ dates?: "string" | "date" }`.

Use this method in the factory function you pass to `registerSchedulingEngine()`. It is available in PRO browser and Node.js bundles that expose the adapter. See [Using PlanningEngine with Gantt](guides/planning-engine.md) for an example.

Both scheduling-provider methods were added in v10.1.
