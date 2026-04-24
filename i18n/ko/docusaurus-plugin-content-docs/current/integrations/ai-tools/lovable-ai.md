---
title: "Lovable AI와의 통합"
sidebar_label: "Lovable AI"
description: "Lovable AI가 생성한 애플리케이션에 DHTMLX React Gantt를 통합하는 가이드"
---

# Lovable AI와의 통합

이 문서는 Lovable 프로젝트에 DHTMLX React Gantt를 추가하고 정확하게 생성된 코드를 얻는 방법을 설명합니다.

## Lovable이 DHTMLX Gantt를 처리하는 방법

Lovable은 자연어 프롬프트로 React 앱을 생성합니다. 레이아웃, 라우트, 표준 컴포넌트와 같은 일반적인 UI 패턴을 잘 처리합니다. 이는 모델이 훈련 과정에서 충분한 예제를 봤기 때문입니다. DHTMLX Gantt는 자체 구성 API, 속성 이름, 데이터 형식을 가진 전문 컴포넌트입니다. 이 경우 모델이 활용할 수 있는 자료가 상대적으로 적으므로 추측합니다. 때로는 정확하게, 자주 그렇지 않습니다.

정확한 API 정보를 Lovable에 제공하는 세 가지 메커니즘이 있으며, 각각 다른 규모에서 작동합니다:

| 방법 | 최적용 대상 | 범위 |
|---|---|---|
| **Inline prompts** | 정확한 속성을 알고 있을 때의 단발 수정 | 단일 프롬프트 |
| **Knowledge Base** | 여러 프롬프트에 걸친 재사용 가능한 규칙 | 프로젝트 수준 |
| **MCP** | 복수 복사가 필요 없는 전체 API 커버리지 | 외부 서버 연결 |

이들은 상호 배타적이지 않습니다. 지식 베이스와 MCP는 함께 잘 작동합니다 - 프로젝트 특성 규칙은 지식 베이스에, 일반 API 정확성은 MCP에 사용합니다. 아래의 섹션은 워크플로우 전체를 따라갑니다: 앱 스캐폴딩, Gantt 추가, 그리고 각 방법으로 출력 품질을 개선합니다.

## 사전 요구사항

- Lovable 계정

로컬 개발용(선택 사항):

- Node.js 18+
- npm

플랫폼별 세부 내용은 [Lovable 문서](https://docs.lovable.dev/)를 참조하십시오.

## 기본 앱 생성하기

표준 관리 레이아웃으로 시작합니다. 이 프롬프트는 탐색 네비게이션, KPI 카드, 차트 영역이 포함된 대시보드를 생성합니다:

> 관리자 애플리케이션을 만듭니다.
> 요구사항:
> - 각 탐색 항목은 별도의 경로를 엽니다
> - 대시보드에는 KPI 카드와 매출 차트가 있는 주요 콘텐츠 블록이 포함됩니다.

![Lovable이 생성한 관리 대시보드 레이아웃](/img/lovable_admin_dashboard_layout.png)

생성된 후 Lovable에서 계속 편집하거나 Git 저장소를 클론하여 로컬에서 작업하십시오. 변경 내용은 양방향으로 동기화됩니다.

첫 프롬프트는 구조와 탐색에 초점을 맞추고, 컴포넌트별 구성은 다음 단계에서 다룹니다.

## DHTMLX React Gantt 추가

프롬프트에서 trial 패키지를 참조합니다:

> Sales 차트를 DHTMLX React Gantt 차트로 교체하려면 `@dhtmlx/trial-react-gantt`를 사용합니다.

![Lovable 대시보드의 DHTMLX Gantt 차트](/img/lovable_gantt_dashboard.png)

Lovable은 React 앱을 생성하므로 React 래퍼가 자연스러운 선택입니다. 가이드는 `[DHTMLX React Gantt](../../react/overview/)`의 평가 빌드인 `@dhtmlx/trial-react-gantt`를 사용합니다. 이 패키지는 npm에서 공개적으로 사용할 수 있어 Lovable이 추가 설정 없이 설치할 수 있습니다.

평가 빌드는 완전하게 작동하지만 평가 워터마크가 포함되어 있습니다. 프로덕션에서는 `@dhx/react-gantt`로 전환하십시오. 이 패키지는 [DHTMLX 비공개 npm 레지스트리](../../react/installation/)의 인증이 필요합니다. 또는 패키지 파일을 로컬에서 프로젝트에 추가하십시오.

Lovable은 패키지를 설치하고 임포트를 생성하며 샘플 작업과 타임라인이 포함된 기본 Gantt를 렌더링합니다. 출력은 API를 정확히 반영하지 않는 경우가 많습니다 - 열 구성, 눈금 설정, 데이터 형식이 추정됩니다. 아래 섹션들은 그 격차를 줄이는 방법을 보여줍니다.

## 인라인 프롬프트로 출력 개선

정확한 API 호출을 알고 있을 때 속성 이름과 코드 스니펫을 포함하여 Lovable이 추측하지 않도록 하십시오:

> DHTMLX React Gantt 구성 업데이트:
> - `config.row_height`를 사용하여 행 높이를 `40px`로 설정
> - 구성을 ReactGantt 컴포넌트에 전달합니다
>
> 예시:
> ```jsx
> const config = {
>   row_height: 40
> };
>
> <ReactGantt config={config} />
> ```

개별 변경에는 잘 작동합니다. 구성이 커지면 매 프롬프트에 동일한 API 세부 정보를 붙여넣게 됩니다.

## Knowledge Base에 규칙 저장

지식 베이스는 프로젝트의 모든 프롬프트에 적용되는 재사용 가능한 규칙을 저장합니다. API 구체 정보를 한 번 정의하고 반복하지 않도록 합니다:

> 테마:
> - Gantt는 "theme" 속성을 통해 테마를 지원합니다.
> - 허용 값: `"terrace"`(밝음) 및 `"dark"`(다크).
> - 앱에 글로벌 테마가 있으면 매핑합니다:
>   - light -> `"terrace"`
>   - dark  -> `"dark"`
> - 매핑된 값을 Gantt에 `theme={ganttTheme}`로 전달합니다.
>
> 그리드 행 높이:
> - Gantt 구성 객체를 통해 행 높이를 설정합니다.
> - `config.row_height`(숫자, 픽셀 단위)를 사용합니다.
> - 구성을 ReactGantt 컴포넌트에 전달합니다:
>
>   ```jsx
>   const config = { row_height: 40 };
>
>   <ReactGantt config={config} />
>   ```

![Lovable Knowledge Base with Gantt configuration rules](/img/lovable_knowledge_base_gantt_rules.png)

규칙이 준비되면 프롬프트는 짧아질 수 있습니다:

> 프로젝트 지식 베이스를 사용하십시오. Gantt 그리드 행 높이를 60으로 설정하십시오.

![Lovable에서 KB 구성을 적용한 후의 Gantt](/img/lovable_gantt_after_kb_update.png)

지식 베이스는 약 ~100k 문자로 제한됩니다 - 집중적인 구성 참조에는 충분하지만 전체 [DHTMLX Gantt API](https://github.com/DHTMLX/gantt-docs)에는 미치지 못합니다. 더 넓은 범위를 다루려면 MCP를 연결하십시오.

## 전체 API 접근을 위한 MCP 연결

MCP (Model Context Protocol)는 Lovable을 외부 문서 서버에 연결합니다. 이를 통해 Lovable은 수동으로 복사-붙여넣기 없이도 전체 API를 사용할 수 있습니다.

Lovable 프로젝트 설정에서 [DHTMLX MCP Server](../mcp-server/)를 연결합니다:

![Lovable에 DHTMLX MCP 서버 추가](/img/lovable_mcp_server_setup.png)

그런 다음 프롬프트에서 이를 참조하여 Lovable이 코드를 생성하기 전에 관련 문서를 가져오게 합니다:

> DHTMLX MCP 서버를 사용하십시오. Gantt 그리드 행 높이를 60픽셀로 설정합니다.

Lovable은 실제 API 참조에서 속성 이름, 데이터 형식, 구성 패턴을 추정하지 않고 정확히 해석합니다.

## 실용적인 팁

- **프롬프트당 한 가지 변경.** 작은 프롬프트가 출력이 정확하지 않을 때 문제를 분리하기 쉽습니다.
- **임포트 확인.** Lovable은 때때로 잘못된 패키지 경로에서 임포트를 하거나 이름이 있는 익스포트와 기본 익스포트를 혼동합니다. 변경 후 임포트 행을 확인하십시오.
- **Knowledge Base와 MCP를 결합하십시오.** 프로젝트 특성 규칙(테마 매핑, 열 배치)을 위한 지식 베이스와 일반 API 정확성을 위한 MCP를 함께 사용합니다. 서로 보완합니다.
- **구성 객체를 점검하십시오.** Gantt가 예상대로 렌더링되지 않으면 `<ReactGantt />`에 전달된 구성 객체를 로그하고 [구성 속성 참조](../../react/configuration-props/)와 대조하십시오. 대부분의 이슈는 누락되었거나 잘못된 속성 이름 때문입니다.

## 다음에 읽을 내용

- [DHTMLX React Gantt 개요](../../react/overview/) - 컴포넌트 API 및 기능
- [설치 가이드](../../react/installation/) - 프로페셔널 패키지 설정
- [DHTMLX MCP Server](../mcp-server/) - MCP를 다른 AI 도구에 연결하기