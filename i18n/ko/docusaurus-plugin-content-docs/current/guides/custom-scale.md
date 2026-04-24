---
title: "스케일에서 시간 단위 숨기기"
sidebar_label: "스케일에서 시간 단위 숨기기"
---

# 스케일에서 시간 단위 숨기기

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

라이브러리는 차트의 시간 축에서 불필요한 시간 단위를 숨길 수 있는 기능을 제공합니다. 예를 들어 근무일만 표시하고 주말은 숨기는 데 이 기능을 사용할 수 있습니다. 


일반적으로 시간 축의 시간 단위를 숨기려면 **ignore_time** 메서드를 사용해야 합니다.
이 메서드는 셀의 날짜를 매개변수로 받는 함수입니다. 단위를 숨기려면 해당 단위에 대해 *true*를 반환합니다. 


예를 들어 주말을 축에서 숨기려면 아래와 같이 메서드를 사용합니다:

~~~js
// 0은 일요일, 6은 토요일
gantt.ignore_time = function(date){
   if(date.getDay() == 0 || date.getDay() == 6)
      return true;
};
~~~

![skipped_weekends](/img/skipped_weekends.png)


[주말을 스케일에서 표시하지 않기](https://docs.dhtmlx.com/gantt/samples/03_scales/09_skip_weekends.html)


:::note
참고로 축에서 시간 단위를 숨겨도 이 단위들이 작업 기간 계산에서 제외되지는 않습니다. 숨겨진 단위를 기간 계산에서 제외하려면 [작업 시간 계산](guides/working-time.md) 글에 설명된 기법을 사용하세요.
:::

참고로 [일하는 시간 계산](guides/working-time.md)를 사용할 때는 하드코딩된 값 대신 [isWorkTime](api/method/isworktime.md)를 사용할 수 있습니다:

~~~js
gantt.ignore_time = function(date){
   if(!gantt.isWorkTime(date))
      return true;
};
~~~


[작업 시간 계산 예제](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)


참고로 **ignore_time** 메서드는 스케일을 수정하지 않습니다. 아래 예제들은 근무 시간이 없는 셀을 숨기는 경우를 설명합니다.

예제 1

하루 스케일은 00:00에 시작하여 23:59에 끝나고, 근무 시간은 08:00에 시작하여 16:59에 끝납니다. 시간 단위의 최소 스케일을 가지고 있습니다. **ignore_time** 메서드가 적용되면 근무 시간이 아닌 셀은 모든 스케일에서 숨겨집니다. 따라서 하루 스케일은 08:00에 시작하여 16:59에 끝납니다. 다만 단일 하루 스케일인 경우에는 변경되지 않습니다. 하루 안에 근무 시간이 있기 때문이므로 00:00에서 23:59로 유지됩니다.

예제 2

주 스케일은 7일로 구성되어 있으며 그 중 2일은 휴무일(예: 토요일과 일요일)입니다. 일 단위의 최소 스케일을 가지고 있습니다. **ignore_time** 메서드가 적용되면 휴무일은 숨겨지며 주 스케일은 월요일부터 금요일까지 렌더링됩니다. 다만 주 스케일만 있는 경우 주는 월요일에 시작하여 일요일에 끝나게 됩니다. 왜냐하면 주에 휴일이 있기 때문입니다.

숨겨진 시간 단위를 가진 차트를 렌더링하는 방법은 두 가지가 있습니다:

- 더 작은 단위의 스케일을 추가하는 방법(예: 하루 스케일에는 시간 단위, 주 스케일에는 하루 단위 등)
- [custom scale](guides/configuring-time-scale.md#customtimeunits)를 추가하여 오직 근무 시간/일만 렌더링되도록 하는 방법

**관련 샘플** [스케일에서 주 5일 근무](https://snippet.dhtmlx.com/eq70o558)

### 관련 
-  [작업 시간 계산](guides/working-time.md)
-  [스케일 설정](guides/configuring-time-scale.md)