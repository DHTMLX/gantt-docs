---
title: "Lovable AI와의 통합"
sidebar_label: "Lovable AI"
description: "DHTMLX React Gantt를 Lovable AI가 생성한 애플리케이션에 통합하는 방법에 대한 가이드"
---

# Lovable AI와의 통합

이 문서는 Lovable 프로젝트에 DHTMLX React Gantt를 추가하고 정확한 생성 코드를 얻는 방법에 대해 설명합니다.

## Lovable이 DHTMLX Gantt를 다루는 방법

Lovable은 자연어 프롬프트로 React 앱을 생성합니다. 모델은 학습 과정에서 충분한 예시를 보았기 때문에 일반적인 UI 패턴(레이아웃, 라우트, 표준 컴포넌트)을 잘 다룹니다. DHTMLX Gantt는 고유의 구성 API, 속성 이름, 데이터 형식을 가진 전문 컴포넌트입니다. 여기서는 모델이 활용할 자료가 상대적으로 적기 때문에 추측하게 되며, 때로는 정확하고 자주 그렇지 않습니다.

해결책은 맥락(Context)입니다. Lovable에 정확한 API 정보를 제공할 수 있게 하는 세 가지 메커니즘이 각각 다른 규모로 작동합니다:

| Method | Best for | Scope |
|---|---|---|
| **Inline prompts** | 정확한 속성을 알고 있을 때의 일회성 조정 | 단일 프롬프트 |
| **Knowledge Base** | 여러 프롬프트에 걸친 재사용 가능한 규칙 | 프로젝트 수준 |
| **MCP** | 복사-붙여넣기 없이 전체 API 커버리지 | 외부 서버 연결 |

이 세 가지 방법은 서로 배타적이지 않습니다. Knowledge Base와 MCP는 함께 잘 작동합니다 - 프로젝트 특유의 규칙은 Knowledge Base에, 일반 API 정확도는 MCP에 맡기세요.

아래 섹션들은 전체 워크플로우를 따라가며: 앱을 스캐폴드하고, Gantt를 추가하고, 각 방법으로 출력 품질을 개선하는 과정을 안내합니다.

## Featured starter: React Gantt + Supabase project planner

완전히 새로 시작하는 대신에 완전하고 기능이 풍부한 레퍼런스가 필요하다면, [React Gantt Lovable Starter](https://github.com/DHTMLX/react-gantt-lovable-starter)는 Lovable에서 엔드투엔드로 생성된 다중 프로젝트 플래너로, Supabase 백엔드, 작업 및 링크 CRUD, 실행 취소/다시 실행, 작동하는 달력, 자원 작업 부하, 데모 역할 모델을 제공합니다.

- **Live demo**: [https://react-gantt-lovable-starter.lovable.app](https://react-gantt-lovable-starter.lovable.app)
- **Source**: [github.com/DHTMLX/react-gantt-lovable-starter](https://github.com/DHTMLX/react-gantt-lovable-starter)
- **Reproducible recipe**: the [`lovable/`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/lovable) 폴더에는 정확한 프롬프트 시퀀스(11단계), 빌드 과정에서 사용된 Knowledge Base 콘텐츠, 그리고 생성된 출력에 적용된 모든 수동 수정의 로그가 포함되어 있습니다.

작업 공간에서 레시피를 개략적으로 살펴보고 이를 재현하려면 Lovable Starter Walkthrough를 참조하세요: [Lovable Starter Walkthrough](integrations/ai-tools/lovable-starter-walkthrough.md).

일반 관리자(Admin) 앱 안에 Gantt를 렌더링하기만 원한다면 아래 단계로 계속 진행하세요.

## Prerequisites

- Lovable 계정

로컬 개발(선택 사항)용:
- Node.js 18+
- npm

플랫폼별 세부 정보는 [Lovable 문서](https://docs.lovable.dev/)를 참조하세요.

## base 앱 생성하기

표준 관리 레이아웃으로 시작합니다. 이 프롬프트는 탐색, KPI 카드, 차트 영역이 있는 대시보드를 생성합니다:

> Create an admin application.
> Requirements:
> - Each navigation item opens a separate route
> - The Dashboard includes KPI cards and a main content block with a Sales chart.

![Lovable-generated admin dashboard layout](/img/lovable_admin_dashboard_layout.png)

생성된 후에는 Lovable에서 계속 편집하거나 Git 저장소를 복제해 로컬에서 작업할 수 있습니다. 변경 사항은 양방향으로 동기화됩니다.

첫 프롬프트는 구조와 네비게이션에 초점을 맞추고 컴포넌트별 구성은 다음 단계에서 다룹니다.

## DHTMLX React Gantt 추가하기

트라이얼 패키지를 프롬프트에 참조합니다:

> Replace the Sales chart with a DHTMLX React Gantt chart using @dhtmlx/trial-react-gantt.

![DHTMLX Gantt chart in Lovable dashboard](/img/lovable_gantt_dashboard.png)

Lovable은 React 앱을 생성하므로 React 래퍼가 자연스러운 선택입니다. 가이드는 `@dhtmlx/trial-react-gantt`를 사용합니다 — [DHTMLX React Gantt](../../react/overview/)의 평가 빌드입니다. 이는 npm에 공개적으로 제공되므로 Lovable은 추가 설정 없이 설치할 수 있습니다.

트라이얼 빌드는 기능적으로 완전하지만 평가 워터마크가 포함되어 있습니다. 프로덕션에서는 `@dhx/react-gantt`로 전환해야 하며, 이는 [DHTMLX private npm registry](../../react/installation/)에 대한 인증이 필요합니다. 또는 패키지 파일을 로컬에서 프로젝트에 추가할 수도 있습니다.

Lovable은 패키지를 설치하고, import를 생성하며, 샘플 작업 및 타임라인이 포함된 기본 Gantt를 렌더링합니다. 출력은 API와 정확히 일치하지 않는 경우가 많습니다 — 열 구성, 축 설정, 데이터 형식이 추측됩니다. 아래 섹션은 그 차이를 좁히는 방법을 보여 줍니다.

## Inline prompts로 출력 개선하기

정확한 API 호출을 알고 있을 때는 속성 이름과 코드 조각을 포함시켜 Lovable이 추측하지 않도록 합니다:

> Update the DHTMLX React Gantt configuration:
> - Set row height to `40px` using `config.row_height`
> - Pass the config object into the ReactGantt component
>
> Example:
> ```jsx
> const config = {
>   row_height: 40
> };
>
> <ReactGantt config={config} />
> ```

개별 변경에는 효과적이지만, 구성이 커지면 같은 API 세부 정보를 모든 프롬프트에 붙여넣게 되어 관리가 번거로워집니다.

## Knowledge Base에 규칙 저장

Knowledge Base는 프로젝트의 모든 프롬프트에 적용되는 재사용 가능한 규칙을 저장합니다. API 세부 정보를 한 번 정의하고 반복해서 사용하세요:

> Theme:
> - Gantt는 테마 지정(`theme` prop)을 통해 테마를 지원합니다.
> - 허용 값: `"terrace"`(라이트) 및 `"dark"`(다크).
> - 앱에 전역 테마가 있으면 매핑합니다:
>   - light -> `"terrace"`
>   - dark  -> `"dark"`
> - 매핑된 값을 Gantt에 `theme={ganttTheme}`로 전달합니다.
>
> Grid row height:
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

규칙이 준비되면 프롬프트를 짧게 만들 수 있습니다:

> 프로젝트 Knowledge Base를 사용합니다. Gantt 그리드 행 높이를 60으로 설정합니다.

![Gantt after applying Knowledge Base configuration in Lovable](/img/lovable_gantt_after_kb_update.png)

Knowledge Base는 약 100k 문자로 한정되어 있어 집중적인 구성 참조에 충분하지만 전체 [DHTMLX Gantt API](https://github.com/DHTMLX/gantt-docs)에는 미치지 못합니다. 더 넓은 커버리지가 필요하면 MCP를 연결하세요.

## API 전 범위 접근을 위한 MCP 연결

MCP(Model Context Protocol)는 Lovable을 외부 문서 서버에 연결합니다. 이를 통해 수동으로 복사-붙여넣기를 하지 않고도 전체 최신 API에 접근할 수 있습니다.

Lovable 프로젝트 설정에서 [DHTMLX MCP Server](../mcp-server/)를 연결합니다:

![Adding DHTMLX MCP server in Lovable](/img/lovable_mcp_server_setup.png)

그런 다음 프롬프트에서 MCP를 참조하여 Lovable이 코드 생성 전에 관련 문서를 가져오게 합니다:

> Use the DHTMLX MCP server. Set the Gantt grid row height to 60 pixels.

Lovable은 실제 API 참조에서 속성 이름, 데이터 형식, 구성 패턴을 추론하므로 추측에 의존하지 않습니다.

## 실용 팁

- **프롬프트당 하나의 변경.** 작은 프롬프트는 출력이 올바르지 않을 때 문제를 격리하기 쉽습니다.
- **임포트를 확인하십시오.** Lovable은 때때로 잘못된 패키지 경로에서 임포트하거나 명명된(named) 익스포트와 기본 익스포트를 혼합할 수 있습니다. 변경 후 임포트 라인을 확인하세요.
- **Knowledge Base와 MCP를 결합하십시오.** 프로젝트 특유의 규칙(테마 매핑, 열 레이아웃)은 Knowledge Base에, 일반 API 정확성은 MCP에 맡기면 서로를 보완합니다.
- **구성 객체를 점검하십시오.** Gantt가 기대대로 렌더링되지 않으면 `<ReactGantt />`에 전달된 구성 객체를 로깅하고 [구성 속성 참조](../../react/configuration-props/)와 비교하세요. 대부분의 문제는 누락되었거나 잘못된 속성 이름 때문입니다.

## 읽어볼 다음 내용

- [DHTMLX React Gantt 개요](../../react/overview/) - 컴포넌트 API 및 기능
- [설치 가이드](../../react/installation/) - 전문 패키지 설치
- [DHTMLX MCP Server](../mcp-server/) - MCP를 다른 AI 도구에 연결
- [Lovable Starter Walkthrough](integrations/ai-tools/lovable-starter-walkthrough.md) - 전체 프로젝트 플래너 레퍼런스 앱 재현
- [React Gantt 설치](../../react/installation/) - 트라이얼에서 커머셜 패키지로의 교체 절차 포함