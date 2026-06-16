---
title: "데이터 및 상태 관리"
description: "Vue Gantt에서 Vue 관리형 또는 간트 관리형 데이터 흐름을 선택하고 구현하는 방법."
---

이 섹션은 Vue Gantt 데이터를 Vue UI, 저장소, 백엔드 동작과 일치시키는 방법을 설명합니다.

## 시작하기

먼저 [데이터 바인딩 및 상태 관리 기본](integrations/vue/state/state-management-basics.md)을 읽으십시오.

해당 가이드가 다루는 내용:

- 진실의 원천으로서의 Vue 상태(state) 또는 저장소
- Gantt를 진실의 원천으로
- `data.save` 및 `data.batchSave` 콜백 계약

## 데이터 소유권 모델 선택

다음과 같은 경우에 **Vue 상태(state) 또는 저장소를 진실의 원천으로 사용**하십시오:

- 주변 Vue UI가 최신 차트 상태를 반영해야 할 때
- 이미 Pinia 또는 다른 저장소를 권위 있는 상태로 사용 중일 때
- 예측 가능한 단방향 업데이트가 원시 편집 처리량보다 더 중요할 때

다음의 경우에 **Gantt를 진실의 원천으로 사용**하십시오:

- 페이지가 차트 중심일 때
- 업데이트 양이 많을 때
- 차트 측 변경이 잦은 상황에서 저장소 churn을 줄이고 싶을 때

## Pinia Tutorial

저장소 주도 구현을 위해 [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)를 사용하면 `batchSave`와 선택적 저장소 수준의 실행 취소/다시 실행이 포함됩니다.

실행 가능한 보조 프로젝트는 [vue-gantt-pinia-starter on GitHub](https://github.com/DHTMLX/vue-gantt-pinia-starter)에서 확인할 수 있습니다.

## 최소 시작 패턴

~~~ts
const data = {
  batchSave: changes => ganttStore.applyBatch(changes)
};
~~~

하나의 차트 동작으로 다수의 작업/링크 업데이트가 발생할 때 이 패턴을 사용하십시오.

## 성능 주의사항

자동 일정 수립과 같은 작업의 경우, 상태 업데이트가 그룹화된 배치로 실행되도록 각 변경마다 실행되는 `data.save`보다 `data.batchSave`를 선호하십시오.

콜백의 형태와 트레이드오프는 [Batch Save Contract](integrations/vue/state/state-management-basics.md#databatchsave)에 문서화되어 있습니다.