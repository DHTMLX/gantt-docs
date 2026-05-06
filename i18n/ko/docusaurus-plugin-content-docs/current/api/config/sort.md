---
sidebar_label: sort
title: sort config
description: "테이블 내에서 정렬을 허용합니다"
---

# sort

### Description

@short: 테이블에서 정렬을 활성화합니다

@signature: sort: boolean

### Example

~~~jsx
gantt.config.sort = true;

gantt.init("gantt_here");
gantt.parse("tasks.json");
~~~

**기본값:** false

### Related samples
- [내장 정렬](https://docs.dhtmlx.com/gantt/samples/07_grid/01_builtin_sorting.html)

### Related API
- [sort](api/method/sort.md)
- [onAfterSort](api/event/onaftersort.md)

### Related Guides
- [컬럼 정렬](guides/sorting.md)