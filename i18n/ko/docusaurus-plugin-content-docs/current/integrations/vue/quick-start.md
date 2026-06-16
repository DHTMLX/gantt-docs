---
title: Vue Gantt 빠른 시작
sidebar_label: 빠른 시작
description: "Vue 3 + Vite 앱에서 공식 Vue Gantt 래퍼를 렌더링하는 단계별 가이드."
---

# Vue Gantt 빠른 시작

:::note
이 튜토리얼은 DHTMLX Gantt의 Commercial, Enterprise, 및 Ultimate 에디션에 포함된 Vue 래퍼를 다룹니다.
만약 무료 Community 에디션(v10+)이나 구 버전 GPL 에디션(v9.x 및 이하), 또는 Individual 에디션을 사용 중이라면 대체 가이드를 따라가세요:
[How to Start with Vue](integrations/vue/js-gantt-vue.md).
:::

Vue Gantt 컴포넌트는 **DHTMLX Gantt**의 공식 래퍼입니다.
이 가이드는 시험 패키지를 사용하여 작은 Vue 3 + Vite 애플리케이션을 생성하고 기본 Gantt 차트를 렌더링하는 방법을 안내합니다.

Vue를 처음 접하신다면 공식 [Vue 문서](https://vuejs.org/guide/introduction.html)부터 시작하세요.

다음 튜토리얼을 따라 만든 작동하는 전체 프로젝트를 GitHub에서 확인해 보세요: [GitHub에서 확인](https://github.com/DHTMLX/vue-gantt-quick-start).

## 필요 전제 조건

- Node.js 설치
- npm 또는 Yarn
- Vue 3 프로젝트(이 페이지는 Vite를 사용하여 생성하는 방법을 보여줍니다)
- Vue Gantt 패키지 접근(평가판 또는 Professional)

## 1. Vue 3 프로젝트 만들기

~~~bash
npm create vite@latest vue-gantt-quick-start -- --template vue-ts
cd vue-gantt-quick-start
npm install
~~~

Yarn을 선호하신다면 설치 단계를 `yarn`으로 바꾸십시오.

## 2. Vue Gantt 설치

Vue Gantt를 [Vue Gantt 설치 가이드](integrations/vue/installation.md)에 따라 설치합니다.

이 튜토리얼에서는 evaluation 패키지를 사용합니다:

~~~bash
npm install @dhtmlx/trial-vue-gantt
~~~

또는

~~~bash
yarn add @dhtmlx/trial-vue-gantt
~~~

Professional 패키지를 이미 사용 중인 경우, 명령 및 import에서 `@dhtmlx/trial-vue-gantt`를 `@dhx/vue-gantt`로 교체하십시오.

## 3. 데모 데이터 추가

`src/demoData.ts`를 생성합니다(외부에서 관리되는 데이터를 Vue 상태에 배치할 때는 가능하면 `SerializedTask` / `SerializedLink`를 사용하십시오):

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

## 4. Gantt 컴포넌트 생성

`src/components/GanttChart.vue`를 생성합니다:

~~~vue title="src/components/GanttChart.vue"
<script setup lang="ts">
import { ref } from "vue";
import VueGantt, {
  type SerializedLink,
  type SerializedTask,
  type VueGanttDataConfig
} from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { links as initialLinks, tasks as initialTasks } from "../demoData";

const tasks = ref<SerializedTask[]>(initialTasks);
const links = ref<SerializedLink[]>(initialLinks);

const data: VueGanttDataConfig = {
  save: (entity, action, item, id) => {
    console.log("save", { entity, action, item, id });
  }
};
</script>

<template>
  <div style="height: 100%; width: 100%;">
    <VueGantt :tasks="tasks" :links="links" :data="data" />
  </div>
</template>
~~~

프로페셔널 패키지를 사용하는 경우 두 import를 모두 교체하십시오:

- `@dhtmlx/trial-vue-gantt` -> `@dhx/vue-gantt`
- `@dhtmlx/trial-vue-gantt/dist/vue-gantt.css` -> `@dhx/vue-gantt/dist/vue-gantt.css`

## 5. 앱 셸에서 Gantt 렌더링

`src/App.vue`를 교체합니다:

~~~vue title="src/App.vue"
<script setup lang="ts">
import GanttChart from "./components/GanttChart.vue";
</script>

<template>
  <div style="height: 100vh; width: 100vw;">
    <GanttChart />
  </div>
</template>
~~~

## 6. 앱 시작

~~~bash
npm run dev
~~~

로컬 Vite URL을 열면 작동하는 Gantt 차트와 작업 또는 링크를 편집할 때 나타나는 콘솔 로그를 확인할 수 있습니다.

기존 앱에 Gantt를 추가하는 경우 현재의 `App.vue` 레이아웃을 유지하고 대상 페이지/컴포넌트에 `<GanttChart />`를 렌더링합니다. 부모 레이아웃에서 Gantt 영역에 높이를 제공하는지 확인하세요.

## 7. (선택) 로깅을 로컬 저장 처리로 대체

백엔드나 스토어를 추가하기 전에 차트 편집과 함께 Vue 상태를 동기화하고자 할 때 사용합니다. `src/components/GanttChart.vue`를 업데이트하세요.

~~~ts
const data: VueGanttDataConfig = {
  save: (entity, action, item, id) => {
    if (entity === "task") {
      if (action === "create") tasks.value = [...tasks.value, item as SerializedTask];
      if (action === "update") tasks.value = tasks.value.map(t => String(t.id) === String(id) ? item as SerializedTask : t);
      if (action === "delete") tasks.value = tasks.value.filter(t => String(t.id) !== String(id));
    }

    if (entity === "link") {
      if (action === "create") links.value = [...links.value, item as SerializedLink];
      if (action === "update") links.value = links.value.map(l => String(l.id) === String(id) ? item as SerializedLink : l);
      if (action === "delete") links.value = links.value.filter(l => String(l.id) !== String(id));
    }
  }
};
~~~

다중 변경 작업(예: 자동 일정 계획)에는 `data.batchSave`를 사용하는 것이 좋습니다.

## 결과

다음과 같이 공식 Vue Gantt 래퍼를 렌더링하는 Vue 3 앱을 얻을 수 있습니다:

- 반응형의 `tasks` 및 `links` props
- 래퍼 CSS 임포트
- 사용자 편집에 대한 `data.save` 콜백 연결

이 예제는 [GitHub 데모 프로젝트](https://github.com/DHTMLX/vue-gantt-quick-start)에서도 사용된 동일한 최소 예제입니다.

## GitHub 데모 저장소

이 튜토리얼을 따라가는 완전한 작동 프로젝트는 GitHub에서 제공됩니다: [GitHub에서 확인](https://github.com/DHTMLX/vue-gantt-quick-start).

## 다음에 읽을 내용

- [Vue Gantt 개요](integrations/vue/overview.md)
- [구성 참조](integrations/vue/configuration-props.md)
- [데이터 바인딩 및 상태 관리 기본](integrations/vue/state/state-management-basics.md)