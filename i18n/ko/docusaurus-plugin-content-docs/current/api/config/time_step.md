---
sidebar_label: time_step
title: time_step config
description: "작업의 시간 값에 대한 최소 단위(분)를 설정합니다."
---

# time_step

### Description

@short: 작업의 시간 값에 대한 최소 단위(분)를 설정합니다.

@signature: time_step: number

### Example

~~~jsx
gantt.config.time_step = 15;
...
gantt.init("gantt_here");
~~~

**Default value:** 60

### Details

- 작업의 시작 및 종료 시간은 time_step의 배수에 맞춰 정렬됩니다. 예를 들어, *time_step = 20*인 경우 작업은 0, 20, 40분 등으로만 시작할 수 있습니다.
- 라이트박스의 시간 선택기도 동일한 time_step을 따릅니다.

:::note
 작업을 드래그할 때 **time_step** 속성으로 정의된 단계에 작업이 스냅되도록 하려면 [round_dnd_dates](api/config/round_dnd_dates.md) 설정을 *false*로 설정해야 합니다.
~~~js
gantt.config.round_dnd_dates = false;
~~~
 
:::

:::note

**Related example:** [Gantt. 최소 단위로 작업 Drag'n'drop](https://snippet.dhtmlx.com/bd7ir3w7)

 
:::

### Related API
- [round_dnd_dates](api/config/round_dnd_dates.md)

