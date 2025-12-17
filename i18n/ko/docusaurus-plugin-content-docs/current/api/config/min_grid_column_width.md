---
sidebar_label: min_grid_column_width
title: min_grid_column_width config
description: "그리드 크기 조정 시 각 그리드 컬럼의 최소 너비(픽셀 단위)를 정의합니다."
---

# min_grid_column_width

### Description

@short: 그리드 크기 조정 시 각 그리드 컬럼의 최소 너비(픽셀 단위)를 정의합니다.

@signature: min_grid_column_width: number

### Example

~~~jsx
gantt.config.min_grid_column_width = 100;

gantt.init("gantt_here");
~~~

**Default value:** 70

### Details

컬럼의 **min_width** 설정이 gantt의 **min_grid_column_width** 설정보다 우선 적용됩니다.

### Related Guides
- [컬럼 지정하기](guides/specifying-columns.md#resizing)
