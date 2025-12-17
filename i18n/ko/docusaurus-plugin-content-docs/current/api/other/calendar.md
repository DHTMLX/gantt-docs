---
sidebar_label: calendar
title: calendar config
description: "작업 calendar 객체를 위한 인터페이스"
---

# calendar

### Description

@short: 작업 calendar 객체를 위한 인터페이스

@signature: calendar: Calendar


### Details

작업 calendar에 대한 자세한 내용은 [작업 시간 계산](guides/working-time.md#multipleworktimecalendars) 문서를 참고하세요.

**calendar** 객체는 다음 메서드와 속성을 포함합니다:

## 메서드


- **setWorkTime (config): boolean** - Gantt 차트의 작업 시간을 정의합니다
    - **_config_** - (*object*) - 시간 범위를 설명하는 [구성 객체](api/method/setworktime.md#configurationobjectproperties):
        - **_day?_** - (*string | number*) - 선택 사항, 주중 요일 번호 [0 (일요일) - 6 (토요일)]. 한 번에 하나의 요일만 설정할 수 있습니다
        - **_date?_** - (*Date*) - 선택 사항, 작업 또는 비작업일로 지정할 특정 날짜
        - **_hours?_** - (*string[] | number[] | boolean*) - 선택 사항, 'from'-'to' 쌍으로 된 작업 시간 배열. 'false'는 휴일, 'true' (기본값)는 기본 시간(["8:00-17:00"])을 적용합니다
        - **_customWeeks?_** - (*object*) - 선택 사항, 다양한 기간에 대한 서로 다른 작업 시간 규칙을 정의하는 객체. 키:값 쌍으로 구성되며 키는 기간 이름, 값은 다음 속성을 가진 객체입니다:
            - **_[timespan: string]_** - (*object*) - 작업 시간 설정이 포함된 기간. 키 이름이 기간 이름으로 사용됩니다
                - **_from_** - (*Date*) - 기간 시작 날짜
                - **_to_** - (*Date*) - 기간 종료 날짜
                - **_hours?_** - (*string[] | number[]*) - 선택 사항, 'from'-'to' 쌍으로 된 작업 시간 배열. 'false'는 휴일, 'true' (기본값)는 기본 시간(["8:00-17:00"])을 적용합니다
                - **_days?_** - (*WorkDaysTuple | boolean*) - 선택 사항, 7요소 배열로 주중 요일(0 - 일요일, 6 - 토요일)을 나타내며 1/true는 작업일, 0/false는 비작업일입니다

  
~~~js
calendar.setWorkTime({ hours:["9:00-18:00"] });
~~~

- **unsetWorkTime (config): void** - Gantt 차트에서 작업 시간 설정을 제거합니다
    - **_config_** - (*object*) - 시간 범위를 설명하는 [구성 객체](api/method/unsetworktime.md#configurationobjectproperties):
        - **_day?_** - (*string | number*) - 선택 사항, 주중 요일 번호 [0 (일요일) - 6 (토요일)]. 한 번에 하나의 요일만 설정할 수 있습니다
        - **_date?_** - (*Date*) - 선택 사항, 작업 또는 비작업일로 지정할 특정 날짜
        - **_hours?_** - (*string[] | number[] | boolean*) - 선택 사항, 'from'-'to' 쌍으로 된 작업 시간 배열. 'false'는 휴일, 'true' (기본값)는 기본 시간(["8:00-17:00"])을 적용합니다


~~~js
calendar.unsetWorkTime({ hours:["9:00-18:00"] });
~~~

- **isWorkTime (config, time_unit): boolean** - 지정된 날짜가 작업 시간인지 판단합니다
    - **_config_** - (*Date | object*) - 확인할 Date 객체 또는 시간 범위를 설명하는 [구성 객체](api/method/isworktime.md#configurationobjectproperties):
        - **_date_** - (*Date*) - 확인할 날짜
        - **_unit?_** - (*string*) - 선택 사항, 시간 단위: "minute", "hour", "day", "week", "month", "year"
        - **_task?_** - (*Task*) - 선택 사항, 지속 시간을 고려할 작업 객체
    - **_time_unit?_** - (*string*) - 선택 사항, 시간 단위: "minute", "hour", "day", "week", "month", "year". 첫 번째 매개변수가 객체일 경우 필요하지 않음<br><br>

~~~js
var calendar = gantt.getTaskCalendar(task);
if (calendar.isWorkTime({date: date})){
    alert("worktime of task" + task.text);
}
~~~

- **getClosestWorkTime (config): Date** - 가장 가까운 작업 시간을 찾습니다
    - **_config_** - (*Date | object*) - [구성 객체](api/method/getclosestworktime.md#configurationobjectproperties):
        - **_date_** - (*Date*) - 가장 가까운 작업 시간을 찾을 날짜
        - **_dir?_** - (*string*) - 선택 사항, 검색 방향: "future" 또는 "past"
        - **_unit?_** - (*string*) - 선택 사항, 검색에 사용할 시간 단위
        - **_task?_** - (*Task*) - 선택 사항, 작업 객체의 calendar를 사용

~~~js
calendar.getClosestWorkTime({
    date:new Date(2013,0,1), 
    dir:"future", 
    unit:"hour"
});
~~~


- **calculateEndDate (config, duration, unit): Date** - 작업의 종료 날짜를 계산합니다
    - **_config_** - (*Date | object*) - 작업 시작 날짜 또는 시간 범위를 설명하는 [구성 객체](api/method/calculateenddate.md#configurationobjectproperties):
        - **_start_date_** - (*Date*) - 작업 시작 날짜
        - **_duration_** - (*number*) - 작업 기간
        - **_unit?_** - (*string*) - 선택 사항, 기간의 시간 단위: "minute", "hour", "day", "week", "month", "year"
        - **_task?_** - (*Task*) - 선택 사항, 기간을 계산할 작업 객체
    - **_duration?_** - (*number*) - 선택 사항, 작업 기간. 첫 번째 매개변수가 객체일 경우 필요하지 않음
    - **_unit?_** - (*string*) - 선택 사항, 기간의 시간 단위. 첫 번째 매개변수가 객체일 경우 필요하지 않음<br>

~~~js
var end_date = calendar.calculateEndDate({start_date:date, duration:duration});
~~~

- **calculateDuration (config, end): number** - 작업 기간을 계산합니다
    - **_config_** - (*Date | object*) - 작업 시작 날짜 또는 시간 범위를 설명하는 [구성 객체](api/method/calculateduration.md#configurationobjectproperties):
        - **_start_date_** - (*Date*) - 작업 시작 날짜
        - **_end_date_** - (*Date*) - 작업 종료 날짜
        - **_task?_** - (*Task*) - 선택 사항, 기간을 계산할 작업 객체
    - **_end?_**    - (*Date*) - 작업 종료 날짜. 첫 번째 매개변수가 객체일 경우 필요하지 않음<br>

~~~js
calendar.calculateDuration(new Date(2013,02,15), new Date(2013,02,25));
~~~


## 속성

- **id** - (*string | number*) - 작업 calendar의 식별자

### Related API
- [addCalendar](api/method/addcalendar.md)
- [getCalendar](api/method/getcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md#assigningcalendartotask)

