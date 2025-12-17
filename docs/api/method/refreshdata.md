---
sidebar_label: refreshData
title: refreshData method
description: "refreshes data in the Gantt chart"
---

# refreshData

### Description

@short: Refreshes data in the Gantt chart

@signature: refreshData: () =\> void

### Example

~~~jsx
gantt.refreshData();
~~~

### Related samples
- [Basic filtering](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)

### Details

The method is intended not to reload but to re-draw data in the Gantt chart. See the example:

:::note
sample: [Gantt. Re-draw data ](https://snippet.dhtmlx.com/ces4sfdh)
:::

If you need to load data from the server, use either the [parse()](api/method/parse.md) or [load()](api/method/load.md) method.

:::note
sample: [Gantt. Load data from different data objects ](https://snippet.dhtmlx.com/h9ob1hxr)
:::

### Related API
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- [Basic Operations with Tasks](guides/crud-task.md)

