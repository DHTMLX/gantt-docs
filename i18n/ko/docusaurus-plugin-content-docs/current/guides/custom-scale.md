---
title: "스케일에서 시간 단위 숨기기"
sidebar_label: "스케일에서 시간 단위 숨기기"
---

# 스케일에서 시간 단위 숨기기


:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

이 라이브러리는 차트의 시간 스케일에서 불필요한 시간 단위를 숨길 수 있도록 지원합니다. 예를 들어, 주말을 제외하고 평일만 표시하고 싶을 때 유용하게 사용할 수 있습니다.

스케일에서 시간 단위를 숨기려면 일반적으로 **ignore_time** 메서드를 사용합니다. 이 메서드는 셀의 날짜를 매개변수로 받는 함수입니다. 특정 단위를 숨기려면, 해당 날짜에 대해 함수가 *true*를 반환해야 합니다.

예를 들어, 주말을 스케일에서 숨기려면 다음과 같이 메서드를 사용할 수 있습니다:

~~~js
// 0은 일요일, 6은 토요일을 의미합니다.
gantt.ignore_time = function(date){
   if(date.getDay() == 0 || date.getDay() == 6)
      return true;
};
~~~

![skipped_weekends](/img/skipped_weekends.png)


[Not render weekends on the scale](https://docs.dhtmlx.com/gantt/samples/03_scales/09_skip_weekends.html)


:::note
스케일에서 시간 단위를 숨겨도 작업 기간 계산에서 해당 단위가 제거되는 것은 아닙니다. 숨겨진 단위를 작업 기간 계산에서 제외하려면,
[작업 시간 계산](guides/working-time.md) 문서에 설명된 방법을 참고하세요.
:::

[작업 시간 계산](guides/working-time.md)을 사용할 때는, 하드코딩된 값 대신 [isWorkTime](api/method/isworktime.md)를 사용할 수 있습니다:

~~~js
gantt.ignore_time = function(date){
   if(!gantt.isWorkTime(date))
      return true;
};
~~~


[Calculate working hours](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)


**ignore_time** 메서드는 실제 스케일 자체를 변경하지 않는다는 점에 유의해야 합니다. 아래는 근무 시간이 없는 셀이나 근무일이 아닌 셀이 숨겨지는 예시입니다.

예시 1

하루 스케일이 00:00부터 23:59까지이고, 근무 시간이 08:00부터 16:59까지인 경우를 가정합니다. 최소 스케일이 시간 단위이고 **ignore_time**을 적용하면, 근무 시간이 아닌 셀은 모든 스케일에서 숨겨집니다. 즉, 하루 스케일은 실질적으로 08:00부터 16:59까지만 표시됩니다. 그러나 하루 스케일만 있는 경우에는, 해당 날에 근무 시간이 존재하므로 00:00부터 23:59까지 변함없이 표시됩니다.

예시 2

주간 스케일이 7일(월~일)로 구성되어 있고, 이 중 2일(예: 토요일, 일요일)이 휴일인 경우를 가정합니다. 최소 스케일이 일 단위이고 **ignore_time**이 적용되면, 휴일은 숨겨져 주간 스케일에는 월요일부터 금요일까지만 표시됩니다. 그러나 주간 스케일만 있는 경우에는, 주에 휴일이 포함되어 있으므로 여전히 월요일부터 일요일까지 표시됩니다.

숨겨진 시간 단위가 있는 차트를 표시하는 방법은 두 가지가 있습니다:

- 더 작은 단위의 스케일을 추가합니다(예: 하루 스케일과 함께 시간 스케일, 주간 스케일과 함께 하루 스케일 등).
- [사용자 정의 스케일](guides/configuring-time-scale.md#customtimeunits)을 사용하여 근무 시간 또는 근무일만 렌더링합니다.


**Related example:** [스케일에서 5일 근무 주 표시](https://snippet.dhtmlx.com/eq70o558)


