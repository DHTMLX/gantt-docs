---
title: Angular Gantt에서 DHTMLX Gantt 속성 사용
sidebar_label: 구성
description: "Angular Gantt 입력, 출력, 콜백 계약 및 Angular 전용 템플릿/커스터마이제이션 헬퍼의 전체 참조."
---

# Angular Gantt에서 DHTMLX Gantt 속성 사용

이 페이지는 `@dhtmlx/trial-angular-gantt`와 `@dhx/angular-gantt`의 공개 래퍼 표면을 문서화합니다.

## Available Inputs
<table>
  <thead>
    <tr>
      <th>Input</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>tasks</td>
      <td>any[]</td>
      <td>차트/그리드에 렌더링되는 작업 컬렉션. 필수.</td>
    </tr>
    <tr>
      <td>links</td>
      <td>any[]</td>
      <td>종속성 컬렉션. 필수.</td>
    </tr>
    <tr>
      <td>resources</td>
      <td>any[] | null</td>
      <td>리소스 레이아웃 및 리소스 API 메서드를 위한 리소스 데이터 세트.</td>
    </tr>
    <tr>
      <td>resourceAssignments</td>
      <td>any[] | null</td>
      <td>리소스 할당 데이터 세트.</td>
    </tr>
    <tr>
      <td>baselines</td>
      <td>any[] | null</td>
      <td>베이스라인 데이터 세트.</td>
    </tr>
    <tr>
      <td>config</td>
      <td>Partial&lt;GanttConfigOptions&gt; | null</td>
      <td><code>gantt.config</code>에 병합됩니다.</td>
    </tr>
    <tr>
      <td>templates</td>
      <td>AngularGanttTemplates | null</td>
      <td><code>gantt.templates</code>에 병합되며; 템플릿 함수는 Angular 템플릿 서술자(descriptor)를 반환할 수 있습니다.</td>
    </tr>
    <tr>
      <td>plugins</td>
      <td>Record&lt;string, any&gt; | null</td>
      <td>플러그인 활성화 맵(예: [critical_path](/guides/critical-path/), [auto_scheduling](/guides/auto-scheduling/)).</td>
    </tr>
    <tr>
      <td>calendars</td>
      <td>Calendar[] | null</td>
      <td><code>id</code>로 동기화된 작동 달력 정의.</td>
    </tr>
    <tr>
      <td>markers</td>
      <td>Marker[] | null</td>
      <td><code>id</code>로 동기화된 수직 타임라인 마커.</td>
    </tr>
    <tr>
      <td>locale</td>
      <td>string | null</td>
      <td><code>gantt.i18n.setLocale(...)</code>에 전달되는 로케일 이름.</td>
    </tr>
    <tr>
      <td>theme</td>
      <td>string | null</td>
      <td>가능한 경우 <code>gantt.setSkin(...)</code>에 전달되는 스킨 이름.</td>
    </tr>
    <tr>
      <td>data</td>
      <td>AngularGanttDataConfig | null</td>
      <td>전송 콜백: <code>load</code>, <code>save</code>, <code>batchSave</code>.</td>
    </tr>
    <tr>
      <td>events</td>
      <td>AngularGanttEvents | null</td>
      <td>Gantt 이벤트에 대한 핸들러 맵(이벤트 이름 -> 핸들러).</td>
    </tr>
    <tr>
      <td>customLightbox</td>
      <td>CustomLightboxConfig | null</td>
      <td>내장 lightbox를 Angular 컴포넌트로 대체합니다.</td>
    </tr>
    <tr>
      <td>groupTasks</td>
      <td>any</td>
      <td><code>gantt.groupBy(...)</code>에 전달된 그룹화 구성; 비활성화하려면 <code>false</code>를 사용.</td>
    </tr>
    <tr>
      <td>filter</td>
      <td>TaskFilter</td>
      <td>Gantt 작업을 필터링하는 함수.</td>
    </tr>
    <tr>
      <td>resourceFilter</td>
      <td>ResourceFilter</td>
      <td>구성된 리소스 데이터 스토어를 필터링하기 위한 프레디케이트.</td>
    </tr>
    <tr>
      <td>htmlTemplatePolicy</td>
      <td>HtmlTemplatePolicy</td>
      <td>템플릿 함수에서 반환된 문자열 값을 렌더링하는 방식을 제어합니다. <code>"basic-sanitize"</code> (기본값)은 allowlist- sanitizes된 HTML을 유지하고, 안전한 포맷팅, 클래스, 제한된 인라인 스타일, <code>data-*</code> 속성 및 <code>img</code>를 보존하며, 스크립트, 이벤트 핸들러 및 위험한 URL은 제거합니다. <code>"escape"</code>는 문자열을 텍스트로 렌더링합니다; <code>"unsafe-html"</code>은 원시 문자열(버전 10 이전 동작)을 렌더링합니다; <code>mode: "sanitize"</code>와 <code>sanitize(html)</code> 함수가 있는 커스텀 sanitizer 객체를 사용하면 DOMPurify 같은 라이브러리를 연결할 수 있습니다. per-template 제어를 위해 내보낸 <code>allowRawHTML()</code> 헬퍼로 개별 템플릿 함수를 래핑하세요. 자세한 내용은 [Migration notes](/migration#91---92).를 참조하십시오.</td>
    </tr>
  </tbody>
</table>

## Outputs And Instance Access

### `(ready)`

래퍼는 초기화 및 초기 동기화 후 한 번 `ready`를 방출합니다.

이벤트 페이로드 모양:

~~~ts
{ instance: GanttStatic }
~~~

~~~html
<dhx-gantt [tasks]="tasks" [links]="links" (ready)="onReady($event)"></dhx-gantt>
~~~

### `instance` via `@ViewChild`

직접 명령형 접근이 필요할 때 `@ViewChild(DhxGanttComponent)`를 사용하세요.

~~~ts
@ViewChild(DhxGanttComponent) ganttCmp?: DhxGanttComponent;

showToday(): void {
  this.ganttCmp?.instance?.showDate(new Date());
}
~~~

## Data Collections And Synchronization

Angular 상태나 RxJS 저장소가 진정한 원천일 때 이 입력을 사용하세요:

- `tasks`, `links`
- 선택적 고급 저장소: `resources`, `resourceAssignments`, `baselines`

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [resources]="resources"
  [resourceAssignments]="resourceAssignments"
  [baselines]="baselines">
</dhx-gantt>
~~~

동기화 동작 요약:

- 작업/링크 업데이트는 일반 변경에 대해 차이 기반으로 처리됩니다.
- 차이가 안전하지 않거나 효과적이지 않으면 래퍼가 재설정/재해석으로 전환할 수 있습니다.
- 리소스/할당/베이스라인 저장소는 Gantt 데이터 저장소를 통해 새로 고쳐집니다.

모델 트레이드오프에 대해서는 [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md)를 참고하세요.

## Config, Templates, Plugins, Theme, Locale

선언적 차트 구성을 위해 imperative `instance` 호출 대신 이 입력들을 사용하세요.

~~~ts
config = {
  scales: [
    { unit: 'year', step: 1, format: '%Y' },
    { unit: 'month', step: 1, format: '%F, %Y' },
    { unit: 'day', step: 1, format: '%d %M' },
  ],
  columns: [
    { name: 'text', tree: true, width: '*' },
    { name: 'start_date', align: 'center' },
    { name: 'duration', align: 'center' },
    { name: 'add', width: 44 },
  ],
};

templates = {
  task_text: (_start: Date, _end: Date, task: any) => `#${task.id}: ${task.text}`,
};
~~~


~~~html
<dhx-gantt
  [config]="config"
  [templates]="templates"
  [plugins]="{ auto_scheduling: true }"
  [locale]="locale"
  [theme]="theme">
</dhx-gantt>
~~~


### Runtime update behavior

- `locale`, `theme`, `config`, `templates`, and `plugins` can be updated after init.
- If `config.layout` changes shape (not just nested values), the wrapper may reinitialize the Gantt layout.
- Keep object identity stable when nothing changed to avoid unnecessary re-application.

## `events` Input

다수의 Angular 출력 대신 단일 이벤트 맵을 사용하세요.

~~~ts
import type { AngularGanttEvents } from '@dhtmlx/trial-angular-gantt';

events: AngularGanttEvents = {
  onTaskCreated: (task) => {
    console.log('created', task);
    return true;
  },
  onAfterTaskUpdate: (id, task) => {
    console.log('updated', id, task);
  },
  onBeforeLightbox: (taskId) => {
    console.log('before lightbox', taskId);
    return true;
  },
};
~~~

래퍼는 일반적인 공통 이벤트의 타입이 지정된 하위 집합과 임의의 이벤트 이름을 같은 맵으로 수용합니다.

## Data Transport: `load`, `save`, `batchSave`

`data` 입력 형상:

~~~ts
interface AngularGanttDataConfig {
  load?: string | ((gantt: any) => any | Promise<any>);
  save?: string | ((entity: string, action: string, data: any, id: string | number) => any);
  batchSave?: (changes: BatchChanges) => void;
}
~~~

### `load`

- URL 문자열인 경우 래퍼는 `gantt.load(url)`를 호출합니다.
- 함수인 경우 래퍼는 그것을 gantt 인스턴스와 함께 호출하고 반환된 동기/비동기 데이터셋을 파싱합니다.

~~~ts
dataConfig = {
  load: async (gantt) => {
    const response = await fetch('/api/gantt');
    const dataset = await response.json();
    return dataset;
  },
};
~~~

`load`는 초기 로딩용으로 의도되었습니다. 래퍼는 컴포넌트 생애주기당 한 번 적용합니다.

### `save`

변경당 콜백 또는 전송(예: `gantt.createDataProcessor(save)`를 통해 연결됩니다).

~~~ts
dataConfig = {
  save: (entity, action, data, id) => {
    console.log(entity, action, data, id);
  },
};
~~~

### `batchSave`

대량 변경에 대한 그룹화된 콜백(자동 스케줄링, 대량 편집, 연쇄 업데이트).

~~~ts
import type { BatchChanges } from '@dhtmlx/trial-angular-gantt';

dataConfig = {
  batchSave: (changes: BatchChanges) => {
    if (changes.tasks?.length) {
      console.log('task changes', changes.tasks);
    }
  },
};
~~~

대기 행렬 동작 요약:

- 단기 배칭(작은 디바운스 윈도우),
- 가장 최근 페이로드로 업데이트를 하나의 `create`로 합치기(`create` + `update`를 하나의 `create`로),
- `create` + `delete` 쌍 제거,
- 페이로드에서 내부 `!nativeeditor_status` 제거.

## `customLightbox` Input

내장 Gantt 라이트박스를 Angular 컴포넌트로 교체하려면 `customLightbox`를 사용합니다.

~~~ts
import type { CustomLightboxConfig } from '@dhtmlx/trial-angular-gantt';

customLightbox: CustomLightboxConfig = {
  component: TaskEditorComponent,
  onSave: ({ id, task }) => console.log('saved', id, task),
  onCancel: () => console.log('cancel'),
  onDelete: (id) => console.log('delete', id),
};
~~~

커스텀 컴포넌트 인스턴스는 래퍼로부터 다음 입력을 받습니다:

- `data` (`{ id, task }`)
- `onSave(updatedTask)`
- `onCancel()`
- `onDelete()`

## Templates And Angular Components

템플릿 함수는 일반 문자열/HTML(네이티브 Gantt 동작) 또는 `templateComponent(...)`로 생성된 Angular 컴포넌트 서술자를 반환할 수 있습니다.

~~~ts
import { templateComponent } from '@dhtmlx/trial-angular-gantt';

templates = {
  task_text: (_start: Date, _end: Date, task: any) =>
    templateComponent(TaskBadgeTemplateComponent, { task }),
};

config = {
  columns: [
    {
      name: 'status',
      label: templateComponent(HeaderFilterComponent, {
        currentFilter: this.currentFilter,
      }),
      template: (task: any) => templateComponent(StatusCellComponent, { task }),
    },
  ],
};
~~~

이는 그리드 헤더/셀, 작업 텍스트, 축 및 Gantt가 템플릿이 가능한 표면에 대해 사용됩니다.

## Grouping, Resources, Filters, Calendars, Markers

다음 입력은 일반적으로 고급 타임라인 및 리소스 뷰에서 사용됩니다.

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [resources]="resources"
  [resourceAssignments]="resourceAssignments"
  [groupTasks]="groupConfig"
  [filter]="taskFilter"
  [resourceFilter]="resourceFilter"
  [calendars]="calendars"
  [markers]="markers"
  [config]="config">
</dhx-gantt>
~~~

참고:

- `filter`는 `(task: any) => boolean` 함수 또는 `null`을 받습니다. 설정되면 함수가 `true`를 반환하는 작업만 표시됩니다. 모든 작업을 표시하려면 `null`로 설정합니다.
- `resourceFilter`는 `config.resource_store`로 구성된 리소스 데이터스토어를 대상으로 작동합니다.
- `groupTasks`는 `false` 또는 그룹화 구성 객체로 토글할 수 있습니다.
- `calendars`와 `markers`는 `id`로 동기화되므로 ID를 안정적으로 유지해야 합니다.

### Task filtering

표시될 작업을 제어하려면 `filter` 입력을 사용하세요. 래퍼는 내부적으로 `onBeforeTaskDisplay` 리스너를 부착하고 필터 참조가 바뀔 때 재 렌더링을 트리거합니다.

~~~ts
import type { TaskFilter } from '@dhtmlx/trial-angular-gantt';

taskFilter: TaskFilter = null;

showCompleted(): void {
  this.taskFilter = (task) => !!task.completed;
}

resetFilter(): void {
  this.taskFilter = null;
}
~~~

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [filter]="taskFilter">
</dhx-gantt>
~~~

필터 로직이 변경되지 않으면 안정적인 참조를 유지하고, 참조가 바뀔 때만 재렌더링합니다.

## Exported Types And Helpers

래퍼 패키지의 유용한 공개 내보내기:

- `DhxGanttComponent`
- `DhxGanttModule`
- `templateComponent(...)`
- `isAngularTemplateRenderable(...)`
- `AngularGanttDataConfig`
- `AngularGanttEvents`
- `BatchChanges`, `DataCallbackChange`
- `SerializedTask`, `SerializedLink`
- `TaskFilter`
- `ResourceFilter`
- `GanttStatic`
- `CustomLightboxConfig`
- `Calendar`, `Marker`

### `SerializedTask` vs `Task`

래퍼는 작업 관련 두 가지 타입을 내보냅니다:

- **`SerializedTask`** - 사용자가 소유한 데이터에 사용: 상태 저장, API 응답, 초기 리터럴, `batchSave` 페이로드. 날짜는 `Date` 객체이거나 `date_format`과 매칭되는 문자열일 수 있습니다.
- **`Task`** (`@dhx/gantt`에서 재수출) - Gantt가 소유하는 데이터의 경우: 이벤트 핸들러 내부에서, Gantt가 구문 분석한 뒤의 데이터. 날짜는 `Date` 객체이며, `$` 접두 시스템 속성을 가집니다.

`SerializedLink`는 `SerializedTask`의 링크 쪽 대응물입니다.

## Continue With

- [Angular Gantt 개요](integrations/angular/overview.md)
- [데이터 바인딩 및 상태 관리 기초](integrations/angular/state/state-management-basics.md)
- [RxJS 상태 관리 튜토리얼](integrations/angular/state/rxjs.md)
- [Angular와 함께하는 dhtmlxGantt(저수준 통합)](integrations/angular/js-gantt-angular.md)