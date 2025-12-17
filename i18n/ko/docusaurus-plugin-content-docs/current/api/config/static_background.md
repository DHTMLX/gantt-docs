---
sidebar_label: static_background
title: static_background config
description: "타임라인 섹션에 대해 컬럼과 행의 라인을 직접 그리는 대신 배경 이미지를 생성합니다"
---

# static_background
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 타임라인 섹션에 대해 컬럼과 행의 라인을 직접 그리는 대신 배경 이미지를 생성합니다

@signature: static_background: boolean

### Example

~~~jsx
gantt.config.static_background = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)

### Details


v6.2 버전부터 이 설정은 [timeline_cell_class](api/template/timeline_cell_class.md) 템플릿 함수로 지정된 CSS 클래스가 적용된 셀들과 함께 PNG 배경 이미지를 생성합니다.

v6.1 버전의 동작(배경 이미지만 렌더링)을 원할 경우, [static_background_cells](api/config/static_background_cells.md) 설정을 사용하면 됩니다:

~~~js
gantt.config.static_background_cells = false;
~~~

### Related API
- [static_background_cells](api/config/static_background_cells.md)

### Related Guides
- [성능: 개선 방법](guides/performance.md)

