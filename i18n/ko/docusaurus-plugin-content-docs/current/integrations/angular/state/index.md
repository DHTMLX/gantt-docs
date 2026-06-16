---
title: "데이터 및 상태 관리"
description: "Angular Gantt에서 Angular 관리형 또는 Gantt 관리형 데이터 흐름을 선택하고 구현하는 방법."
---

이 섹션은 Angular Gantt 데이터를 Angular UI, RxJS 저장소, 및 백엔드 동작과 일치시키는 방법을 설명합니다.

## 시작하기

먼저 [데이터 바인딩 및 상태 관리 기본사항](integrations/angular/state/state-management-basics.md)를 읽어 보십시오.

해당 기사는 다음을 설명합니다:

- **Angular 상태나 저장소를 단일 진실의 원천으로 사용**
- **Gantt를 단일 진실의 원천으로 사용**
- `data.save` 및 `data.batchSave` 콜백 계약.

## 데이터 소유권 모델 선택

Use **Angular state or store as source of truth** when:

- 주변의 Angular UI가 차트 상태를 항상 반영해야 할 때,
- RxJS 서비스/저장소나 중앙 집중식 상태 계층을 사용하는 경우,
- 예측 가능한 단방향 업데이트가 원시 편집 처리량보다 더 중요한 경우.

Use **Gantt as source of truth** when:

- 페이지가 차트 중심일 때,
- 업데이트 볼륨이 클 때,
- 잦은 차트 측 변경에 대해 애플리케이션 저장소의 churn을 줄이고 싶을 때.

## RxJS Tutorial

실용적인 store 기반 구현은 [Angular Gantt를 RxJS와 함께 사용하는 방법](integrations/angular/state/rxjs.md)을 참고하십시오. 이는 `BehaviorSubject`, `AsyncPipe`, 되돌리기/다시 실행, 및 `data.batchSave`를 중심으로 구성되어 있습니다.

## 최소 시작 패턴

~~~ts
readonly dataConfig: AngularGanttDataConfig = {
  batchSave: (changes) => this.ganttState.applyBatch(changes),
};
~~~

여기서 `ganttState`는 주입된 `GanttStateService`입니다(서비스 형태에 대해서는 [RxJS 튜토리얼](integrations/angular/state/rxjs.md)을 참조하십시오). 하나의 사용자 동작으로 많은 작업/링크 업데이트가 생성될 수 있을 때 이 패턴을 사용합니다.

## 성능 주의사항

자동 스케줄링과 같은 작업의 경우 각 변경마다의 `data.save`보다 `data.batchSave`를 선호하여 Angular 상태 업데이트가 그룹화된 배치로 발생하도록 하십시오.

콜백 형식 및 트레이드오프에 대해서는 [기본 사항](integrations/angular/state/state-management-basics.md#callback-contracts)에 설명되어 있습니다.