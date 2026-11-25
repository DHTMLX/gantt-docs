---
title: "성능: 개선 방법"
sidebar_label: "성능: 개선 방법"
---

# 성능: 개선 방법

## 일반적인 기법 {#common-techniques}

DHTMLX Gantt는 대용량 데이터셋을 지원합니다. 최대 100,000개의 작업으로 구성된 데이터셋에 대한 공개 성능 측정 결과는 [JavaScript Gantt benchmarks](https://github.com/DHTMLX/js-gantt-benchmarks)에서 확인할 수 있습니다. 대용량 데이터셋을 사용하는 Gantt를 직접 보려면 [대용량 데이터셋 데모](https://docs.dhtmlx.com/gantt/demos/large-dataset-performance/)를 여십시오.

애플리케이션의 성능은 구성, 작업 종속성, 달력, 커스텀 렌더링, 브라우저 및 하드웨어에 따라 달라집니다. 서버 응답 및 데이터 전송은 클라이언트 측 렌더링 및 스케줄링과 별도로 측정하십시오.

대용량 데이터셋을 다룰 때는 [스마트 렌더링](#smart-rendering)(렌더링 가상화)을 활성화된 상태로 유지하십시오. 애플리케이션에서 특정 작업이 느린 경우 이를 측정한 후 아래의 관련 기법을 적용하십시오:

1. 타임라인 영역의 실제 선 렌더링 대신 배경 이미지를 설정하려면 [static_background](api/config/static_background.md) 옵션을 'true'로 설정하십시오. (커스텀 CSS 클래스가 있는 셀은 여전히 셀로 렌더링됩니다) (**PRO** 기능, [아래의 세부 정보를 참조하십시오](#working-with-a-large-date-range))
2. 일부 브랜치만 필요한 경우 초기 데이터 전송량과 브라우저 메모리 사용량을 줄이려면 [동적 로딩](guides/dynamic-loading.md)을 사용하십시오([branch_loading](api/config/branch_loading.md) 옵션을 'true'로 설정, **PRO** 기능).
3. 스케일의 단계를 증가시키려면 [scales](api/config/scales.md) 옵션의 **unit** 속성을 "month" 또는 "year"로 설정하십시오.
4. 표시 가능한 날짜 범위를 축소하려면 [start_date](api/config/start_date.md) 및 [end_date](api/config/end_date.md) 옵션을 사용하십시오.
5. 스케일 렌더링 속도를 향상시키려면 [smart_scales](api/config/smart_scales.md) 옵션이 비활성화된 경우 이를 활성화하십시오.
6. 작업 시간 달력을 사용하는 경우 데이터를 gantt에 로드하기 전에 작업 시간 설정을 지정하십시오. 데이터를 로드한 후 작업 시간 설정을 변경하면 영향을 받는 작업의 기간을 다시 계산해야 합니다. 이 작업이 자동으로 수행되지 않을 수 있으므로 코드에서 직접 처리해야 할 수도 있습니다([방법 보기](guides/working-time.md#달력의-동적-변경)). 이러한 재계산은 애플리케이션의 초기화 시간을 늘릴 수 있습니다.
7. duration_unit 구성에 "hour" 또는 "minute"를 지정하는 경우 duration_step를 1로 설정해야 합니다. 이러한 조합은 1로 설정될 때만 작동하는 작업 시간 계산에 대한 특정 최적화를 활성화합니다. 또한 "최적화된" 모드와 "비최적화된" 모드 간에는 큰 성능 차이가 있습니다.
8. 여러 작업 또는 링크의 변경 사항을 한 번의 다시 그리기로 적용하려면 [batchUpdate](api/method/batchupdate.md)를 사용하십시오.
9. 스마트 렌더링이 효과를 유지하도록 대규모 차트에서는 [autosize](api/config/autosize.md) 옵션을 활성화하지 마십시오. 자동 크기 조정 모드에서는 Gantt가 모든 작업을 표시하도록 컨테이너를 확장하므로 모든 행이 보이는 영역에 있게 되어 전부 렌더링됩니다.
10. 불필요한 다시 그리기를 피하려면 사용자가 [임계 경로](guides/critical-path.md)를 확인해야 할 때만 [highlight_critical_path](api/config/highlight_critical_path.md)를 활성화하십시오. 이 옵션이 활성화되어 있으면 작업이나 링크가 변경될 때마다 전체 차트가 다시 그려집니다.
11. 타임라인의 렌더링 작업을 줄이려면 필요하지 않은 [커스텀 레이어](guides/baselines.md), 특히 자주 다시 그려지는 레이어를 제거하십시오.
12. 변경 시마다 수행되는 작업을 줄이려면 Gantt 이벤트 핸들러와 템플릿에서 실행되는 커스텀 코드를 점검하십시오. 예를 들어 코드에서 프로젝트의 진행률을 계산한다면 모든 업데이트나 다시 그리기 때마다가 아니라 작업의 진행률이 변경될 때만 다시 계산하십시오. 커스텀 레이어에 표시되는 데이터에도 같은 원칙이 적용됩니다.

**관련 샘플**: [Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)


## 스마트 렌더링 {#smart-rendering}

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

[custom layers](guides/baselines.md)의 스마트 렌더링은 기본적으로 수직 Smart 렌더링만 활성화합니다. 즉, 지정된 작업의 행이 뷰포트에 있을 때만 커스텀 레이어가 렌더링됩니다. 그러나 커스텀 요소의 정확한 좌표를 계산할 수 없기 때문에 타임라인에서 작업의 전체 행이 그 위치로 간주됩니다.

 *수평 스마트 렌더링을 커스텀 레이어에 대해 활성화하는 방법은 [addTaskLayer](api/method/addtasklayer.md#smart-rendering-for-custom-layers) 문서를 참조하십시오.*


### 큰 날짜 범위 다루기 {#working-with-a-large-date-range}

:::note
이 기능은 PRO 버전에서만 사용할 수 있습니다
:::

프로젝트에서 큰 날짜 범위를 사용하는 경우, 
스마트 렌더링과 함께 [static_background](api/config/static_background.md) 매개변수를 활성화하여 실제 선을 렌더링하는 대신 타임라인 영역의 배경 이미지를 설정할 수 있습니다. 이 옵션은 기본적으로 비활성화되어 있습니다.

~~~js
gantt.config.static_background = true;
~~~

이 모드에서 [timeline_cell_class](api/template/timeline_cell_class.md) 또는 [timeline_cell_content](api/template/timeline_cell_content.md) 템플릿을 통해 CSS 클래스나 콘텐츠가 지정된 셀은 배경 이미지 위에 여전히 셀로 렌더링됩니다. 이를 위해서는 [show_task_cells](api/config/show_task_cells.md) 및 [static_background_cells](api/config/static_background_cells.md) 옵션이 활성화되어 있어야 합니다(기본적으로 활성화되어 있습니다).

v6.3부터 스마트 렌더링은 타임라인의 보이는 부분에 있는 셀만 렌더링하므로, 이 옵션이 미치는 영향은 이전 버전보다 작습니다. 또한 이 옵션은 데이터를 내보낼 때 export 서버로 보내는 요청의 크기를 줄여 줍니다.
