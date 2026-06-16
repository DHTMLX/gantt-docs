---
title: Angular Gantt 빠른 시작
sidebar_label: 빠른 시작
description: "독립형 Angular 앱에서 공식 Angular Gantt 래퍼를 렌더링하는 단계별 가이드."
---

# Angular Gantt 빠른 시작

이 빠른 시작은 독립형 Angular 애플리케이션과 공식 래퍼 패키지를 사용합니다. Gantt를 전용 Angular 컴포넌트 안에 생성하고 그 컴포넌트를 `AppComponent`에 마운트하므로 예제가 최소화되면서도 보다 현실적인 앱 구조를 따릅니다.

## 1. Angular 프로젝트 생성

독립형 Angular 앱을 생성합니다(Angular CLI):

~~~bash
ng new angular-gantt-quick-start --standalone --routing=false --style=css
cd angular-gantt-quick-start
~~~

만약 아직 Angular CLI가 설치되어 있지 않다면 먼저 설치합니다(`npm install -g @angular/cli`).

## 2. Angular Gantt 설치

설치는 [Angular Gantt 설치 가이드](integrations/angular/installation.md)에 설명된 대로 React Gantt를 설치합니다.

이 튜토리얼에서는 평가용 패키지를 사용합니다:

~~~bash
npm install @dhtmlx/trial-angular-gantt
~~~

또는

~~~bash
yarn add @dhtmlx/trial-angular-gantt
~~~

이미 Professional 패키지를 사용하는 경우, 명령과 imports에서 `@dhtmlx/trial-angular-gantt`를 `@dhx/angular-gantt`로 바꾸십시오.

## 3. 전역 스타일 추가

`src/styles.css`를 열고 Gantt 스타일을 추가합니다:

~~~css title='src/styles.css'
@import "@dhtmlx/trial-angular-gantt/dist/angular-gantt.css";

html,
body {
  height: 100%;
  margin: 0;
}

app-root {
  display: block;
  height: 100vh;
}
~~~

이 빠른 시작은 **전역(Global)** CSS 임포트(`src/styles.css`)를 사용하므로 `AppComponent`에서 `ViewEncapsulation.None`이 필요하지 않습니다.

나중에 Gantt CSS 임포트(또는 내부 Gantt 클래스 예: `.dhx-gantt-root`의 재정의)를 컴포넌트 스타일시트로 옮기면 Angular의 기본 스타일 캡슐화가 해당 선택자를 범위화할 수 있습니다. 이 경우 해당 컴포넌트에서 `encapsulation: ViewEncapsulation.None`를 설정하거나 스타일을 전역으로 유지하십시오.

## 4. 데모 데이터 추가

`src/app/demo-data.ts`를 생성합니다.

래퍼는 `SerializedTask`와 `SerializedLink`를 내보냅니다(간트 차트 외부에서 보유되는 작업/링크 데이터에 권장되는 타입). 날짜는 문자열일 수도 있고 `Date` 객체일 수도 있습니다.

~~~ts
import type { SerializedTask, SerializedLink } from '@dhtmlx/trial-angular-gantt';

export const tasks: SerializedTask[] = [
  {
    id: 1,
    text: 'Office itinerancy',
    type: 'project',
    start_date: new Date(2026, 1, 2).toISOString(),
    duration: 10,
    progress: 0.4,
    open: true,
    parent: 0,
  },
  {
    id: 2,
    text: 'Planning',
    start_date: new Date(2026, 1, 2).toISOString(),
    duration: 4,
    progress: 0.6,
    parent: 1,
  },
  {
    id: 3,
    text: 'Implementation',
    start_date: new Date(2026, 1, 6).toISOString(),
    duration: 5,
    progress: 0.2,
    parent: 1,
  },
];

export const links: SerializedLink[] = [{ id: 1, source: 2, target: 3, type: '0' }];
~~~

## 5. Gantt 컴포넌트 생성

생성 `src/app/gantt-chart.component.ts`:

~~~ts title='src/app/gantt-chart.component.ts'
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttDataConfig,
} from '@dhtmlx/trial-angular-gantt';

import { links, tasks } from './demo-data';

@Component({
  selector: 'app-gantt-chart',
  standalone: true,
  imports: [DhxGanttComponent],
  host: { style: 'display:block;height:100%;' },
  template: `
    <dhx-gantt
      style="display:block;height:100%;"
      [tasks]="tasks"
      [links]="links"
      [config]="config"
      [data]="dataConfig">
    </dhx-gantt>
  `,
})
export class GanttChartComponent {
  tasks = tasks;
  links = links;

  config = {
    columns: [
      { name: 'text', tree: true, width: '*' },
      { name: 'start_date', label: 'Start', align: 'center' },
      { name: 'duration', label: 'Duration', align: 'center' },
      { name: 'add', width: 44 },
    ],
  };

  dataConfig: AngularGanttDataConfig = {
    save: (entity, action, item, id) => {
      console.log('save', { entity, action, item, id });
    },
  };
}
~~~

## 6. 앱 셸에서 Gantt 렌더링

`src/app/app.component.ts`를 대체합니다:

~~~ts title='src/app/app.component.ts'
import { Component } from '@angular/core';
import { GanttChartComponent } from './gantt-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GanttChartComponent],
  template: `<app-gantt-chart></app-gantt-chart>`,
})
export class AppComponent {}
~~~

## 7. 앱 시작

~~~bash
ng serve
~~~

`http://localhost:4200`을 열면 `data.save`를 통해 편집이 로깅되는 작동 중인 Gantt 차트를 볼 수 있습니다.

기존 앱에 Gantt를 추가하는 경우 현재의 `AppComponent`를 유지하고 대상 페이지/컴포넌트에 `<app-gantt-chart>`를 배치하십시오. 부모 레이아웃이 Gantt 영역에 높이를 제공하는지 확인하십시오.

## 선택 사항: 최소 로컬 저장 핸들링

다음 단계로, 로깅을 `src/app/gantt-chart.component.ts`의 로컬 배열 동기화로 교체합니다:

~~~ts title='src/app/gantt-chart.component.ts'
dataConfig: AngularGanttDataConfig = {
  save: (entity, action, item, id) => {
    if (entity === 'task') {
      if (action === 'create') this.tasks = [...this.tasks, item];
      if (action === 'update') {
        this.tasks = this.tasks.map((task) => String(task.id) === String(id) ? { ...task, ...item } : task);
      }
      if (action === 'delete') {
        this.tasks = this.tasks.filter((task) => String(task.id) !== String(id));
      }
    }

    if (entity === 'link') {
      if (action === 'create') this.links = [...this.links, item];
      if (action === 'update') {
        this.links = this.links.map((link) => String(link.id) === String(id) ? { ...link, ...item } : link);
      }
      if (action === 'delete') {
        this.links = this.links.filter((link) => String(link.id) !== String(id));
      }
    }
  },
};
~~~

다중 변경 작업(예: 자동 일정 수립)의 경우 한 번에 처리하는 대신 `data.batchSave`를 선호하고 그룹 업데이트를 처리하십시오.

## 계속하기

- [Angular Gantt Overview](integrations/angular/overview.md)
- [Configuration Reference](integrations/angular/configuration-props.md)
- [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md)