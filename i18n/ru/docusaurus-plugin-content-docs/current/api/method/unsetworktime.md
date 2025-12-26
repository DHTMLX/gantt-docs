---
sidebar_label: unsetWorkTime
title: unsetWorkTime method
description: "удаляет настройку рабочего времени в Gantt Chart"
---

# unsetWorkTime

### Description

@short: Удаляет настройку рабочего времени в Gantt Chart

@signature: unsetWorkTime: (config: object) =\> void

### Parameters

- `config` - (required) *object* - объект конфигурации, определяющий временной интервал

### Example

~~~jsx
gantt.config.work_time = true;
 
// обновляет рабочие часы в рабочие дни с ["8:00-17:00"] на ["9:00-18:00"]
gantt.setWorkTime({ hours:["9:00-18:00"] });
// удаляет конфигурацию рабочих часов
gantt.unsetWorkTime({ hours:["9:00-18:00"] });
~~~

### Related samples
- [Calculate working hours](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Details

добавлено в версии 4.1

- Этот метод применяет [глобальный календарь рабочего времени](guides/working-time.md#multipleworktimecalendars), если не указан конкретный таск. <br>
- Также его можно вызвать напрямую на [объекте календаря](api/other/calendar.md).


## Свойства объекта конфигурации {#configurationobjectproperties}

Объект конфигурации может включать следующие свойства:

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
  <td> номер дня недели [0 (<i>Воскресенье</i>) - 6 (<i>Суббота</i>)]. Обратите внимание, что можно задать только один день за раз</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// отмечает все понедельники как нерабочие дни
gantt.unsetWorkTime({ day:1, hours:false }); 
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="date">date</b></td>
  <td> конкретная дата, которую нужно обозначить как рабочий день или выходной</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// отмечает конкретную дату как выходной
gantt.unsetWorkTime({date:new Date(2013,0,1), hours:false})
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="hours">hours</b></td>
  <td> массив рабочих часов, выраженных в интервалах 'от'-'до'. <br><i>'false'</i> означает выходной день, <i>'true' (по умолчанию)</i> применяет часы по умолчанию (["8:00-17:00"])</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// удаляет рабочие часы по пятницам с 8:00 до 12:00
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
- [Расчёт рабочего времени](guides/working-time.md#unsettingtheworkingtime)

