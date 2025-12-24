---
sidebar_label: getClosestWorkTime
title: getClosestWorkTime method
description: "返回最近的工作时间"
---

# getClosestWorkTime

### Description

@short: 返回最近的工作时间

@signature: getClosestWorkTime: Calendar['getClosestWorkTime']

### Parameters

- `config` - (required) *object* - 配置对象或日期

### Returns
- ` date` - (Date) - 表示最近工作时间的 Date 对象

### Example

~~~jsx
// 根据全局设置验证给定日期是否为工作日
gantt.getClosestWorkTime({date:new Date(2019,04,26)});
// 或者
gantt.getClosestWorkTime(new Date(2019,04,26));

// 验证给定日期是否为特定任务的工作日
gantt.getClosestWorkTime({ date: new Date(2019,04,26), task:task });
~~~

### Details

:::note
如果 [work_time](api/config/work_time.md) 选项被禁用，该方法将返回原始日期，不做任何更改。
:::

- 当未提供任务时，该方法使用[全局工作时间日历](guides/working-time.md#multipleworktimecalendars)。<br>
- 此外，该方法也可以直接从[日历对象](api/other/calendar.md)调用。

## 配置对象属性


配置对象可以包含以下属性:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  属性 
  </th>
  <th>
  描述
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td rowspan="2"><b id="date">date</b></td>
  <td>请求最近工作时间的日期</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,26),
    dir:"future"
});
// -> 如果 duration_unit="day"，则返回 Mon May 27 2019 00:00:00
// -> 如果 duration_unit="hour"，则返回 Mon May 27 2019 08:00:00
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="dir">dir</b></td>
  <td> (<i>'future'</i> 或 <i>'past'</i>) 指定查找最近时间的方向</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,18),
    dir:"past"
});
// -> 返回 Sat May 18 2019 00:00:00
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="unit">unit</b></td>
  <td> 用于定位最近工作时间的时间单位</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// 查找最近的工作小时
gantt.getClosestWorkTime({
    date:new Date(2019,04,18), 
    dir:"future", 
    unit:"hour"
});
// -> 返回 Mon May 20 2019 08:00:00
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="unit">task</b></td>
  <td> 可选，用于计算持续时间的任务对象</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
var closestTime = gantt.getClosestWorkTime({
    date:date, 
    task:task
});
~~~
  </td>
  </tr>
  </tbody>
</table>

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [getWorkHours](api/method/getworkhours.md)

### Related Guides
- [工作时间计算](guides/working-time.md)

