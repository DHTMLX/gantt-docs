---
sidebar_label: addCalendar
title: addCalendar method
description: "Gantt에 캘린더를 추가합니다"
---

# addCalendar

### Description

@short: Gantt에 캘린더를 추가합니다

@signature: addCalendar: (calendar: CalendarConfig) => string

### Parameters

- `calendar` - (필수) *CalendarConfig* - 캘린더 구성을 담은 객체

### Returns
- ` calendarId` - (string) - 캘린더의 ID

### Example

~~~jsx
// 이미 생성된 캘린더를 추가합니다
const calendarId = gantt.addCalendar(calendar);

// 새로운 구성으로 캘린더를 추가합니다( "days" 속성이 배열로 설정됩니다)
const calendarId = gantt.addCalendar({
    id: "custom", // 선택적
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});

// 새로운 구성으로 캘린더를 추가합니다( "days" 속성이 객체로 설정됩니다)
const calendarId = gantt.addCalendar({
    id: "global", // 캘린더 ID는 선택사항
    worktime: {
      hours: ["8:00-12:00", "13:00-17:00"], // 평일의 전역 근무 시간
      days: {
        weekdays: [0, 1, 1, 1, 1, 1, 0],
        dates: {
          "2025-04-06": true,  // 특정 날짜의 근무 시간을 재정의
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

- **id?** - (*string | number*) - 선택 사항, 캘린더 ID
- **worktime?** - (*object*) - 일과 시간을 일(day) 및 시(hour)로 설정하는 객체입니다. 아래를 포함할 수 있습니다:
- **_hours?_** - (*string[] | number[] | boolean*) - 선택 사항, 전역 근무 시간을 포함하는 배열로 작업의 시작 시간과 종료 시간을 설정합니다
- **_days?_** - (*WorkDaysTuple* | *object*) - 선택 사항이며 아래 중 하나일 수 있습니다:
    -  일주일의 7일 배열로 (0은 일요일, 6은 토요일). 1/true는 근무일, 0/false는 비근무일을 나타냅니다
    -  또는 주중과 날짜를 포함하는 객체입니다. 아래를 포함할 수 있습니다:
        - **_weekdays?_** - (*WorkDaysTuple*) 선택 사항, 주의 7일 배열 (0은 일요일, 6은 토요일). 1/true는 근무일, 0/false는 비근무일
        - **_dates?_** - (*object*) 선택 사항, 특정 날짜에 대한 근무 시간 설정을 담은 객체입니다. 이 객체는 여러 개의 key: value 쌍을 포함할 수 있습니다. 각각의 key는 문자열로 설정된 날짜이고, 값은 근무 시간 배열('from'-'to' 쌍)이나 불리언입니다. ('false' 값은 휴일을 설정하고, 'true'는 기본 시간(["8:00-17:00"])를 적용합니다)
- **_customWeeks?_** - (*object*) - 선택 사항, 서로 다른 기간에 대한 근무 시간 규칙을 담은 객체입니다. 이 객체는 시간 구간의 이름을 키로 하고, 값은 속성 목록이 있는 객체입니다.
    - **_[timespan: string]_** - (*object*) - 해당 시간 구간의 근무 시간 설정을 담고 있는 객체. 이 객체의 이름이 시간 구간의 이름으로 사용됩니다
        - **_from_** - (*Date*) - 시간 구간이 시작될 예정인 날짜
        - **_to_** - (*Date*) - 시간 구간이 완료될 예정인 날짜
        - **_hours?_** - (*Array&lt;string | number&gt;*) - 선택 사항, 'from'-'to' 쌍으로 된 근무 시간 배열. 'false' 값은 휴일, 'true' (기본값) 은 기본 시간으로 적용(["8:00-17:00"])
        - **_days?_** - (*WorkDaysTuple* | *object*) - 선택 사항, 아래 중 하나일 수 있습니다:
            -  일주일의 7일 배열로 (0은 일요일, 6은 토요일). 1/true는 근무일, 0/false는 비근무일
            -  또는 주중과 날짜를 포함하는 객체입니다. 아래를 포함할 수 있습니다:
                - **_weekdays?_** - (*WorkDaysTuple*) 선택 사항, 주의 7일 배열 (0은 일요일, 6은 토요일). 1/true는 근무일, 0/false는 비근무일
                - **_dates?_** - (*object*) 선택 사항, 특정 날짜에 대한 근무 시간 설정을 담은 객체입니다. 이 객체는 여러 개의 key: value 쌍을 포함할 수 있습니다. 각각의 key는 문자열로 설정된 날짜이고, 값은 근무 시간 배열('from'-'to' 쌍)이나 불리언입니다. ('false' 값은 휴일을 설정하고, 'true'는 기본 시간( ["8:00-17:00"] )을 적용합니다)


### Setting individual working hours for a day

주 요일 번호 대신 이 날짜에 대해 커스텀 근무 시간을 설정할 수도 있습니다. 예를 들면:

~~~js
const calendar = {
    id: "calendar1", // 선택적
    worktime: {
        hours: ["8:00-17:00"],
        days: [0, 1, 1, 1, ["12:00-17:00"], 1, 0]
    }
}
~~~

여기서 ["12:00-17:00"]은 목요일에 해당하는 12:00부터 17:00까지의 근무 시간을 나타냅니다.

### Setting worktime for different time intervals

다른 기간을 위해 서로 다른 근무 시간 규칙을 구성할 수 있는 기능이 있습니다. 이를 위해 **customWeeks** 속성을 사용합니다:

~~~js
gantt.addCalendar({
    id: "global", // 선택적
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1],
        customWeeks: {
            winter: {
                from: new Date(2025, 11, 1), // 2025년 12월 1일
                to: new Date(2026, 2, 1), // 2026년 3월 1일 00:00
                hours: ["9:00-13:00", "14:00-16:00"],
                days: [1, 1, 1, 1, 0, 0, 0]
            }
        }
    }
});
~~~

### Setting worktime for certain dates

특정 날짜에 대한 근무 시간을 지정하려면 **_days_** 객체의 **_dates_** 속성에 설정하면 됩니다(또는 **worktime** 속성과 **customWeeks** 속성 모두에 해당). 예를 들면:

~~~js
const calendar = {
    id: "calendar1", // 선택적
    worktime: {
        hours: ["8:00-17:00"],
        days: { 
            dates: { 
                "2025-04-09":  ["9:00-15:00"] 
            } 
        },
        customWeeks: {
            winter: {
                from: new Date(2025, 11, 1), // 2025년 12월 1일
                to: new Date(2026, 2, 1), // 2026년 3월 1일 00:00
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
- [작업 시간 계산](guides/working-time.md#multipleworktimecalendars)

### Change log
- 요일과 날짜를 포함하는 형태로 **_days_** 속성을 *object*로 지정하는 기능이 v9.1에 추가되었습니다
- **customWeeks** 속성이 v7.1에 추가되었습니다;
- 버전 4.2에 추가되었습니다