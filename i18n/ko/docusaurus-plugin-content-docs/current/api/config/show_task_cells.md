---
sidebar_label: show_task_cells
title: show_task_cells config
description: "차트 영역에서 열 경계선을 켜거나 끕니다"
---

# show_task_cells

### Description

@short: 차트 영역에서 열 경계선을 켜거나 끕니다

@signature: show_task_cells: boolean

### Example

~~~jsx
//타임 스케일에서 열 경계선을 숨깁니다
gantt.config.show_task_cells = false;
 
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

이 속성을 *'false'* 로 설정하면 개별 셀을 그리지 않고 행만 표시합니다.<br> 이는 특히 차트에 많은 작업이 있을 때 성능 향상에 도움이 될 수 있습니다.
