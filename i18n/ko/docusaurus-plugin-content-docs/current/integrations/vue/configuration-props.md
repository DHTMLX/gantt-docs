---
title: VueGantt에서 DHTMLX Gantt 속성 사용
sidebar_label: 구성
description: "VueGantt 속성, 데이터/생명주기 계약 및 내보낸 Vue 헬퍼/컴포저블에 대한 참조."
---

# VueGantt에서 DHTMLX Gantt 속성 사용하기

이 페이지는 `@dhtmlx/trial-vue-gantt` 및 `@dhx/vue-gantt`의 공개 Vue 래퍼 인터페이스를 문서화합니다.

[Overview](integrations/vue/overview.md) 또는 [Quick Start](integrations/vue/quick-start.md) 이후 참고 자료로 활용하십시오.

## 사용 가능한 Props

<table>
  <thead>
    <tr>
      <th>속성</th>
      <th>유형</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>tasks</td>
      <td>Task[]</td>
      <td>차트/그리드에 렌더링되는 Task 컬렉션.</td>
    </tr>
    <tr>
      <td>links</td>
      <td>Link[]</td>
      <td>의존성(링크) 컬렉션.</td>
    </tr>
    <tr>
      <td>resources</td>
      <td>any[] | null</td>
      <td>리소스 레이아웃 및 리소스 관련 API 메서드를 위한 데이터셋.</td>
    </tr>
    <tr>
      <td>resourceAssignments</td>
      <td>any[] | null</td>
      <td>리소스 할당 데이터셋.</td>
    </tr>
    <tr>
      <td>baselines</td>
      <td>any[] | null</td>
      <td>Baseline 데이터셋.</td>
    </tr>
    <tr>
      <td>markers</td>
      <td>Marker[] | null</td>
      <td>수직 타임라인 마커.</td>
    </tr>
    <tr>
      <td>calendars</td>
      <td>(WrapperCalendar | CalendarConfig)[] | null</td>
      <td>작업 달력 정의(Wrapper 형식 또는 네이티브 Gantt 구성).</td>
    </tr>
    <tr>
      <td>data</td>
      <td>VueGanttDataConfig | null</td>
      <td>데이터 전송 콜백: <code>load</code>, <code>save</code>, <code>batchSave</code>.</td>
    </tr>
    <tr>
      <td>config</td>
      <td>Partial&lt;GanttConfigOptions&gt;</td>
      <td><code>gantt.config</code>에 병합됩니다.</td>
    </tr>
    <tr>
      <td>plugins</td>
      <td>GanttPlugins</td>
      <td>[Gantt extensions](/guides/extensions-list/)를 활성화합니다(예: [auto_scheduling](/guides/auto-scheduling/)).</td>
    </tr>
    <tr>
      <td>templates</td>
      <td>Partial&lt;GanttTemplates&gt;</td>
      <td>Merged into <code>gantt.templates</code>.</td>
    </tr>
    <tr>
      <td>locale</td>
      <td>string | Record&lt;string, any&gt;</td>
      <td>로케일 이름 또는 로케일 객체.</td>
    </tr>
    <tr>
      <td>theme</td>
      <td>string</td>
      <td>스킨 이름.</td>
    </tr>
    <tr>
      <td>filter</td>
      <td>((task: Task) =&gt; boolean) | null</td>
      <td>작업 필터 프레디케이트.</td>
    </tr>
    <tr>
      <td>resourceFilter</td>
      <td>((resource: any) =&gt; boolean) | null</td>
      <td>리소스 필터 프레디케이트.</td>
    </tr>
    <tr>
      <td>modals</td>
      <td>GanttModals | null</td>
      <td>내장 삭제 확인 대화 상자를 재정의합니다.</td>
    </tr>
    <tr>
      <td>groupTasks</td>
      <td>any</td>
      <td><code>gantt.groupBy</code>에 전달되는 그룹화 구성.</td>
    </tr>
    <tr>
      <td>inlineEditors</td>
      <td>Record&lt;string, Component&gt;</td>
      <td>Gantt 인라인 에디터 유형 이름을 Vue 컴포넌트에 매핑합니다.</td>
    </tr>
    <tr>
      <td>customLightbox</td>
      <td>Component | null</td>
      <td>사용자 정의 Vue 작업 에디터 컴포넌트.</td>
    </tr>
    <tr>
      <td>events</td>
      <td>VueGanttEvents</td>
      <td>이벤트-이름에서 핸들러 맵으로 연결합니다.</td>
    </tr>
    <tr>
      <td>htmlTemplatePolicy</td>
      <td>HtmlTemplatePolicy</td>
      <td>템플릿 함수에서 반환된 문자열 값을 렌더링하는 방식을 제어합니다. <code>"basic-sanitize"</code> (기본값)는 화이트리스트 방식으로 반환된 HTML을 정제합니다: 안전한 포맷, 클래스, 제한된 인라인 스타일, <code>data-*</code> 속성과 <code>img</code>는 유지되지만 스크립트, 이벤트 핸들러 및 위험한 URL은 제거됩니다. <code>"escape"</code>는 문자열을 텍스트로 렌더링하고, <code>"unsafe-html"</code>은 원시 문자열을 렌더링합니다(Pre-v10 동작). <code>mode: "sanitize"</code>와 <code>sanitize(html)</code> 함수를 가진 사용자 정의 소거기를 제공하는 라이브러리(DOMPurify 등)를 연결할 수 있습니다. 각 템플릿 함수에 대해 내보낸 <code>allowRawHTML()</code> 도우미로 개별 템플릿을 래핑해 per-template 제어를 수행할 수 있습니다. 자세한 내용은 [Migration notes](/migration#91---100)를 참고하십시오.</td>
    </tr>
  </tbody>
</table>

## 데이터 컬렉션 및 동기화

Vue 상태를 원천으로 사용하는 경우 이 속성을 사용하십시오:

- `tasks`, `links`
- 선택형 고급 데이터세트: `resources`, `resourceAssignments`, `baselines`

~~~js
<VueGantt
  :tasks="tasks"
  :links="links"
  :resources="resources"
  :resourceAssignments="resourceAssignments"
  :baselines="baselines"
/>
~~~

동기화 동작 요약:

- 작업/링크 업데이트는 일반적으로 차이(diff) 기반입니다
- 큰 변경에는 래퍼가 reset/re-parse로 전환될 수 있습니다
- 고급 데이터세트는 데이터스토어를 통해 다시 구문 분석됩니다

모델 선택 및 콜백 전략에 대해서는 [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)를 참조하십시오.

## 구성, 템플릿, 플러그인, 테마, 로케일

명령형 API 호출 없이 차트 설정을 매일 사용하는 속성들입니다.

~~~ts
<script setup lang="ts">
const config = {
  scales: [
    { unit: "year", step: 1, format: "%Y" },
    { unit: "month", step: 1, format: "%F" }
  ],
  columns: [
    { name: "text", tree: true, width: "*" },
    { name: "start_date", align: "center" },
    { name: "duration", align: "center" },
    { name: "add", width: 44 }
  ]
};

const templates = {
  task_text: (_start, _end, task) => `#${task.id}: ${task.text}`
};
</script>

<template>
  <VueGantt
    :config="config"
    :templates="templates"
    :plugins="{ auto_scheduling: true }"
    theme="terrace"
    locale="en"
  />
</template>
~~~

## 이벤트, 생명주기 및 인스턴스 접근

### `events`

Gantt 이벤트 각각에 대해 래퍼 전용 props 대신 하나의 `events` 맵을 사용합니다:

~~~ts
const events = {
  onTaskCreated: task => {
    console.log(task);
    return true;
  },
  onBeforeLightbox: id => {
    console.log(id);
    return true;
  }
};
~~~

맵은 `VueGanttEvents`로 타입이 지정됩니다. 래퍼는 전체 타입 시그니처를 갖는 알려진 이벤트를 다음과 같이 선언하고 있으며; 다른 모든 Gantt 이벤트 이름도 허용됩니다(커스텀 이벤트는 문자열-키드 핸들러로 타입 지정됩니다).

| 이벤트 | 시그니처 | 참고 |
|---|---|---|
| `onBeforeLightbox` | `(taskId: string \| number) => boolean \| void` | 내장 라이트박스를 숨기려면 false를 반환합니다(예: 외부 에디터로 라우팅). |
| `onTaskCreated` | `(task: Task) => boolean \| void` | 작업 생성 취소 시 false를 반환합니다. |
| `onAfterTaskAdd` | `(id: string \| number, task: Task) => void` | 작업이 추가된 후 발생합니다. |
| `onAfterTaskUpdate` | `(id: string \| number, task: Task) => void` | 작업이 업데이트된 후 발생합니다. |
| `onAfterTaskDelete` | `(id: string \| number, task: Task) => void` | 작업이 삭제된 후 발생합니다. |
| `onAfterLinkAdd` | `(id: string \| number, link: Link) => void` | 종속성 링크가 추가된 후 발생합니다. |
| `onAfterLinkUpdate` | `(id: string \| number, link: Link) => void` | 종속성 링크가 업데이트된 후 발생합니다. |
| `onAfterLinkDelete` | `(id: string \| number, link: Link) => void` | 종속성 링크가 삭제된 후 발생합니다. |

전체 Gantt 이벤트 목록(위에 열거되지 않은 이벤트 포함)은 [Gantt events overview](api/overview/events-overview.md)를 참조하십시오. 이러한 알려진 이벤트에 자동완성을 붙여 맵을 작성하려면 `defineGanttEvents(...)`를 사용하십시오.

### `@ready`

`ready(instance)`는 초기화 및 첫 번째 동기화 이후 한 번 실행됩니다:

~~~vue
<VueGantt :events="events" @ready="onReady" />
~~~

### 컴포넌트 레퍼런스를 통한 `instance`

~~~ts
import { ref } from "vue";
import type { VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);

function showToday() {
  ganttRef.value?.instance?.showDate(new Date());
}
~~~

고급 작업을 위해, props를 통한 방법으로는 구현하기 어려운 경우에 사용합니다.

## 데이터 전송: `load`, `save`, `batchSave`

`data` prop 형식:

~~~ts
interface VueGanttDataConfig {
  load?: string | ((gantt: GanttStatic) => DataSet | Promise<DataSet>);
  save?: string | RouterFunction;
  batchSave?: (changes: BatchChanges) => void;
}
~~~

### `load`

- URL 문자열 -> `gantt.load(url)`
- 함수 -> 동기식 또는 비동기 데이터셋 반환

### `save`

변경마다의 콜백 또는 dataProcessor를 통한 라우터 전송.

### `batchSave`

다수 업데이트를 트리거할 수 있는 차트 액션에 대해 그룹화된 콜백:

- `tasks`
- `links`
- `resources`
- `resourceAssignments`

~~~ts
const data = {
  batchSave: changes => {
    if (changes.tasks?.length) {
      console.log("task changes", changes.tasks);
    }
  }
};
~~~

자동 스케줄링이나 대량 편집과 같이 하나의 차트 동작이 많은 업데이트를 트리거할 수 있을 때는 `batchSave`를 사용하십시오.

## 커스터마이징 훅

### `customLightbox`

내장 태스크 폼 UI를 Vue 컴포넌트로 교체합니다.

### `inlineEditors`

Gantt의 인라인 에디터 타입 이름을 Vue 컴포넌트에 매핑합니다.

### `modals`

삭제 확인을 재정의하고 삭제를 확인하려면 `callback()`를 호출합니다.

~~~ts
const modals = {
  onBeforeTaskDelete: ({ task, callback }) => {
    if (window.confirm(`Delete task ${task.text}?`)) callback();
  }
};
~~~

실용적인 예제는 [Customization Patterns](integrations/vue/customization-patterns.md)를 참고하십시오.

## 그룹화, 필터링, 리소스, 달력, 마커

이러한 속성들은 고급 타임라인 뷰에서 함께 자주 사용됩니다:

~~~js
<VueGantt
  :groupTasks="groupConfig"
  :filter="taskFilter"
  :resourceFilter="resourceFilter"
  :calendars="calendars"
  :markers="markers"
  :resources="resources"
  :resourceAssignments="resourceAssignments"
/>
~~~

일반적인 사용법:

- 그룹화된 보기를 위한 `groupTasks`
- 집중 뷰를 위한 `filter` 및 `resourceFilter`
- 일정 규칙 및 타임라인 강조를 위한 `calendars`와 `markers`

## Exported Helpers And Composables

패키지는 기본 내보내기인 `VueGantt` 컴포넌트와 명명된 내보내기도 제공합니다.

From `@dhtmlx/trial-vue-gantt` 또는 `@dhx/vue-gantt`:

### 타입 수출(Type Exports) {#type-exports}

 wrapper 패키지 자체에서 모든 타입을 가져옵니다(`@dhx/vue-gantt` 또는 `@dhtmlx/trial-vue-gantt`). 래퍼는 기본 Gantt 엔진의 타입을 Vue에 특화된 타입과 함께 다시 내보내며, 설치하거나 import해야 하는 별도의 `@dhx/gantt` 패키지는 없습니다.

**Wrapper 소유 타입들**

| Export | Description |
|--------|------------|
| `SerializedTask` | 날짜가 `Date | string`인 사용자용 Task 형태. 저장 상태, 초기 데이터, 그리고 `save`/`batchSave` 페이로드에 사용합니다. |
| `SerializedLink` | 사용자용 Link 형태. 저장 상태 및 데이터 정의에서 `SerializedTask`와 함께 사용합니다. |
| `VueGanttRef` | 컴포넌트 ref를 통해 노출되는 값의 타입 - `{ instance: GanttStatic \| null }`. |
| `VueGanttDataConfig` | `data` prop의 형태 (`load`, `save`, `batchSave`). |
| `BatchChanges` | `data.batchSave`에 전달되는 묶음 변경 — 그룹화된 `tasks`/`links`/`resources`/`resourceAssignments` 변경. |
| `DataCallbackChange` | `BatchChanges` 묶음 내의 개별 변경 항목 - `{ entity, action, data, id }`. |
| `Marker` | `markers` 속성 항목의 형태. |
| `WrapperCalendar` | `calendars` 속성에 대한 래퍼 친화적 캘린더 형태(원시 `CalendarConfig`와 함께). |
| `GanttModals` | `modals` 속성의 형태 - `onBeforeTaskDelete` 및 `onBeforeLinkDelete` 콜백 시그니처. |
| `CustomLightboxProps` | `customLightbox` 컴포넌트가 받는 속성들 (`data`, `onSave`, `onCancel`, `onDelete`, `ganttInstance`). |
| `InlineEditorComponentProps` | 인라인 에디터 컴포넌트가 받는 속성들 (`initialValue`, `task`, `save`, `cancel`, `ganttInstance`). |
| `VueGanttEvents` | `events` 속성의 타입 - 알려진 이벤트들과 문자열 키를 가진 커스텀 이벤트들. |

**Gantt 엔진의 자주 쓰는 타입들**

래퍼는 underlying Gantt 엔진의 모든 타입을 재내보냅니다. 아래 타입들은 래퍼 코드에서 가장 자주 등장하는 타입들로,core 타입과 Vue API에서의 위치를 매핑합니다.

| Export | Wrapper 코드에서의 위치 |
|--------|--------------------------|
| `Task`, `Link` | 런타임의 작업/링크 형태들(내부 `$` 접두사 속성 포함). 이벤트 핸들러, 템플릿 콜백 및 필터 함수 내부에서 사용됩니다. |
| `GanttStatic` | `ganttRef.value?.instance`의 타입 및 `@ready` 인수의 타입. |
| `GanttConfigOptions` | `config` prop에 전달되는 객체의 형태. |
| `GanttTemplates` | `templates` prop에 전달되는 객체의 형태. |
| `GanttPlugins` | `plugins` prop에 전달되는 객체의 형태. |
| `CalendarConfig` | 원시 Gantt 달력 형태 - `calendars` prop에서 `WrapperCalendar`의 대안으로 사용됩니다. |

Gantt 엔진의 다른 모든 타입도 래퍼에서 내보내집니다. Standalone 라이브러리에서 `@dhx/gantt`의 이름으로 임포트할 수 있다면, 여기서는 `@dhx/vue-gantt`에서도 임포트할 수 있습니다.

데이터 소유권이 있는 경우(`Pinia` 상태, `ref<>`, API 응답, 초기 리터럴 등)에는 `SerializedTask`와 `SerializedLink`를 사용하십시오. 데이터가 Gantt가 소유하는 경우에는 런타임 작업 객체가 내부의 `$` 접두사 속성을 포함하므로 `Task`와 `Link`를 사용하십시오.

### 헬퍼 팩토리

- `defineGanttConfig(config)` — 타입이 보장된 구성 작성을 위한 헬퍼
- `defineGanttTemplates(templates)` — 타입이 보장된 템플릿 맵용 헬퍼
- `defineGanttEvents(events)` — 타입이 보장된 이벤트 맵 작성용 헬퍼
- `defineInlineEditors(inlineEditors)` — 타입이 보장된 인라인 에디터 맵

이들은 TypeScript 전용 신원(identity) 헬퍼로, 런타임에는 `defineGanttTemplates(x)`가 본문을 변경하지 않고 그대로 반환합니다. 동작 변화 없이 완전히 건너뛸 수 있습니다. 이들의 가치는 객체 리터럴에 대한 자동완성의 유지에 있습니다: `templates.task_text`, `config.scales[0].unit`, `events.onAfterTaskAdd` 등에서 자동완성을 받을 수 있습니다.

TypeScript에서 이를 건너뛰려면 변수에 직접 타입 주석을 달거나 프로퍼티에 리터럴을 직접 전달하면 됩니다:

~~~ts
// 옵션 1: 명시적 타입 주석
const templates: Partial<GanttTemplates> = {
  task_text: (_s, _e, task) => task.text
};

// 옵션 2: 리터럴에 대한 자동완성 도우미
const templates = defineGanttTemplates({
  task_text: (_s, _e, task) => task.text
});

// 옵션 3: 인라인 리터럴 - prop의 타입으로부터 추론
<VueGantt :templates="{ task_text: (_s, _e, task) => task.text }" />
~~~

### 컴포저블

래퍼는 인스턴스 측 호출을 래핑하는 다섯 개의 컴포저블을 제공합니다. 각 컴포저블은 인스턴스가 사용할 수 있을 때까지 기다릴 수 있도록 `Ref<VueGanttRef | null>`를 받습니다.

#### `useGanttActions(ganttRef)`

래퍼-안전한 명령형 액션을 반환합니다:

| 메서드 | 시그니처 | 비고 |
|--------|-----------|------|
| `undo()` | `() => void` | `plugins: { undo: true }` 필요. |
| `redo()` | `() => void` | `plugins: { undo: true }` 필요. |
| `render()` | `() => void` | 다시 그리기를 강제로 수행합니다 - 대량 변이와 함께 `instance.eachTask(...)`와 페어링 추천. |
| `exportToPDF()` | `() => void` | `plugins: { export_api: true }` 필요. |
| `exportToPNG()` | `() => void` | `plugins: { export_api: true }` 필요. |
| `exportToExcel(config?)` | `(config?: object) => void` | `plugins: { export_api: true }` 필요. 설정은 `config`를 통해 전달합니다. |
| `exportToMSProject()` | `() => void` | `plugins: { export_api: true }` 필요. |

~~~ts
import { ref } from "vue";
import { useGanttActions, type VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);
const actions = useGanttActions(ganttRef);

const exportPdf = () => actions.exportToPDF();
const exportExcel = () => actions.exportToExcel({ visual: "base-colors" });
~~~

#### `useWorkTime(ganttRef)`

Gantt 작업 시간 API에 대한 계산 가능한 래퍼를 반환합니다. 템플릿과 제약 계산에 유용합니다.

| 메서드 | 시그니처 |
|--------|-----------|
| `isWorkTime({ date, task?, unit? })` | `(args) => boolean` |
| `calculateEndDate({ start, duration, unit?, task? })` | `(args) => Date` |
| `calculateDuration({ start, end, task? })` | `(args) => number` |
| `getClosestWorkTime({ date, task?, unit, dir? })` | `(args) => Date` |

~~~ts
import { useWorkTime, type VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);
const workTime = useWorkTime(ganttRef);

const templates = {
  scale_cell_class: (date: Date) =>
    workTime.value.isWorkTime({ date }) ? "" : "weekend"
};
~~~

#### `useGanttDatastore<T>(ganttRef, storeName)`

임의의 Gantt 데이터스토어(예: `"task"`, `"link"`, `"resource"`)에 대한 계산된 읽기기기를 반환합니다.

| 메서드 | 시그니처 |
|--------|-----------|
| `getItem(id)` | `(id: string \| number) => T \| null` |
| `getItems()` | `() => T[]` |
| `hasChild(id)` | `(id: string \| number) => boolean` |
| `getChildren(id)` | `(id: string \| number) => (string \| number)[]` |

~~~ts
import type { Task } from "@dhtmlx/trial-vue-gantt";
import { useGanttDatastore } from "@dhtmlx/trial-vue-gantt";

const taskStore = useGanttDatastore<Task>(ganttRef, "task");

const rootTasks = computed(() => taskStore.value.getChildren(0));
~~~

#### `useResourceAssignments(ganttRef)`

리소스/작업 할당 데이터에 대한 계산된 읽기기기를 반환합니다.

| 메서드 | 시그니처 |
|--------|-----------|
| `getResourceAssignments(resourceId, taskId?)` | `(resourceId: string \| number, taskId?: string \| number) => any[]` |
| `getTaskResources(taskId)` | `(taskId: string \| number) => any[]` |

~~~ts
import { useResourceAssignments } from "@dhtmlx/trial-vue-gantt";

const assignments = useResourceAssignments(ganttRef);

const showAssignments = (resourceId: string | number) => {
  console.log(assignments.value.getResourceAssignments(resourceId));
};
~~~

#### `useGanttEvent(ganttRef, eventName, handler)`

생명주기가 안전한 기간으로 단일 Gantt 이벤트를 연결합니다. 핸들러는 컴포넌트 언마운트 시 자동으로 분리되며, `ganttRef`, `eventName`, 또는 `handler`가 변경되면 다시 연결됩니다. 수동 제어를 위해 `{ detach }`를 반환합니다.

~~~ts
import { useGanttEvent } from "@dhtmlx/trial-vue-gantt";

const { detach } = useGanttEvent(ganttRef, "onTaskDblClick", id => {
  console.log("dbl-click", id);
});

// 필요 시 조기 해제
// detach();
~~~

한 번만 등록되는 리스너가 `events` 맵에 잘 맞지 않는 경우에 사용합니다(예: 로컬 상태에 따라 업데이트되거나 구독을 취소해야 하는 리스너).

## What To Read Next

- [Vue Gantt Overview](integrations/vue/overview.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)