---
sidebar_label: getClosestWorkTime
title: getClosestWorkTime method
description: "returns the closest working time"
---

# getClosestWorkTime

### Description

@short: 返回最近的工作时间

@signature: getClosestWorkTime: (config: object) =\> Date

### Parameters

- `config` - (required) *object* - 配置对象或日期

### Returns
- ` date` - (Date) - 最近工作时间的 Date 对象

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
如果 [work_time](api/config/work_time.md) 选项被禁用，方法将返回日期不变。 
:::  

- 若未指定任务，该方法将使用 [global work time calendar](guides/working-time.md#getting-calendars)。
- 此外，该方法也可以直接从一个 [calendar object](api/other/calendar.md) 调用。

## Configuration object properties

配置对象可以包含以下属性：

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
		<td rowspan="2" style="text-align:center"><b id="date">date</b></td>
  <td>用于获取最近工作时间的日期</td>
  </tr>
  <tr>
		<td colspan="2">
~~~js
gantt.getClosestWorkTime({
	date:new Date(2019,04,26),
    dir:"future"
});
 // -> Mon May 27 2019 00:00:00 if duration_unit="day"
 // -> Mon May 27 2019 08:00:00 if duration_unit="hour"
~~~
		</td>
	</tr>
  <tr>
		<td rowspan="2" style="text-align:center"><b id="dir">dir</b></td>
  <td> (<i>'future'</i> or <i>'past'</i>) 指定最近时间的方向</td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
~~~js
gantt.getClosestWorkTime({
	date:new Date(2019,04,18),
    dir:"past"
});
 // -> Sat May 18 2019 00:00:00
~~~
		</td>
	</tr>
	<tr>
		<td rowspan="2" style="text-align:center"><b id="unit">unit</b></td>
  <td> 用于搜索最近工作时间的时间单位</td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
~~~js
//searches for the closest working hour
gantt.getClosestWorkTime({
    date:new Date(2019,04,18), 
    dir:"future", 
    unit:"hour"
});
 // -> Mon May 20 2019 08:00:00
~~~
		</td>
	</tr>
  <tr>
		<td rowspan="2" style="text-align:center"><b id="unit">task</b></td>
  <td> 可选的，需计算持续时间的任务对象</td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
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

~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,26),
    dir:"future"
});
 // -> Mon May 27 2019 00:00:00 if duration_unit="day"
 // -> Mon May 27 2019 08:00:00 if duration_unit="hour"
~~~



dir
 ('future' or 'past') 指定最近时间的方向

~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,18),
    dir:"past"
});
 // -> Sat May 18 2019 00:00:00
~~~



unit
 用于搜索最近工作时间的时间单位

~~~js
//searches for the closest working hour
gantt.getClosestWorkTime({
    date:new Date(2019,04,18), 
    dir:"future", 
    unit:"hour"
});
 // -> Mon May 20 2019 08:00:00
~~~



task
 可选的，需计算持续时间的任务对象

~~~js
var closestTime = gantt.getClosestWorkTime({
    date:date, 
    task:task
});
~~~

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [getWorkHours](api/method/getworkhours.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)