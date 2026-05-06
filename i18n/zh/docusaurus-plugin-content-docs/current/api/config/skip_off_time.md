---
sidebar_label: skip_off_time
title: skip_off_time 配置
description: "从时间刻度中隐藏非工作时间"
---

# skip_off_time
:::info
 该功能仅在PRO版本中可用。 
:::
### Description

@short: 在时间刻度中隐藏非工作时间

@signature: skip_off_time: boolean

### Example

~~~jsx
// 计算工作小时内的持续时间并在图表中隐藏非工作时间
gantt.config.duration_unit = "hour";
gantt.config.work_time = true; 
gantt.config.skip_off_time = true; /*!*/

gantt.init("gantt_here");
~~~

**Default value:** false

### Details

请注意，**skip_off_time** 配置不会修改刻度，并隐藏完全没有工作时间的单元格。 

Example 1

日刻度从 00:00 开始，结束于 23:59，工作时间从 08:00 开始，到 16:59 结束。你使用的是以小时为单位的最小刻度。 
当将 **skip_off_time** 配置设为 *true* 时，具有非工作时间的单元格将对所有刻度隐藏。 
因此，日刻度将从 08:00 开始，到 16:59 结束。然而，如果你只有日刻度，则不会改变。
因为一天之内存在工作时间，所以它将从 00:00 开始，到 23:59 结束。

Example 2

周刻度有7天，其中2天为休息日（如周六和周日）。你使用的是以天为单位的最小刻度。 当设置 **skip_off_time** 为 *true* 时，休息日将被隐藏，周刻度将从周一渲染到周五。 然而，如果你只有一个周刻度，周将从周一开始并结束于周日，与 **skip_off_time** 配置无关，因为一周中存在休息日。

有两种方式可以显示隐藏非工作时间的图表:

- 添加一个较小单位的刻度（例如，在天刻度旁边添加小时刻度，或在周刻度旁边添加天刻度）
- 使用仅显示工作小时或工作日的[自定义刻度](guides/configuring-time-scale.md#zidingyishijiandanwei)

:::note
样例: [刻度上的5天工作周](https://snippet.dhtmlx.com/eq70o558)
:::

### Related API
- [correct_work_time](api/config/correct_work_time.md)
- [work_time](api/config/work_time.md)

### Related Guides
- [工作时间计算](guides/working-time.md)