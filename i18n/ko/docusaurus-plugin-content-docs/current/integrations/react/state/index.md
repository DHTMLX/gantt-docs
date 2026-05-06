---
title: "데이터 및 상태 관리"
description: "React Gantt를 React 상태나 상태 관리자로 바인딩하고, 사용자의 편집을 처리하며, React 관리 데이터 모델과 Gantt 관리 데이터 모델 중에서 선택하는 방법."
---

이 섹션은 Gantt 데이터를 애플리케이션 상태와 동기화하는 방법을 설명합니다. 권장되는 React 주도 모델(React 또는 저장소를 진실의 소스로 사용하는 모델), 성능 중심의 Gantt 관리 모델, 그리고 인기 있는 상태 관리 라이브러리에 대한 실용적인 구현을 다룹니다.

## 시작하기

두 가지 지원 데이터 모델과 일반적인 통합 패턴을 이해하려면 먼저 이 문서를 읽으세요:

- [데이터 바인딩 및 상태 관리 기초](integrations/react/state/state-management-basics.md)

이는 `data.save` 및 `data.batchSave` 콜백의 사용 방법, 로딩이 각 모델에 어떻게 맞춰지는지, 그리고 Gantt가 내부적으로 데이터를 관리할 때 어떤 변화가 있는지 설명합니다.

## 상태 관리 라이브러리 선택

아래의 각 튜토리얼은 동일한 핵심 패턴(state -> props -> Gantt, changes -> callbacks -> state)을 적용하지만, 특정 라이브러리의 관용어를 사용합니다:

- [Redux Toolkit](integrations/react/state/redux-toolkit.md)
- [Zustand](integrations/react/state/zustand.md)
- [MobX](integrations/react/state/mobx.md)
- [XState](integrations/react/state/xstate.md)
- [Jotai](integrations/react/state/jotai.md)
- [Valtio](integrations/react/state/valtio.md)
- [TanStack Query](integrations/react/state/tanstack-query.md)

## 실시간 동기화

실시간 업데이트가 필요하다면, 여기에서 시작하세요:

- [Firebase 통합](integrations/react/firebase-integration.md)

## 성능 주의사항

앱이 대규모 작업(auto-scheduling, 대량 편집, 대형 데이터 세트)을 수행하는 경우, 다음에 주의하세요:

- 업데이트 오버헤드를 줄이기 위해 `data.batchSave`를 사용하고,
- React가 모든 변경을 즉시 반영할 필요가 없을 때의 **Gantt-managed data** 모델.

두 주제 모두 [데이터 바인딩 및 상태 관리 기초](integrations/react/state/state-management-basics.md)에서 다룹니다.