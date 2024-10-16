baselines
=============

@short: configures the functionality of baselines in the Gantt chart

@type: object | boolean


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

- **datastore** (*string*) - the name of the datastore used for storing baseline entries. For related functionality, see the `getDatastore` method.
- **render_mode** (*boolean | string*) - determines how baselines are displayed:
  - `false` - baselines are not shown.
  - `"taskRow"` - baselines are displayed in the same row as the task bar.
  - `"separateRow"` - baselines are shown in a separate subrow, expanding the task row height.
  - `"individualRow"` - each baseline is displayed in its own subrow beneath the task.
- **dataprocessor_baselines** (*boolean*) - specifies whether baseline updates trigger the DataProcessor as individual entries.
- **row_height** (*number*) - defines the height of the subrow for baselines, applicable only when `render_mode` is set to `"separateRow"` or `"individualRow"`.
- **bar_height** (*number*) - sets the height of the baseline bar.

@relatedapi:
api/gantt_getdatastore.md

@relatedsample:
04_customization/15_baselines.html