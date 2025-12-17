---
sidebar_label: branch_loading
title: branch_loading config
description: "간트 차트가 데이터를 동적으로 로드할 수 있도록 합니다"
---

# branch_loading
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 간트 차트가 데이터를 동적으로 로드할 수 있도록 합니다

@signature: branch_loading: boolean

### Example

~~~jsx
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
gantt.config.branch_loading = true;
gantt.init("gantt_here");

gantt.load("/data"); /*!*/
~~~

**Default value:** false

### Related samples
- [Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)
- [Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)


### Related API
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [성능: 개선 방법](guides/performance.md)
- [동적 로딩 (온디맨드)](guides/dynamic-loading.md)

