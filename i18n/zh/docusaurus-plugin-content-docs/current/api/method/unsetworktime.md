---
sidebar_label: unsetWorkTime
title: unsetWorkTime method
description: "在甘特图中移除工作时间设置"
---

# unsetWorkTime

### Description

@short: 在甘特图中移除工作时间设置

@signature: unsetWorkTime: (config: object) =\> void,

### Parameters

- `config` - (required) *object* - 定义时间范围的配置对象

### Example

~~~jsx
gantt.config.work_time = true;
 
// 将工作日的工作时间从 ["8:00-17:00"] 更新为 ["9:00-18:00"]
gantt.setWorkTime({ hours:["9:00-18:00"] });
// 移除工作时间配置
gantt.unsetWorkTime({ hours:["9:00-18:00"] });
~~~

### Related samples
- [Calculate working hours](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Details

版本 4.1 中新增

- 如果未指定特定任务，该方法将应用[全局工作时间日历](guides/working-time.md#multipleworktimecalendars)。<br>
- 此外，也可以直接在[calendar 对象](api/other/calendar.md)上调用此方法。

## 配置对象属性


配置对象可能包含以下属性:

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
  <td rowspan="2"><b id="day">day</b></td>
  <td> 星期几的数字表示 [0 (<i>星期日</i>) - 6 (<i>星期六</i>)]. 注意一次只能设置一天</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// 将所有星期一标记为非工作日
gantt.unsetWorkTime({ day:1, hours:false }); 
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="date">date</b></td>
  <td> 指定某个具体日期作为工作日或休息日</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// 将特定日期标记为休息日
gantt.unsetWorkTime({date:new Date(2013,0,1), hours:false})
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="hours">hours</b></td>
  <td> 以"起始时间-结束时间"区间表示的工作时间数组。<br><i>'false'</i> 表示休息日，<i>'true'（默认）</i> 表示应用默认时间（["8:00-17:00"]）</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// 移除星期五上午8:00到12:00的工作时间
gantt.unsetWorkTime({day : 5, hours : ["8:00-12:00"]});
~~~
  </td>
  </tr>
  </tbody>
</table>

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [isWorkTime](api/method/isworktime.md)

### Related Guides
- [工作时间计算](guides/working-time.md#unsettingtheworkingtime)

