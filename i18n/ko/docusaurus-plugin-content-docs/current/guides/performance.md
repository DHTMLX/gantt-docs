---
title: "성능: 개선 방법"
sidebar_label: "성능: 개선 방법"
---

# 성능: 개선 방법

## 일반적인 기법

구성 옵션과 플러그인에 따라 10,000~20,000개의 작업을 처리할 경우, 페이지에 표시되는 간트 차트의 렌더링에 지연이 발생할 수 있습니다.

다음과 같은 방법으로 이 문제를 해결할 수 있습니다:

1. 단일 셀 렌더링을 비활성화하고 행 렌더링만 남기려면 [show_task_cells](api/config/show_task_cells.md) 옵션을 'false'로 설정하십시오.
2. 타임라인 영역의 실제 선 렌더링 대신 배경 이미지를 설정하려면 [static_background](api/config/static_background.md) 옵션을 'true'로 설정하십시오. (**PRO** 기능, 버전이 v6.3 이전인 경우 아래의 세부 정보를 참조하십시오)[#working-with-a-large-date-range]
3. 동적 로딩을 활성화하려면 [branch_loading](api/config/branch_loading.md) 옵션을 'true'로 설정하십시오.
4. 스케일의 단계를 증가시키려면 [scales](api/config/scales.md) 옵션의 **unit** 속성을 "month" 또는 "year"로 설정하십시오.
5. 표시 가능한 날짜 범위를 축소하려면 [start_date](api/config/start_date.md) 및 [end_date](api/config/end_date.md) 옵션을 사용하십시오.
6. 작업의 진행 표시줄을 제거하려면 [show_progress](api/config/show_progress.md) 옵션을 'false'로 설정하십시오.
7. 스케일 렌더링 속도를 향상시키려면 [smart_scales](api/config/smart_scales.md) 옵션이 비활성화된 경우 이를 활성화하십시오.
8. 작업 시간 달력을 사용하는 경우 간트에 데이터를 로드하기 전에 작업 시간 설정을 반드시 설정하십시오. 그렇지 않으면 모든 작업의 지속 기간이 두 번 재계산됩니다 — 먼저 작업이 로드될 때, 그리고 새 달력이 적용될 때 두 번째로 재계산됩니다. 어쨌든 모든 것이 정상적으로 작동해야 하지만 이러한 재계산은 앱의 초기화 시간을 늘릴 수 있습니다.
9. duration_unit 구성에 "hour" 또는 "minute"를 지정하는 경우 duration_step를 1로 설정해야 합니다. 이러한 조합은 1로 설정될 때만 작동하는 작업 시간 계산에 대한 특정 최적화를 활성화합니다. 또한 "최적화된" 모드와 "비최적화된" 모드 간에는 큰 성능 차이가 있습니다.

**관련 샘플**: [Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)


## 스마트 렌더링

스마트 렌더링 기법은 대량의 데이터를 다룰 때 데이터 렌더링 속도를 크게 향상시킵니다. 이 모드에서는 화면에 현재 보이는 작업 및 링크만 렌더링됩니다.

v6.2부터 스마트 렌더링은 기본적으로 활성화되어 있으며, 핵심 파일 *dhtmlxgantt.js*에 포함되어 있습니다. 따라서 스마트 렌더링이 작동하도록 하려면 페이지에 *dhtmlxgantt_smart_rendering.js* 파일을 추가로 포함할 필요가 없습니다.

:::note
구버전의 *dhtmlxgantt_smart_rendering.js* 파일을 연결하면, 새로운 빌트인 **smart_rendering** 확장의 개선을 덮어씁니다.
:::

스마트 렌더링 모드를 비활성화하려면 해당 구성 매개변수를 false로 설정하면 됩니다:

~~~js
gantt.config.smart_rendering = false;
~~~

**관련 샘플**: [Working with 30000 tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)

일반적인 스마트 렌더링의 과정은 간트 요소의 위치가 화면에 보이는 영역 안에 들어가는지 확인하고 표시할지 여부를 결정하는 것입니다.

그러나 [custom layers](guides/baselines.md)의 스마트 렌더링은 기본적으로 수직 Smart 렌더링만 활성화합니다. 즉, 지정된 작업의 행이 뷰포트에 있을 때만 커스텀 레이어가 렌더링됩니다. 그러나 커스텀 요소의 정확한 좌표를 계산할 수 없기 때문에 타임라인에서 작업의 전체 행이 그 위치로 간주됩니다.

 *수평 스마트 렌더링을 커스텀 레이어에 대해 활성화하는 방법은 [addTaskLayer](api/method/addtasklayer.md#smart-rendering-for-custom-layers) 문서를 참조하십시오.*


### 큰 날짜 범위 다루기

:::note
이 기능은 PRO 버전에서만 사용할 수 있습니다
:::

프로젝트에서 큰 날짜 범위를 사용하고 있고 Gantt 버전이 v6.3 이전인 경우, 
스마트 렌더링과 함께 [static_background](api/config/static_background.md) 매개변수를 활성화하여 실제 선을 렌더링하는 대신 타임라인 영역의 배경 이미지를 설정할 수 있습니다. 

~~~js
gantt.config.static_background = true;
~~~

v6.3 이상 버전의 Gantt에서는 데이터를 내보낼 때 export 서버로의 요청 크기를 줄이고자 할 때에만 이 구성 옵션이 유용합니다.