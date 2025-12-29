---
title: "성능: 개선 방법"
sidebar_label: "성능: 개선 방법"
---

# 성능: 개선 방법

## 일반적인 기법 {#commontechniques}

10,000에서 20,000개의 작업을 처리할 때, 구성 및 플러그인에 따라 간트 차트 렌더링 시 페이지에서 약간의 지연이 발생할 수 있습니다.

이 문제를 해결하기 위한 몇 가지 방법은 다음과 같습니다:

1. 개별 셀 렌더링을 비활성화하고 행만 렌더링하도록 설정하세요([show_task_cells](api/config/show_task_cells.md) 옵션을 'false'로 설정).
2. 실제 선을 렌더링하는 대신 타임라인 영역에 배경 이미지를 사용하세요([static_background](api/config/static_background.md) 옵션을 'true'로 설정) (**PRO** 기능, v6.3 이전 버전의 경우 [자세한 내용은 아래](#static_background) 참고).
3. 동적 로딩을 활성화하세요([branch_loading](api/config/branch_loading.md) 옵션을 'true'로 설정).
4. [scales](api/config/scales.md) 옵션의 **unit** 속성을 "month" 또는 "year"로 설정하여 스케일의 단계를 높이세요.
5. 표시 가능한 날짜 범위를 좁히세요([start_date](api/config/start_date.md) 및 [end_date](api/config/end_date.md) 옵션 사용).
6. 작업에서 진행률 바를 제거하세요([show_progress](api/config/show_progress.md) 옵션을 'false'로 설정).
7. [smart_scales](api/config/smart_scales.md) 옵션이 아직 활성화되어 있지 않다면 활성화하여 스케일 렌더링 속도를 높이세요.
8. [작업 시간 캘린더](guides/working-time.md)를 사용하는 경우, 간트에 데이터를 로드하기 전에 작업 시간 설정을 구성하세요. 그렇지 않으면 작업을 로드할 때 한 번, 새 캘린더를 적용할 때 한 번, 총 두 번 작업 기간이 다시 계산됩니다. 오류가 발생하지는 않지만 앱 초기화 시간이 늘어날 수 있습니다.
9. [duration_unit](api/config/duration_unit.md) 구성을 "hour" 또는 "minute"로 설정한 경우, [duration_step](api/config/duration_step.md)을 1로 설정하세요. 이 조합은 작업 시간 계산을 위한 특정 최적화를 트리거하며, step이 1일 때만 작동합니다. "최적화" 모드와 "비최적화" 모드 간에는 성능 차이가 상당히 큽니다.


[Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)



## 스마트 렌더링 {#smartrendering}

스마트 렌더링은 대용량 데이터셋 작업 시 데이터 렌더링 속도를 크게 향상시킵니다. 이 모드는 화면에 현재 보이는 작업과 링크만 렌더링합니다.

v6.2부터 스마트 렌더링은 코어 *dhtmlxgantt.js* 파일에 기본적으로 포함되어 있으므로, *dhtmlxgantt_smart_rendering.js* 파일을 별도로 포함할 필요가 없습니다.

:::note
기존 *dhtmlxgantt_smart_rendering.js* 파일을 포함하면 새로운 내장 **smart_rendering** 확장 기능의 개선 사항이 덮어써집니다.
:::

스마트 렌더링을 비활성화하려면 설정 파라미터를 false로 지정하세요:

~~~js
gantt.config.smart_rendering = false;
~~~


[Working with 30000 tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)


일반적인 스마트 렌더링 프로세스는 간트 요소의 위치가 화면에 보이는 영역 내에 있는지 확인하고, 표시 여부를 결정합니다.

그러나 [커스텀 레이어](guides/baselines.md)에 대한 스마트 렌더링은 기본적으로 수직 스마트 렌더링만 지원합니다. 즉, 커스텀 레이어는 작업의 행이 보일 때 렌더링되지만, 커스텀 요소의 정확한 수평 위치는 계산할 수 없으므로 전체 작업 행이 해당 위치로 간주됩니다.

 *커스텀 레이어에 대한 수평 스마트 렌더링 활성화 방법은 [addTaskLayer](api/method/addtasklayer.md#smartrenderingforcustomlayers) 문서를 참고하세요.*



### 대규모 날짜 범위 작업하기 (#static_background) 

:::info
이 기능은 PRO 버전에서만 제공됩니다
:::

프로젝트에서 대규모 날짜 범위를 사용하고 있고, Gantt 버전이 v6.3 이전인 경우, 스마트 렌더링과 함께 [static_background](api/config/static_background.md) 옵션을 활성화하여 실제 선을 렌더링하는 대신 타임라인 영역에 배경 이미지를 사용할 수 있습니다.

~~~js
gantt.config.static_background = true;
~~~

Gantt v6.3 이상 버전에서는 이 옵션이 주로 데이터 내보내기 시 내보내기 서버로 전송되는 요청 크기를 줄이는 데 도움이 됩니다.

