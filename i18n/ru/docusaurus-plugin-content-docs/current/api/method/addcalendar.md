---
sidebar_label: addCalendar
title: addCalendar method
description: "добавляет календарь в Gantt"
---

# addCalendar

### Description

@short: Добавляет календарь в Gantt

@signature: addCalendar: (calendar: CalendarConfig) => string

### Parameters

- `calendar` - (required) *CalendarConfig* - объект с конфигурацией календаря

### Returns
- `calendarId` - (string) - идентификатор календаря

### Example

~~~jsx
// добавление ранее созданного календаря
const calendarId = gantt.addCalendar(calendar);

// добавление календаря с новой конфигурацией (свойство "days" задано как массив)
const calendarId = gantt.addCalendar({
    id: "custom", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});

// добавление календаря с новой конфигурацией (свойство "days" задано как объект)
const calendarId = gantt.addCalendar({
    id: "global", // идентификатор календаря необязателен
    worktime: {
      hours: ["8:00-12:00", "13:00-17:00"], // глобальные часы работы для будних дней
      days: {
        weekdays: [0, 1, 1, 1, 1, 1, 0],
        dates: {
          "2025-04-06": true,  // переопределение часов работы для конкретной даты
          "2025-04-08": false,
          "2025-04-09":  ["9:00-15:00"]
        }
      },
      customWeeks: {
        lastMonthOfTheYear: {
          from: new Date(2025, 11, 1),
          to: new Date(2026, 0, 1),
          hours: ["9:00-13:00"],
          days: {
            weekdays: [0, 1, 1, 1, 1, 0, 0],
            dates: {
              "2025-12-08": true,
              "2025-12-09":  false,
              "2025-12-10":  ["9:00-15:00"]
            }
          }
        }
      }
    }
});

const calendar = gantt.getCalendar(calendarId);
~~~



### Related samples
- [Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)
- [Resource level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/07_resource_calendars.html)
- [Different worktimes for different time periods](https://docs.dhtmlx.com/gantt/samples/09_worktime/12_calendar_ranges.html)

### Details

The calendar configuration object can contain the following attributes:

- **id?** - (*string | number*) - optional, идентификатор календаря
- **worktime?** - (*object*) - объект, задающий рабочее время по дням и часам. Он может включать:
- **_hours?_** - (*string[] | number[] | boolean*) - необязательный, массив глобальных рабочих часов, задаёт время начала и окончания работы задачи
- **_days?_** - (*WorkDaysTuple* | *object*) - необязательный, может быть:
    -  либо массив из 7 дней недели (от 0 - Воскресенье до 6 - Суббота), где 1/true означает рабочий день, а 0/false — нерабочий день
    - или объект, содержащий weekdays и dates. Он может включать:
        - **_weekdays?_** - (*WorkDaysTuple*) необязательный, массив из 7 дней недели (от 0 - Воскресенье до 6 - Суббота), где 1/true означает рабочий день, а 0/false — нерабочий день
        - **_dates?_** - (*object*) необязательный, объект с настройками рабочего времени для заданных дат. Объект может содержать набор пар ключ-значение, где:
            - ключ — дата в виде строки
            - значение — либо массив рабочих часов в виде пар 'from'-'to' или булево ('false' означает выходной, 'true' применяет часы по умолчанию (["8:00-17:00"]))
- **_customWeeks?_** - (*object*) - необязательный, объект с различными правилами рабочего времени для разных периодов времени. Объект может содержать набор пар key:value, где ключ — имя временного диапазона (timespan), а значение — объект со списком атрибутов.
    - **_[timespan: string]_** - (*object*) - временной диапазон с настройками рабочих часов. Имя этого объекта используется как название временного диапазона
        - **_from_** - (*Date*) - дата, с которой начинается временной диапазон
        - **_to_** - (*Date*) - дата, когда временной диапазон должен быть завершён
        - **_hours?_** - (*Array&lt;string | number&gt;*) - необязательный, массив рабочих часов в виде пар 'from'-'to'. Значение 'false' устанавливает выходной день, 'true' (значение по умолчанию) применяет часы по умолчанию (["8:00-17:00"])
        - **_days?_** - (*WorkDaysTuple* | *object*) - необязательный, может быть:
            -  либо массив из 7 дней недели (от 0 - Воскресенье до 6 - Суббота), где 1/true обозначает рабочий день, а 0/false — нерабочий день
            - или объект, содержащий weekdays и dates. Он может включать:
                - **_weekdays?_** - (*WorkDaysTuple*) необязательный, массив из 7 дней недели (от 0 - Воскресенье до 6 - Суббота), где 1/true обозначает рабочий день, а 0/false — нерабочий
                - **_dates?_** - (*object*) необязательный, объект с настройками рабочего времени для заданных дат. Объект может содержать набор пар ключ-значение, где:
                    - ключ — дата в виде строки
                    - значение — либо массив рабочих часов в виде пар 'from'-'to' или булево ('false' — выходной, 'true' применяет часы по умолчанию (["8:00-17:00"]))


### Setting individual working hours for a day

Вместо номера дня недели можно также задать индивидуальные рабочие часы для этого дня.
~~~js
const calendar = {
    id: "calendar1", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [0, 1, 1, 1, ["12:00-17:00"], 1, 0]
    }
}
~~~

где ["12:00-17:00"] — рабочие часы с 12:00 до 17:00 для четверга.

### Setting worktime for different time intervals

Есть возможность конфигурирования различных правил рабочих часов для разных периодов времени с помощью атрибута **customWeeks**:

~~~js
gantt.addCalendar({
    id: "global", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1],
        customWeeks: {
            winter: {
                from: new Date(2025, 11, 1), // 1 декабря 2025
                to: new Date(2026, 2, 1), // 1 марта 2026
                hours: ["9:00-13:00", "14:00-16:00"],
                days: [1, 1, 1, 1, 0, 0, 0]
            }
        }
    }
});
~~~

### Setting worktime for certain dates

Вы также можете задать рабочие часы для конкретных дат, указав их в свойстве **_dates_** объекта **_days_** (как для атрибута **worktime**, так и для свойства **customWeeks**). Например:  

~~~js
const calendar = {
    id: "calendar1", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: { 
        	dates: { 
          		"2025-04-09":  ["9:00-15:00"] 
        	} 
    	},
        customWeeks: {
            winter: {
                from: new Date(2025, 11, 1), // December 1st, 2025
                to: new Date(2026, 2, 1), // March 1st, 00:00, 2026
                hours: ["9:00-13:00", "14:00-16:00"],
                days: { 
                    dates: { 
                        "2026-01-02":  ["9:00-15:00"] 
                    } 
                }
            }
        }
    }
}
~~~



### Related API
- [getCalendar](api/method/getcalendar.md)
- [createCalendar](api/method/createcalendar.md)
- [deleteCalendar](api/method/deletecalendar.md)
- [calendar](api/other/calendar.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#multipleworktimecalendars)

### Change log
- возможность указать свойство **_days_** как *object* с рабочими днями недели и датами добавлена в версии v9.1
- свойство **customWeeks** добавлено в версии v7.1;
- добавлено в версии 4.2