---
sidebar_label: scales
title: scales config
description: "타임 스케일 구성을 설정합니다."
---

# scales

### Description

@short: 타임 스케일 구성을 설정합니다.

@signature: scales: Scales

### Example

~~~jsx
gantt.config.scales = [
    { unit: "month", step: 1, format: "%F, %Y" },
    {
        unit: "week",
        step: 1,
        format: (date) => `Week #${gantt.date.getWeek(date)}`
    },
    {
        unit: "day",
        step: 1,
        format: "%D",
        css: (date) => !gantt.isWorkTime({ date, unit: "day" }) ? "weekend" : ""
    }
];
~~~

### Details

배열의 각 객체는 단일 스케일을 정의합니다. 객체는 다음 속성을 가질 수 있습니다:

- **unit** - (*string*) - 스케일 단위의 이름. 사용 가능한 값은: "minute", "hour", "day" (기본값), "week", "quarter", "month", "year".
  또한 사용자 정의 유닛을 설정하는 것도 가능합니다. 주제에 대한 자세한 내용은 [here](guides/configuring-time-scale.md#customtimeunits)를 참조하십시오.
- **step?** - (*number*) - 시간 축의 스텝( X-Axis ), 기본값은 1.
- **format? (date): any** - (*string | Function*) - 스케일 레이블의 형식. 함수로 설정하면 매개변수로 Date 객체를 기대합니다.
    - **_date_** - (*Date*) - 변환될 날짜
- **date? (date): any** - (*string | Function*) - 스케일 레이블의 형식. 함수로 설정하면 매개변수로 Date 객체를 기대합니다.
    - **_date_** - (*Date*) - 변환될 날짜
- **css? (date): any** - 스케일 단위에 적용될 CSS 클래스의 이름을 반환하는 함수. Date 객체를 매개변수로 받습니다.
    - **_date_** - (*Date*) - 검사될 날짜
- **sticky?** - (*boolean*) - 뷰포트 너비보다 스케일 셀이 더 큰 경우 스케일 레이블이 보이도록 합니다.