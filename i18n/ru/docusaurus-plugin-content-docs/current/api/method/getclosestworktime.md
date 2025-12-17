---
sidebar_label: getClosestWorkTime
title: getClosestWorkTime method
description: "возвращает ближайшее рабочее время"
---

# getClosestWorkTime

### Description

@short: Возвращает ближайшее рабочее время

@signature: getClosestWorkTime: Calendar['getClosestWorkTime']

### Parameters

- `config` - (required) *object* - объект конфигурации или дата

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

Если опция [work_time](api/config/work_time.md) отключена, метод вернет дату без изменений. 
 
:::

- Если задача не передана, метод использует [глобальный календарь рабочего времени](guides/working-time.md#multipleworktimecalendars). <br>
- Кроме того, этот метод можно вызвать напрямую из [объекта календаря](api/other/calendar.md).

## Свойства объекта конфигурации {#configurationobjectproperties}
---------------------------------------

Объект конфигурации может содержать следующие свойства:

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
  <td rowspan="2"><b id="date">date</b></td>
  <td>дата, для которой запрашивается ближайшее рабочее время</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,26),
    dir:"future"
});
// -> Пн 27 мая 2019 00:00:00 если duration_unit="day"
// -> Пн 27 мая 2019 08:00:00 если duration_unit="hour"
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="dir">dir</b></td>
  <td> (<i>'future'</i> или <i>'past'</i>) указывает направление поиска ближайшего времени</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,18),
    dir:"past"
});
// -> Сб 18 мая 2019 00:00:00
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="unit">unit</b></td>
  <td> единица времени, используемая для поиска ближайшего рабочего времени</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// ищет ближайший рабочий час
gantt.getClosestWorkTime({
    date:new Date(2019,04,18), 
    dir:"future", 
    unit:"hour"
});
// -> Пн 20 мая 2019 08:00:00
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="unit">task</b></td>
  <td> необязательно, объект задачи, для которой рассчитывается продолжительность</td>
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
- [Расчёт рабочего времени](guides/working-time.md)

