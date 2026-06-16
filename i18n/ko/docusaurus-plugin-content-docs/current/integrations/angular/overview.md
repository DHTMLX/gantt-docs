---
title: Angular Gantt 개요
sidebar_label: 개요
description: "Angular Gantt에 대한 아키텍처 수준 개요: 기능, 데이터 흐름, 이벤트, 수명 주기 및 커스터마이징 패턴."
---

# Angular Gantt 개요

Angular Gantt는 DHTMLX Gantt의 공식 Angular 래퍼입니다. Gantt 차트를 Typed 입력/출력을 가진 Angular 컴포넌트(`<dhx-gantt>`)로 노출하고, 기본 Gantt 인스턴스에 대한 액세스를 유지합니다.

설치 및 프로젝트 설정이 먼저 필요하다면 [Angular Gantt 빠른 시작](integrations/angular/quick-start.md)으로 시작하세요.

:::tip AI-assisted development
AI 코드 도우미를 사용하는 경우, [DHTMLX Angular Gantt 에이전트 스킬](integrations/ai-tools/agent-skills.md#available-skills)은 래퍼 통합의 올바른 패턴을 따르고, CSS 가져오기 불일치, 컨테이너 높이 누락, Angular 상태와 Gantt `instance` 간 소유권 혼합, `data.save` / `data.batchSave`를 통한 날짜 직렬화 불안정성 등의 일반적인 실수를 피하는 데 도움이 될 수 있습니다. 실시간 API 참조를 원한다면 [DHTMLX MCP 서버](integrations/ai-tools/mcp-server.md)에 연결하세요.
::: 

## 핵심 기능

래퍼는 간단한 Angular 통합과 고급 Angular 통합 모두에 맞게 구축되었습니다:

- 입력(`config`, `templates`, `plugins`, `theme`, `locale`)을 사용한 선언적 설정.
- `tasks`/`links`와 고급 컬렉션(`resources`, `resourceAssignments`, `baselines`)에 대한 데이터 동기화.
- 단일 `events` 입력 맵을 통한 동적 이벤트 연결.
- 초기화된 Gantt 인스턴스에 대한 액세스와 함께 `(ready)`를 통한 라이프사이클 신호.
- 템플릿에서 `templateComponent(...)`를 통한 Angular 컴포넌트 렌더링.
- `customLightbox`, `groupTasks`, `filter`, `calendars`, `markers`, `resourceFilter`를 통한 고급 기능.

## 기본 래퍼 사용법

~~~ts
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttDataConfig,
} from '@dhtmlx/trial-angular-gantt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DhxGanttComponent],
  template: `
    <div style="height: 600px;">
      <dhx-gantt
        [tasks]="tasks"
        [links]="links"
        [config]="config"
        [data]="dataConfig">
      </dhx-gantt>
    </div>
  `,
})
export class AppComponent {
  tasks = [
    { id: 1, text: 'Project', type: 'project', open: true, start_date: new Date(2026, 1, 2).toISOString(), duration: 5, parent: 0 },
    { id: 2, text: 'Planning', start_date: new Date(2026, 1, 2).toISOString(), duration: 2, parent: 1 },
  ];

  links = [{ id: 1, source: 1, target: 2, type: '0' }];

  config = {
    columns: [
      { name: 'text', tree: true, width: '*' },
      { name: 'start_date', align: 'center' },
      { name: 'duration', align: 'center' },
      { name: 'add', width: 44 },
    ],
  };

  dataConfig: AngularGanttDataConfig = {
    save: (entity, action, data, id) => {
      console.log('[data.save]', entity, action, data, id);
    },
  };
}
~~~

## 속성 기반 동기화 모델 및 트레이드오프

래퍼는 입력 변경을 감지하고 이를 현재 Gantt 인스턴스에 동기화합니다.

- `tasks` 및 `links`는 일반적인 추가/업데이트/제거 변경에 대해 점진적으로 동기화됩니다.
- 큰 구조적 변경의 경우 래퍼가 데이터를 재설정하고 재구문할 수 있습니다.
- `resources`, `resourceAssignments`, 및 `baselines`는 관련 데이터 저장소를 통해 동기화됩니다.
- `config`, `templates`, `plugins`, `locale`, 및 `theme`는 런타임에 적용됩니다.
- `config.layout` 모양이 변경되면 래퍼가 새 구조를 적용하기 위해 Gantt 레이아웃을 재초기화할 수 있습니다.

전체 데이터 소유권 지침은 [데이터 바인딩 및 상태 관리의 기초](integrations/angular/state/state-management-basics.md)를 참조하세요.

## `events` 맵 vs `(ready)`

Angular Gantt는[Gantt 이벤트 핸들러](api/overview/events-overview.md)에 대해 `events` 맵을 사용하고, 한 번만 라이프사이클에 접근하기 위한 별도의 `(ready)` 출력이 있습니다.

~~~ts
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttEvents,
  type GanttStatic,
} from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [events]="events" (ready)="onReady($event)"></dhx-gantt>`,
})
export class DemoComponent {
  events: AngularGanttEvents = {
    onTaskCreated: (task) => {
      console.log('task created', task);
      return true;
    },
    onBeforeLightbox: (taskId) => {
      console.log('before lightbox', taskId);
      return true;
    },
  };

  onReady({ instance }: { instance: GanttStatic }): void {
    console.log('ready', instance);
  }
}
~~~

상호작용 동작에는 `events`를 사용하고, 초기화된 인스턴스가 필요한 로직에는 `(ready)`를 사용하세요.

## ViewChild 접근 및 명령형 경계

입력이 충분하지 않을 때는 `@ViewChild`로 래퍼 인스턴스에 접근한 다음 `.instance`를 사용합니다.

~~~ts
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DhxGanttComponent } from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [tasks]="tasks" [links]="links"></dhx-gantt>`,
})
export class DemoComponent implements AfterViewInit {
  @ViewChild(DhxGanttComponent) ganttCmp?: DhxGanttComponent;

  tasks = [];
  links = [];

  ngAfterViewInit(): void {
    this.ganttCmp?.instance?.showDate(new Date());
  }
}
~~~

경계 규칙: `instance`를 통해 직접 `tasks`나 `links`를 변경하면 Angular 상태 입력과의 동기화를 유지하세요. 그렇지 않으면 다음 입력 업데이트가 차트 측 변경을 덮어쓸 수 있습니다.

## 고급 확장 포인트

### 커스텀 라이트박스 컴포넌트

내장 작업 편집기를 Angular 컴포넌트로 대체하려면 `customLightbox`를 사용하세요.

~~~ts
import { CustomLightboxConfig } from '@dhtmlx/trial-angular-gantt';

customLightbox: CustomLightboxConfig = {
  component: TaskEditorComponent,
  onSave: ({ id, task }) => console.log('saved', id, task),
};
~~~

사용자 정의 컴포넌트는 `data`, `onSave`, `onCancel`, `onDelete` 입력을 받아야 합니다.

### 템플릿에서의 Angular 컴포넌트

템플릿에서 `templates`, 열의 `template`, 열의 `label` 또는 다른 템플릿 가능 슬롯에서 `templateComponent(...)`를 사용하세요.

~~~ts
import { templateComponent } from '@dhtmlx/trial-angular-gantt';

templates = {
  task_text: (_start: Date, _end: Date, task: any) =>
    templateComponent(TaskTextTemplateComponent, {
      task,
      onIconClick: () => this.toggleTask(task),
    }),
};
~~~

이렇게 하면 Angular가 Gantt가 관리하는 DOM 영역 안에 컴포넌트를 렌더링합니다.

### 필터링

표시할 작업을 지정하려면 `filter` 입력을 사용하세요:

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

리소스 패널(Resource Panel)에서 리소스를 필터링하려면 `resourceFilter` 입력을 사용하세요:

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [resources]="resources"
  [resourceAssignments]="resourceAssignments"
  [resourceFilter]="resourceFilter"
  [config]="config">
</dhx-gantt>
~~~

### 그룹화, 일정표, 마커

고급 타임라인 시나리오를 위해 명령형 설정 코드 없이 `groupTasks`, `calendars`, 및 `markers`를 사용하세요.

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [groupTasks]="groupConfig"
  [calendars]="calendars"
  [markers]="markers"
  [config]="config">
</dhx-gantt>
~~~

### 인라인 편집 주의사항

래퍼는 Angular 전용의 `inlineEditors` 입력을 별도로 노출하지 않습니다. 그리드 편집이 필요할 때는 `config.columns[].editor`의 코어 Gantt 인라인 편집 구성(및 다른 코어 인라인 편집 API)을 사용하세요.

## 공개 샘플 시나리오 맵

공개된 Angular 샘플은 아래 래퍼 시나리오를 다룹니다:

- `basic-initialization`: 기본 입력 및 `data.save`.
- `configs-and-templates`: 런타임 `config`/`templates` 업데이트, 마커, 플러그인.
- `template-components`: `templateComponent(...)`, `filter`, `ready`, 그리드/작업 템플릿의 동적 UI.
- `custom-form`: `customLightbox` 통합.
- `resource-panel`: 리소스, 할당, 리소스 레이아웃, `resourceFilter`, `(ready)` 인스턴스 접근.
- `calendars`: `calendars`, `templates`, 로케일, 근무 시간 하이라이팅.
- `auto-scheduling`: 플러그인 활성화 및 배치된 데이터 변경.
- `state-management`: RxJS 스토어 기반 업데이트와 `data.batchSave` 및 Undo/Redo.
- `inline-editors`: 구성된 코어 Gantt 인라인 편집.

## 관련 문서

- [설치](integrations/angular/installation.md)
- [빠른 시작](integrations/angular/quick-start.md)
- [구성 참조](integrations/angular/configuration-props.md)
- [데이터 바인딩 및 상태 관리의 기초](integrations/angular/state/state-management-basics.md)
- [RxJS 상태 관리 튜토리얼](integrations/angular/state/rxjs.md)
- [DHTMLX Gantt 가이드](guides.md)