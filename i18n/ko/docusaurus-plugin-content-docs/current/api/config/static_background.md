---
sidebar_label: static_background
title: static_background 구성
description: "타임라인 영역용 백그라운드 이미지를 생성하되 실제 열과 행의 선을 렌더링하지 않습니다"
---

# static_background
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 타임라인 영역용 백그라운드 이미지를 생성하되 실제 열과 행의 선을 렌더링하지 않습니다

@signature: static_background: boolean

### Example

~~~jsx
gantt.config.static_background = true;

gantt.init("gantt_here");
~~~

**기본값:** false

### Related samples
- [Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)

### Details

버전 6.2부터 이 구성은 PNG 배경 이미지와 [timeline_cell_class](api/template/timeline_cell_class.md) 템플릿 함수에 의해 CSS 클래스가 적용된 셀도 렌더링합니다.

버전 6.1 동작으로 되돌리려면(배경 이미지만 렌더링하는 경우) [static_background_cells](api/config/static_background_cells.md) 구성을 사용하세요:

~~~js
gantt.config.static_background_cells = false;
~~~

### Related API
- [static_background_cells](api/config/static_background_cells.md)

### Related Guides
- [성능: 개선 방법](guides/performance.md)

