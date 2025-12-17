---
title: "手动调度摘要任务"
sidebar_label: "手动调度摘要任务"
---

手动调度摘要任务
===============================

可以手动调度[项目](guides/task-types.md)（摘要任务），以便在使用甘特图时获得更多的控制和精确性。

通常，摘要任务会自动设置其日期，取其子任务中最早的开始日期和最晚的结束日期。然而，您可以通过为摘要任务分配固定的开始和结束日期来覆盖这一行为，这些日期独立于其子任务。这意味着甘特图上将同时显示固定工期和根据子任务计算出的工期。


[Manually Scheduled Projects](https://docs.dhtmlx.com/gantt/samples/04_customization/25_project_dates.html)


要为摘要任务启用手动调度，请将 [auto_scheduling](api/config/auto_scheduling.md) 属性设置为 *false*。

固定日期保存在 **task.start_date** 和 **task.end_date** 中，而根据子任务计算出的日期则分别保存在 **task.$auto_start_date** 和 **task.$auto_end_date** 中。

~~~js
gantt.parse({
  data: [
    {
      id: 1,
      text: "Project Phase 1",
      type: "project",
      start_date: "2025-05-01 00:00:00",
      duration: 15,
      auto_scheduling: false /* ! */
    },
    // ...
  ],
});
~~~

在甘特图上，将同时显示摘要任务手动设置的工期和基于其子任务实际计算的工期。

如果子任务的日期超出了摘要任务指定的日期范围，摘要任务会被高亮显示，以提示存在调度冲突。这个可视化指示有助于用户快速发现并解决时间线上的不一致。

![高亮显示超出范围的摘要任务](/img/custom_project_dates.png)

