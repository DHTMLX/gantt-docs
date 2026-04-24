---
sidebar_label: init
title: init method
description: "컨테이너 안에 dhtmlxGantt를 초기화합니다"
---

# init

### Description

@short: 컨테이너 안에 dhtmlxGantt를 초기화합니다

@signature: init: (container: string | HTMLElement, from?: Date, to?: Date) =\> void

### Parameters

- `container` - (필수) *string* - | HTMLElement HTML 컨테이너(또는 그 ID)에서 dhtmlxGantt 객체가 초기화됩니다

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
gantt.load("tasks.json");
~~~

### Details

메서드의 두 번째 및 세 번째 매개변수를 사용하면 시간 축의 경계 값을 설정하는 좋은 방법입니다:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

참고로 `gantt.init` 메서드의 날짜 매개변수는 [start_date](api/config/start_date.md) 및 [end_date](api/config/end_date.md) 구성의 축약형입니다.
아래의 두 코드 스니펫은 서로 동등합니다:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

그리고

~~~js
gantt.config.start_date = new Date(2023, 08, 10);
gantt.config.end_date = new Date(2023, 08, 20);
gantt.init("gantt_here");
~~~

이 구성은 표시되는 날짜 범위를 정의하고 제한합니다. 지정된 범위를 벗어나는 작업은 표시되지 않습니다.

`gantt.init` 메서드의 날짜 매개변수와 [start_date](api/config/start_date.md) 및 [end_date](api/config/end_date.md) 구성이 [fit_tasks](api/config/fit_tasks.md) 설정을 취소합니다.

시간 범위에 따라 시간 축을 동적으로 조정하고 싶다면 이 매개변수를 건너뛰거나 [시간 범위를 동적으로 관리합니다](guides/configuring-time-scale.md#range).

:::note
이 메서드는 타임라인 영역에 추가된 사용자 정의 레이어를 [addTaskLayer](api/method/addtasklayer.md) 및 [addLinkLayer](api/method/addlinklayer.md) 메서드를 통해 재설정합니다. 따라서 페이지에 맞춤 레이어가 표시되려면 **gantt.init** 메서드를 호출한 후 이들 레이어를 다시 정의해야 합니다.
:::

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)
- [fit_tasks](api/config/fit_tasks.md)

### Related Guides
- [dhtmlxGantt를 Plain JS/HTML에서 사용하기](guides/initializing-gantt-chart.md)

