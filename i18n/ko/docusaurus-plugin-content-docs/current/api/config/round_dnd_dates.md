---
sidebar_label: round_dnd_dates
title: round_dnd_dates 구성
description: "작업의 시작일과 종료일을 가장 가까운 scale marks로 반올림하도록 활성화합니다"
---

# round_dnd_dates

### Description

@short: 작업의 시작일과 종료일을 가장 가까운 scale marks로 반올림하도록 활성화합니다

@signature: round_dnd_dates: boolean

### Example

~~~jsx
gantt.config.round_dnd_dates = false;
gantt.init("gantt_here");
~~~

**기본값:** true

### Details

속성을 비활성화하면 Gantt는 끌어서 놓은 작업의 시작일과 종료일을 가장 가까운 시간으로 반올림하되, 가장 가까운 scale marks로 반올림하지 않습니다. 이 경우, [time_step](api/config/time_step.md) 속성을 사용하여 작업을 드래그하는 단계(step)를 구성할 수 있습니다. 아래 예제를 참조하십시오:

:::note
sample: [Gantt. Drag'n'drop of tasks with the minimum step ](https://snippet.dhtmlx.com/bd7ir3w7)
:::