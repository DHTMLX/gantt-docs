---
sidebar_label: getClosestWorkTime
title: getClosestWorkTime method
description: "возвращает ближайшее рабочее время"
---

# getClosestWorkTime

### Description

@short: Возвращает ближайшее рабочее время

@signature: getClosestWorkTime: (config: object) =\> Date

### Parameters

- `config` - (required) *объект* - конфигурационный объект или дата

### Returns
- ` date` - (Date) - объект Date, представляющий ближайшее рабочее время

### Example

~~~jsx
// проверяет, является ли указанная дата рабочим днем согласно глобальным настройкам
gantt.getClosestWorkTime({date:new Date(2019,04,26)});
// или
gantt.getClosestWorkTime(new Date(2019,04,26));

// проверяет, является ли указанная дата рабочим днем для конкретной задачи
gantt.getClosestWorkTime({ date: new Date(2019,04,26), task:task });
~~~

### Details

:::note
If the [work_time](api/config/work_time.md) option is disabled, the method returns the date unchanged. 
:::

- The method will use the [global work time calendar](guides/working-time.md#getting-calendars) if no task is specified. 
- Besides, the method can be called directly from a [calendar object](api/other/calendar.md).


## Свойства конфигурационного объекта

Конфигурационный объект может содержать следующие свойства:

<table class="list" cellspacing="0" cellpadding="5" border="0">
	<thead>
	<tr>
		<th>
			Свойство 
		</th>
		<th>
			Описание
		</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td rowspan="2" style="text-align:center"><b id="date">date</b></td>
  <td>дата, для которой нужно определить ближайшее рабочее время</td>
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
  <td> (<i>'future'</i> or <i>'past'</i>) указывает направление ближайшего времени</td>
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
  <td> единица времени, в рамках которой ищется ближайшее рабочее время</td>
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
  <td> необязательный параметр, объект задачи, длительность которой должна быть рассчитана</td>
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
  ('future' or 'past') указывает направление ближайшего времени
  
  
~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,18),
    dir:"past"
});
 // -> Sat May 18 2019 00:00:00
~~~


  unit
  единица времени для поиска ближайшего рабочего времени
  
  
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
  необязательный параметр, объект задачи, длительность которой должна быть рассчитана
  
  
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
- [Расчет рабочего времени](guides/working-time.md)