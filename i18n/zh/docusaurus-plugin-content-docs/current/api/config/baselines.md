---
sidebar_label: baselines
title: baselines config
description: "设置甘特图中 baselines 的工作方式"
---

# baselines
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 设置甘特图中 baselines 的工作方式

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

此设置控制 baselines 在甘特图中的管理和显示方式。它可以是一个用于详细自定义的对象，也可以是一个简单的布尔值，用于开启或关闭该功能。该对象包含以下选项:

-  **datastore** - (*string*) - 存储 baseline 条目的 datastore 名称。更多详情请参考 `getDatastore` 方法。
-  **render_mode** - (*boolean | string*) - 定义 baselines 的显示方式:
  - **_false_** - 不显示 baselines。
  - **_"taskRow"_** - baselines 显示在任务条所在的同一行。
  - **_"separateRow"_** - baselines 占用独立的子行，使任务行变高。
  - **_"individualRow"_** - 每个 baseline 在任务下方各自独立的子行中渲染。
- **dataprocessor_baselines** - (*boolean*) - 决定 baseline 的变更是否触发每条条目的 DataProcessor。
- **row_height** - (*number*) - 设定 baseline 子行的高度，仅在 `render_mode` 为 `"separateRow"` 或 `"individualRow"` 时生效。
- **bar_height** -  (*number*) - 控制 baseline 条的高度。

### Related API
- [getDatastore](api/method/getdatastore.md)

### Related Guides
- [时间线中的额外元素](guides/inbuilt-baselines.md)

### Change log
- v9.0 中新增

