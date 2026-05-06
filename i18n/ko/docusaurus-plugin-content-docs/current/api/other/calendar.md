---
sidebar_label: calendar
title: 캘린더 설정
description: "작업 캘린더 객체의 인터페이스"
---

# 캘린더

### Description

@short: 작업 캘린더 객체의 인터페이스

@signature: calendar: Calendar

### Details

작업 달력에 대한 자세한 정보는 [Work Time Calculation](guides/working-time.md#getting-calendars) 문서를 참조하십시오.

**calendar** 객체는 다음 메서드 및 속성을 갖습니다:

### Methods

- **setWorkTime (config): boolean** - Gantt 차트의 근무 시간을 설정합니다
    - **_config_** - (*object*) - 시간 간격의 [구성 객체](api/method/setworktime.md#configuration-object-properties) 
        - **_day?_** - (*string | number*) - 선택사항: 요일의 숫자 [0(일요일) - 6(토요일)]. 주의: 한 번에 1일만 설정할 수 있습니다
        - **_date?_** - (*Date*) - 선택사항: 근무일 또는 휴무일로 설정할 특정 날짜
        - **_hours?_** - (*string[] | number[] | boolean*) - 선택사항: 'from'-'to' 쌍으로 된 근무 시간 배열. 'false' 값은 휴무일을 설정하고, 'true'(기본값)은 기본 근무 시간(["8:00-17:00"])를 적용합니다
        - **_customWeeks?_** - (*object*) - 선택사항: 서로 다른 기간에 대한 근무 시간 규칙을 담은 객체. 이 객체에는 시간 간격의 이름이 키이며 값은 속성 목록이 들어 있는 객체입니다.
            - **_[timespan: string]_** - (*object*) - 근무 시간 설정이 있는 시간 간격 객체. 해당 객체의 이름이 시간 간격의 이름으로 사용됩니다
                - **_from_** - (*Date*) - 시간 간격이 시작될 날짜
                - **_to_** - (*Date*) - 시간 간격이 완료될 날짜
                - **_hours?_** - (*string[] | number[]*) - 선택사항: 'from'-'to' 쌍으로 된 근무 시간 배열. 'false' 값은 휴무일, 'true'(기본값)는 기본 시간(["8:00-17:00"])를 적용합니다
                - **_days?_** - (*WorkDaysTuple | boolean*) - 선택사항: 7일 간의 요일 배열(0은 일요일, 6은 토요일). 1/true는 근무일, 0/false는 비근무일

  
~~~js
calendar.setWorkTime({ hours:["9:00-18:00"] });
calendar.setWorkTime({ hours:["9:00-18:00"] });
calendar.setWorkTime({ day: 5, hours: ["9:00-18:00"] });
calendar.setWorkTime({ day: 5, hours: false });
calendar.setWorkTime({ date: new Date(2025, 5, 6), hours: ["9:00-18:00"] });
calendar.setWorkTime({ date: new Date(2025, 5, 6), hours: false });
calendar.setWorkTime({ hours: false });
calendar.setWorkTime({
  customWeeks: {
    winter: {
      from: new Date(2025, 11, 1),
      to: new Date(2026, 2, 1),
      hours: ["8:00-13:00", "14:00-16:00"],
      days: [1, 1, 1, 1, 1, 0, 0]
    },
    summer: {
      from: new Date(2026, 5, 1),
      to: new Date(2026, 7, 1),
      hours: ["10:00-13:00", "14:00-16:00"],
      days: [1, 1, 0, 1, 1, 0, 0]
    }
  }
});
calendar.setWorkTime({
  customWeeks: {
    winter: {
      from: new Date(2025, 11, 1),
      to: new Date(2026, 2, 1),
      hours: ["8:00-13:00", "14:00-16:00"],
      days: [1, ["8:00-13:00"], 1, 1, ["14:00-16:00"], 0, 0]
    },
    summer: {
      from: new Date(2026, 5, 1),
      to: new Date(2026, 7, 1),
      hours: ["10:00-13:00", "14:00-16:00"],
      days: false
    }
  }
});
~~~

- **unsetWorkTime (config): void** - Gantt 차트에서 근무 시간을 해제합니다
    - **_config_** - (*object*) - 시간 간격의 [구성 객체](api/method/unsetworktime.md#configuration-object-properties)
        - **_day?_** - (*string | number*) - 선택사항: 요일의 숫자 [0(일요일) - 6(토요일)]. 주의: 한 번에 1일만 설정할 수 있습니다
        - **_date?_** - (*Date*) - 선택사항: 근무일 또는 휴무일로 설정할 특정 날짜
        - **_hours?_** - (*string[] | number[] | boolean*) - 선택사항: 'from'-'to' 쌍으로 된 근무 시간 배열.
'false' 값은 근무 시간을 해제하고, 'true' (기본값)는 기본 근무 시간(["8:00-17:00"])를 적용합니다


~~~js
calendar.unsetWorkTime({ hours: ["9:00-18:00"] });
calendar.unsetWorkTime({ day: "5", hours: ["9:00-18:00"] });
calendar.unsetWorkTime({ day: 5, hours: false });
calendar.unsetWorkTime({ date: new Date(2025, 5, 6), hours: true });
~~~

- **isWorkTime (config, time_unit): boolean** - 주어진 날짜가 근무 시간인지 확인합니다
    - **_config_** - (*Date | object*) - 확인하려는 날짜 또는 시간 간격의 [구성 객체](api/method/isworktime.md#configuration-object-properties):
        - **_date_** - (*Date*) - 확인할 날짜
        - **_unit?_** - (*string*) - 선택사항: 시간 단위: "minute", "hour", "day", "week", "month", "year"
    - **_time_unit?_** - (*string*) - 선택사항: 시간 단위: "minute", "hour", "day", "week", "month", "year". 첫 번째 매개변수가 객체로 지정된 경우 전혀 필요하지 않습니다

~~~js
const calendar = gantt.getTaskCalendar(task);
if (calendar.isWorkTime({date: date})){
    alert("작업의 근무 시간" + task.text);
}

calendar.isWorkTime(new Date(2025, 5, 6));
calendar.isWorkTime(new Date(2025, 5, 6), "hour");
calendar.isWorkTime({ date: new Date(2025, 5, 6), unit: "hour" });
~~~

- **getClosestWorkTime (config): Date** - 가장 가까운 근무 시간을 반환합니다
    - **_config_** - (*Date | object*) - 가장 가까운 근무 시간을 얻기 위한 구성 객체:
        - **_date_** - (*Date*) - 가장 가까운 근무 시간을 얻을 날짜
        - **_dir?_** - (*string*) - 선택사항: 가장 가까운 시간의 방향을 지정합니다: "future" 또는 "past" 
        - **_unit?_** - (*string*) - 선택사항: 가장 가까운 근무 시간을 검색할 시간 단위

~~~js
calendar.getClosestWorkTime(new Date(2025, 5, 6));
calendar.getClosestWorkTime({ 
    date: new Date(2025, 5, 6), 
    unit: "hour",
    dir: "past" 
});
~~~

- **calculateEndDate (config, duration, unit): Date** - 작업의 종료 날짜를 계산합니다
    - **_config_** - (*Date | object*) - 작업이 시작될 예정인 날짜 또는 시간 간격의 [구성 객체](api/method/calculateenddate.md#configuration-object-properties):
        - **_start_date_** - (*Date*) - 작업이 시작될 예정인 날짜
        - **_duration_** - (*number*) - 작업의 기간
        - **_unit?_** - (*string*) - 선택사항: 기간의 시간 단위: "minute", "hour", "day", "week", "month", "year"
    - **_duration?_** - (*number*) - 선택사항: 작업의 기간. 첫 번째 매개변수가 객체로 지정된 경우 필요하지 않습니다
    - **_unit?_** - (*string*) - 선택사항: 기간의 시간 단위. 첫 번째 매개변수가 객체로 지정된 경우 필요하지 않습니다

~~~js
calendar.calculateEndDate(new Date(2025, 5, 6), 2, "hour");
calendar.calculateEndDate({ 
    start_date: new Date(2025, 5, 6), 
    duration: 2, 
    unit: "hour" 
});
~~~

- **calculateDuration (config, end): number** - 작업의 소요 시간을 계산합니다
    - **_config_** - (*Date | object*) - 시작일 또는 시간 간격의 [구성 객체](api/method/calculateduration.md#configuration-object-properties):
        - **_start_date_** - (*Date*) - 작업이 시작될 날짜
        - **_end_date_** - (*Date*) - 작업이 완료될 예정인 날짜
    - **_end?_**    - (*Date*) - 작업이 완료될 예정인 날짜. 첫 번째 매개변수가 객체로 지정된 경우 필요하지 않습니다

~~~js
calendar.calculateDuration(new Date(2025, 5, 6), new Date(2025, 5, 17));
calendar.calculateDuration({ 
    start_date: new Date(2025, 5, 6), 
    end_date: new Date(2025, 5, 17) 
});
~~~

### Properties

- **id** - (*string | number*) - 작업의 캘린더 ID

### Related API
- [addCalendar](api/method/addcalendar.md)
- [getCalendar](api/method/getcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md#assigningcalendartotask)

