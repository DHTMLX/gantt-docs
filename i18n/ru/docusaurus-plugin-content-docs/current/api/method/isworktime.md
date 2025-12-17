---
sidebar_label: isWorkTime
title: isWorkTime method
description: "определяет, попадает ли заданная дата в рабочее время"
---

# isWorkTime

### Description

@short: Определяет, попадает ли заданная дата в рабочее время

@signature: (config: Date | object) =\> boolean

### Parameters

- `config` - (required) *object | Date* -        может быть либо объектом конфигурации, описывающим временной интервал, либо конкретной датой

### Returns
- ` isWorkTime` - (boolean) - <i>true</i>, если заданная дата находится в пределах рабочего времени; иначе <i>false</i>

### Example

~~~jsx
//проверка, является ли указанная дата рабочим днем согласно глобальным настройкам
gantt.isWorkTime({ date: new Date(2023,3,5) });
// или
gantt.isWorkTime(new Date(2023,3,5));

//проверка, является ли указанная дата рабочим днем для конкретной задачи
gantt.isWorkTime({date: new Date(2023,3,5), task: task});
~~~

### Details

:::note

Если опция [work_time](api/config/work_time.md) отключена, этот метод всегда будет возвращать `true`. 
 
:::

- Если задача не указана, метод использует [глобальный календарь рабочего времени](guides/working-time.md#multipleworktimecalendars). <br>
- Этот метод также можно вызвать напрямую из [объекта календаря](api/other/calendar.md).


Рассмотрим следующую настройку рабочего времени для диаграммы:

- **Рабочие дни**: понедельник по пятницу
- **Рабочие часы**: с 6:00 до 15:00

Если проверить понедельник, 3 апреля 2023 года, как показано ниже, результаты будут:

~~~js
gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit: "hour"}); 
//->false, так как время с 17:00 до 18:00 находится вне рабочего времени

gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit:  "day"}); 
//-> true, поскольку понедельник - рабочий день
~~~

## Свойства объекта конфигурации {#configurationobjectproperties}

Объект конфигурации может включать следующие свойства:

- **date** - (*Date*) дата для проверки
- **unit** - (string)    необязательно, указывает единицу времени: "minute", "hour", "day", "week", "month", "year"
- **task** - (*object*)    необязательно, объект задачи, для которой нужно определить рабочее время

~~~js
if (gantt.isWorkTime({date: date, task: task})){
    alert("worktime of task" + task.text);
}
~~~

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [getWorkHours](api/method/getworkhours.md)

### Related Guides
- [Расчёт рабочего времени](guides/working-time.md)

