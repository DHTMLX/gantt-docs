---
sidebar_label: addCalendar
title: addCalendar method
description: "Gantt 차트에 캘린더를 삽입합니다."
---

# addCalendar

### Description

@short: Gantt 차트에 캘린더를 삽입합니다.

@signature: addCalendar: (calendar: CalendarConfig) =\> string

### Parameters

- `calendar` - (required) *CalendarConfig* - 캘린더 구성 정보를 담고 있는 객체

### Returns
- ` calendarId` - (string) - 캘린더의 식별자

### Example

~~~jsx
// 기존 캘린더 추가
var calendarId = gantt.addCalendar(calendar);

// 새로운 구성으로 캘린더 추가
var calendarId = gantt.addCalendar({
    id:"custom", // 선택 사항
    worktime: {
        hours: ["8:00-17:00"],
        days: [ 1, 1, 1, 1, 1, 1 ,1]
    }
});

var calendar = gantt.getCalendar(calendarId);
~~~

### Related samples
- [Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)
- [Resource level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/07_resource_calendars.html)
- [Different worktimes for different time periods](https://docs.dhtmlx.com/gantt/samples/09_worktime/12_calendar_ranges.html)

### Details

캘린더 구성 객체는 다음과 같은 속성을 포함할 수 있습니다:

- **id?** - (*string | number*) - 선택 사항, 캘린더 식별자
- **worktime?** - (*object*) - 근무일과 근무 시간을 정의합니다. 다음을 포함할 수 있습니다:
    - **_hours?_** - (*string[] | number[] | boolean*) - 선택 사항, 작업 시작 및 종료 시간을 정의하는 전역 근무 시간 배열
    - **_days?_** - (*WorkDaysTuple*) - 선택 사항, 요일을 나타내는 7요소 배열 (0 - 일요일부터 6 - 토요일까지), 1/true는 근무일, 0/false는 비근무일을 의미
    - **_customWeeks?_** - (*object*) - 선택 사항, 다양한 기간에 대해 서로 다른 근무 시간 규칙을 정의하는 객체. 키:값 쌍으로 기간 이름과 해당 기간의 속성 객체로 구성됩니다.
        - **_[timespan: string]_** - (*object*) - 근무 시간 설정이 포함된 기간. 키는 기간 이름입니다.
            - **_from_** - (*Date*) - 기간 시작 날짜
            - **_to_** - (*Date*) - 기간 종료 날짜
            - **_hours?_** - (*Array&lt;string | number&gt;*) - 선택 사항, 'from'-'to' 쌍으로 된 근무 시간 간격 배열. false는 휴무일, true(기본값)는 기본 근무 시간(["8:00-17:00"]) 적용
            - **_days?_** - (*WorkDaysTuple | boolean*) - 선택 사항, 7요소 배열로 요일을 나타내며, 1/true는 근무일, 0/false는 비근무일

## 특정 요일에 대한 맞춤 근무 시간 설정

요일 번호만 지정하는 대신, 해당 요일에 대해 맞춤 근무 시간을 설정할 수 있습니다.<br>
예를 들어: 

~~~js
var calendar = {
    id:"calendar1", // 선택 사항
    worktime: {
        hours: ["8:00-17:00"],
        days: [ 0, 1, 1, 1, ["12:00-17:00"], 1, 0]
    }
}
~~~

여기서 ["12:00-17:00"]는 목요일에 오후 12시부터 5시까지 근무 시간을 설정합니다.

## 기간별 근무 시간 정의

**customWeeks** 속성을 사용하여 다양한 기간에 대해 서로 다른 근무 시간 규칙을 지정할 수 있습니다:

~~~js
// 새로운 구성으로 캘린더 추가
gantt.addCalendar({
    id:"default", // 선택 사항
    worktime: {
        hours: ["8:00-17:00"],
        days: [ 1, 1, 1, 1, 1, 1 ,1],
        customWeeks: {
            winter: {
                from: new Date(2020, 11, 1),// 2020년 12월 1일
                to: new Date(2021, 2, 1),// 2021년 3월 1일 00:00
                hours: ["9:00-13:00", "14:00-16:00"],
                days: [ 1, 1, 1, 1, 0, 0, 0]
            }
        }
    }
});
~~~

### Related API
- [getCalendar](api/method/getcalendar.md)
- [createCalendar](api/method/createcalendar.md)
- [deleteCalendar](api/method/deletecalendar.md)
- [calendar](api/other/calendar.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md#multipleworktimecalendars)

### Change log
- **customWeeks** 속성은 v7.1에서 도입됨
- 4.2 버전에 추가됨

