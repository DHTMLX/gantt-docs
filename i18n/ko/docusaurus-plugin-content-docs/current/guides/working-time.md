---
title: "작업 시간 계산"
sidebar_label: "작업 시간 계산"
---

# 작업 시간 계산

기본적으로, dhtmlxGantt는 작업의 지속 시간을 달력 시간으로 계산합니다. 작업의 최종 지속 시간이 주말 및 공휴일을 포함할 수 있다고 가정합니다.

:::note
다음 글에서 작업의 종료 날짜 형식에 대해 읽어보십시오: [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates)
:::

## 작업 시간 계산 활성화

작업의 지속 시간을 근무 시간으로 계산하도록 하려면 [work_time](api/config/work_time.md) 옵션을 사용합니다:

**작업의 지속 시간이 근무 시간으로 계산되는 모드 활성화 예시**
~~~js
gantt.config.work_time = true;     // 비근무 시간을 계산에서 제거
gantt.config.skip_off_time = true; /*!*/   // 차트에서 비근무 시간 숨기기
 
gantt.init("gantt_here");
~~~

참고로 [skip_off_time](api/config/skip_off_time.md) 구성 옵션은 PRO 버전에서만 사용 가능합니다.

[Duration includes only working days](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)

:::note
[duration_unit](api/config/duration_unit.md)의 값에 따라 dhtmlxGantt는 작업 지속 시간을 서로 다른 시간 단위로 계산합니다(예: duration_unit = "hour"인 경우, 지속 시간은 근무 시간으로 계산됩니다).
:::

![calculating_different_time](/img/calculating_different_time.png)

## 소수 형식의 작업 지속 시간 {#taskdurationindecimalformat}

:::info
This functionality is available only in the PRO edition.
:::

버전 6.3부터 dhtmlxGantt는 [Duration Formatter](guides/formatters-ext.md) 모듈을 통해 소수 형식으로 작업의 지속 시간을 지정할 수 있습니다("2.5 days", "0.5 hours", "3.75 hours").

내부적으로 Gantt는 항상 작업의 지속 시간을 정수 값으로 저장합니다. 반면 제공된 모듈은 사용자가 입력한 포맷에서 Gantt에 저장된 포맷으로 지속 시간을 파싱하도록 해 주며(예: "1.5 hours"를 입력하면 Gantt은 분 단위로 저장하여 `90`이 됩니다). 또한 저장된 값은 읽기 쉬운 형식으로 변환될 수 있습니다(예: `12` hours를 "0.5 days"로 변환).

![decimal_duration](/img/decimal_duration.png)

:::note
작업의 지속 시간은 [duration_unit](api/config/duration_unit.md)으로 지원되는 단위의 분수로 표현될 수 있지만, 분(minutes)은 예외입니다.
:::

### 소수 형식 구현

작업의 지속 시간을 소수 형식으로 표시하려면 아래 로직을 따르십시오:

- [duration_unit](api/config/duration_unit.md)을 minute로 설정
 

~~~js
gantt.config.work_time = true;
gantt.config.duration_unit = "minute"; /*!*/
~~~

다음에 대해 주의하십시오. 소수 형식으로 표시되는 단위보다 더 작은 단위로 작업 지속 시간을 저장해야 합니다. 간단히 다음과 같습니다:

- 사용자가 지속 시간을 시간을 분수로 입력할 수 있도록 하려면 [duration_unit](api/config/duration_unit.md)을 분(minute)으로 설정해야 합니다.

- 사용자가 하루를 분수로 입력하도록 허용하고자 한다면, duration_unit을 hour로 설정해야 합니다. 이 경우 사용자는 "0.5 day"처럼 지속 시간을 입력할 수 있지만, "0.5 hour"는 1시간으로 올림되어 저장되며 지속 시간은 정수 시간으로 저장됩니다.

:::note
기본적으로 작업 날짜는 시간 눈금에 맞추어 스냅됩니다. 만약 시간 눈금이 일 단위로 설정되어 있다면, 같은 날의 서로 다른 시간으로 끌어서 놓기(drag-and-drop)를 가능하게 하려면 이를 비활성화해야 할 수 있습니다.

이를 활성화하려면 [round_dnd_dates](api/config/round_dnd_dates.md)를 비활성화하고 [time_step](api/config/time_step.md)에 적절한 값을 설정해야 합니다.
:::

예를 들면:

~~~js
// 전역 시간 간격이 15분이며, duration_unit은 "minute" 필요
gantt.config.time_step = 15;
gantt.config.round_dnd_dates = false;
~~~

또는

~~~js
// 전역 시간 간격이 1시간이며, duration_unit이 "hour"로 설정된 경우에 사용할 수 있습니다
gantt.config.time_step = 60;
gantt.config.round_dnd_dates = false;
~~~

- *formatter* 객체를 만들어 작업 지속 시간을 포맷하는 방법:

~~~js
// 지속 시간 포맷팅
const formatter = gantt.ext.formatters.durationFormatter({
    enter: "day", 
    store: "minute", // duration_unit
    format: "day",
    hoursPerDay: 8,
    hoursPerWeek: 40,
    daysPerMonth: 30
});
~~~

- Duration 열에 *formatter* 객체를 추가하려면 열 템플릿에서 `template` 속성을 통해 작업의 *포맷된 지속 시간*을 반환하도록 정의합니다:

~~~js
gantt.config.columns = [
    { name: "text", tree: true, width: 170, resize: true, editor: textEditor },
    { name: "start_date", align: "center", resize: true, editor: dateEditor },
    { name: "duration", label: "Duration", resize: true, align: "center",
        template: task => formatter.format(task.duration), width: 100 },
    { name: "add", width: 44 }
];
~~~

- 라이트박스에서 *formatter* 객체를 사용하려면 **time** 컨트롤의 `formatter` 속성으로 설정합니다:

~~~js
gantt.config.lightbox.sections = [
    { name: "description", map_to: "text", type: "textarea", height: 70, focus: true },
    { name: "time", map_to: "auto", type: "duration", formatter: formatter }
];
~~~

- 그리드에서 인라인 편집이 활성화된 경우 durationEditor 객체의 `formatter` 속성에도 *formatter*를 추가해야 합니다:

~~~js
const durationEditor = {
    type: "duration",
    map_to: "duration",
    formatter: formatter, /*!*/
    min: 0,
    max: 1000
};

gantt.config.columns = [
    { name: "text", tree: true, width: 170, resize: true },
    { name: "start_date", align: "center", resize: true },
    { name: "duration", label: "Duration", resize: true, align: "center", 
        template: (task) => formatter.format(task.duration),
        editor: durationEditor, width: 100 },
    { name: "add", width: 44 }
];
~~~ 

:::note
이미 분(minute), 시간(hour) 또는 다른 단위로 지속 시간이 저장된 상태에서 시작했다면 [Duration Formatter](guides/formatters-ext.md) 모듈을 사용해 소수 형식으로 지속 시간을 표시할 수 있습니다.
:::

## 글로벌 설정 {#global-settings}

### 근무 시간 설정

기본 근무 시간은 다음과 같습니다:

- 근무일: 월요일 - 금요일.
- 근무 시간: 8:00 - 12:00, 13:00 - 17:00.

기본 근무 시간을 변경하려면 [setWorkTime](api/method/setworktime.md) 메서드를 사용합니다:

~~~js title="Setting a custom working time"
// 근무일의 근무 시간 변경
gantt.setWorkTime({ hours: ["9:00-18:00"] });

// 모든 금요일을 휴무로 설정
gantt.setWorkTime({ day: 5, hours: false });

// 금요일과 토요일의 근무 시간 변경
gantt.setWorkTime({ day: 5, hours: ["8:00-12:00"] });
gantt.setWorkTime({ day: 6, hours: ["8:00-12:00"] });

// 특정 날짜를 근무일로 설정
gantt.setWorkTime({ date: new Date(2025, 2, 31) });

// 특정 날짜를 비근무일로 설정
gantt.setWorkTime({ date: new Date(2025, 0, 1), hours: false });
~~~

**관련 샘플**: [맞춤 근무일 및 시간](https://docs.dhtmlx.com/gantt/samples/09_worktime/04_custom_workday_duration.html)

### 야간 교대 근무의 근무 시간 설정

[setWorkTime](api/method/setworktime.md) 메서드 구성 객체의 Hours 속성에 대한 근무 시간 설정은 작은 구간에서 큰 구간 순서로, 즉 오름차순으로 지정되어야 합니다. 내림차순으로 설정하면 일부가 무시될 수 있습니다. 아래 예제에서 18:00 이후의 시간 간격은 무시됩니다:

~~~js
// 아래 설정은 올바르지 않은 예시
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00", "14:00-15:00", "08:00-10:00"] });
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00", "00:00-04:00", "05:00-06:00"] });
~~~

야간 근무 시간 설정이 필요하면 아래와 같이 설정합니다:

- 첫째 날은 24시간 이내
- 그다음 날은 24시간 이내

예:

~~~js
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00"] });
gantt.setWorkTime({ day: 6, hours: ["00:00-04:00", "05:00-06:00"] });
~~~

### 근무 시간 규칙 구성

[setWorkTime()](api/method/setworktime.md) 메서드의 **customWeeks** 속성을 사용하여 한 달력 내에서 서로 다른 기간의 근무 시간 규칙을 구성할 수 있습니다. 예를 들어 겨울철에 기본 근무 시간을 다르게 적용할 수 있습니다:

~~~js
//겨울 months에 대한 근무 시간 변경
gantt.setWorkTime({
    customWeeks: {
        winter: {
            from: new Date(2025, 11, 1), // 2025년 12월 1일
            to: new Date(2026, 2, 1), // 2026년 3월 1일
            hours: ["9:00-13:00", "14:00-16:00"],
            days: [1, 1, 1, 1, 0, 0, 0]
        }
    }
});
~~~

필요 시 [duration_unit](api/config/duration_unit.md)을 *"minute"*로 설정하면 시/분 단위까지 근무 시간을 지정할 수 있습니다.

~~~js title="Setting a custom working time up to minutes"
gantt.config.duration_unit = "minute";

// 분 단위까지 근무 시간 설정
gantt.setWorkTime({ hours: ["8:15-12:45"] });
~~~

:::note
버전 7.0까지 사용된 형식의 근무 시간 설정은 기존과 동일하게 작동합니다:

~~~js
gantt.setWorkTime({ hours: [9, 18] });
~~~
:::

### 근무 시간 규칙 재작성

참고로 같은 날짜에 대해 메서드의 다음 호출은 이전의 근무 시간 규칙을 덮어씁니다. 따라서 특정 규칙의 설정을 제거해야 한다면 다른 구성으로 [setWorkTime](api/method/setworktime.md) 메서드를 호출하십시오:

~~~js
gantt.setWorkTime({ hours: ["8:00-12:00"] });
gantt.setWorkTime({ hours: ["13:00-17:00"] });
// 위 명령들의 결과는 13:00-17:00의 근무 시간이 됩니다.
// 두 명령의 조합으로 얻어지는 혼합이 아닙니다.
~~~

### 맞춤 근무일/휴무일 설정

근무 시간 설정에 포함된 모든 근무 시간이 한 주에 없으면 적용할 수 없다는 점에 유의하십시오. 예를 들어 아래와 같이 설정하는 경우:

~~~js
gantt.setWorkTime({ day: 0, hours: [] });
gantt.setWorkTime({ day: 1, hours: [] });
gantt.setWorkTime({ day: 2, hours: [] });
gantt.setWorkTime({ day: 3, hours: [] });
gantt.setWorkTime({ day: 4, hours: [] });
gantt.setWorkTime({ day: 5, hours: [] });
gantt.setWorkTime({ day: 6, hours: [] });
~~~

그 결과 Gantt는 근무일 중 하나에 대해 메서드 적용을 무시하고, 근무 시간이 남아 있게 됩니다. 

만약 특정 날짜에서 가장 가까운 근무 시간이나 지속 시간을 계산하려고 하면 그러한 날짜나 지속 시간이 존재하지 않게 됩니다. 이는 이러한 달력을 설정하는 것이 의미가 없다는 뜻입니다. 근무일/근무 시간이 포함된 날짜 범위를 벗어나 날짜를 계산하려고 하면 날짜가 없거나 여러 오류가 발생합니다.

필요한 범위 내에서 근무일/근무 시간을 지정하려면 다음과 같이 해야 합니다:

- 기간을 근무 시간이 없는 구간으로 나누기
- 필요한 날짜에 대해 근무 시간을 설정하기

~~~js
gantt.setWorkTime({ date: new Date(2025, 3, 10), hours: ["8:00-12:00"] })
gantt.setWorkTime({ date: new Date(2025, 3, 11), hours: ["13:00-17:00"] })

gantt.setWorkTime({
    customWeeks: {
        period1: {
            from: new Date(2025, 3, 1),
            to: new Date(2025, 3, 10),
            hours: false,
        },

        period2: {
            from: new Date(2025, 3, 12),
            to: new Date(2025, 5, 1),
            hours: false,
        },

    }
});
~~~

**Related sample** [Using `customWeeks` to make all days in the calendar days-off](https://snippet.dhtmlx.com/i0o74zg7)

### 근무 시간 해제하기 {#unsetting-the-working-time}

[unsetWorkTime](api/method/unsetworktime.md) 메서드를 사용하여 근무 시간을 해제할 수 있습니다:

~~~js
// 근무일의 근무 시간을 ["8:00-17:00"]에서 ["8:00-12:00"]으로 변경
gantt.setWorkTime({ hours: ["8:00-12:00"] });
// 근무 시간 해제
gantt.unsetWorkTime({ hours: ["8:00-12:00"] });
~~~

### 근무 시간 확인하기

지정한 날짜가 근무 시간인지 확인하려면 [isWorkTime](api/method/isworktime.md) 메서드를 사용합니다:

~~~js
// 2025년 1월 1일을 휴무일로 설정
gantt.setWorkTime({ date: new Date(2025, 0, 1), hours: false });
gantt.isWorkTime(new Date(2025, 0, 1)); // -> false  /*!*/

// 2025년 3월 15일을 9:00부터 18:00까지의 근무일로 설정
gantt.setWorkTime({ date: new Date(2025, 2, 15), hours: ["8:00-17:00"] });
gantt.isWorkTime(new Date(2025, 2, 15, 10, 0), "hour"); // -> true  /*!*/
gantt.isWorkTime(new Date(2025, 2, 15, 8, 0), "hour"); // -> false  /*!*/
~~~

**관련 샘플**: [Correct task position on drag](https://docs.dhtmlx.com/gantt/samples/09_worktime/05_adjust_to_worktime.html)

### 근무 시간 가져오기

지정한 날짜의 근무 시간을 가져오려면 [getWorkHours](api/method/getworkhours.md) 메서드를 사용합니다:

~~~js
gantt.getWorkHours(new Date(2025, 3, 30)); // -> ["8:00-17:00"]
~~~

지정한 날짜에서 가장 가까운 근무일을 가져오려면 [getClosestWorkTime](api/method/getclosestworktime.md) 메서드를 사용합니다:

~~~js
gantt.getClosestWorkTime(new Date(2025, 3, 30));
~~~

### 특정 근무 시간 반복 지정하기

프로젝트 전체 기간 동안 특정 요일에만 반복되는 근무 시간을 지정해야 할 때가 있습니다(예: 매달 마지막 금요일은 단축 근무일, 12월 25일은 공휴일).

현재 버전의 dhtmlxGantt는 이러한 유형의 근무 시간을 설정하기 위한 별도의 구성을 제공하지 않습니다.

라이브러리는 다음만 허용합니다:

- 요일 단위로 근무 시간 지정하기 (월요일, 화요일...)
- 특정 날짜에 대해 근무 시간 지정하기 (2025년 6월 4일)
- 날짜 범위에 대해 근무 시간 규칙 재정의하기 (2025년 6월 1일 - 2025년 9월 1일)

따라서 근무 시간 규칙에 예외가 있는 경우, 규칙에 맞는 날짜를 직접 구해 각 날짜마다 개별적으로 근무 시간 설정을 적용해야 합니다.

예를 들어 5년간 지속되는 프로젝트가 있고, 1월 1일을 휴무일로, 매달 마지막 금요일을 단축 근무일로 설정하고자 한다고 가정해 보겠습니다.

1월 1일을 휴무일로 지정하려면 다음과 같이 값을 직접 하드코딩하면 됩니다:

~~~js
gantt.setWorkTime({ hours: false, date: new Date(2025, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2026, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2027, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2028, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2029, 0, 1) });
~~~

그리고 아래는 프로젝트 전체 기간 동안 매달 마지막 금요일을 단축 근무일로 설정하는 코드 예시입니다:

~~~js
const lastFridayOfMonth = (date) => {
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    if (lastDay.getDay() < 5) {
        lastDay.setDate(lastDay.getDate() - 7);
    }

    lastDay.setDate(lastDay.getDate() - (lastDay.getDay() - 5));

    return lastDay;
};

const projectStart = new Date(2025, 5, 1);
const projectEnd = new Date(2026, 5, 1);
let currentDate = new Date(projectStart);

while (currentDate <= projectEnd) {
    const lastFriday = lastFridayOfMonth(currentDate);
    gantt.setWorkTime({ hours: ["8:00-12:00", "13:00-15:00"], date: lastFriday });
    currentDate = gantt.date.add(currentDate, 1, "month");
}
~~~

### 휴무 시간 색상 지정

차트 영역에서 휴무 시간에 색상을 입히려면 timeline_cell_class 템플릿을 사용합니다:

~~~js
gantt.templates.timeline_cell_class = (task, date) => 
    !gantt.isWorkTime({ task, date }) ? "week_end" : "";
~~~

**관련 샘플**: [맞춤 근무일 및 시간](https://docs.dhtmlx.com/gantt/samples/09_worktime/04_custom_workday_duration.html)

더 자세한 내용은 [Highlighting Time Slots](guides/highlighting-time-slots.md) 문서를 참조하십시오.

:::note
일반 근무 시간이 휴일 시간으로 숨겨지도록 하려면 문서의 방법을 사용하십시오 - [Hiding Time Units in the Scale](guides/custom-scale.md).
:::

## 다중 작업 시간 달력 {#multipleworktimecalendars}

전역 근무 시간 설정 외에도 Gantt는 여러 작업 시간 달력을 만들 수 있습니다. 이를 개별 작업이나 작업 그룹에 할당할 수 있습니다.

### 작업 달력 생성

새 달력 인스턴스는 [createCalendar](api/method/createcalendar.md) 메서드를 사용해 생성할 수 있습니다.

이 메서드는 두 가지 가능한 옵션을 가정합니다:

- 매개변수 없이 호출하면 전체 시간 달력: 하루 24시간, 주 7일

~~~js
const calendar = gantt.createCalendar();
~~~

- 이미 준비된 달력이 있고 다른 옵션으로 새로운 달력을 만들고자 할 때는, 달력을 매개변수로 전달해 [createCalendar](api/method/createcalendar.md) 메서드를 호출할 수 있습니다

~~~js
const newCalendar = gantt.createCalendar(calendar);
~~~

달력 객체는 처음에는 Gantt에서 분리되어 있으며, Gantt에 추가되기 전에는 아무 효과도 가질 수 없습니다.

### Gantt에 작업 달력 추가

달력을 생성한 후에는 [addCalendar](api/method/addcalendar.md) 메서드를 통해 Gantt에 추가해야 합니다. 다시 말해 두 가지 방법이 있습니다:

- 기존 달력 구성을 추가하기

~~~js
const calendarId = gantt.addCalendar(calendar);
~~~

- 달력 ID와 근무 시간 정보를 포함하는 새로운 달력 구성을 추가하기

~~~js
const calendarId = gantt.addCalendar({
    id: "custom", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});
~~~

:::note
이 옵션은 달력 생성에도 사용할 수 있습니다.
:::

### 서로 다른 시간 구간에 대한 서로 다른 근무 시간 설정 {#rules_for_periods}

v7.1부터는 하나의 달력 내에서 서로 다른 기간의 근무 시간 규칙을 설정하는 기능이 추가되었습니다. 예를 들어 겨울철에 별도의 일정표를 적용하려면 [addCalendar](api/method/addcalendar.md) 메서드의 **customWeeks** 속성을 사용하면 됩니다:

~~~js
const calendarId = gantt.addCalendar({
    id: "global", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1],
        customWeeks: {
            winter: {
                from: new Date(2025, 11, 1), // December 1st, 2025
                to: new Date(2026, 2, 1), // March 1st, 00:00, 2026
                hours: ["9:00-13:00", "14:00-16:00"],
                days: [1, 1, 1, 1, 0, 0, 0]
            }
        }
    }
});
~~~

**관련 샘플**: [Different worktimes for different time periods](https://docs.dhtmlx.com/gantt/samples/09_worktime/12_calendar_ranges.html)

duration_unit를 *"minute"*로 설정하면 시간에서 분까지의 단위로 근무 시간을 지정할 수 있습니다.

~~~js title="Setting a custom working time up to minutes"
gantt.config.duration_unit = "minute";

// 분 단위까지 근무 시간 설정
gantt.setWorkTime({ hours: ["8:15-12:45"] });
~~~

:::note
버전 7.0까지 사용된 형식의 근무 시간 설정은 이전과 동일하게 계속 작동합니다:

~~~js
gantt.setWorkTime({ hours: [9, 18] });
~~~
:::

### 근무 시간 변경하기

[setWorkTime()](api/method/setworktime.md) 메서드를 통해 필요한 달력의 특정 날짜에 대한 근무 시간을 변경할 수 있습니다:

~~~js
const calendar = gantt.getCalendar("custom");
calendar.setWorkTime({ day: 6, hours: ["8:00-12:00"] });
calendar.setWorkTime({ date: new Date(2025, 0, 1), hours: ["8:00-12:00"] });
~~~

### 달력 가져오기 {#getting-calendars}

이후에 작업할 근무 달력의 객체를 가져올 수 있습니다. 사용할 수 있는 몇 가지 옵션은 아래에서 설명합니다.

#### 전역 Gantt 달력 가져오기

[getCalendar](api/method/getcalendar.md) 메서드를 사용하여 전역 Gantt 달력의 객체를 가져옵니다:

~~~js
const calendar = gantt.getCalendar(id);
~~~

*calendar* 객체는 [calendar](api/other/calendar.md) 인터페이스의 인스턴스입니다.

기본 달력 인스턴스(전역 설정)는 미리 정의된 **"global"** id로 접근할 수 있습니다:

~~~js
const globalSettings = gantt.getCalendar("global");
~~~

다른 달력이 지정되지 않은 경우 이 달력이 [작업 시간 메서드](guides/working-time.md#global-settings)에서 사용됩니다. 기본적으로 작업에 할당되는 달력이기도 합니다.

#### 작업의 현재 달력 가져오기

특정 작업에 할당된 근무 달력의 객체를 가져오려면 [getTaskCalendar](api/method/gettaskcalendar.md) 메서드를 사용합니다. 이 메서드에는 작업 객체를 전달해야 합니다:

~~~js
const task = gantt.getTask(taskId);
const calendar = gantt.getTaskCalendar(task);

if (calendar.isWorkTime(date)) {
    alert("TaskWorkTime");
}
~~~

**관련 샘플**: [Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)

Gantt 구성에서 근무 시간이 비활성화되어 있으면 이 메서드는 24시간 연중무휴 근무 달력을 반환합니다.

### 전역 메서드로 달력에 접근하기

Gantt 객체의 [작업 시간 메서드](guides/working-time.md#global-settings)를 사용하면 작업의 달력에 직접 접근하지 않고도 특정 작업의 시간 지속 기간을 계산할 수 있습니다.

이 경우 메서드는 관련 "task" 객체를 속성 중 하나로 전달받는 객체 인수를 받습니다.

- [**gantt.isWorkTime**](api/method/isworktime.md)

~~~js
if (gantt.isWorkTime({ date: date, task: task })) {
    alert(`Work time of a task: ${task.text}`);
}
~~~

이는 다음과 동일합니다:

~~~js
const calendar = gantt.getTaskCalendar(task);

if (calendar.isWorkTime({ date: date })) {
    alert(`Work time of a task: ${task.text}`);
}
~~~

- [**gantt.calculateEndDate**](api/method/calculateenddate.md)

~~~js
const endDate = gantt.calculateEndDate({  
    start_date: date, duration: duration, task: task  
});
// or
const endDate = gantt.calculateEndDate(task);
~~~

- [**gantt.calculateDuration**](api/method/calculateduration.md)

~~~js
const duration = gantt.calculateDuration({  
    start_date: start, end_date: end, task: task  
});
// or
const duration = gantt.calculateDuration(task);
~~~

- [**gantt.getClosestWorkTime**](api/method/getclosestworktime.md)

~~~js
const closestTime = gantt.getClosestWorkTime({ date: date, task: task });
~~~

### 모든 Gantt 달력 가져오기

Gantt에 추가된 모든 달력(전역 달력과 개별 작업에 할당된 달력 모두)을 가져오려면 [getCalendars](api/method/getcalendars.md) 메서드를 사용합니다:

~~~js
const calendars = gantt.getCalendars();
~~~

이 메서드는 [Calendar 인터페이스](api/other/calendar.md) 객체의 배열을 반환합니다.

### 달력 삭제하기

더 이상 필요하지 않은 달력은 [deleteCalendar](api/method/deletecalendar.md) 메서드로 간단히 삭제할 수 있습니다.
이 메서드에는 달력 id를 전달해야 합니다:

~~~js
// 달력 추가
gantt.addCalendar({
    id: "custom",
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});

// 달력 삭제
gantt.deleteCalendar("custom");
~~~

## 작업에 달력 할당하기 {#assigningcalendartotask}

작업에 근무 달력을 할당하려면 달력 id와 근무일 및 근무 시간을 포함하는 **worktime** 객체를 설정해야 합니다:

~~~js
gantt.addCalendar({
    id: "custom", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});
~~~

그런 다음 작업 객체의 **"calendar_id"** 속성 값으로 해당 달력의 id를 설정합니다:

~~~js
{
    id: 2, text: "Task #1", start_date: "02-04-2025", duration: 8,
    calendar_id: "custom" /*!*/
}
~~~

[calendar_property](api/config/calendar_property.md) 구성 옵션을 통해 작업에 달력을 연결하는 속성의 이름을 변경할 수 있습니다:

~~~js
gantt.config.calendar_property = "property_name";
~~~

**관련 샘플**: [Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)

## 리소스에 달력 할당하기 {#assigningcalendartoresource}

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

특정 리소스(인력, 장비 등)가 필요한 작업에 특정 근무 달력을 할당하는 것도 가능합니다.

예를 들어 작업이 할당된 사용자에 따라 개별 달력을 설정할 수 있습니다. 순서는 다음과 같습니다:

- [resource_property](api/config/resource_property.md) 구성 속성을 통해 리소스 id를 저장할 작업 객체의 속성을 정의합니다. 아래 예시에서는 **user**라는 속성에 사용자의 id를 저장합니다:

~~~js
gantt.config.resource_property = "user";
~~~

- [resource_calendars](api/config/resource_calendars.md) 구성 옵션을 사용하여 각 사용자에 대해 원하는 달력을 추가하고, 이 달력들을 하나의 객체로 그룹화합니다.

~~~js
gantt.config.resource_calendars = {
    1 : gantt.addCalendar({
        worktime: {
            days: [0, 1, 1, 1, 1, 1, 0]
        }
    }),
    2 : gantt.addCalendar({
        worktime: {
            days: [1, 0, 0, 0, 0, 0, 1]
        }
    }),
    3 : gantt.addCalendar({
        worktime: {
            days: [0, 1, 1, 1, 0, 1, 1]
        }
    })
};
~~~

이 객체는 *key:value* 쌍의 집합으로 구성되며, key는 리소스의 id이고 value는 [addCalendar](api/method/addcalendar.md) 메서드가 반환하는 달력의 id에 해당합니다.

- 작업 구성 객체에 **user** 속성을 지정합니다.
이 속성의 값으로는 **resource_calendars** 구성 옵션에서 정의한 객체의 key 중 필요한 달력의 key를 사용합니다:

~~~js
{ id: 1, user: 1, text: "Project #2", start_date: "01-04-2025", duration: 5 },
{ id: 2, user: 0, text: "Task #1", start_date: "02-04-2025", duration: 2 },
{ id: 3, user: 2, text: "Task #2", start_date: "11-04-2025", duration: 4 },
{ id: 4, user: 3, text: "Task #3", start_date: "13-04-2025", duration: 3 },
{ id: 5, user: 0, text: "Task #1.1", start_date: "02-04-2025", duration: 7 },
{ id: 6, user: 1, text: "Task #1.2", start_date: "03-04-2025", duration: 7 }
~~~

[Resource level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/07_resource_calendars.html)

:::note
작업에 커스텀 달력과 리소스 달력이 모두 지정된 경우, 커스텀 달력이 더 높은 우선순위를 가지며 리소스 달력 설정을 재정의합니다.
:::

### 여러 달력의 병합 {#mergingcalendars}

v7.0부터 다중 달력을 하나로 병합하는 기능이 가능합니다.

예를 들어 같은 작업에 서로 다른 근무 달력을 가진 두 명의 리소스를 설정하고자 할 때, 첫 번째 달력의 근무 시간이 9:00-15:00이고 다른 달력의 근무 시간이 12:00-17:00인 경우 이들을 병합하면 12:00-15:00의 근무 시간으로 한 달력이 만들어집니다.

동적으로 달력 병합을 자동으로 활성화하려면 [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) 구성을 true로 설정합니다:

~~~js
gantt.config.dynamic_resource_calendars = true;
~~~

**관련 샘플**: [Merge work Calendars of different resources](https://docs.dhtmlx.com/gantt/samples/09_worktime/10_merge_calendars.html)

또한 [mergeCalendars](api/method/mergecalendars.md) 메서드를 사용해 수동으로도 달력을 병합할 수 있습니다:

~~~js
const johnCalendarId = gantt.addCalendar({
    worktime: {
        hours: ["0:00-24:00"],
        days: [0, 1, 1, 1, 1, 1, 0]
    }
});

const mikeCalendarId = gantt.addCalendar({
    worktime: {
        hours: ["8:00-12:00", "13:00-17:00"],
        days: [0, 1, 1, 1, 1, 1, 0]
    }
});

const joinedCalendar = gantt.mergeCalendars(
    gantt.getCalendar(mikeCalendarId),
    gantt.getCalendar(johnCalendarId)
);
~~~

더 자세한 병합 로직은 [mergeCalendars()](api/method/mergecalendars.md) 문서를 참조하십시오.

## 프로젝트에 달력 할당 {#assigning-calendar-to-project}

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

작업뿐만 아니라 프로젝트에도 근무 달력을 지정하여 상위 프로젝트에 할당된 달력을 하위 태스크들이 상속받도록 할 수 있습니다. 태스크가 상위 프로젝트의 달력을 상속받는 로직은 다음과 같습니다:

- 사용자가 하위 프로젝트에 달력을 할당하면 해당 프로젝트의 모든 태스크가 이 달력을 사용합니다.
- 태스크에 개인 달력이 지정되어 있으면, 상위 프로젝트의 달력 대신 이 달력을 사용합니다.

이 기능을 활성화하려면 [inherit_calendar](api/config/inherit_calendar.md) 설정 옵션을 *true*로 설정해야 합니다. 기본값은 비활성화되어 있습니다.

~~~js
gantt.config.inherit_calendar = true;
~~~

- *true*인 경우, 달력이 할당되지 않은 태스크는 요약 상위 태그의 달력을 사용합니다(그 상위 역시 달력을 가지고 있을 수 있습니다).
- *false*인 경우, 달력이 할당되지 않은 태스크는 글로벌 달력을 사용합니다.

아래 예에서 태스크들은 기본적으로 상위 프로젝트로부터 달력을 상속받지만, 특정 태스크에 다른 달력이 할당된 경우 이 달력이 우선적으로 사용됩니다. 따라서 "Task #2.2"와 "Task #3"는 상위 프로젝트와 달리 "Full week" 달력을 사용합니다.

![Working calendar for project](/img/working_calendar_project.png)

**관련 샘플**: [Project level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/08_project_calendars.html)

## 달력의 동적 변경

v7.0부터 Gantt는 태스크 달력의 변경을 감지하고 자동으로 작업 시간을 재계산합니다.

다만 달력이 바뀌었을 때 태스크 일정을 수동으로 업데이트할 수도 있습니다. 예를 들어 라이트박스에서 달력 변경이 가능할 수 있습니다:

~~~js
const updateTaskTiming = (task) => {
    task.start_date = gantt.getClosestWorkTime({
        dir: "future",
        date: task.start_date,
        unit: gantt.config.duration_unit,
        task: task
    });
    task.end_date = gantt.calculateEndDate(task);
};

gantt.attachEvent("onLightboxSave", (id, task, is_new) => {
    updateTaskTiming(task);
    return true;
});
~~~

또는 필요에 따라 모든 태스크의 재계산을 아래처럼 수동으로 수행할 수 있습니다:

~~~js
gantt.batchUpdate(() => {
    gantt.eachTask((task) => {
        task.start_date = gantt.getClosestWorkTime({
            dir: "future",
            date: task.start_date,
            unit: gantt.config.duration_unit,
            task: task
        });
        task.end_date = gantt.calculateEndDate(task);
        gantt.updateTask(task.id);
    });
});
~~~

**관련 샘플**: [Toggle working time settings and move the task to the working date](https://snippet.dhtmlx.com/6cvo9dy9)

**관련 샘플**: [Toggle working time settings and recalculate the task's end dates](https://snippet.dhtmlx.com/wb8vc82p)

## Day/Week 눈금에서의 작업 막대의 근무 시간 기반 표시

v9.1부터 Gantt는 작업 객체의 구성에서 `projection` 설정을 지정할 수 있습니다. 이 속성을 사용하면 Day 및 Week 눈금에서의 작업 막대의 위치와 크기를 00:00-24:00 간격이 아닌 근무 시간 기준으로 설정할 수 있습니다.

근무 시간 표준의 시각화 가능성에 대한 자세한 설명은 관련 가이드의 [scale projection] 섹션에서 확인하십시오. (guides/configuring-time-scale.md#workhourawaretaskbarsrenderingindayweekscales)
