---
title: "Vue Gantt"
sidebar_label: Vue Gantt
description: "공식 래퍼를 사용하여 Vue에서 DHTMLX Gantt를 설치, 구성 및 사용하는 방법."
image: /img/frameworks/vue.png
---

Vue Gantt는 DHTMLX Gantt를 위한 공식 Vue 래퍼입니다. 이 래퍼는 Vue 3를 대상으로 하며 Gantt API에 대한 전체 접근성을 유지하면서 Vue 친화적인 props, 이벤트 및 컴포저블을 추가합니다.

## 래퍼로 얻을 수 있는 것

- props를 통한 선언적 설정 (`config`, `templates`, `plugins`, `theme`, `locale`)
- 작업/링크의 데이터 동기화 및 고급 데이터셋
- `events` 맵을 통한 Gantt 이벤트 연결
- `@ready`를 통한 Vue 생명주기 진입점
- 기본 `instance`에 대한 컴포넌트 ref 접근
- 일반 래퍼 워크플로를 위한 타입 안전한 보조 팩터리 및 컴포저블

~~~vue
<script setup lang="ts">
import VueGantt from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";
</script>

<template>
  <div style="height: 520px;">
    <VueGantt :tasks="tasks" :links="links" />
  </div>
</template>
~~~

아키텍처 및 기능 맵을 먼저 보고 싶다면 [Vue Gantt 개요](integrations/vue/overview.md)를 읽어보세요.

## 권장 학습 경로

래퍼를 처음 사용하는 경우 다음 순서로 진행하세요:

1. [Installation](integrations/vue/installation.md) — 패키지 채널 선택 및 임포트를 위한
2. [Quick Start](integrations/vue/quick-start.md) — 처음 차트를 렌더링하기 위한
3. [Configuration Reference](integrations/vue/configuration-props.md) — prop 및 콜백 상세 정보
4. [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md) — 데이터 소유권 모델 선택
5. [Pinia Integration Tutorial](integrations/vue/state/pinia.md) — 저장소 기반 구현
6. [Customization Patterns](integrations/vue/customization-patterns.md) — 템플릿, 라이트박스, 인라인 에디터 및 모달에 대한 패턴

## Wrapper 대 로우-레벨 JS 통합

생명주기 및 동기화 로직을 얼마나 직접 관리하고 싶은지에 따라 통합 경로를 선택하세요.

- Vue props/events, wrapper-managed 동기화 및 타입이 보장된 보조 API를 위한 **공식 래퍼** (`@dhtmlx/trial-vue-gantt` 또는 `@dhx/vue-gantt`)를 사용하세요.
- 인스턴스 생명주기 및 수동 API 오케스트레이션에 대한 직접 제어가 필요할 때만 **로우-레벨 JS 통합**을 사용하세요.

로우-레벨 경로의 경우, [dhtmlxGantt with Vue.js (Low-Level Integration)](integrations/vue/js-gantt-vue.md)를 사용하세요.

## 데이터 및 상태 관리 진입점

스토어/백엔드 동기화가 필요하다고 이미 알고 있다면 상태 섹션부터 시작하세요:

- [데이터 및 상태 관리](integrations/vue/state.md)
- [데이터 바인딩 및 상태 관리의 기본](integrations/vue/state/state-management-basics.md)
- [Pinia와 함께 Vue Gantt 사용](integrations/vue/state/pinia.md)

## 예제 및 평가 자료

공개된 Vue Gantt 예제를 둘러보아 래퍼의 실행 가능한 데모를 확인하세요:

- [Live demo](https://dhtmlx.github.io/vue-gantt-examples/) - 래퍼의 모든 기능이 브라우저에서 실행됩니다.
- [GitHub 저장소](https://github.com/DHTMLX/vue-gantt-examples) - 개요에서 참조된 모든 예제의 소스

최소한의 스타터 프로젝트(각각 하나의 래퍼 기능):

- [vue-gantt-quick-start](https://github.com/DHTMLX/vue-gantt-quick-start) - 가능한 가장 작은 설정으로, [Quick Start](integrations/vue/quick-start.md)와 일치
- [vue-gantt-pinia-starter](https://github.com/DHTMLX/vue-gantt-pinia-starter) - `batchSave`를 포함한 Pinia 저장소 및 저장소 수준의 실행 취소/다시 실행을 제공하며, [Pinia tutorial](integrations/vue/state/pinia.md)와 일치

Vue Gantt를 평가 중이라면 평가 페이지에서 평가 기간 동안 기술 지원에 대한 접근이 제공됩니다. [Installation](integrations/vue/installation.md)을 참조하세요.