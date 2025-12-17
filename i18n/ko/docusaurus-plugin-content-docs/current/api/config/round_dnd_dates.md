---
sidebar_label: round_dnd_dates
title: round_dnd_dates config
description: "작업의 시작 및 종료 날짜를 가장 가까운 스케일 마크로 반올림할 수 있습니다."
---

# round_dnd_dates

### Description

@short: 작업의 시작 및 종료 날짜를 가장 가까운 스케일 마크로 반올림할 수 있습니다.

@signature: round_dnd_dates: boolean

### Example

~~~jsx
gantt.config.round_dnd_dates = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

이 속성이 꺼져 있으면, Gantt는 드래그된 작업의 시작 및 종료 날짜를 가장 가까운 스케일 마크가 아닌 가장 가까운 시간 단위로 반올림합니다. 이 모드에서는 [time_step](api/config/time_step.md) 속성을 사용하여 작업 드래그 시의 단계 크기를 설정할 수 있습니다. 예시는 다음과 같습니다:

:::note

**Related example:** [Gantt. 최소 단계로 작업 Drag'n'drop](https://snippet.dhtmlx.com/bd7ir3w7)

 
:::

