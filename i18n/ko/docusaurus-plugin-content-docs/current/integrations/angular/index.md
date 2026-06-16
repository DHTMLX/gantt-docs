--- 
title: "Angular Gantt"
sidebar_label: Angular Gantt
description: "공식 래퍼를 사용하여 Angular에서 DHTMLX Gantt를 설치하고 구성하며 사용하는 방법."
---

Angular Gantt는 DHTMLX Gantt의 공식 Angular 래퍼입니다. 차트에 대한 Angular 컴포넌트 API를 제공하면서 전체 Gantt 엔진에 대한 접근은 유지합니다.

:::tip AI 보조 개발
AI 코딩 도우미를 사용하는 경우, [DHTMLX Angular Gantt agent skill](integrations/ai-tools/agent-skills.md#available-skills)이 올바른 래퍼 통합 패턴을 따르도록 도울 수 있습니다 - CSS 임포트를 일치시키고, 명시적 높이 체인을 제공하며, 데이터 소유 모델을 선택하고, `data.save` / `data.batchSave` 주위의 날짜를 정규화하고, 앱 테마를 Gantt CSS 변수로 매핑합니다. 실시간 API 참조를 원하시면 [DHTMLX MCP 서버](integrations/ai-tools/mcp-server.md)에 연결하십시오.
::: 

## 래퍼로 얻는 기능

- `tasks`, `links`, `config`, `templates`, `plugins`, `theme`, `locale`에 대한 선언적 입력.
- 작업/링크 업데이트에 대한 점진적 동기화와 큰 변경에 대한 폴백 재파싱.
- `data.load`, `data.save`, `data.batchSave`를 통한 데이터 운반(전송) 콜백.
- `events` 맵을 통한 이벤트 등록과 `(ready)`를 통한 라이프사이클 접근.
- `templateComponent(...)`를 통해 Gantt 템플릿 내에서 Angular 컴포넌트 렌더링.
- 고급 데이터 세트 및 기능 지원(`resources`, `resourceAssignments`, `baselines`, `calendars`, `markers`, `groupTasks`, `resourceFilter`).

~~~ts
import { Component } from '@angular/core';
import { DhxGanttComponent } from '@dhtmlx/trial-angular-gantt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DhxGanttComponent],
  template: `
    <div style="height: 520px;">
      <dhx-gantt [tasks]="tasks" [links]="links"></dhx-gantt>
    </div>
  `,
})
export class AppComponent {
  tasks = [{ id: 1, text: 'Task', start_date: '2026-02-02 00:00', duration: 3, parent: 0 }];
  links = [];
}
~~~

전체 기능 분해를 먼저 보려면 [Angular Gantt Overview](integrations/angular/overview.md)에서 시작하십시오.

## 권장 학습 순서

래퍼를 처음 사용하는 경우 아래 순서대로 따라가세요:

1. [설치](integrations/angular/installation.md): 올바른 패키지 채널과 임포트를 선택합니다.
2. [빠른 시작](integrations/angular/quick-start.md): 독립 실행형 Angular 앱에서 첫 차트를 렌더링합니다.
3. [구성 참조](integrations/angular/configuration-props.md): 모든 입력, 출력 및 콜백 계약을 학습합니다.
4. [데이터 바인딩 및 상태 관리 기본 사항](integrations/angular/state/state-management-basics.md): 데이터 소유 모델을 선택합니다.
5. [RxJS 상태 관리 자습서](integrations/angular/state/rxjs.md): `BehaviorSubject`와 `AsyncPipe`를 사용하여 저장소 기반 패턴을 구현합니다.

## 예제

공개된 Angular Gantt 예제를 둘러보고 래퍼의 실행 가능한 데모를 확인하세요:

- [라이브 데모](https://dhtmlx.github.io/angular-gantt-examples/)
- [GitHub 저장소](https://github.com/DHTMLX/angular-gantt-examples)

## 래퍼 대 저수준 JS 통합

필요한 Angular 통합 수준에 따라 통합 경로를 선택하십시오:

- Angular 입력/출력, 라이프사이클 통합 및 래퍼 관리 동기화를 원하면 **공식 래퍼**(`@dhtmlx/trial-angular-gantt` 또는 `@dhx/angular-gantt`)를 선택하십시오.
- Gantt 라이프사이클에 대해 완전히 수동 제어와 직접 DOM 통합이 필요한 경우에만 **저수준 JS 통합**을 선택하십시오.

저수준 경로에 대해 [dhtmlxGantt with Angular (Low-Level Integration)](integrations/angular/js-gantt-angular.md)를 사용하십시오.

## 데이터 및 상태 관리 진입 포인트

Angular 상태 섹션에서 시작하십시오:

- [데이터 및 상태 관리](integrations/angular/state.md)
- [데이터 바인딩 및 상태 관리 기본 사항](integrations/angular/state/state-management-basics.md)
- [RxJS로 Angular Gantt 사용](integrations/angular/state/rxjs.md)

## 예제 및 평가 자원

공개된 Angular Gantt 예제를 둘러보고 래퍼의 실행 가능한 데모를 확인하세요:

- [라이브 데모](https://dhtmlx.github.io/angular-gantt-examples/)
- [GitHub 저장소](https://github.com/DHTMLX/angular-gantt-examples)

Angular Gantt를 평가 중이라면 평가 페이지에서 평가 기간 동안 기술 지원에 접근할 수 있습니다. 설치 페이지를 참조하십시오. [설치](integrations/angular/installation.md)