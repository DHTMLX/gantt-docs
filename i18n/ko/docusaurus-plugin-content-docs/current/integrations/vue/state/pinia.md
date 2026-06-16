---
title: Vue Gantt + Pinia 튜토리얼
sidebar_label: Pinia
description: "Pinia를 이용한 Vue Gantt의 단계별 통합: 저장소 구조, 콜백 연결, 그리고 선택적 저장소 수준의 실행 취소/다시 실행."
---

# Vue Gantt + Pinia 튜토리얼

이 튜토리얼은 Pinia를 사용한 저장소 주도 방식의 Vue Gantt 통합을 보여줍니다. 공개 Vue 샘플과 동일한 아키텍처를 따르며, 저장소가 `tasks`와 `links`를 소유하고, 래퍼 콜백이 차트 편집을 다시 저장소로 전달합니다.

## 전제 조건

- Vue 3 프로젝트
- Pinia 설치 여부(또는 설치 권한 부여 가능 여부)
- Vue Gantt 패키지 설치
- [데이터 바인딩 및 상태 관리 기초](integrations/vue/state/state-management-basics.md) 읽기 권장

## 1. Pinia 설치 및 등록

Pinia가 아직 설치되지 않았다면:

~~~bash
npm install pinia
~~~

`src/main.ts`에 Pinia를 등록합니다:

~~~ts title="src/main.ts"
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

createApp(App).use(createPinia()).mount("#app");
~~~

## 2. Vue Gantt 설치

Vue Gantt를 [Vue Gantt 설치 가이드](integrations/vue/installation.md)에 설명된 대로 설치합니다.

이 튜토리얼에서는 평가판 패키지를 사용합니다:

~~~bash
npm install @dhtmlx/trial-vue-gantt
~~~

또는

~~~bash
yarn add @dhtmlx/trial-vue-gantt
~~~

Professional 패키지를 이미 사용하는 경우 명령과 임포트를 `@dhtmlx/trial-vue-gantt`에서 `@dhx/vue-gantt`로 교체하세요.

## 3. 데모 데이터 추가

`src/demoData.ts`를 만듭니다:

~~~ts title="src/demoData.ts"
import type { SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";

export const tasks: SerializedTask[] = [
  {
    id: 1,
    text: "Office itinerancy",
    type: "project",
    start_date: new Date(2026, 0, 5),
    duration: 10,
    progress: 0.4,
    open: true,
    parent: 0
  },
  {
    id: 2,
    text: "Planning",
    start_date: new Date(2026, 0, 5),
    duration: 4,
    progress: 0.6,
    parent: 1
  }
];

export const links: SerializedLink[] = [{ id: 1, source: 1, target: 2, type: "0" }];
~~~

## 4. 기본 Gantt 저장소 만들기

`src/stores/ganttStore.ts`를 만듭니다:

~~~ts title="src/stores/ganttStore.ts"
import { defineStore } from "pinia";
import type { BatchChanges, SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";
import { links, tasks } from "../demoData";

type ZoomLevel = "day" | "month" | "year";

const zoomLevels = [
  {
    name: "day",
    scale_height: 27,
    min_column_width: 80,
    scales: [{ unit: "day", step: 1, format: "%d %M" }]
  },
  {
    name: "month",
    scale_height: 50,
    min_column_width: 120,
    scales: [
      { unit: "month", format: "%F, %Y" },
      { unit: "week", format: "Week #%W" }
    ]
  },
  {
    name: "year",
    scale_height: 50,
    min_column_width: 36,
    scales: [{ unit: "year", step: 1, format: "%Y" }]
  }
];

function applyBatchChanges(tasks: SerializedTask[], links: SerializedLink[], changes: BatchChanges) {
  let nextTasks = [...tasks];
  let nextLinks = [...links];

  for (const change of changes.tasks || []) {
    if (change.action === "create") nextTasks.push(change.data as SerializedTask);
    if (change.action === "update") {
      nextTasks = nextTasks.map(t => String(t.id) === String(change.id) ? change.data as SerializedTask : t);
    }
    if (change.action === "delete") {
      nextTasks = nextTasks.filter(t => String(t.id) !== String(change.id));
    }
  }

  for (const change of changes.links || []) {
    if (change.action === "create") nextLinks.push(change.data as SerializedLink);
    if (change.action === "update") {
      nextLinks = nextLinks.map(l => String(l.id) === String(change.id) ? change.data as SerializedLink : l);
    }
    if (change.action === "delete") {
      nextLinks = nextLinks.filter(l => String(l.id) !== String(change.id));
    }
  }

  return { tasks: nextTasks, links: nextLinks };
}

export const useGanttStore = defineStore("gantt", {
  state: () => ({
    tasks: tasks,
    links: links,
    zoomLevel: "day" as ZoomLevel
  }),
  getters: {
    config: state => ({
      zoom: {
        current: state.zoomLevel,
        levels: zoomLevels
      }
    })
  },
  actions: {
    setZoom(level: ZoomLevel) {
      this.zoomLevel = level;
    },
    applyBatch(changes: BatchChanges) {
      const next = applyBatchChanges(this.tasks, this.links, changes);
      this.tasks = next.tasks;
      this.links = next.links;
    }
  }
});
~~~

이 저장소는 단일 원천 데이터를 유지합니다:

- `tasks`와 `links`가 정합 데이터
- `config`는 파생 상태
- `applyBatch`가 래퍼 콜백 진입점

## 5. Store 상태를 `VueGantt`에 바인딩

`src/components/GanttChart.vue`를 만듭니다:

~~~vue title="src/components/GanttChart.vue"
<script setup lang="ts">
import { storeToRefs } from "pinia";
import VueGantt, { type BatchChanges } from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { useGanttStore } from "../stores/ganttStore";

const store = useGanttStore();
const { tasks, links, config, zoomLevel } = storeToRefs(store);

const data = {
  batchSave: (changes: BatchChanges) => store.applyBatch(changes)
};

const setZoom = (level: "day" | "month" | "year") => {
  store.setZoom(level);
};
</script>

<template>
  <section>
    <div style="display:flex; gap:8px; margin-bottom:10px;">
      <button type="button" :class="{ active: zoomLevel === 'day' }" @click="setZoom('day')">Day</button>
      <button type="button" :class="{ active: zoomLevel === 'month' }" @click="setZoom('month')">Month</button>
      <button type="button" :class="{ active: zoomLevel === 'year' }" @click="setZoom('year')">Year</button>
    </div>

    <div style="height: 80vh;">
      <VueGantt :tasks="tasks" :links="links" :config="config" :data="data" />
    </div>
  </section>
</template>
~~~

다음은 핵심 래퍼 연결 방식입니다:

- 저장소 값 → 래퍼 속성으로 매핑
- `batchSave` → 저장소 액션으로 연결
- 저장소 액션 → 새로운 상태 → 다시 래퍼 속성으로 반영

## 6. 앱 셸에서 Gantt 렌더링

`src/App.vue`를 교체합니다:

~~~vue title="src/App.vue"
<script setup lang="ts">
import GanttChart from "./components/GanttChart.vue";
</script>

<template>
  <div :style="{ height: '100%', width: '100%' }">
    <GanttChart />
  </div>
</template>
~~~

## 7. 데이터 흐름 확인

예측 가능한 업데이트를 위해 이 흐름을 사용하십시오:

1. 저장소가 `tasks`, `links`, 그리고 파생 상태인 `config`를 노출합니다.
2. `VueGantt`는 props에서 렌더링합니다.
3. 차트에서 사용자가 편집하면 `data.batchSave`가 트리거됩니다.
4. 저장소 액션(`applyBatch`)이 변경 내용을 병합합니다.
5. 업데이트된 상태가 다시 `VueGantt`로 흐릅니다.

저장소를 업데이트하지 않는 한 이 흐름과 직접 인스턴스의 변형을 혼합하지 마십시오.

## 8. (선택) 저장소 수준의 Undo/Redo 추가

Pinia를 사실상의 진실의 원천으로 유지하면서 Undo/Redo를 원한다면 이 방법을 사용하십시오.

이 모드에서 `gantt.plugins({ undo: true })`를 활성화하지 마십시오.

### 8.1 저장소를 히스토리 버전으로 교체

2단계의 저장소를 이 버전으로 교체합니다.
상태를 `SerializedTask[]` / `SerializedLink[]` 유형으로 유지하며 날짜 복제 시 `as any` 캐스트를 피합니다.

~~~ts title="src/stores/ganttStore.ts"
import { defineStore } from "pinia";
import type { BatchChanges, SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";
import { links, tasks } from "../demoData";

type ZoomLevel = "day" | "month" | "year";

type Snapshot = {
  tasks: SerializedTask[];
  links: SerializedLink[];
  zoomLevel: ZoomLevel;
};

type HistoryState = {
  tasks: SerializedTask[];
  links: SerializedLink[];
  zoomLevel: ZoomLevel;
  past: Snapshot[];
  future: Snapshot[];
  maxHistory: number;
};

const zoomLevels = [
  {
    name: "day",
    scale_height: 27,
    min_column_width: 80,
    scales: [{ unit: "day", step: 1, format: "%d %M" }]
  },
  {
    name: "month",
    scale_height: 50,
    min_column_width: 120,
    scales: [
      { unit: "month", format: "%F, %Y" },
      { unit: "week", format: "Week #%W" }
    ]
  },
  {
    name: "year",
    scale_height: 50,
    min_column_width: 36,
    scales: [{ unit: "year", step: 1, format: "%Y" }]
  }
];

function applyBatchChanges(tasks: SerializedTask[], links: SerializedLink[], changes: BatchChanges) {
  let nextTasks = [...tasks];
  let nextLinks = [...links];

  for (const change of changes.tasks || []) {
    if (change.action === "create") nextTasks.push(change.data as SerializedTask);
    if (change.action === "update") {
      nextTasks = nextTasks.map(t => String(t.id) === String(change.id) ? change.data as SerializedTask : t);
    }
    if (change.action === "delete") {
      nextTasks = nextTasks.filter(t => String(t.id) !== String(change.id));
    }
  }

  for (const change of changes.links || []) {
    if (change.action === "create") nextLinks.push(change.data as SerializedLink);
    if (change.action === "update") {
      nextLinks = nextLinks.map(l => String(l.id) === String(change.id) ? change.data as SerializedLink : l);
    }
    if (change.action === "delete") {
      nextLinks = nextLinks.filter(l => String(l.id) !== String(change.id));
    }
  }

  return { tasks: nextTasks, links: nextLinks };
}

const cloneDate = (value: Date | string | undefined): Date | string | undefined => {
  if (value instanceof Date) return new Date(value.getTime());
  return value;
};

const cloneTask = (task: SerializedTask): SerializedTask => {
  const next: SerializedTask = { ...task };
  next.start_date = cloneDate(task.start_date);
  next.end_date = cloneDate(task.end_date);
  return next;
};

const cloneLink = (link: SerializedLink): SerializedLink => ({ ...link });

const createSnapshot = (state: HistoryState): Snapshot => ({
  tasks: state.tasks.map(cloneTask),
  links: state.links.map(cloneLink),
  zoomLevel: state.zoomLevel
});

export const useGanttStore = defineStore("gantt", {
  state: () => ({
    tasks: tasks,
    links: links,
    zoomLevel: "day" as ZoomLevel,
    past: [] as Snapshot[],
    future: [] as Snapshot[],
    maxHistory: 50
  }),
  getters: {
    config: state => ({
      zoom: {
        current: state.zoomLevel,
        levels: zoomLevels
      }
    }),
    canUndo: state => state.past.length > 0,
    canRedo: state => state.future.length > 0
  },
  actions: {
    pushHistory() {
      this.past = [...this.past, createSnapshot(this as HistoryState)];
      if (this.past.length > this.maxHistory) {
        this.past = this.past.slice(this.past.length - this.maxHistory);
      }
      this.future = [];
    },
    restoreSnapshot(snapshot: Snapshot) {
      this.tasks = snapshot.tasks.map(cloneTask);
      this.links = snapshot.links.map(cloneLink);
      this.zoomLevel = snapshot.zoomLevel;
    },
    setZoom(level: ZoomLevel) {
      if (this.zoomLevel === level) return;
      this.pushHistory();
      this.zoomLevel = level;
    },
    applyBatch(changes: BatchChanges) {
      const hasChanges = (changes.tasks?.length ?? 0) > 0 || (changes.links?.length ?? 0) > 0;
      if (!hasChanges) return;

      this.pushHistory();
      const next = applyBatchChanges(this.tasks, this.links, changes);
      this.tasks = next.tasks;
      this.links = next.links;
    },
    undo() {
      if (this.past.length === 0) return;

      const previous = this.past[this.past.length - 1];
      const current = createSnapshot(this as HistoryState);

      this.past = this.past.slice(0, -1);
      this.future = [current, ...this.future];
      this.restoreSnapshot(previous);
    },
    redo() {
      if (this.future.length === 0) return;

      const next = this.future[0];
      const current = createSnapshot(this as HistoryState);

      this.future = this.future.slice(1);
      this.past = [...this.past, current];
      if (this.past.length > this.maxHistory) {
        this.past = this.past.slice(this.past.length - this.maxHistory);
      }
      this.restoreSnapshot(next);
    }
  }
});
~~~

### 8.2 컴포넌트에 Undo/Redo 버튼 추가

`src/components/GanttChart.vue`를 업데이트합니다:

~~~vue title="src/components/GanttChart.vue"
<script setup lang="ts">
import { storeToRefs } from "pinia";
import VueGantt, { type BatchChanges } from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { useGanttStore } from "../stores/ganttStore";

const store = useGanttStore();
const { tasks, links, config, zoomLevel, canUndo, canRedo } = storeToRefs(store);

const data = {
  batchSave: (changes: BatchChanges) => store.applyBatch(changes)
};

const setZoom = (level: "day" | "month" | "year") => {
  store.setZoom(level);
};
</script>

<template>
  <section>
    <div style="display:flex; gap:8px; margin-bottom:10px;">
      <button type="button" :disabled="!canUndo" @click="store.undo()">Undo</button>
      <button type="button" :disabled="!canRedo" @click="store.redo()">Redo</button>
      <button type="button" :class="{ active: zoomLevel === 'day' }" @click="setZoom('day')">Day</button>
      <button type="button" :class="{ active: zoomLevel === 'month' }" @click="setZoom('month')">Month</button>
      <button type="button" :class="{ active: zoomLevel === 'year' }" @click="setZoom('year')">Year</button>
    </div>

    <div style="height: 80vh;">
      <VueGantt :tasks="tasks" :links="links" :config="config" :data="data" />
    </div>
  </section>
</template>
~~~

### 8.3 왜 저장소 수준의 히스토리를 사용하는가

저장소가 진실의 원천이기 때문입니다:

- Vue UI와 차트는 동일한 상태 전환을 통해 동기화됩니다
- `maxHistory`가 메모리 사용을 한정합니다
- 새로운 변경은 자동으로 다시 실행 히스토리를 지웁니다
- 두 개의 독립적인 히스토리 시스템을 피할 수 있습니다

## 결과

이제 Pinia 기반 통합이 확보되었으며 다음과 같습니다:

- Pinia가 `tasks`와 `links`를 소유합니다
- `data.batchSave`가 차트 편집을 저장소에 적용합니다
- `VueGantt`가 저장소 상태에서 다시 렌더링됩니다
- Undo/Redo를 Gantt 인스턴스의 소유권으로 전환하지 않고도 추가할 수 있습니다

## 일반적인 함정

- 차트 편집 후 저장소 상태를 오래된 API 스냅샷으로 대체하는 경우
- `batchSave`가 더 적합한 상황에서 고용량 작업에 `data.save`를 사용하는 경우
- 저장소 소유권과 직접 인스턴스 변형을 혼합하고 상태를 일치시키지 않는 경우
- 내장 Gantt Undo 플러그인과 저장소 수준의 히스토리를 함께 활성화하는 경우

## GitHub 데모 저장소

이 튜토리얼을 따라 작성된 완전한 작동 프로젝트는 [GitHub에서 제공됩니다](https://github.com/DHTMLX/vue-gantt-pinia-starter).

## 다음에 읽을 내용

- [데이터 바인딩 및 상태 관리 기초](integrations/vue/state/state-management-basics.md)
- [구성 참조](integrations/vue/configuration-props.md)
- [Vue Gantt 개요](integrations/vue/overview.md)
- [맞춤 패턴](integrations/vue/customization-patterns.md)