---
sidebar_label: baselines
title: baselines config
description: "设置甘特图中 baselines 的工作方式"
---

# baselines

### Description

@short: 配置 baselines 在甘特图中的功能

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
- [显示基线](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

该配置定义了甘特图中基线的处理和显示方式。它可以被设置为对象以自定义显示，或设置为布尔值以启用或禁用该特性。对象配置包含以下属性：

-  **datastore** - (*string*) - 用于存储基线条目的数据存储名。有关相关功能，请参阅 `getDatastore` 方法。
-  **render_mode** - (*boolean | string*) - 确定基线的显示方式：
  - **_false_** - 不显示基线。
  - **_"taskRow"_** - 基线与任务条在同一行显示。
  - **_"separateRow"_** - 基线显示在单独的子行中，扩展任务行高度。
  - **_"individualRow"_** - 每条基线在任务下方的独立子行中显示。
- **dataprocessor_baselines** - (*boolean*) - 指定是否将基线更新作为单独条目触发 DataProcessor。
- **row_height** - (*number*) - 定义基线子行的高度，仅在 render_mode 设置为 `"separateRow"` 或 `"individualRow"` 时适用。
- **bar_height** -  (*number*) - 设置基线条的高度。

### Related API
- [getDatastore](api/method/getdatastore.md)

### Related Guides
- [Timeline 中的额外元素](guides/inbuilt-baselines.md)

### Change log
- added in v9.0