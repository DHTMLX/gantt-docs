---
sidebar_label: init
title: init method
description: "지정된 컨테이너 내에 dhtmlxGantt를 설정합니다."
---

# init

### Description

@short: 지정된 컨테이너 내에 dhtmlxGantt를 설정합니다.

@signature: init: (container: string | HTMLElement, from?: Date, to?: Date) =\> void

### Parameters

- `container` - (required) *string | HTMLElement* -        dhtmlxGantt가 생성될 HTML 컨테이너(또는 해당 id)
- `from` - (optional) *Date* - 시간 축(X축)의 시작 지점
- `to` - (optional) *Date* - 시간 축(X축)의 종료 지점

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
gantt.load("tasks.json");
~~~

### Details

이 메서드에 두 번째와 세 번째 인자를 제공하는 것은 시간 축의 범위를 설정하는 간단한 방법입니다:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

`gantt.init`의 날짜 파라미터는 [start_date](api/config/start_date.md)와 [end_date](api/config/end_date.md) 설정의 단축형임을 기억하세요.
아래 두 예제는 동일한 결과를 만듭니다:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

그리고

~~~js
gantt.config.start_date = new Date(2023, 08, 10);
gantt.config.end_date = new Date(2023, 08, 20);
gantt.init("gantt_here");
~~~

이 설정들은 표시되는 날짜 범위를 정의하고 제한합니다. 이 범위 밖의 작업들은 표시되지 않습니다.

`gantt.init`에서 날짜 인자를 사용하거나 [start_date](api/config/start_date.md) 및 [end_date](api/config/end_date.md) 설정을 사용하는 경우
[fit_tasks](api/config/fit_tasks.md) 옵션은 무시됩니다.

날짜 범위에 따라 시간 축이 자동으로 조정되길 원한다면, 이 파라미터들을 생략하거나 [시간 범위를 동적으로 처리](guides/configuring-time-scale.md#range)할 수 있습니다.

:::note
이 메서드는 [addTaskLayer](api/method/addtasklayer.md) 및 [addLinkLayer](api/method/addlinklayer.md) 메서드를 통해 타임라인 영역에 추가된 커스텀 레이어를 초기화합니다. 따라서 **gantt.init** 호출 후에는 해당 커스텀 레이어를 다시 적용해야 페이지에 표시됩니다. 
:::

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)
- [fit_tasks](api/config/fit_tasks.md)

### Related Guides
- [dhtmlxGantt를 Plain JS/HTML에서 사용하기](guides/initializing-gantt-chart.md)

