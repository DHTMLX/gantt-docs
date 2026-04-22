---
title: "Gantt를 반응형으로 만들기"
sidebar_label: "Gantt를 반응형으로 만들기"
---

# Gantt를 반응형으로 만들기

스마트폰에서 Gantt를 사용하는 것은 화면이 작아 한 번에 모든 데이터를 표시하기 어렵기 때문에 불편할 수 있습니다. 다만 Gantt의 레이아웃을 서로 다른 화면 크기에 맞춰 조정하도록 구성하면 데스크톱과 모바일 기기 모두에서 사용할 수 있습니다.

Gantt의 크기를 퍼센트 값으로 지정하면(예: `width: 100%; height: 100%`) 사용 가능한 컨테이너 크기에 맞춰 조정됩니다. 다만 기본적으로 각 그리드 열은 [`min_column_width`](api/config/min_column_width.md) 및 [`min_grid_column_width`](api/config/min_grid_column_width.md) 매개변수에 의해 최소 너비가 정의됩니다. 컨테이너의 크기가 최소 열 너비의 합보다 작아지면 그리드가 더 이상 축소되지 않습니다. 이로 인해 Gantt가 반응형이 아닌 것처럼 보일 수 있습니다. 아래의 섹션은 이를 해결하고 Gantt를 진정으로 반응형으로 만드는 방법을 설명합니다.

### 최소 열 너비 조정

한 가지 방법은 [`min_column_width`](api/config/min_column_width.md)와 [`min_grid_column_width`](api/config/min_grid_column_width.md)의 값을 줄이는 것입니다. 이렇게 하면 컨테이너가 작아질수록 Gantt가 더 작아지도록 하여 반응형과 유사한 동작을 제공합니다:

~~~jsx
gantt.config.min_column_width = 30;
gantt.config.min_grid_column_width = 30;
~~~

**관련 샘플** [Gantt. 반응형 컨테이너](https://snippet.dhtmlx.com/kjibqqbb)

### 작은 화면에 맞춘 레이아웃 조정

다른 방법은 사용 가능한 너비에 따라 Gantt 레이아웃을 전환하는 것입니다. 충분한 공간이 있으면 그리드와 타임라인이 모두 포함된 전체 레이아웃이 표시됩니다. 공간이 좁아지면 한쪽(그리드 또는 타임라인)만 표시되어 한정된 공간을 더 효율적으로 사용할 수 있습니다.

이 작업은 [`onGanttRender`](api/event/onganttrender.md) 이벤트를 사용하여 구현할 수 있습니다. 이벤트 핸들러는 Gantt 컨테이너의 너비와 현재 [layout](api/config/layout.md) 구성를 확인하고 그에 따라 Gantt 레이아웃을 업데이트합니다.

**관련 샘플** [Gantt. 반응형 레이아웃: 화면 너비에 따라 그리드를 동적으로 숨기고 표시](https://snippet.dhtmlx.com/w4nwk5wf)