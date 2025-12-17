---
sidebar_label: baselines
title: baselines config
description: "configures the functionality of baselines in the Gantt chart"
---

# baselines

### Description

@short: Configures the functionality of baselines in the Gantt chart

@signature: baselines: BaselineConfig | boolean

### Example

~~~jsx
gantt.config.baselines = {
  datastore: "baselines",
  render_mode: false,
  dataprocessor_baselines: false,
  row_height: 16,
  bar_height: 8
};
gantt.init("gantt_here");
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

This config defines how baselines are handled and displayed in the Gantt chart. It can be set as an object to customize the display or as a boolean to enable or disable the feature. The object configuration contains the following properties:

-  **datastore** - (*string*) - the name of the datastore used for storing baseline entries. For related functionality, 
see the `getDatastore` method.
-  **render_mode** - (*boolean | string*) - determines how baselines are displayed:
  - **_false_** - baselines are not shown.
  - **_"taskRow"_** - baselines are displayed in the same row with the task bar.
  - **_"separateRow"_** - baselines are shown in a separate subrow, expanding the task row height.
  - **_"individualRow"_** - each baseline is displayed in its own subrow beneath the task.
- **dataprocessor_baselines** - (*boolean*) - specifies whether baseline updates trigger the DataProcessor as individual entries.
- **row_height** - (*number*) - defines the height of the subrow for baselines, applicable only when `render_mode` 
is set to `"separateRow"` or `"individualRow"`.
- **bar_height** -  (*number*) - sets the height of the baseline bar.

### Related API
- [getDatastore](api/method/getdatastore.md)

### Related Guides
- [Extra Elements in Timeline](guides/inbuilt-baselines.md)

### Change log
- added in v9.0

