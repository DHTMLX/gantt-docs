---
sidebar_label: branch_loading_property
title: branch_loading_property config
description: "백엔드에서 아직 로드되지 않은 자식 작업이 있는 작업을 나타냅니다"
---

# branch_loading_property
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 백엔드에서 아직 로드되지 않은 자식 작업이 있는 작업을 나타냅니다

@signature: branch_loading_property: string

### Example

~~~jsx
gantt.config.branch_loading = true;
gantt.config.branch_loading_property = "hasChild";
gantt.init("gantt_here");
~~~

**Default value:** "$has_child"

### Related samples
- [Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)
- [Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)

### Details

이 옵션은 [branch_loading](api/config/branch_loading.md) 설정과 함께 사용해야 합니다.

### Related API
- [branch_loading](api/config/branch_loading.md)

### Related Guides
- [성능: 개선 방법](guides/performance.md)
- [동적 로딩 (온디맨드)](guides/dynamic-loading.md)

