---
title: Angular Gantt의 데이터 바인딩 및 상태 관리
sidebar_label: 기본
description: "적절한 데이터 소유권 모델을 선택하고, 콜백 계약을 구현하며, Angular Gantt에서 동기화 문제를 피하세요."
---

# Angular Gantt의 데이터 바인딩 및 상태 관리

Angular Gantt는 두 가지 데이터 소유권 모델을 지원합니다:

1. **진실의 원천으로서의 Angular 상태/스토어** (대부분의 애플리케이션에 권장).
2. **진실의 원천으로서의 Gantt** (특수 페이지를 위한 성능 중심).

페이지/기능 영역당 한 모델을 선택하고 일관되게 유지하십시오.

## 진실의 원천으로서의 Angular 상태/스토어

이 모델에서:

- 컴포넌트 상태나 RxJS 스토어가 `tasks`와 `links`를 소유합니다,
- 래퍼가 입력을 통해 배열을 수신합니다,
- 차트 변화는 `data.save` 또는 `data.batchSave`를 통해 캡처됩니다,
- 콜백은 상태/스토어를 업데이트하고 새 배열이 `<dhx-gantt>`로 다시 흐릅니다.

### Best for

- 차트와 동기화되어야 하는 도구 모음/폼이 있는 Angular 페이지,
- 서비스와 RxJS를 기반으로 이미 구축된 팀 코드베이스,
- 예측 가능한 상태 전이와 더 쉬운 디버깅 가능성.

### Tradeoffs

- 무거운 차트 작업으로 인한 더 많은 애플리케이션 상태 업데이트,
- 대량 편집 중 더 빈번한 동기화 작업.

### Anti-patterns to avoid

- Angular 상태에서 오래된 `tasks`/`links` 배열을 밀어내면서도 `instance`를 통해 데이터를 변경하는 것,
- `data.save` / `data.batchSave`를 무시하고 차트 편집이 애플리케이션 상태에 자동으로 반영되길 기대하는 것.

### Full-flow example (component state)

~~~ts
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttDataConfig,
  type SerializedTask,
  type SerializedLink,
} from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [tasks]="tasks" [links]="links" [data]="dataConfig"></dhx-gantt>`,
})
export class GanttPageComponent {
  tasks: SerializedTask[] = [];
  links: SerializedLink[] = [];

  dataConfig: AngularGanttDataConfig = {
    save: (entity, action, item, id) => {
      if (entity === 'task') {
        if (action === 'create') this.tasks = [...this.tasks, item];
        if (action === 'update') this.tasks = this.tasks.map((t) => String(t.id) === String(id) ? { ...t, ...item } : t);
        if (action === 'delete') this.tasks = this.tasks.filter((t) => String(t.id) !== String(id));
      }

      if (entity === 'link') {
        if (action === 'create') this.links = [...this.links, item];
        if (action === 'update') this.links = this.links.map((l) => String(l.id) === String(id) ? { ...l, ...item } : l);
        if (action === 'delete') this.links = this.links.filter((l) => String(l.id) !== String(id));
      }
    },
  };
}
~~~

## Gantt를 진실의 원천으로

이 모델에서는 차트와 백엔드가 런타임 데이터 수명 주기의 대부분을 소유합니다.

### Best for

- 매우 큰 데이터 세트,
- 차트 중심의 화면,
- 자주 자동 일정화(auto-scheduling)되거나 연쇄 편집이 발생하고 애플리케이션 저장소 업데이트가 비용이 큰 경우.

### Tradeoffs

- Angular 서비스/컴포넌트에서 라이브 차트 상태를 즉시 볼 수 있는 가능성 감소,
- 가끔의 입력 업데이트를 명령형 작업과 혼합할 때 필요한 추가 규율.

### Anti-patterns to avoid

- 명확한 조정 계획 없이 부분적으로 미러링하는 것,
- 차트에서 사용자가 데이터를 변경한 후에도 오래된 서버 스냅샷을 다시 로드하는 것.

### Server transport example

~~~ts
dataConfig = {
  load: '/api/gantt/load',
  save: async (entity: string, action: string, payload: any, id: string | number) => {
    const response = await fetch(`/api/gantt/${entity}`, {
      method: action === 'delete' ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, payload, id }),
    });

    return await response.json();
  },
};
~~~

백엔드가 권위 있는 상태 소유자이고 Angular가 모든 편집을 실시간으로 반영할 필요가 없을 때 이 방식을 사용하십시오.

## Callback Contracts {#callback-contracts}

### `data.save`

`save`는 `gantt.createDataProcessor(save)`에 전달되며 변경당 페이로드를 받습니다.

Typical function shape:

~~~ts
(entity: string, action: string, data: any, id: string | number) => any
~~~

변경이 대부분 단일적이고 차례로 적용하기 쉽다면 이 함수를 사용하십시오.

### `data.batchSave`

`batchSave`는 그룹화된 페이로드를 받습니다:

~~~ts
interface BatchChanges {
  tasks?: DataCallbackChange[];
  links?: DataCallbackChange[];
  resources?: DataCallbackChange[];
  resourceAssignments?: DataCallbackChange[];
}
~~~

엔티티-버킷 매핑은 다음을 포함합니다:

- `task` / `tasks` -> `tasks`
- `link` / `links` -> `links`
- `resource` / `resources` -> `resources`
- `assignment` / `resourceAssignment` / `resourceAssignments` -> `resourceAssignments`

대기열 동작 요약:

- 작은 디바운스 기반 배칭,
- `create` + `update`를 최신 데이터로 하나의 `create`로 응집,
- `create` + `delete` 제거,
- 내부 `!nativeeditor_status`를 페이로드에서 제거.

하나의 차트 작업이 다수의 하위 변경을 촉발할 수 있을 때 이 방식을 사용하십시오.

## Angular 상태에 데이터 로딩

### 로컬 컴포넌트 상태

작은 페이지나 프로토타입에 로컬 컴포넌트 필드를 사용하십시오.

Angular에서 데이터를 로드한 다음 배열을 `tasks` 및 `links` 입력에 할당합니다. 콜백 핸들러는 같은 컴포넌트에 유지합니다.

### RxJS 서비스 / 스토어(중간~대형 앱에 권장)

주입 가능한 서비스에 `BehaviorSubject`(또는 이와 유사한 것)로 작업, 링크 및 UI 상태를 보유합니다.

이 패턴은 Angular 공개 샘플에서 사용되며 [Using Angular Gantt with RxJS](integrations/angular/state/rxjs.md)에 문서화되어 있습니다.

### API에서 Angular 상태로 로드하기

일반 흐름:

1. 서비스나 라우트 리졸버에서 데이터를 가져옵니다.
2. 필요하다면 날짜 형식을 표준화하거나 매핑합니다.
3. 데이터를 저장소/컴포넌트 상태에 푸시합니다.
4. 배열을 `<dhx-gantt>`로 전달합니다.
5. `data.save` 또는 `data.batchSave`로 수정 사항을 처리하고 백엔드에 저장합니다.

Angular 상태가 진실의 원천이고 백엔드가 여전히 장기 지속 소스인 경우에 이 방식이 적합합니다.

## Angular 앱에서의 Gantt를 진실의 원천으로

### 이 모델이 이치가 있을 때

페이지의 대부분이 차트이고 주변의 Angular UI가 모든 task/link 업데이트에 반응할 필요가 없을 때 선택하십시오.

### 초기 데이터 제공

Gantt 관리 데이터를 다음 패턴 중 하나로 초기화할 수 있습니다:

- `data.load` URL
- `data.load` 함수(동기/비동기)
- 초기 `tasks`/`links` 배열, 그리고 이를 더 이상 라이브 소스-오브-트루스로 취급하지 않음

### 업데이트 작동 방식

Gantt 인스턴스는 사용자의 변경을 내부적으로 적용하고 이를 `save` 또는 `batchSave`를 통해 보냅니다.

Angular는 각 변경 후 `tasks`/`links`를 재할당할 필요가 없으며, 명시적으로 반영하려는 경우를 제외하고는 반영하지 않아도 됩니다.

## ID 재매핑 및 백엔드 책임

생성 작업은 종종 임시 클라이언트 측 ID로 시작합니다.

- `save` 모드에서는 백엔드 응답이 지속 가능한 ID를 반환해야 Gantt가 내부 레코드를 재매핑할 수 있습니다.
- `batchSave` 모드에서는 항목별 반환 경로가 없으므로 백엔드가 새 ID를 할당하는 경우 퍼시스턴스 워크플로우에서 명시적으로 ID 재매핑을 처리해야 합니다.

백엔드의 책임은 다음과 같습니다:

- 검증,
- 권한 확인,
- 지속 가능한 ID 할당,
- 일관된 응답 페이로드.

## 계속하기

- [RxJS로 Angular Gantt 사용하기](integrations/angular/state/rxjs.md)
- [구성 참조](integrations/angular/configuration-props.md)
- [Angular Gantt 개요](integrations/angular/overview.md)