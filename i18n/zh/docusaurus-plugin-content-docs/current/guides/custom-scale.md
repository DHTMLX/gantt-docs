---
title: "在时间刻度中隐藏时间单位"
sidebar_label: "在时间刻度中隐藏时间单位"
---

# 在时间刻度中隐藏时间单位

:::info
此功能仅在 PRO 版本中可用
:::

该库允许您在图表的时间刻度中隐藏不必要的时间单位。例如，如果您只想显示工作日并排除周末，这会非常有用。

要在刻度中隐藏某个时间单位，通常需要使用 **ignore_time** 方法。该方法是一个函数，接收单元格的日期作为参数。若要隐藏特定单位，该函数应对该日期返回 *true*。

例如，若要在刻度中隐藏周末，可以这样使用该方法:

~~~js
// 0 代表星期天，6 代表星期六
gantt.ignore_time = function(date){
   if(date.getDay() == 0 || date.getDay() == 6)
      return true;
};
~~~

![skipped_weekends](/img/skipped_weekends.png)


[Not render weekends on the scale](https://docs.dhtmlx.com/gantt/samples/03_scales/09_skip_weekends.html)


:::note
请注意，从刻度中隐藏时间单位不会将其从任务持续时间的计算中移除。如果您想在持续时间计算中排除隐藏的单位，
请参阅文章 [작업 시간 계산](guides/working-time.md) 中描述的方法
:::

在处理 [工作时间计算](guides/working-time.md) 时，您可以使用 [isWorkTime](api/method/isworktime.md) 来替代硬编码的数值:

~~~js
gantt.ignore_time = function(date){
   if(!gantt.isWorkTime(date))
      return true;
};
~~~


[Calculate working hours](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)


需要注意的是，**ignore_time** 方法并不会改变刻度本身。以下示例说明了没有工作时间或工作日的单元格是如何被隐藏的。

示例 1

一天的刻度从 00:00 到 23:59，工作时间为 08:00 到 16:59。如果您有一个以小时为最小单位的刻度并应用了 **ignore_time**，则所有刻度中代表非工作时间的单元格都会被隐藏。这意味着日刻度实际上会从 08:00 到 16:59。然而，如果您只有一天的刻度，它仍然会从 00:00 到 23:59，因为这一天内存在工作时间。

示例 2

一周的刻度包含 7 天，其中有 2 天为休息日（如星期六和星期天）。如果最小刻度为天并应用了 **ignore_time**，休息日会被隐藏，因此周刻度将只显示星期一到星期五。但如果您只有周刻度，它仍然会从星期一开始，到星期天结束，因为这一周包含休息日。

有两种方式可以显示隐藏了时间单位的图表:

- 添加一个更小单位的刻度（例如，在日刻度旁添加小时刻度，或在周刻度旁添加日刻度）
- 使用 [自定义刻度](guides/configuring-time-scale.md#zidingyishijiandanwei) 只渲染工作时间或工作日


**Related example:** [5-day work weeks on the scale](https://snippet.dhtmlx.com/eq70o558)

