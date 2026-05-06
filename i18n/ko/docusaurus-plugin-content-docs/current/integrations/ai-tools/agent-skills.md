---
sidebar_label: 에이전트 스킬
title: 에이전트 스킬
description: "DHTMLX Gantt와 함께 작동하는 AI 어시스턴트를 위한 에이전트 스킬 설치"
---

# 에이전트 스킬

Claude Code나 Codex와 같은 AI 코딩 어시스턴트는 DHTMLX Gantt 코드를 생성할 수 있지만, 특화된 API에서 종종 실수를 합니다: 잘못된 prop 이름, 누락된 CSS 임포트, 잘못된 콜백 시그니처, 또는 호환되지 않는 데이터 패턴의 혼합 등. 에이전트 스킬은 코드 작성을 시작하기 전에 올바른 패턴과 알려진 함정을 어시스턴트에 가르쳐 이를 해결하도록 돕습니다.

실시간 API 참조를 제공하는 [MCP 서버](integrations/ai-tools/mcp-server.md)와 달리, 스킬은 통합 패턴, 의사 결정 포인트, 실패 방지에 초점을 맞춥니다.

**GitHub:** [DHTMLX/skills](https://github.com/DHTMLX/skills)

## 사용 가능한 스킬

### DHTMLX React Gantt

`@dhtmlx/trial-react-gantt`와 `@dhx/react-gantt`를 React 애플리케이션에 통합하는 것을 다룹니다. 이 스킬은 어시스턴트가 프로젝트에 Gantt를 추가하고 올바르게 설정하며, CRUD 작업을 연결하고, Gantt가 앱의 고유 테마를 재사용하도록 테마를 처리하는 데 도움을 줍니다. 또한 실제 프로젝트에서 추출한 알려진 함정들을 포함하고, 익숙하지 않은 API를 추정하기보다는 [DHTMLX MCP 서버](integrations/ai-tools/mcp-server.md)를 통해 확인하도록 지시합니다.

스킬 파일은 읽기 쉬운 Markdown 형식입니다 - 어시스턴트가 따를 정확한 규칙을 [GitHub 저장소](https://github.com/DHTMLX/skills/tree/main/dhtmlx-react-gantt)에서 확인할 수 있습니다.

## 설치

```bash
npx skills add DHTMLX/skills --skill dhtmlx-react-gantt
```

### 수동 설치

다음 저장소를 클론하거나 다운로드하십시오: [DHTMLX/skills](https://github.com/DHTMLX/skills) 저장소를 복제하거나 다운로드하고, `dhtmlx-react-gantt` 폴더를 프로젝트의 스킬 디렉터리로 복사합니다(예: Claude Code의 경우 `.claude/skills/`, Cursor의 경우 `.cursor/skills/`).

## MCP와 함께 스킬 사용하기

스킬과 MCP 서버는 상호 보완적입니다. MCP는 어시스턴트에게 실시간 API 문서(메서드 시그니처, 속성 값, 구성 옵션)에 대한 접근 권한을 제공합니다. 스킬은 일반적인 실수를 방지하는 통합 패턴을 가르칩니다. 최상의 결과를 얻으려면 둘 다 사용하는 것이 좋습니다. 설치 지침은 [DHTMLX MCP Server](integrations/ai-tools/mcp-server.md)를 참조하십시오.