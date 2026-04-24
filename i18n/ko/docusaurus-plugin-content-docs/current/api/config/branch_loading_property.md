---
sidebar_label: branch_loading_property
title: branch_loading_property 구성
description: "백엔드에서 아직 로드되지 않은 자식이 있는 작업을 지정합니다"
---

# branch_loading_property

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

### 설명

@short: 백엔드에서 아직 로드되지 않은 자식이 있는 작업을 지정합니다

@signature: branch_loading_property: string

### 예제

~~~jsx
gantt.config.branch_loading = true;
gantt.config.branch_loading_property = "hasChild";
gantt.init("gantt_here");
~~~

**기본값:** "$has_child"

### 관련 샘플
- [필요 시 하위 작업 로딩(branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)
- [성능 향상 팁](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)

### 상세 내용

다음 구성과 함께 사용할 수 있습니다: [branch_loading](api/config/branch_loading.md)

### 관련 API
- [branch_loading](api/config/branch_loading.md)

### 관련 가이드
- [성능 향상 방법](guides/performance.md)
- [동적 로딩(요청 시)](guides/dynamic-loading.md)