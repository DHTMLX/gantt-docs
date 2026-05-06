---
title: "리액트 Gantt"
sidebar_label: 리액트 Gantt
description: "공식 래퍼를 사용하여 React에서 DHTMLX Gantt를 설치, 구성 및 사용합니다."
image: /img/frameworks/react.png
---

리액트 Gantt는 DHTMLX Gantt의 공식 React 래퍼입니다. 이를 통해 Gantt 차트를 React 컴포넌트로 사용할 수 있으며 전체 구성 API를 계속 지원합니다.

React Gantt가 어떻게 작동하는지와 제공하는 기능에 대한 전체 설명을 보려면 [개요](integrations/react/overview.md)부터 시작하십시오.

## 시작하기

:::tip AI 보조 개발
AI 코딩 도우미를 사용하는 경우, [DHTMLX React Gantt 에이전트 스킬](integrations/ai-tools/agent-skills.md#available-skills)이 올바른 통합 패턴을 따르고 일반적인 실수를 피하는 데 도움이 될 수 있습니다. 실시간 API 참조를 보려면 [DHTMLX MCP 서버](integrations/ai-tools/mcp-server.md)에 연결하세요.
:::

래퍼를 처음 사용하는 경우, 아래 순서를 따르세요:

1. [설치](integrations/react/installation.md) - React Gantt의 Evaluation(공개 npm) 또는 Professional(비공개 npm) 버전을 선택합니다.
2. [빠른 시작](integrations/react/quick-start.md) - 첫 차트를 렌더링하고 설정을 확인합니다.
3. [구성](integrations/react/overview.md) - 프롭스(props), 템플릿 및 이벤트 핸들러를 다루는 방법을 배웁니다.

## 프레임워크 통합

앱이 메타 프레임워크로 구성된 경우, 프레임워크에 맞춘 설정을 위한 가이드를 아래에서 확인하세요:

- [Next.js](integrations/react/nextjs.md) - 클라이언트 컴포넌트 설정 및 일반 SSR 제약
- [Remix](integrations/react/remix.md) - 라우트 기반 설정 및 통합 노트

## 데이터 바인딩 모델 선택

리액트 Gantt는 두 가지 데이터 바인딩 방법을 지원합니다:

- **React 관리 데이터** (대부분의 React 앱에 권장).
React 또는 상태 관리 도구에 작업/링크를 보관하고 이를 프롭스로 전달하며 업데이트를 `data.save`/`data.batchSave` 콜백으로 처리합니다.

- **Gantt 관리 데이터** (특수하고 성능에 민감한 경우에 유용)
데이터를 한 번 초기화하고 Gantt(및 백엔드)가 데이터 수명 주기를 소유하도록 합니다. React는 변경 후 업데이트된 props를 다시 적용하지 않습니다.

두 가지 접근 방식과 그 트레이드오프를 이해하려면 [데이터 바인딩 및 상태 관리 기초](integrations/react/state/state-management-basics.md)를 읽어 보십시오.

## 데이터 및 상태 튜토리얼

상태 관리 라이브러리를 사용하는 경우, [데이터 및 상태 관리](integrations/react/state.md) 가이드는 Redux Toolkit, Zustand, MobX 등 각 라이브러리에 대해 동일한 통합 패턴을 구현하며 Firebase와의 실시간 동기화도 제공합니다.

## 예제 및 평가 자료

리액트 Gantt를 평가 중인 경우, 평가 페이지에서 평가 기간 동안 기술 지원에 접근할 수 있습니다. [설치](integrations/react/installation.md)를 참조하십시오.