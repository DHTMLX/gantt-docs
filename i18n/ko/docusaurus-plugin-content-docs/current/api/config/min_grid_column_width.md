---
sidebar_label: min_grid_column_width
title: min_grid_column_width 설정
description: "그리드의 크기가 조정될 때 각 그리드 열의 최소 너비를 설정합니다(픽셀 단위)"
---

# min_grid_column_width

### Description

@short: 그리드의 크기가 조정될 때 각 그리드 열의 최소 너비를 설정합니다(픽셀 단위)

@signature: min_grid_column_width: number

### Example

~~~jsx
gantt.config.min_grid_column_width = 100;

gantt.init("gantt_here");
~~~

**기본값:** 70

### Details

열의 **min_width** 속성은 gantt의 **min_grid_column_width** 속성보다 우선합니다.

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#resizing)