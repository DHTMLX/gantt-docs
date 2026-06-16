---
title: Angular와 함께하는 dhtmlxGantt
sidebar_label: 저수준 통합
description: "공식 Angular 래퍼 없이 Angular에서 JS DHTMLX Gantt를 단계별로 사용하는 가이드."
---

# Angular와 함께하는 dhtmlxGantt

:::note
이 튜토리얼은 공식 래퍼 없이 Angular 앱에서 JS DHTMLX Gantt를 직접 사용하는 방법을 보여줍니다.

Angular 입력/출력, 래퍼 관리 동기화, 그리고 Angular 템플릿 컴포넌트 지원이 필요하다면 대신 [Angular Gantt](integrations/angular.md)를 사용하세요.
:::

기본 Angular 개념(컴포넌트, 생명주기 훅, 서비스)에 익숙해야 합니다. 그렇지 않다면 [Angular 문서](https://angular.dev/overview)부터 시작하세요.

DHTMLX Gantt는 Angular와 호환됩니다. GitHub의 관련 데모 저장소를 확인할 수 있습니다: [DHTMLX Gantt with Angular Demo](https://github.com/DHTMLX/angular-gantt-demo).

## Creating A Project

시작하기 전에 Node.js와 Angular CLI를 설치하세요.

새 Angular 앱 만들기:

~~~bash
ng new my-angular-gantt-app --standalone --routing=false --style=css
cd my-angular-gantt-app
~~~

앱을 한 번 시작해 프로젝트가 정상적으로 작동하는지 확인합니다:

- npm: `npm start`
- yarn: `yarn start`
- 또는 CLI: `ng serve`

앱은 `http://localhost:4200`에서 열려야 합니다.

## Creating Gantt

Gantt 패키지를 설치하기 전에 개발 서버를 중지합니다.

## Step 1. Package Installation

JS Gantt 라이브러리의 전문 빌드는 개인 npm을 통해 제공됩니다. 접근 권한을 얻으려면 [설치 가이드](guides/installation.md#npmevaluationandproversions)를 따르세요.

평가 빌드(튜토리얼용 공개 패키지):

- npm:

~~~bash
npm install @dhx/trial-gantt
~~~

- yarn:

~~~bash
yarn add @dhx/trial-gantt
~~~

전문 빌드(비공개 npm):

- npm:

~~~bash
npm install @dhx/gantt
~~~

- yarn:

~~~bash
yarn add @dhx/gantt
~~~

패키지는 npm 모듈로 구성되어 있기 때문에 로컬 폴더에서 Gantt를 설치할 수도 있습니다. [installfromlocalfolder](guides/installation.md#installfromlocalfolder) 참조.

## Step 2. Create A Gantt Component

직접 JS Gantt 통합을 위한 새 컴포넌트를 만듭니다:

~~~bash
ng generate component gantt --skip-tests
~~~

### Import Gantt Source Files

Open `src/app/gantt/gantt.component.ts` and import the Gantt package.

If you installed the evaluation build:

~~~ts title="src/app/gantt/gantt.component.ts"
import { Gantt, type GanttStatic } from '@dhx/trial-gantt';
~~~

If you installed the professional build:

~~~ts title="src/app/gantt/gantt.component.ts"
import { Gantt, type GanttStatic } from '@dhx/gantt';
~~~

Add Gantt styles in `src/app/gantt/gantt.component.css`.

Evaluation build:

~~~css title="src/app/gantt/gantt.component.css"
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

Professional build:

~~~css title="src/app/gantt/gantt.component.css"
@import "@dhx/gantt/dist/dhtmlxgantt.css";
~~~

### Initialize Gantt In Angular Lifecycle Hooks

Replace `src/app/gantt/gantt.component.ts` with a minimal direct integration:

~~~ts title="src/app/gantt/gantt.component.ts"
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Gantt, type GanttStatic } from '@dhx/trial-gantt';

@Component({
  selector: 'app-gantt',
  standalone: true,
  template: `<div #ganttHost class="gantt-chart"></div>`,
  styleUrl: './gantt.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class GanttComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ganttHost', { static: true }) ganttHost!: ElementRef<HTMLElement>;

  private gantt: GanttStatic | null = null;

  ngAfterViewInit(): void {
    const gantt = Gantt.getGanttInstance();
    gantt.init(this.ganttHost.nativeElement);
    this.gantt = gantt;
  }

  ngOnDestroy(): void {
    this.gantt?.destructor();
    this.gantt = null;
  }
}
~~~ 

Add basic container sizing to `src/app/gantt/gantt.component.css`:

~~~css title="src/app/gantt/gantt.component.css"
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

.gantt-chart {
  width: 100%;
  height: 600px;
}
~~~ 

## Step 3. Add Gantt To The App

`src/app/app.component.ts`를 교체해 앱이 Gantt 컴포넌트를 렌더링하도록 합니다:

~~~ts title="src/app/app.component.ts"
import { Component } from '@angular/core';
import { GanttComponent } from './gantt/gantt.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GanttComponent],
  template: `<app-gantt></app-gantt>`,
})
export class AppComponent {}
~~~

앱을 시작하면 빈 Gantt 차트가 보일 것입니다.

## Step 4. Provide Data

작은 데이터 세트를 담은 `src/app/demo-data.ts`를 만듭니다:

~~~ts title="src/app/demo-data.ts"
export function getData() {
  return {
    data: [
      {
        id: 10,
        text: 'Project #1',
        start_date: '2026-02-02 00:00',
        duration: 6,
        progress: 0.4,
        open: true,
      },
      {
        id: 1,
        text: 'Task #1',
        start_date: '2026-02-02 00:00',
        duration: 2,
        progress: 0.6,
        parent: 10,
      },
      {
        id: 2,
        text: 'Task #2',
        start_date: '2026-02-04 00:00',
        duration: 3,
        progress: 0.2,
        parent: 10,
      },
    ],
    links: [{ id: 1, source: 1, target: 2, type: '0' }],
  };
}
~~~

이제 `GanttComponent`에서 데이터를 가져와 구문 분석합니다:

~~~ts title="src/app/gantt/gantt.component.ts"
import { getData } from '../demo-data';

// ...inside ngAfterViewInit()
const gantt = Gantt.getGanttInstance();
gantt.config.date_format = '%Y-%m-%d %H:%i';
gantt.init(this.ganttHost.nativeElement);
gantt.parse(getData());
this.gantt = gantt;
~~~

앱을 새로고침하면 작업과 선이 있는 Gantt 차트를 볼 수 있습니다.

## Step 5. Save Data

차트에서 발생한 변경 사항을 캡처하려면 [dataProcessor](api/method/dataprocessor.md)를 사용하세요. 이 도구는 백엔드로 변경 사항을 전송하거나 통합을 구축하는 동안 로깅할 수 있습니다.

~~~ts title="src/app/gantt/gantt.component.ts"
 // ...inside ngAfterViewInit(), after gantt.init(...)
 gantt.createDataProcessor((entity, action, data, id) => {
   console.log('[dp]', entity, action, data, id);
 });
~~~

DHTMLX Gantt는 `dataProcessor` 핸들러의 Promise 응답을 허용합니다. 백엔드가 생성 시 ID를 변경하는 경우, Gantt가 레코드를 재매핑할 수 있도록 `{ id: newId }` 혹은 `{ tid: newId }`와 같은 객체를 반환하세요.

전체 백엔드 패턴은 [server-side integration](guides/server-side.md)을 참조하세요.

## XSS, CSRF And SQL Injection Attacks

Gantt는 백엔드 보안 문제(SQL 인젝션, XSS, CSRF)로부터 애플리케이션을 보호하지 않습니다. 백엔드 검증, 권한 부여, 출력 정화는 여전히 여러분의 책임입니다.

주요 위험 영역과 완화 지침은 [Application Security](guides/app-security.md)를 참조하세요.