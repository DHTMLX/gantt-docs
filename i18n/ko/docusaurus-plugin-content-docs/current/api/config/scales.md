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
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: function (date) {
        return "Week #" + gantt.date.getWeek(date);
    }},
    {unit: "day", step: 1, format: "%D", css: function(date) {
    if(!gantt.isWorkTime({ date: date, unit: "day"})){
            return "weekend"
        }
    }}
];
~~~

### Details

배열의 각 항목은 하나의 scale을 나타냅니다. 객체는 다음과 같은 속성을 포함할 수 있습니다:

- **unit** - (*string*) - 스케일 단위를 지정합니다. 옵션으로는 "minute", "hour", "day" (기본값), "week", "quarter", "month", "year"가 있습니다.  
  커스텀 단위도 정의할 수 있습니다. 자세한 내용은 [여기](guides/configuring-time-scale.md#customtimeunits)에서 확인하세요.
- **step?** - (*number*) - 타임 스케일(X축)의 스텝 크기를 정의하며 기본값은 1입니다.
- **format? (date): any** - (*string | Function*) - 스케일 레이블의 형식을 지정합니다. 함수가 제공되면, date 객체를 인자로 받습니다.
    - **_date_** - (*Date*) - 포맷할 날짜
- **date? (date): any** - (*string | Function*) - 스케일 레이블 형식을 지정하는 또 다른 방법으로, 문자열 또는 date 파라미터를 받는 함수를 사용할 수 있습니다.
    - **_date_** - (*Date*) - 포맷할 날짜
- **css? (date): any** - 주어진 날짜를 기준으로 스케일 단위에 적용할 CSS 클래스 이름을 반환하는 함수입니다.
    - **_date_** - (*Date*) - 평가에 사용되는 날짜
- **sticky?** - (*boolean*) - 스케일 셀의 너비가 뷰포트보다 넓을 때 스케일 레이블을 항상 보이도록 유지합니다.
