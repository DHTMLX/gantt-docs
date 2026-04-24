---
title: "在刻度中隐藏时间单位"
sidebar_label: "在刻度中隐藏时间单位"
---

# 在刻度中隐藏时间单位

:::info
该功能仅在 PRO 版本中可用
:::

该库提供在图表的时间刻度中隐藏不必要的时间单位的能力。例如，您可以仅显示工作日，隐藏周末。


通常，要在时间刻度中隐藏一个时间单位，需要使用 **ignore_time** 方法。
该方法是一个接收单元格日期作为参数的函数。要隐藏某个单位，请对其返回 *true*。


例如，要从刻度中隐藏周末，请按如下方式使用该方法：

~~~js
// 0 代表星期天，6 代表星期六
gantt.ignore_time = function(date){
   if(date.getDay() == 0 || date.getDay() == 6)
      return true;
};
~~~

![skipped_weekends](/img/skipped_weekends.png)


[在刻度上不渲染周末](https://docs.dhtmlx.com/gantt/samples/03_scales/09_skip_weekends.html)


:::note
请注意，从时间刻度隐藏时间单位并不会将这些单位从任务持续时间的计算中排除。要在持续时间的计算中排除隐藏的单位，请使用文章 [工作时间计算](guides/working-time.md) 中描述的技术
:::

请注意，在使用 [工作时间计算](guides/working-time.md) 时，您可以使用 [isWorkTime](api/method/isworktime.md) 代替硬编码值：

~~~js
gantt.ignore_time = function(date){
   if(!gantt.isWorkTime(date))
      return true;
};
~~~


[计算工作时间](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)


请注意，**ignore_time** 方法不会修改刻度。下面的示例描述了隐藏没有工作时间/工作日的单元格的情况。

示例 1

日刻度从 00:00 开始，结束于 23:59，工作时间从 08:00 开始，到 16:59 结束。您拥有以小时为单位的最小刻度。
应用 **ignore_time** 方法时，包含非工作时间的单元格将在所有刻度中隐藏。
因此，日刻度将从 08:00 开始，到 16:59 结束。然而，如果只有日刻度，则不会改变。
因为一天内有工作时间，所以它将从 00:00 开始，结束于 23:59。

示例 2

周刻度共有 7 天，其中 2 天为休息日（例如周六和周日）。您拥有以天为单位的最小刻度。当应用 **ignore_time** 方法时，休息日将被隐藏，周刻度将从周一渲染到周五。然而，如果只有一个周刻度，周将在周一开始，周日结束，因为一周中存在休息日。

有两种方式来渲染带有隐藏时间单位的图表：

- 添加一个具有较少单位的刻度（在日刻度中使用小时刻度，在周刻度中使用日刻度，依此类推）
- 添加一个 [自定义刻度](guides/configuring-time-scale.md#customtimeunits)，它将仅渲染工作时间/工作日

**相关示例** [刻度上的 5 天工作周](https://snippet.dhtmlx.com/eq70o558)

### 相关
-  [工作时间计算](guides/working-time.md)
-  [设置刻度](guides/configuring-time-scale.md)