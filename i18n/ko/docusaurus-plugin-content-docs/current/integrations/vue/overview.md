---
title: Vue Gantt 개요
sidebar_label: 개요
description: "Vue Gantt의 아키텍처 수준 개요: 기능, 데이터 흐름, 이벤트, 수명 주기, 및 사용자 정의 확장 포인트."
---

# Vue Gantt 개요

Vue Gantt는 DHTMLX Gantt의 공식 Vue 래퍼입니다. Vue 친화적인 컴포지션 패턴과 기본 엔진에 대한 완전한 접근성을 결합합니다.

설정 지침이 먼저 필요한 경우 [Vue Gantt 빠른 시작](integrations/vue/quick-start.md)으로 시작하세요.

## 개념 모델

Vue Gantt는 DHTMLX Gantt 엔진의 래퍼입니다. 래퍼는 Vue 컴포넌트 API를 제공하지만, 기본 엔진은 차트 동작과 로우 레벨 메서드의 원천으로 남아 있습니다.

래퍼 레이어는 세 가지 주요 작업을 수행합니다:

- Vue 생명 주기와 함께 Gantt 인스턴스를 초기화하고 파괴합니다
- 선택된 Vue 프롭을 현재 Gantt 인스턴스에 동기화합니다
- 래퍼 전용 확장 포인트를 노출합니다(`events`, `@ready`, `customLightbox`, `inlineEditors`, composables)

이로써 대부분의 통합 작업은 선언적으로 유지되면서도 필요할 때 `instance`로 전환할 수 있습니다.

## 핵심 기능

래퍼는 기본 및 고급 통합 시나리오를 모두 다룹니다:

- 프롭을 사용한 선언적 설정(`config`, `templates`, `plugins`, `theme`, `locale`)
- `tasks`, `links` 및 고급 스토어(`resources`, `resourceAssignments`, `baselines`)에 대한 데이터 동기화
- `events` 맵을 통한 이벤트 연결
- 초기화 이후 한 번만 실행되는 라이프사이클 훅 `@ready`
- Vue 기반의 커스터마이제이션 훅(`customLightbox`, `inlineEditors`, `modals`)
- 재사용 가능한 패턴을 위한 타입 안전 헬퍼 및 컴포저블

## 시나리오: 기본 래퍼 구성

차트 구성과 템플릿 커스터마이징에 프롭을 사용하세요.

~~~vue
<script setup lang="ts">
import { ref } from "vue";
import VueGantt, {
  defineGanttConfig,
  defineGanttTemplates,
  type SerializedLink,
  type SerializedTask
} from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

const tasks = ref<SerializedTask[]>([
  {
    id: 1,
    text: "Project",
    start_date: new Date(2026, 0, 5),
    duration: 5,
    open: true,
    parent: 0
  }
]);
const links = ref<SerializedLink[]>([]);

const config = defineGanttConfig({
  scales: [
    { unit: "month", step: 1, format: "%F, %Y" },
    { unit: "day", step: 1, format: "%d %M" }
  ]
});

const templates = defineGanttTemplates({
  task_text: (_start, _end, task) => `#${task.id}: ${task.text}`
});
</script>

<template>
  <div style="height: 520px;">
    <VueGantt :tasks="tasks" :links="links" :config="config" :templates="templates" />
  </div>
</template>
~~~

전체 프롭 목록은 [Configuration Reference](integrations/vue/configuration-props.md)을 사용하세요.

## 데이터 소유 모델 선택

래퍼는 들어오는 프롭을 현재 인스턴스에 동기화합니다. 주요 결정은 애플리케이션에서 데이터를 권위 있게 다루는 주체가 어디인지 입니다.

- **Vue state/store를 진실의 원천으로 사용**: 래퍼 콜백(`data.save` / `data.batchSave`)이 상태를 업데이트하고, 그런 다음 업데이트된 프롭이 래퍼로 다시 흐릅니다.
- **Gantt를 진실의 원천으로 사용**: Gantt와 백엔드가 주요 데이터 수명 주기를 소유합니다. Vue 프롭은 실시간 차트 상태를 위해 덜 자주 사용됩니다.

데이터를 Vue가 소유하는 경우 반응형 상태와 페이로드 타입에 대해 `SerializedTask[]` 및 `SerializedLink[]`를 선호합니다.

동기화 동작 요약:

- 작업/링크 업데이트는 보통 차이 기반입니다(diff-based)
- 더 큰 변경에 대해 래퍼가 재설정/재구문으로 전환할 수 있습니다
- 고급 스토어(`resources`, `resourceAssignments`, `baselines`)는 데이터스토어를 통해 동기화됩니다

교환 및 프롭 계약에 대한 트레이드오프를 보려면 [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)를 사용하세요.

## 이벤트 처리 및 시작 로직

Gantt 이벤트 처리를 위해 `events` 맵을 사용하고 초기화 직후 한 번만 필요한 설정은 `@ready`를 사용합니다.

~~~vue
<script setup lang="ts">
import { defineGanttEvents, type GanttStatic } from "@dhtmlx/trial-vue-gantt";

const events = defineGanttEvents({
  onTaskCreated: task => {
    console.log("task created", task);
    return true;
  },
  onBeforeLightbox: taskId => {
    console.log("before lightbox", taskId);
    return true;
  }
});

const onReady = (instance: GanttStatic) => {
  console.log("ready", instance);
};
</script>

<template>
  <VueGantt :events="events" @ready="onReady" />
</template>
~~~

인터랙션 동작에는 `events`를 사용하고, 라이브 인스턴스가 필요한 초기화 로직에는 `@ready`를 사용합니다.

## 명령형 경계 넘나들기

프롭으로 모델링하기가 비현실적이거나 어려운 메서드가 필요한 경우 컴포넌트 참조(ref)를 사용합니다.

~~~vue
<script setup lang="ts">
import { onMounted, ref } from "vue";
import VueGantt, { type VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);

onMounted(() => {
  const gantt = ganttRef.value?.instance;
  if (!gantt) return;
  gantt.showDate(new Date());
});
</script>

<template>
  <VueGantt ref="ganttRef" />
</template>
~~~

`instance`를 통해 작업/링크 데이터를 변경하는 경우 외부 상태를 동기화 상태로 유지하세요. 그렇지 않으면 다음 프롭 업데이트가 이러한 변경을 덮어쓸 수 있습니다.

## 고급 확장 포인트

### 커스텀 라이트박스 컴포넌트

내장 태스크 폼을 Vue 컴포넌트로 대체합니다:

~~~vue
<VueGantt :tasks="tasks" :links="links" :customLightbox="CustomLightbox" :data="data" />
~~~

### 맞춤형 인라인 에디터

Gantt 인라인 에디터 이름을 Vue 컴포넌트에 매핑합니다:

~~~vue
<VueGantt :config="config" :inlineEditors="inlineEditors" :data="data" />
~~~

### 삭제 확인 흐름 맞춤화

삭제 확인을 `modals`로 재정의합니다:

~~~ts
const modals = {
  onBeforeTaskDelete: ({ task, callback }) => {
    if (window.confirm(`Delete ${task.text}?`)) callback();
  }
};
~~~

### 태스크 및 자원 필터링

태스크 필터링에는 `filter`, 자원 패널 필터링에는 `resourceFilter`를 사용합니다.

## 공개 샘플 시나리오 맵

이 래퍼 기능은 공개 샘플 경로에서 다루어집니다. GitHub의 [`vue-gantt-examples`](https://github.com/DHTMLX/vue-gantt-examples)에서 로컬로 실행하거나 [라이브 데모](https://dhtmlx.github.io/vue-gantt-examples/)를 시도해 보세요.

- `basic-init`: 기본 프롭, 구성 및 템플릿
- `templates`: 테마/로케일 전환, Vue `h()`-기반 컬럼 템플릿, 그리드 측면 필터링, 인스턴스로 확장/축소
- `custom-form`: `customLightbox`
- `custom-edit-view`: 이벤트 주도 외부 에디터 흐름
- `inline-editors`: Vue 인라인 에디터 매핑
- `auto-scheduling`: `plugins.auto_scheduling` + `critical_path` with `useWorkTime`
- `resource-panel`: 자원 + `resourceFilter`
- `state-management`: Pinia 저장소 기반 업데이트
- `export-data`: 내보내기 플러그인으로 명령형 작업

## 관련 기사

- [Configuration Reference](integrations/vue/configuration-props.md) → [구성 참조](integrations/vue/configuration-props.md)
- [Customization Patterns](integrations/vue/customization-patterns.md) → [맞춤화 패턴](integrations/vue/customization-patterns.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md) → [데이터 바인딩 및 상태 관리 기초](integrations/vue/state/state-management-basics.md)
- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md) → [Pinia로 Vue Gantt 사용하기](integrations/vue/state/pinia.md)
- [DHTMLX Gantt Guides](guides.md) → [DHTMLX Gantt 가이드](guides.md)