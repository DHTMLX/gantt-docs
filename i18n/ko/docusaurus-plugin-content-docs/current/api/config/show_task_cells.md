---
sidebar_label: show_task_cells
title: show_task_cells config
description: "차트 영역에서 열 경계 표시를 활성화/비활성화합니다"
---

# show_task_cells

### Description

@short: 차트 영역에서 열 경계 표시를 활성화/비활성화합니다

@signature: show_task_cells: boolean

### Example

~~~jsx
//타임 스케일에서 열 경계선을 숨깁니다
gantt.config.show_task_cells = false;
 
gantt.init("gantt_here");
~~~

**기본값:** true

### Details

속성이 *'false'*로 설정되면 개별 셀의 렌더링이 비활성화되어 행만 렌더링됩니다. 차트에 많은 작업을 표시하는 경우 성능을 높이는 데 사용할 수 있습니다.