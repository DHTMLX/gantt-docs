---
sidebar_label: inline_editors_date_processing
title: inline_editors_date_processing 配置
description: "在编辑任务的开始时间/结束时间时，保持任务的持续时间不变"
---

# inline_editors_date_processing

### Description

@short: 在编辑任务的开始时间和结束时间时，保持任务持续时间不变

@signature: inline_editors_date_processing: string | undefined

### Example

~~~jsx
gantt.config.inline_editors_date_processing = "keepDuration";
~~~

**默认值：** undefined

### Details

影响任务开始日期和结束日期的 inline editors 的行为。
当配置未定义（默认值）时：

- 当用户更改任务的开始日期时，任务持续时间将保持不变，整个任务将重新排程到指定时间。
- 当用户更改任务的结束日期时，任务开始日期将保持不变，任务持续时间将被更新以反映变更。

这与版本 6.2 之前的默认逻辑不同。

如要恢复到 v6.1 的行为，请使用 **"keepDuration"** 值：

~~~js
gantt.config.inline_editors_date_processing = "keepDuration";
~~~

将产生以下效果：

- 当用户更改任务的开始日期时，任务持续时间将保持不变，整个任务将重新排程到指定时间。
- 当用户更改任务的结束日期时，任务持续时间将保持不变，整个任务将重新排程以在指定时间结束。

另一种值是 **"keepDates"**：

~~~js
gantt.config.inline_editors_date_processing = "keepDates";
~~~

它具有以下效果：

- 当用户更改任务的开始日期时，task end_date 将保持不变，任务持续时间将更新以反映变更。
- 当用户更改任务的结束日期时，task start_date 将保持不变，任务持续时间将更新以反映变更。

### Change log
- v6.2 新增，兼容之前版本
