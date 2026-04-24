---
sidebar_label: min_task_grid_row_height
title: min_task_grid_row_height 구성
description: "리사이징 중 태스크에 대해 설정될 수 있는 최소 행 높이를 설정합니다"
---

# min_task_grid_row_height

### Description

@short: 리사이징 중 태스크에 대해 설정될 수 있는 최소 행 높이를 설정합니다

@signature: min_task_grid_row_height: number

### Example

~~~jsx
gantt.config.min_task_grid_row_height = 45;
~~~

**Default value:** 30

### Details

이 속성은 [gantt.config.resize_rows](api/config/resize_rows.md) 가 *true* 로 설정되었을 때 작동합니다.

### Change log
- v7.1에서 추가됨