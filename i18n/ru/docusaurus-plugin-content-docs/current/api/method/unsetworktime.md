---
sidebar_label: unsetWorkTime
title: unsetWorkTime method
description: "снимает рабочее время в Gantt Chart"
---

# unsetWorkTime

### Description

@short: Снимает рабочее время в Gantt Chart

@signature: unsetWorkTime: (config: object) => void

### Parameters

- `config` - (обязательный) *object* - конфигурационный объект временного диапазона

### Example

~~~jsx
gantt.config.work_time = true;
 
// changes the working time of working days from ["8:00-17:00"] to ["9:00-18:00"]
gantt.setWorkTime({ hours: ["9:00-18:00"] });
// unsets the working time
gantt.unsetWorkTime({ hours: ["9:00-18:00"] });
~~~

### Related samples
- [Расчет рабочих часов](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Details

added in version 4.1

- Метод будет использовать [глобальный календарь рабочего времени](guides/working-time.md#multipleworktimecalendars) если задача не указана. 
- Кроме того, метод можно вызывать напрямую из [объекта календаря](api/other/calendar.md).


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
        <td rowspan="2"><b id="day">day</b></td>
  <td> число дня недели [0 (<i>Воскресенье</i>) - 6 (<i>Суббота</i>)]. Примечание: можно задать только 1 день за раз</td>
  </tr>
  <tr>
        <td colspan="2" style="text-align:left !important; ">
~~~js
// unsets working hours for Mondays 
gantt.unsetWorkTime({ day: 1, hours: false }); 
~~~
        </td>
    </tr>
    <tr>
        <td rowspan="2"><b id="date">date</b></td>
  <td> конкретная дата, для которой нужно установить/снять рабочие часы</td>
  </tr>
  <tr>
        <td colspan="2" style="text-align:left !important; ">
~~~js
// unsets working hours for a specific date 
gantt.unsetWorkTime({ 
    date: new Date(2025, 11, 1), 
    hours: false 
});
~~~
        </td>
    </tr>
  <tr>
        <td rowspan="2"><b id="hours">hours</b></td>
  <td> массив рабочих часов в формате пар 'from'-'to'. <br/><i>'false'</i> значение снимает рабочие часы, <i>'true' (default value)</i> применяет часы по умолчанию (["8:00-17:00"])</td>
  </tr>
  <tr>
        <td colspan="2" style="text-align:left !important; ">
~~~js
// unsets the working time for Fridays from 8:00 till 12:00
gantt.unsetWorkTime({ day : 5, hours : ["8:00-12:00"] });
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
- [Расчет времени работы](guides/working-time.md#unsetting-the-working-time)