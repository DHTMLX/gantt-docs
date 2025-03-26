baselines
=============

@short: configures the functionality of baselines in the Gantt chart

@type: BaselineConfig | boolean


@example:
gantt.config.baselines = {
  datastore: "baselines",
  render_mode: false,
  dataprocessor_baselines: false,
  row_height: 16,
  bar_height: 8
};
gantt.init("gantt_here");

@template: api_config
@descr:
This config defines how baselines are handled and displayed in the Gantt chart. It can be set as an object to customize the display or as a boolean to enable or disable the feature. The object configuration contains the following properties:

-  <span class=subproperty>**datastore**</span> - (*string*) - the name of the datastore used for storing baseline entries. For related functionality, 
see the `getDatastore` method.
-  <span class=subproperty>**render_mode**</span> - (*boolean | string*) - determines how baselines are displayed:
  - **_false_** - baselines are not shown.
  - **_"taskRow"_** - baselines are displayed in the same row with the task bar.
  - **_"separateRow"_** - baselines are shown in a separate subrow, expanding the task row height.
  - **_"individualRow"_** - each baseline is displayed in its own subrow beneath the task.
- <span class=subproperty>**dataprocessor_baselines**</span> - (*boolean*) - specifies whether baseline updates trigger the DataProcessor as individual entries.
- <span class=subproperty>**row_height**</span> - (*number*) - defines the height of the subrow for baselines, applicable only when `render_mode` 
is set to `"separateRow"` or `"individualRow"`.
- <span class=subproperty>**bar_height**</span> -  (*number*) - sets the height of the baseline bar.

@related:
desktop/inbuilt_baselines.md

@relatedapi:
api/gantt_getdatastore.md

@relatedsample:
04_customization/15_baselines.html

@edition: pro

@changelog: added in v9.0
