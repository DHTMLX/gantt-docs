--- 
title: Vue Gantt의 데이터 바인딩 및 상태 관리
sidebar_label: 기초
description: "Vue Gantt에 대한 데이터 소유 모델을 선택하고, 저장 콜백을 연결하며, 상태 동기화의 함정을 피하세요."
---

# Vue Gantt의 데이터 바인딩 및 상태 관리

이 가이드는 애플리케이션이 Gantt 데이터를 어디에서 소유하는지와 차트 편집을 어떻게 동기화하는지 선택하는 데 도움을 줍니다. 페이지당 하나의 소유 모델을 선택하고 일관되게 유지하세요.

Vue Gantt는 두 가지 일반적인 모델을 지원합니다:

1. **Vue state/store as source of truth** (대다수 앱에 대한 최선의 기본값)
2. **Gantt as source of truth** (차트 중심 페이지를 위한 성능 중심)

## 개념 모델

래퍼(wrapper)가 props를 실시간 Gantt 인스턴스와 동기화합니다. 사용자가 차트에서 데이터를 편집하면, 다음 중 어느 방식으로 처리할지 결정합니다:

- 래퍼 콜백이 Vue 상태를 업데이트합니다(Vue 소유 모델),
- 또는 차트/백엔드가 변경을 직접 처리합니다(Gantt 소유 모델)

주된 함정은 소유권의 혼합입니다. Vue와 Gantt 인스턴스가 모두 진실의 원천처럼 작동하면 오래된 데이터가 덮어씌워질 가능성이 큽니다.

## Vue State Or Store As Source Of Truth

이 모델에서:

- Vue 상태(또는 Pinia)가 `tasks`와 `links`를 소유합니다
- 래퍼는 props를 통해 배열을 받습니다
- 차트 편집은 `data.save` 또는 `data.batchSave`를 통해 캡처됩니다
- 콜백 핸들러가 상태를 업데이트합니다
- 업데이트된 상태가 다시 래퍼로 흐릅니다

이 모델에 대한 유형 권장사항: 반응형 상태 배열로 `SerializedTask[]` 및 `SerializedLink[]`를 사용하십시오.

### Best For

- 차트 상태를 반영해야 하는 Vue UI가 둘러싼 페이지
- 이미 Pinia나 중앙 집중식 상태 계층을 사용하는 앱
- 예측 가능한 단방향 데이터 흐름을 원하는 팀

### Tradeoffs

- 무거운 작업에 대한 애플리케이션 상태 업데이트가 늘어남
- 차트에서 많은 편집이 한 번의 차트 작업으로 발생할 때 동기화 작업이 더 많아짐

### Avoid These Patterns

- `instance`를 통해 task/link 데이터를 변형하면서 Vue 상태로부터 구식 배열을 계속 전달하는 패턴
- 래퍼 callbacks를 무시하고 차트 편집이 Vue 상태에 자동으로 지속될 것으로 기대하는 패턴

### Example: Store/Vue-Owned Flow

~~~vue
<script setup lang="ts">
import { ref } from "vue";
import VueGantt, {
  type SerializedLink,
  type SerializedTask,
  type VueGanttDataConfig
} from "@dhtmlx/trial-vue-gantt";

const tasks = ref<SerializedTask[]>([]);
const links = ref<SerializedLink[]>([]);

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
</script>

<template>
  <VueGantt :tasks="tasks" :links="links" :data="data" />
</template>
~~~

다중 변경 작업의 경우 `data.batchSave`로 이동하고 그룹화된 배치로 변경사항을 적용합니다.

## Gantt As Source Of Truth

이 모델에서는 차트와 백엔드가 대부분의 데이터 수명 주기 작업을 소유합니다. Vue는 실시간 미러링 정도가 적습니다.

### Best For

- 매우 큰 데이터 세트
- 대량 자동 스케줄링 또는 대량 업데이트 흐름
- 외부 UI가 모든 실시간 변경을 즉시 필요로 하지 않는 차트 중심 페이지

### Tradeoffs

- Vue 상태/스토어에서 차트의 실시간 상태에 대한 가시성 감소
- prop 스냅샷을 래퍼로 다시 전달할 때 더 큰 규율 필요

### Avoid These Patterns

- 부분적인 Vue 미러링과 조정 전략이 없는 경우
- 사용자가 차트를 편집한 후 서버 스냅샷을 다시 로드하는 경우

### Example: Gantt-Owned Transport

~~~vue
<script setup lang="ts">
import VueGantt from "@dhtmlx/trial-vue-gantt";

const data = {
  load: "/api/gantt/load",
  save: async (entity: string, action: string, payload: any, id: string | number) => {
    const response = await fetch(`/api/gantt/${entity}`, {
      method: action === "delete" ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, payload, id })
    });

    // Create handlers should return the persistent ID when backend remaps it.
    return await response.json();
  }
};
</script>

<template>
  <VueGantt :data="data" />
</template>
~~~

## Callback Contracts

이 섹션은 두 소유 모델에서 사용하는 래퍼 콜백 형태를 다룹니다.

### `data.save`

`save`는 `gantt.createDataProcessor(save)`에 전달되며 한 번에 하나의 변경을 받습니다.

전형적인 함수 형태:

~~~ts
(entity: string, action: string, data: any, id: string | number) => any
~~~

변경이 대부분 단일이고 하나씩 처리하기 쉬울 때를 위한 것입니다.

### `data.batchSave` {#databatchsave}

`batchSave`는 네 가지 버킷으로 그룹화된 변경사항을 받습니다. 각 데이터 유형별 하나의 버킷입니다:

~~~ts
interface BatchChanges {
  tasks?: DataCallbackChange[];
  links?: DataCallbackChange[];
  resources?: DataCallbackChange[];
  resourceAssignments?: DataCallbackChange[];
}
~~~

관심 있는 버킷만 순회하면 됩니다 — 래퍼가 Gantt의 변경 이벤트에서 자동으로 채웁니다.

큐잉 동작 요약:

- 근접한 즉시 플러시 배칭
- `create` + `update`를 최근 페이로드로 하나의 `create`로 합칠 수 있음
- `create` + `delete`는 배치에서 제거 가능
- 내부 `!nativeeditor_status`는 페이로드에서 제거

한 사용자의 한 번의 작업으로 많은 업데이트가 발생하는 경우에 사용하세요(예: 자동 스케줄링).

## ID Remapping And Backend Responsibility

생성 작업은 종종 임시 클라이언트 측 ID로 시작합니다.

- `save` 모드에서는 백엔드 응답이 지속 가능한 ID를 반환해야 Gantt가 레코드를 재매핑할 수 있습니다.
- `batchSave` 모드에는 항목별 반환 경로가 없습니다. 서버가 ID를 할당하는 경우 지속성 워크플로에서 명시적으로 매핑을 처리해야 합니다.

두 모드에서 백엔드의 책임은 동일합니다:

- 수신 페이로드를 검증
- 권한을 강제
- 권위 있는 ID를 지속 저장
- 선택한 전송 모드가 기대하는 데이터 구조를 반환

## What To Read Next

- [Pinia와 함께 Vue Gantt 사용하기](integrations/vue/state/pinia.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
- [커스터마이징 패턴](integrations/vue/customization-patterns.md)