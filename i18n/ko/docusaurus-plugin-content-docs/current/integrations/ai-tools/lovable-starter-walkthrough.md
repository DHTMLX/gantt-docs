---
title: "React Gantt Lovable 스타터 워크스루"
sidebar_label: "Lovable 스타터 워크스루"
description: "고정된 프롬프트 순서와 Supabase 백엔드를 사용하여 Lovable에서 DHTMLX React Gantt 프로젝트 플래너를 재현합니다"
---

# React Gantt Lovable 스타터 워크스루

이 가이드는 [React Gantt Lovable Starter](https://github.com/DHTMLX/react-gantt-lovable-starter) - Supabase 백엔드를 갖춘 다중 프로젝트 계획 도구 - 를 여러분의 Lovable 작업 공간에서 재현하는 방법을 설명합니다. 게시된 저장소와 그 [`docs/`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/docs) 폴더가 진실의 원천이며; 이 페이지는 조각들이 어떻게 맞춰지는지 설명하는 진입점입니다.

Supabase를 포함하지 않는 일반적인 Lovable + Gantt 워크스루는 동반 가이드: [Lovable AI](integrations/ai-tools/lovable-ai.md)를 참조하십시오.

## 끝에 얻는 것

다음이 포함된 작동하는 앱:

- 라우터가 있는 셸(Dashboard, Projects, Reports, Workload)
- 프로젝트별 Gantt 워크스페이스와 작업 및 링크 CRUD
- 드래그 앤 드롭으로의 작업 순서 지속성
- 실행취소/다시 실행 및 확대/축소 컨트롤
- 주말 하이라이트가 적용된 작동 달력
- 작업 부하 뱃지가 표시되는 리소스 패널
- 데모용 역할 모델(조회자 / 편집자 / 소유자)
- Supabase 스키마, 데모 정책 및 시드 데이터

스타터는 표준 Lovable 스택을 목표로 합니다: React 18 + TypeScript + Vite + Tailwind + shadcn/ui에, 위에 React Query, Redux Toolkit, 그리고 Supabase가 추가로 포함됩니다.

## 사전 요구사항

- Lovable 계정
- Supabase 프로젝트(무료 계층으로 충분)
- 선택 사항: 로컬에서 결과를 실행할 계획이라면 Node.js 18+ 및 npm

## 두 가지 레시피 사용 방법

[`docs/`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/docs) 폴더는 두 가지 독자를 위한 자료를 제공합니다:

1. **처음부터 빌드를 재현합니다.** 프롬프트를 순서대로 Lovable에 전송합니다. 동일한 앱 구조, 동일한 Gantt 구성, 동일한 Supabase 스키마를 얻게 됩니다. 패턴을 배우고자 할 때 권장되는 경로입니다.
2. **게시된 저장소를 시작 템플릿으로 사용합니다.** GitHub 저장소를 클론하고, 자신의 Supabase 프로젝트를 가리키게 한 뒤 Lovable 프롬프트를 전혀 건너뜁니다. 바로 실행 가능한 스타터를 원할 때 더 빠릅니다.

## Lovable에서 빌드 재현하기

전체 프롬프트 시퀀스는 [`docs/00-build-plan.md`](https://github.com/DHTMLX/react-gantt-lovable-starter/blob/main/docs/00-build-plan.md)에 있습니다. 높은 수준의 흐름은 다음과 같습니다:

1. 먼저 [`00-knowledge.md`](https://github.com/DHTMLX/react-gantt-lovable-starter/blob/main/docs/00-knowledge.md)의 내용을 Lovable 프로젝트의 Knowledge Base에 붙여넣습니다. 이로써 패키지 이름, CSS 임포트, 컨테이너 높이, 날짜 처리 규칙이 고정됩니다.
2. 프롬프트 [`01-create-app-shell.md`](https://github.com/DHTMLX/react-gantt-lovable-starter/blob/main/docs/01-create-app-shell.md)을 실행하여 경로, 탐색 및 플레이스홀더 페이지를 스캐폴딩합니다.
3. 단계 03 이전에 백엔드를 결정합니다. 스타터는 Supabase를 사용합니다. 백엔드가 필요 없는 버전을 원하면 Supabase 단계를 건너뛰고 모의 데이터만 유지할 수 있습니다.
4. 남은 프롬프트를 순서대로 `02`에서 `11`까지 실행합니다. 각 프롬프트는 기능 영역 하나를 다룹니다( Gantt 코어, Supabase, CRUD, 권한, 브라우저 확인, Gantt UX, 작동 달력, 리소스, 최종 확인, 대시보드/리포트/워크로드 페이지).

일반적인 실행은 11개의 프롬프트 크기에 맞춘 단계에서 작동하는 앱을 생성합니다. 정확한 프롬프트와 그 범위는 저장소에서 버전 관리됩니다.

## 필요할 수 있는 수동 수정

생성된 코드는 특히 React 특유의 패턴 주위에서 처음에 완벽하지 않을 때가 많습니다. 원래 빌드 중 적용된 모든 수동 편집은 저장소의 [`docs/00-manual-edits.md`](https://github.com/DHTMLX/react-gantt-lovable-starter/blob/main/docs/00-manual-edits.md)에 기록되어 있습니다. 이 파일은 알려진 문제 목록으로서의 역할과 생성된 출력이 원하는 패턴에서 벗어났을 때 자신의 Lovable 빌드 로그를 어떻게 유지하는지의 예시로 활용하십시오.

현재 기록된 수정 목록은 테마 컨텍스트 연결, CRUD 경계에서의 Gantt 날짜 정규화, Redux 스냅샷 신선도, 실행취소/다시 실행 지속성, 주말 템플릿 서명 불일치를 다룹니다.

## Supabase 설정

저장의 [`supabase/migrations`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/supabase/migrations) 폴더에는 스키마, 데모 정책 및 시드 데이터가 차례대로 정렬된 SQL 파일로 포함되어 있습니다. Supabase SQL 에디터에서 순서대로 적용한 후, 프로젝트 설정에서 세 가지 Vite 환경 변수를(`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`)를 채워 넣으세요.

스키마는 여러 프로젝트를 지원하며, 작업과 링크가 각 프로젝트별로 범주화되고, 데모 역할 모델을 구동하는 `project_members` 테이블이 추가로 포함되어 있습니다.

## 프로덕션으로 넘어가기

스타터는 공개 체험 패키지 `@dhtmlx/trial-react-gantt`를 사용합니다. 프로토타입이 생산용으로 승인되면 상용 패키지 `@dhx/react-gantt`로 교체합니다 - 패키지 교체 절차는 [Installing React Gantt](integrations/react/installation.md#moving-from-the-trial-package-to-the-commercial-one)에서 다룹니다.

스타터의 권한은 데모용입니다. 최종 사용자가 앱에 노출되기 전에 데모 아이덴티티 흐름을 실제 인증으로 교체하세요.

## 다음에 읽을 거리

- [Lovable AI](integrations/ai-tools/lovable-ai.md) - 백엔드 없는 일반 Lovable + Gantt 워크플로우
- [DHTMLX MCP Server](integrations/ai-tools/mcp-server.md) - Lovable과 MCP를 연결하여 정확한 API 참조 얻기
- [Agent Skills](integrations/ai-tools/agent-skills.md) - Cursor 또는 Claude Code에서 저장소를 계속 편집할 때 동일한 DHTMLX 패턴 적용
- [Installing React Gantt](integrations/react/installation.md) - private-registry 설정 및 trial에서 상용 패키지로의 교환
- [React Gantt Overview](integrations/react/overview.md) - 기본 구성요소 참조