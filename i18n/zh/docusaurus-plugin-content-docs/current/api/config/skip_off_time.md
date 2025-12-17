---
sidebar_label: skip_off_time
title: skip_off_time config
description: "隐藏时间刻度中的非工作时间"
---

# skip_off_time
:::info
 该功能仅在PRO版本中可用。 
:::
### Description

@short: 隐藏时间刻度中的非工作时间

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

请注意，**skip_off_time** 设置不会改变刻度本身，而是隐藏那些完全不包含工作时间的单元格。

示例 1

假设一个以天为刻度的时间轴，从00:00到23:59，工作时间为08:00到16:59，最小刻度单位为小时。 
当 **skip_off_time** 设置为 *true* 时，所有刻度中代表非工作时间的单元格都会被隐藏。 
这意味着天刻度实际上会显示从08:00到16:59的时间段。 
然而，如果只显示天刻度，它仍然保持不变，从00:00开始，到23:59结束，因为这一天包含工作时间。

示例 2

考虑一个覆盖7天的周刻度，其中有2天休息（例如周六和周日），最小刻度单位为天。 
当 **skip_off_time** 设置为 *true* 时，休息日会被隐藏，因此周刻度显示的是周一到周五。 
但如果只显示周刻度，它仍会从周一运行到周日，不受 **skip_off_time** 设置影响，因为一周包括休息日。

有两种方式可以显示隐藏非工作时间的图表:

- 添加一个较小单位的刻度（例如，在天刻度旁边添加小时刻度，或在周刻度旁边添加天刻度）
- 使用仅显示工作小时或工作日的[自定义刻度](guides/configuring-time-scale.md#zidingyishijiandanwei)

:::note
Sample: [刻度显示5天工作周](https://snippet.dhtmlx.com/eq70o558) 
:::

### Related API
- [correct_work_time](api/config/correct_work_time.md)
- [work_time](api/config/work_time.md)

### Related Guides
- [工作时间计算](guides/working-time.md)

